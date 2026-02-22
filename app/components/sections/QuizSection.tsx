"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Flex,
  Badge,
  Progress,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";

// --- Types ---

interface AlbumTrack {
  album_title: string;
  artist_id: number;
  releasedate: string;
  song_name: string;
  original_artist: string;
  islive: number;
}

interface UploadEntry {
  show_id: string;
  URL: string;
  upload_type: string;
}

interface QuizQuestion {
  question: string;
  correct: string;
  choices: string[];
  explanation?: string;
}

interface AudioQuestion {
  audioUrl: string;
  correct: string;  // cleaned song title
  choices: string[];
}

interface ArchiveFile {
  name: string;
  format: string;
  title?: string;
  track?: string;
}

interface ShowLink {
  show_id: number;
  url: string;
}

type QuizMode = "trivia" | "namethetune";
type QuizPhase = "setup" | "loading" | "playing" | "done" | "error";

// --- Constants ---

const KGLW_ARTIST_ID = 1;
const KGLW_NAME = "King Gizzard & the Lizard Wizard";
const TOTAL_QUESTIONS = 10;
const CLIP_DURATION = 30; // seconds
const CLIP_START = 20;    // skip first 20s (intros/fades)
const BASE_URL = "https://kglw.net/api/v2";

// --- Module-level caches ---

let albumsCache: AlbumTrack[] | null = null;
let albumsFetchPromise: Promise<AlbumTrack[]> | null = null;

let uploadsMap: Map<string, string> | null = null;
let uploadsFetchPromise: Promise<Map<string, string>> | null = null;

function getAlbums(): Promise<AlbumTrack[]> {
  if (albumsCache) return Promise.resolve(albumsCache);
  if (albumsFetchPromise) return albumsFetchPromise;
  albumsFetchPromise = fetch(`${BASE_URL}/albums.json?limit=2000`)
    .then((r) => r.json())
    .then((json) => {
      const data: AlbumTrack[] = (json.data || []).filter(
        (t: AlbumTrack) => t.artist_id === KGLW_ARTIST_ID && t.islive === 0
      );
      albumsCache = data;
      return data;
    })
    .catch(() => { albumsFetchPromise = null; return []; });
  return albumsFetchPromise;
}

function getUploadsMap(): Promise<Map<string, string>> {
  if (uploadsMap) return Promise.resolve(uploadsMap);
  if (uploadsFetchPromise) return uploadsFetchPromise;
  uploadsFetchPromise = fetch(`${BASE_URL}/uploads.json`)
    .then((r) => r.json())
    .then((json) => {
      const map = new Map<string, string>();
      for (const e of (json.data || []) as UploadEntry[]) {
        if (!e.show_id || !e.URL) continue;
        if (!map.has(e.show_id) || e.upload_type === "poster-art") {
          map.set(e.show_id, e.URL);
        }
      }
      uploadsMap = map;
      return map;
    })
    .catch(() => { uploadsFetchPromise = null; return new Map<string, string>(); });
  return uploadsFetchPromise;
}

// --- Helpers ---

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function extractYear(dateStr: string): string {
  return dateStr ? (dateStr.split("-")[0] ?? "Unknown") : "Unknown";
}

// Strip Archive.org title suffix: "Rattlesnake (Live in Paris '23)" → "Rattlesnake"
function cleanArchiveTitle(title: string): string {
  return title
    .replace(/\s*\(Live[^)]*\)\s*$/i, "")
    .replace(/\s*\[Live[^\]]*\]\s*$/i, "")
    .trim();
}

// --- Sound effects ---

function playSound(type: "correct" | "wrong") {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(160, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    }
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch { /* no-op */ }
}

// --- Trivia question generation ---

type AlbumMap = Map<string, { year: string; songs: string[] }>;

