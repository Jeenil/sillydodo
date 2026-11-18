"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

// @chakra-ui/next-js 2.4.x ships a no-op CacheProvider, so emotion renders its <style> tags inline
//         on the server and React hits a hydration mismatch. This collects the styles during SSR
//         and hands them to Next.js for the <head>.
export function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [{ cache, flush }] = useState(() => {
    const emotionCache = createCache({ key: "css" });
    emotionCache.compat = true;
    const prevInsert = emotionCache.insert;
    let inserted: Array<{ name: string; isGlobal: boolean }> = [];
    emotionCache.insert = (...args) => {
      const [selector, serialized] = args;
      if (emotionCache.inserted[serialized.name] === undefined) {
        // Global styles such as body colors are inserted without a selector.
        inserted.push({ name: serialized.name, isGlobal: selector === "" });
      }
      return prevInsert(...args);
    };
    const flushInserted = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache: emotionCache, flush: flushInserted };
  });

  useServerInsertedHTML(() => {
    const items = flush();
    if (items.length === 0) {
      return undefined;
    }
    let styles = "";
    let dataEmotion = cache.key;
    const globals: Array<{ name: string; style: string }> = [];
    for (const { name, isGlobal } of items) {
      const style = cache.inserted[name];
      if (typeof style !== "string") {
        continue;
      }
      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        dataEmotion += ` ${name}`;
      }
    }
    // Globals get their own tags with emotion's "<key>-global <name>" marker, so <Global> can find
    // and replace them on the client (e.g. on color mode change).
    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles !== "" && (
          <style
            data-emotion={dataEmotion}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
