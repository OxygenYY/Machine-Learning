const STORAGE_KEY = "ml-academy-progress";

export function getProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed);
    return new Set();
  } catch {
    return new Set();
  }
}

export function markComplete(slug: string): Set<string> {
  const progress = getProgress();
  progress.add(slug);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(Array.from(progress))
  );
  return progress;
}

export function markIncomplete(slug: string): Set<string> {
  const progress = getProgress();
  progress.delete(slug);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(Array.from(progress))
  );
  return progress;
}

export function isComplete(slug: string): boolean {
  return getProgress().has(slug);
}

export function getCompletedCount(): number {
  return getProgress().size;
}
