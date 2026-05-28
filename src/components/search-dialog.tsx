"use client";

import { useState, useEffect } from "react";
import { Search, FileText, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { COURSE_PARTS } from "@/lib/constants";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof useSearch>["search"] extends (q: string) => infer R ? R : never>([]);
  const { search } = useSearch();

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(search(query));
    }, 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const getPartTitle = (partId: string) =>
    COURSE_PARTS.find((p) => p.id === partId)?.title || partId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogTitle className="sr-only">搜索课程</DialogTitle>
        <div className="flex items-center border-b border-[var(--border)] px-4">
          <Search className="h-4 w-4 text-[var(--muted-foreground)] shrink-0" />
          <Input
            className="border-0 focus-visible:ring-0 shadow-none"
            placeholder="搜索课程、关键词..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="text-sm text-[var(--muted-foreground)] text-center py-8">
              没有找到相关课程
            </p>
          )}
          {results.map(({ item, score }) => (
            <a
              key={item.slug}
              href={`/lesson/${item.slug}`}
              onClick={() => onOpenChange(false)}
              className="flex items-start gap-3 rounded-lg p-3 hover:bg-[var(--accent)] transition-colors"
            >
              <FileText className="h-4 w-4 text-[var(--muted-foreground)] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  {getPartTitle(item.part)} &middot;{" "}
                  {item.description.slice(0, 60)}
                  {item.description.length > 60 ? "..." : ""}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] shrink-0" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
