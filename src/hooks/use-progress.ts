"use client";

import { useCallback, useSyncExternalStore } from "react";

const PROGRESS_KEY = "ml-academy-progress";

function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === PROGRESS_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshot(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function getServerSnapshot(): Set<string> {
  return new Set();
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const markComplete = useCallback((slug: string) => {
    const next = new Set(getSnapshot());
    next.add(slug);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(next)));
    window.dispatchEvent(
      new StorageEvent("storage", { key: PROGRESS_KEY, newValue: JSON.stringify(Array.from(next)) })
    );
  }, []);

  const markIncomplete = useCallback((slug: string) => {
    const next = new Set(getSnapshot());
    next.delete(slug);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(next)));
    window.dispatchEvent(
      new StorageEvent("storage", { key: PROGRESS_KEY, newValue: JSON.stringify(Array.from(next)) })
    );
  }, []);

  const isComplete = useCallback(
    (slug: string) => completed.has(slug),
    [completed]
  );

  return {
    completed,
    completedCount: completed.size,
    totalCount: 54,
    markComplete,
    markIncomplete,
    isComplete,
  };
}
