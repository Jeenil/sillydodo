"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// @chakra-ui/next-js 2.4.x ships a no-op CacheProvider, so emotion renders its
// <style> tags inline on the server and React hits a hydration mismatch.
// This collects the styles during SSR and hands them to Next.js for the <head>.
export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        // Global styles (body colors etc.) are inserted without a selector
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const items = flush();
    if (items.length === 0) return null;
    let styles = "";
    let dataEmotion = cache.key;
    const globals: { name: string; style: string }[] = [];
    for (const { name, isGlobal } of items) {
      const style = cache.inserted[name];
      if (typeof style !== "string") continue;
      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        dataEmotion += ` ${name}`;
      }
    }
    // Globals get their own tags with emotion's "<key>-global <name>" marker, so
    // <Global> can find and replace them on the client (e.g. on color mode change)
    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style data-emotion={dataEmotion} dangerouslySetInnerHTML={{ __html: styles }} />
        )}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