function buildAlbumMap(tracks: AlbumTrack[]): AlbumMap {
  const map: AlbumMap = new Map();
  for (const t of tracks) {
    if (!t.album_title || !t.song_name) continue;
    if (!map.has(t.album_title)) {
      map.set(t.album_title, { year: extractYear(t.releasedate), songs: [] });
    }
    map.get(t.album_title)!.songs.push(t.song_name);
  }
  return map;
}

function generateTriviaQuestion(tracks: AlbumTrack[], albumMap: AlbumMap): QuizQuestion | null {
  const albums = [...albumMap.entries()];
  if (albums.length < 4 || tracks.length < 4) return null;

  const roll = Math.random();

  if (roll < 0.5) {
    const track = randomFrom(tracks);
    const correct = track.album_title;
    const wrongs = shuffle(albums.map(([a]) => a).filter((a) => a !== correct)).slice(0, 3);
    if (wrongs.length < 1) return null;
    return {
      question: `Which album features the song "${track.song_name}"?`,
      correct,
      choices: shuffle([correct, ...wrongs]),
    };
  }

  if (roll < 0.8) {
    const [albumTitle, albumData] = randomFrom(albums);
    const correct = albumData.year;
    const wrongYears = shuffle(
      [...new Set(albums.map(([, d]) => d.year))].filter((y) => y !== correct)
    ).slice(0, 3);
    if (wrongYears.length < 1) return null;
    return {
      question: `What year was "${albumTitle}" released?`,
      correct,
      choices: shuffle([correct, ...wrongYears]),
    };
  }

  const track = randomFrom(tracks);
  const isOriginal = !track.original_artist || track.original_artist === KGLW_NAME;
  const correct = isOriginal ? "KGLW Original" : "Cover";
  return {
    question: `Is "${track.song_name}" a KGLW original or a cover?`,
    correct,
    choices: ["KGLW Original", "Cover"],
    explanation: !isOriginal ? `Originally by ${track.original_artist}` : undefined,
  };
}

// --- Name That Tune data fetching ---

async function fetchAudioQuestions(): Promise<{ questions: AudioQuestion[]; posterUrl: string | null }> {
  // Fetch recent archive links and uploads in parallel
  const [linksJson, uMap] = await Promise.all([
    fetch(`${BASE_URL}/links.json?order_by=link_id&direction=desc&limit=80`).then((r) => r.json()),
    getUploadsMap(),
  ]);

  const archiveLinks: ShowLink[] = (linksJson.data || []).filter(
    (l: ShowLink & { url: string }) => l.url?.includes("archive.org/embed")
  );

  if (archiveLinks.length === 0) throw new Error("No Archive.org recordings found.");

  // Try links until one has enough MP3 tracks
  for (const link of shuffle(archiveLinks).slice(0, 6)) {
    try {
      const result = await tryBuildAudioQuestions(link, uMap);
      if (result) return result;
    } catch { continue; }
  }

  throw new Error("Couldn't load audio tracks. Try again — a different show will be picked.");
}

async function tryBuildAudioQuestions(
  link: ShowLink & { url: string },
  uMap: Map<string, string>
): Promise<{ questions: AudioQuestion[]; posterUrl: string | null } | null> {
  const match = link.url.match(/archive\.org\/embed\/([^?&\s/]+)/);
  if (!match) return null;
  const identifier = match[1];

  const meta = await fetch(`https://archive.org/metadata/${identifier}`).then((r) => r.json());

  // Get VBR MP3 tracks with titles, sorted by track number
  const mp3Files: ArchiveFile[] = (meta.files || [])
    .filter((f: ArchiveFile) => f.format === "VBR MP3" && f.title)
    .sort((a: ArchiveFile, b: ArchiveFile) => {
      const ta = parseInt(a.track || "99");
      const tb = parseInt(b.track || "99");
      return ta - tb;
    });

  if (mp3Files.length < 6) return null;

  // Build track list with cleaned titles and audio URLs
  const tracks = mp3Files.map((f) => ({
    url: `https://archive.org/download/${identifier}/${encodeURIComponent(f.name)}`,
    song: cleanArchiveTitle(f.title!),
  }));

  const allSongs = tracks.map((t) => t.song);
  const selected = shuffle(tracks).slice(0, TOTAL_QUESTIONS);

  const questions: AudioQuestion[] = selected.map((track) => {
    const wrongs = shuffle(allSongs.filter((s) => s !== track.song)).slice(0, 3);
    return {
      audioUrl: track.url,
      correct: track.song,
      choices: shuffle([track.song, ...wrongs]),
    };
  });

  // Poster for this show
  const posterUrl = uMap.get(String(link.show_id)) ?? null;

  return { questions, posterUrl };
}

