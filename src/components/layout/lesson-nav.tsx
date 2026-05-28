"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LessonMeta } from "@/lib/constants";

interface LessonNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav className="flex items-center justify-between gap-4 py-6">
      <div className="flex-1">
        {prev ? (
          <a href={`/lesson/${prev.slug}`}>
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-[var(--muted-foreground)]">上一课</div>
                <div className="text-sm font-medium max-w-[200px] truncate">
                  {prev.title}
                </div>
              </div>
            </Button>
          </a>
        ) : (
          <div />
        )}
      </div>
      <div className="flex-1 flex justify-end">
        {next ? (
          <a href={`/lesson/${next.slug}`}>
            <Button variant="outline" className="gap-2">
              <div className="text-right">
                <div className="text-xs text-[var(--muted-foreground)]">下一课</div>
                <div className="text-sm font-medium max-w-[200px] truncate">
                  {next.title}
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </a>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
