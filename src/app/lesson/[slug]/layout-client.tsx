"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SearchProvider } from "@/hooks/use-search";
import type { SearchItem } from "@/lib/search-index";

interface PartLesson {
  part: string;
  lessons: { slug: string; title: string; order: number }[];
}

export function LessonLayoutClient({
  children,
  partLessons,
  searchItems,
}: {
  children: React.ReactNode;
  partLessons: PartLesson[];
  searchItems: SearchItem[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <SearchProvider items={searchItems}>
      <div className="flex h-screen flex-col">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block w-64 shrink-0 border-r border-[var(--border)]">
            <Sidebar lessons={partLessons} />
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-6 py-8">{children}</div>
          </main>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="w-72 p-0">
              <Sidebar
                lessons={partLessons}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
        <ScrollToTop />
      </div>
    </SearchProvider>
  );
}
