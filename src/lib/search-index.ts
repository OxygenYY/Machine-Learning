import Fuse from "fuse.js";

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  part: string;
  keywords: string[];
}

let searchIndex: Fuse<SearchItem> | null = null;

export function buildSearchIndex(items: SearchItem[]): Fuse<SearchItem> {
  searchIndex = new Fuse(items, {
    keys: [
      { name: "title", weight: 3 },
      { name: "keywords", weight: 2 },
      { name: "description", weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
  return searchIndex;
}

export function searchLessons(query: string): { item: SearchItem; score?: number }[] {
  if (!query.trim() || !searchIndex) return [];
  return searchIndex.search(query.trim()).slice(0, 10);
}
