"use client";

import { useState, useCallback } from "react";
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
  Collapse,
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

interface ShowLink {
  url: string;
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

type QuizPhase = "setup" | "loading" | "playing" | "done" | "error";

// --- Constants ---

const KGLW_ARTIST_ID = 1;
const KGLW_NAME = "King Gizzard & the Lizard Wizard";
const TOTAL_QUESTIONS = 10;
const BASE_URL = "https://kglw.net/api/v2";

// --- Module-level caches (persist across quiz sessions) ---

let albumsCache: AlbumTrack[] | null = null;
let albumsFetchPromise: Promise<AlbumTrack[]> | null = null;

let uploadsMap: Map<string, string> | null = null;
let uploadsFetchPromise: Promise<Map<string, string>> | null = null;

let archiveEmbedCache: string | null | undefined = undefined; // undefined = not yet fetched

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
    .catch(() => {
      albumsFetchPromise = null;
      return [];
    });
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
    .catch(() => {
      uploadsFetchPromise = null;
      return new Map<string, string>();
    });
  return uploadsFetchPromise;
}

async function getArchiveEmbed(): Promise<string | null> {
  if (archiveEmbedCache !== undefined) return archiveEmbedCache;
  try {
    const res = await fetch(
      `${BASE_URL}/links.json?order_by=link_id&direction=desc&limit=80`
    );
    const json = await res.json();
    const links: ShowLink[] = json.data || [];
    const archiveLinks = links.filter((l) =>
      l.url.includes("archive.org/embed")
    );
    archiveEmbedCache =
      archiveLinks.length > 0
        ? archiveLinks[Math.floor(Math.random() * archiveLinks.length)].url
        : null;
  } catch {
    archiveEmbedCache = null;
  }
  return archiveEmbedCache;
}

// --- Sound effects via Web Audio API ---

function playSound(type: "correct" | "wrong") {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);       // C5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(160, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // Web Audio API not available — silently skip
  }
}

// --- Helpers ---

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function extractYear(dateStr: string): string {
  return dateStr ? dateStr.split("-")[0] : "Unknown";
}

// --- Question generation ---

type AlbumMap = Map<string, { year: string; songs: string[] }>;

function buildAlbumMap(tracks: AlbumTrack[]): AlbumMap {
  const map: AlbumMap = new Map();
  for (const t of tracks) {
    if (!t.album_title || !t.song_name) continue;
    if (!map.has(t.album_title)) {
      map.set(t.album_title, {
        year: extractYear(t.releasedate),
        songs: [],
      });
    }
    map.get(t.album_title)!.songs.push(t.song_name);
  }
  return map;
}