// --- Component ---

export function QuizSection() {
  const cardBg        = useColorModeValue("white", "gray.800");
  const cardBorder    = useColorModeValue("gray.200", "gray.700");
  const correctBg     = useColorModeValue("green.50", "green.900");
  const correctBorder = useColorModeValue("green.400", "green.500");
  const wrongBg       = useColorModeValue("red.50", "red.900");
  const wrongBorder   = useColorModeValue("red.400", "red.500");
  const explanationBg = useColorModeValue("gray.50", "gray.700");
  const imageBorder   = useColorModeValue("gray.200", "gray.700");
  const playerBg      = useColorModeValue("gray.50", "gray.900");
  const clipBarBg     = useColorModeValue("gray.200", "gray.700");

  const [phase,          setPhase]          = useState<QuizPhase>("setup");
  const [quizMode,       setQuizMode]       = useState<QuizMode>("trivia");
  const [questions,      setQuestions]      = useState<QuizQuestion[]>([]);
  const [audioQuestions, setAudioQuestions] = useState<AudioQuestion[]>([]);
  const [currentIdx,     setCurrentIdx]     = useState(0);
  const [selected,       setSelected]       = useState<string | null>(null);
  const [score,          setScore]          = useState(0);
  const [errorMsg,       setErrorMsg]       = useState("");
  const [posterUrl,      setPosterUrl]      = useState<string | null>(null);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [clipSeconds,    setClipSeconds]    = useState(0);
  const [hasPlayed,      setHasPlayed]      = useState(false);

  const audioRef  = useRef<HTMLAudioElement>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrivia = questions[currentIdx];
  const currentAudio  = audioQuestions[currentIdx];
  const current       = quizMode === "trivia" ? currentTrivia : currentAudio;

  const progress =
    (quizMode === "trivia" ? questions : audioQuestions).length > 0
      ? ((currentIdx + (selected ? 1 : 0)) /
          (quizMode === "trivia" ? questions : audioQuestions).length) * 100
      : 0;

  const totalQs = quizMode === "trivia" ? questions.length : audioQuestions.length;

  const stopClip = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
  }, []);

  // Auto-play clip when question changes (namethetune mode)
  useEffect(() => {
    if (quizMode !== "namethetune" || phase !== "playing") {
      if (quizMode !== "namethetune") stopClip();
      return;
    }
    const q = audioQuestions[currentIdx];
    if (!q || !audioRef.current) return;

    stopClip();
    setClipSeconds(0);
    setHasPlayed(false);

    const audio = audioRef.current;
    audio.src = q.audioUrl;

    // Brief delay so the browser registers the new src before playing
    const t = setTimeout(() => {
      audio.currentTime = CLIP_START;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
          timerRef.current = setInterval(() => {
            setClipSeconds((s) => {
              if (s + 1 >= CLIP_DURATION) {
                audio.pause();
                setIsPlaying(false);
                if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                return CLIP_DURATION;
              }
              return s + 1;
            });
          }, 1000);
        })
        .catch(() => { /* autoplay blocked — replay button stays visible */ });
    }, 150);

    return () => {
      clearTimeout(t);
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [currentIdx, phase, quizMode, audioQuestions, stopClip]);

  function handlePlayClip() {
    const audio = audioRef.current;
    if (!audio || !currentAudio) return;

    if (isPlaying) { stopClip(); return; }

    // Set src only when needed (avoids re-loading)
    if (audio.src !== currentAudio.audioUrl) {
      audio.src = currentAudio.audioUrl;
    }

    audio.currentTime = CLIP_START;
    audio.play().then(() => {
      setIsPlaying(true);
      setHasPlayed(true);
      setClipSeconds(0);

      timerRef.current = setInterval(() => {
        setClipSeconds((s) => {
          if (s + 1 >= CLIP_DURATION) {
            stopClip();
            return CLIP_DURATION;
          }
          return s + 1;
        });
      }, 1000);
    }).catch(() => setIsPlaying(false));
  }

  const fetchAndStart = useCallback(async () => {
    setPhase("loading");
    setErrorMsg("");
    stopClip();
    setClipSeconds(0);
    setHasPlayed(false);

    try {
      if (quizMode === "trivia") {
        const [tracks, uMap] = await Promise.all([getAlbums(), getUploadsMap()]);
        if (tracks.length < 20) throw new Error("Couldn't load album data — try again.");

        const posterUrls = [...uMap.values()];
        setPosterUrl(posterUrls.length > 0 ? randomFrom(posterUrls) : null);

        const albumMap = buildAlbumMap(tracks);
        const qs: QuizQuestion[] = [];
        const seen = new Set<string>();
        let attempts = 0;
        while (qs.length < TOTAL_QUESTIONS && attempts < 400) {
          const q = generateTriviaQuestion(tracks, albumMap);
          if (q && !seen.has(q.question)) { seen.add(q.question); qs.push(q); }
          attempts++;
        }
        if (qs.length < 5) throw new Error("Couldn't generate enough questions — try again.");
        setQuestions(qs);
        setAudioQuestions([]);

      } else {
        const { questions: aqs, posterUrl: pUrl } = await fetchAudioQuestions();
        setPosterUrl(pUrl);
        setAudioQuestions(aqs);
        setQuestions([]);
      }

      setCurrentIdx(0);
      setScore(0);
      setSelected(null);
      setPhase("playing");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizMode]);

  function handleAnswer(choice: string) {
    if (selected !== null) return;
    stopClip();
    setSelected(choice);
    const isCorrect = choice === current?.correct;
    playSound(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    stopClip();
    if (currentIdx + 1 >= totalQs) {
      setPhase("done");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    }
  }

  function handleReset() {
    stopClip();
    setPhase("setup");
    setSelected(null);
    setQuestions([]);
    setAudioQuestions([]);
    setPosterUrl(null);
  }

  return (
    <VStack align="stretch" spacing={8} maxW="800px">

      {/* Hidden audio element — always in DOM */}
      <audio ref={audioRef} preload="none" style={{ display: "none" }} />

      {/* Header */}
      <Box>
        <Heading as="h1" size="2xl" mb={2}>Gizz Quiz</Heading>
        <Text fontSize="lg" color="gray.500">
          Test your King Gizzard & the Lizard Wizard knowledge.
        </Text>
      </Box>

      {/* ── SETUP ── */}
      {phase === "setup" && (
        <Box bg={cardBg} p={10} borderRadius="lg" border="1px" borderColor={cardBorder}>
          <VStack spacing={6} align="stretch">
            <Heading size="md">Choose your quiz</Heading>

            {/* Mode selector */}
            <VStack align="stretch" spacing={2}>
              {[
                {
                  id: "trivia" as QuizMode,
                  label: "Music Trivia",
                  desc: "Albums, release years, originals vs covers — studio discography.",
                },
                {
                  id: "namethetune" as QuizMode,
                  label: "Name That Tune",
                  desc: "A clip from a real KGLW live recording plays — guess the song.",
                },
              ].map((mode) => {
                const isActive = quizMode === mode.id;
                return (
                  <Flex
                    key={mode.id}
                    p={4}
                    borderRadius="md"
                    border="1px"
                    borderColor={isActive ? "brand.500" : cardBorder}
                    bg={isActive ? "brand.500" : "transparent"}
                    color={isActive ? "gray.900" : "inherit"}
                    cursor="pointer"
                    onClick={() => setQuizMode(mode.id)}
                    transition="all 0.15s"
                    align="center"
                    gap={3}
                  >
                    <Box>
                      <Text fontWeight="semibold">{mode.label}</Text>
                      <Text fontSize="sm" opacity={0.8}>{mode.desc}</Text>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>

            <Button colorScheme="yellow" size="lg" onClick={fetchAndStart}>
              Start Quiz
            </Button>
          </VStack>
        </Box>
      )}

      {/* ── LOADING ── */}
      {phase === "loading" && (
        <Flex justify="center" align="center" py={20} direction="column" gap={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text color="gray.500">
            {quizMode === "namethetune"
              ? "Loading live recordings from Archive.org…"
              : "Loading discography data…"}
          </Text>
        </Flex>
      )}

      {/* ── ERROR ── */}
      {phase === "error" && (
        <VStack spacing={4}>
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {errorMsg}
          </Alert>
          <Button onClick={() => setPhase("setup")}>Back</Button>
        </VStack>
      )}

      {/* ── PLAYING ── */}
      {phase === "playing" && current && (
        <VStack spacing={4} align="stretch">

          {/* Show poster */}
          {posterUrl && (
            <Box
              h="320px"
              w="100%"
              borderRadius="lg"
              border="1px"
              borderColor={imageBorder}
              bgImage={`url(${posterUrl})`}
              bgSize="cover"
              bgPosition="center top"
            />
          )}

          {/* Progress row */}
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Question {currentIdx + 1} of {totalQs}
            </Text>
            <Badge colorScheme="yellow" px={3} py={1} borderRadius="full">
              {score} correct
            </Badge>
          </Flex>
          <Progress value={progress} colorScheme="yellow" borderRadius="full" size="sm" />

          {/* ── Name That Tune audio player ── */}
          {quizMode === "namethetune" && currentAudio && (
            <Box bg={playerBg} p={6} borderRadius="lg" border="1px" borderColor={cardBorder}>
              <Text fontWeight="semibold" mb={3} fontSize="lg">
                🎵 What song is playing?
              </Text>

              <Progress
                value={(clipSeconds / CLIP_DURATION) * 100}
                colorScheme="yellow"
                borderRadius="full"
                size="sm"
                mb={4}
                bg={clipBarBg}
              />

              <Flex align="center" gap={3}>
                <Text fontSize="sm" color="gray.500" flex={1}>
                  {isPlaying
                    ? `${CLIP_DURATION - clipSeconds}s remaining…`
                    : hasPlayed
                    ? "Clip finished — pick your answer"
                    : "Loading clip…"}
                </Text>
                {!isPlaying && selected === null && (
                  <Button size="sm" variant="ghost" color="gray.500" onClick={handlePlayClip}>
                    ⟳ Replay
                  </Button>
                )}
              </Flex>
            </Box>
          )}

          {/* Question text (trivia only) */}
          {quizMode === "trivia" && currentTrivia && (
            <Box bg={cardBg} p={8} borderRadius="lg" border="1px" borderColor={cardBorder}>
              <Text fontSize="lg" fontWeight="medium" mb={6}>
                {currentTrivia.question}
              </Text>

              <VStack spacing={3} align="stretch">
                {currentTrivia.choices.map((choice) => {
                  let bg = "transparent";
                  let bc = cardBorder;
                  if (selected !== null) {
                    if (choice === currentTrivia.correct) { bg = correctBg; bc = correctBorder; }
                    else if (choice === selected)         { bg = wrongBg;   bc = wrongBorder; }
                  }
                  return (
                    <Flex
                      key={choice}
                      p={4}
                      borderRadius="md"
                      border="1px"
                      borderColor={bc}
                      bg={bg}
                      cursor={selected === null ? "pointer" : "default"}
                      onClick={() => handleAnswer(choice)}
                      _hover={selected === null ? { borderColor: "brand.500", transform: "translateX(4px)" } : {}}
                      transition="all 0.15s"
                      align="center"
                      justify="space-between"
                    >
                      <Text>{choice}</Text>
                      {selected !== null && choice === currentTrivia.correct && <Text color="green.500" fontWeight="bold">✓</Text>}
                      {selected === choice && choice !== currentTrivia.correct && <Text color="red.500" fontWeight="bold">✗</Text>}
                    </Flex>
                  );
                })}
              </VStack>

              {selected !== null && currentTrivia.explanation && (
                <Box mt={4} p={3} bg={explanationBg} borderRadius="md">
                  <Text fontSize="sm" color="gray.500">{currentTrivia.explanation}</Text>
                </Box>
              )}
            </Box>
          )}

          {/* Answer choices (Name That Tune) */}
          {quizMode === "namethetune" && currentAudio && (
            <Box bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor={cardBorder}>
              <VStack spacing={3} align="stretch">
                {currentAudio.choices.map((choice) => {
                  let bg = "transparent";
                  let bc = cardBorder;
                  if (selected !== null) {
                    if (choice === currentAudio.correct) { bg = correctBg; bc = correctBorder; }
                    else if (choice === selected)        { bg = wrongBg;   bc = wrongBorder; }
                  }
                  return (
                    <Flex
                      key={choice}
                      p={4}
                      borderRadius="md"
                      border="1px"
                      borderColor={bc}
                      bg={bg}
                      cursor={selected === null ? "pointer" : "default"}
                      onClick={() => handleAnswer(choice)}
                      _hover={selected === null ? { borderColor: "brand.500", transform: "translateX(4px)" } : {}}
                      transition="all 0.15s"
                      align="center"
                      justify="space-between"
                    >
                      <Text>{choice}</Text>
                      {selected !== null && choice === currentAudio.correct && <Text color="green.500" fontWeight="bold">✓</Text>}
                      {selected === choice && choice !== currentAudio.correct && <Text color="red.500" fontWeight="bold">✗</Text>}
                    </Flex>
                  );
                })}
              </VStack>
            </Box>
          )}

          {selected !== null && (
            <Button colorScheme="yellow" onClick={handleNext} alignSelf="flex-end">
              {currentIdx + 1 >= totalQs ? "See Results" : "Next Question"}
            </Button>
          )}
        </VStack>
      )}

      {/* ── DONE ── */}
      {phase === "done" && (
        <VStack spacing={4} align="stretch">
          {posterUrl && (
            <Box
              h="200px"
              w="100%"
              borderRadius="lg"
              border="1px"
              borderColor={imageBorder}
              bgImage={`url(${posterUrl})`}
              bgSize="cover"
              bgPosition="center top"
            />
          )}
          <Box bg={cardBg} p={10} borderRadius="lg" border="1px" borderColor={cardBorder} textAlign="center">
            <VStack spacing={4}>
              <Heading size="xl">Quiz Complete!</Heading>
              <Text fontSize="7xl" fontWeight="bold" color="brand.500">
                {score}/{totalQs}
              </Text>
              <Text fontSize="lg" color="gray.500">
                {score === totalQs
                  ? "Perfect score! You're a true Gizz head."
                  : score >= totalQs * 0.7
                  ? "Solid effort — you know your stuff."
                  : score >= totalQs * 0.4
                  ? "Not bad. The rabbit hole goes deeper."
                  : "Time to revisit the discography."}
              </Text>
              <HStack spacing={4} pt={2}>
                <Button colorScheme="yellow" onClick={fetchAndStart}>Play Again</Button>
                <Button variant="outline" onClick={handleReset}>Change Mode</Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      )}

    </VStack>
  );
}
