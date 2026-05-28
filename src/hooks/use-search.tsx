"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { buildSearchIndex, searchLessons, type SearchItem } from "@/lib/search-index";

interface SearchContextValue {
  search: (query: string) => { item: SearchItem; score?: number }[];
}

const SearchContext = createContext<SearchContextValue>({
  search: () => [],
});

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({
  children,
  items,
}: {
  children: ReactNode;
  items: SearchItem[];
}) {
  useEffect(() => {
    buildSearchIndex(items);
  }, [items]);

  return (
    <SearchContext.Provider value={{ search: searchLessons }}>
      {children}
    </SearchContext.Provider>
  );
}