function generateQuestion(
  tracks: AlbumTrack[],
  albumMap: AlbumMap
): QuizQuestion | null {
  const albums = [...albumMap.entries()];
  if (albums.length < 4 || tracks.length < 4) return null;

  // Weight: 50% album, 30% year, 20% original/cover
  const roll = Math.random();

  if (roll < 0.5) {
    // "Which album is [Song] from?"
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
    // "What year was [Album] released?"
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

  // "Original or cover?"
  const track = randomFrom(tracks);
  const isOriginal =
    !track.original_artist || track.original_artist === KGLW_NAME;
  const correct = isOriginal ? "KGLW Original" : "Cover";
  return {
    question: `Is "${track.song_name}" a KGLW original or a cover?`,
    correct,
    choices: ["KGLW Original", "Cover"],
    explanation: !isOriginal
      ? `Originally by ${track.original_artist}`
      : undefined,
  };
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

  const [phase,      setPhase]      = useState<QuizPhase>("setup");
  const [questions,  setQuestions]  = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [score,      setScore]      = useState(0);
  const [errorMsg,   setErrorMsg]   = useState("");
  const [posterUrl,  setPosterUrl]  = useState<string | null>(null);
  const [embedUrl,   setEmbedUrl]   = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const current  = questions[currentIdx];
  const progress =
    questions.length > 0
      ? ((currentIdx + (selected ? 1 : 0)) / questions.length) * 100
      : 0;

  const fetchAndStart = useCallback(async () => {
    setPhase("loading");
    setErrorMsg("");
    setShowPlayer(false);

    try {
      // Fetch all three in parallel
      const [tracks, uMap, embed] = await Promise.all([
        getAlbums(),
        getUploadsMap(),
        getArchiveEmbed(),
      ]);

      if (tracks.length < 20)
        throw new Error("Couldn't load enough album data — try again shortly.");

      // Random poster from uploads
      const posterUrls = [...uMap.values()];
      setPosterUrl(posterUrls.length > 0 ? randomFrom(posterUrls) : null);
      setEmbedUrl(embed);

      const albumMap = buildAlbumMap(tracks);

      const qs: QuizQuestion[] = [];
      const seen = new Set<string>();
      let attempts = 0;
      while (qs.length < TOTAL_QUESTIONS && attempts < 400) {
        const q = generateQuestion(tracks, albumMap);
        if (q && !seen.has(q.question)) {
          seen.add(q.question);
          qs.push(q);
        }
        attempts++;
      }

      if (qs.length < 5)
        throw new Error("Couldn't generate enough questions — try again.");

      setQuestions(qs);
      setCurrentIdx(0);
      setScore(0);
      setSelected(null);
      setPhase("playing");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("error");
    }
  }, []);

  function handleAnswer(choice: string) {
    if (selected !== null) return;
    setSelected(choice);
    const isCorrect = choice === questions[currentIdx].correct;
    playSound(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setPhase("done");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
    }
  }

  function handleReset() {
    setPhase("setup");
    setSelected(null);
    setQuestions([]);
    setPosterUrl(null);
    setEmbedUrl(null);
  }

  return (
    <VStack align="stretch" spacing={8} maxW="800px">

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
            <Heading size="md">Ready to play?</Heading>
            <Text color="gray.500">
              10 questions covering KGLW&apos;s studio discography — albums, release
              years, and whether a song is an original or a cover. A live show
              player loads alongside so you can listen while you quiz.
            </Text>
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
          <Text color="gray.500">Loading discography data…</Text>
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

          {/* Archive.org live player — toggle */}
          {embedUrl && (
            <Box>
              <Button
                size="xs"
                variant="ghost"
                color="gray.500"
                onClick={() => setShowPlayer((v) => !v)}
                mb={1}
              >
                {showPlayer ? "Hide live player ▲" : "Show live player ▼"}
              </Button>
              <Collapse in={showPlayer} animateOpacity>
                <Box
                  as="iframe"
                  src={embedUrl}
                  w="100%"
                  h="60px"
                  borderRadius="md"
                  border="1px"
                  borderColor={imageBorder}
                  allow="autoplay"
                  sx={{ display: "block" }}
                />
              </Collapse>
            </Box>
          )}

          {/* Progress */}
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Question {currentIdx + 1} of {questions.length}
            </Text>
            <Badge colorScheme="yellow" px={3} py={1} borderRadius="full">
              {score} correct
            </Badge>
          </Flex>
          <Progress value={progress} colorScheme="yellow" borderRadius="full" size="sm" />

          {/* Question card */}
          <Box bg={cardBg} p={8} borderRadius="lg" border="1px" borderColor={cardBorder}>
            <Text fontSize="lg" fontWeight="medium" mb={6}>
              {current.question}
            </Text>

            <VStack spacing={3} align="stretch">
              {current.choices.map((choice) => {
                let bg = "transparent";
                let bc = cardBorder;

                if (selected !== null) {
                  if (choice === current.correct) {
                    bg = correctBg; bc = correctBorder;
                  } else if (choice === selected) {
                    bg = wrongBg; bc = wrongBorder;
                  }
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
                    _hover={
                      selected === null
                        ? { borderColor: "brand.500", transform: "translateX(4px)" }
                        : {}
                    }
                    transition="all 0.15s"
                    align="center"
                    justify="space-between"
                  >
                    <Text>{choice}</Text>
                    {selected !== null && choice === current.correct && (
                      <Text color="green.500" fontWeight="bold">✓</Text>
                    )}
                    {selected === choice && choice !== current.correct && (
                      <Text color="red.500" fontWeight="bold">✗</Text>
                    )}
                  </Flex>
                );
              })}
            </VStack>

            {selected !== null && current.explanation && (
              <Box mt={4} p={3} bg={explanationBg} borderRadius="md">
                <Text fontSize="sm" color="gray.500">{current.explanation}</Text>
              </Box>
            )}
          </Box>

          {selected !== null && (
            <Button colorScheme="yellow" onClick={handleNext} alignSelf="flex-end">
              {currentIdx + 1 >= questions.length ? "See Results" : "Next Question"}
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
          <Box
            bg={cardBg}
            p={10}
            borderRadius="lg"
            border="1px"
            borderColor={cardBorder}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading size="xl">Quiz Complete!</Heading>
              <Text fontSize="7xl" fontWeight="bold" color="brand.500">
                {score}/{questions.length}
              </Text>
              <Text fontSize="lg" color="gray.500">
                {score === questions.length
                  ? "Perfect score! You're a true Gizz head."
                  : score >= questions.length * 0.7
                  ? "Solid effort — you know your stuff."
                  : score >= questions.length * 0.4
                  ? "Not bad. The rabbit hole goes deeper."
                  : "Time to revisit the discography."}
              </Text>
              <HStack spacing={4} pt={2}>
                <Button colorScheme="yellow" onClick={fetchAndStart}>Play Again</Button>
                <Button variant="outline" onClick={handleReset}>Start Over</Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      )}

    </VStack>
  );
}
