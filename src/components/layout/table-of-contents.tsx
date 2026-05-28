"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20">
      <h4 className="text-sm font-semibold mb-3 px-1">本节目录</h4>
      <ul className="space-y-0.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1.5 px-2 rounded-md transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]",
                heading.level === 3 && "pl-5",
                heading.level === 4 && "pl-8",
                activeId === heading.id &&
                  "text-[var(--primary)] bg-[var(--primary)]/10 font-medium"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
