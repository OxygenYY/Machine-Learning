"use client";

import { Menu, Search, Sun, Moon, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useProgress } from "@/hooks/use-progress";
import { useState } from "react";
import { SearchDialog } from "@/components/search-dialog";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggle } = useTheme();
  const { completedCount, totalCount } = useProgress();
  const [searchOpen, setSearchOpen] = useState(false);
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
        <div className="flex h-14 items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <a href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <GraduationCap className="h-6 w-6 text-[var(--primary)]" />
            <span className="hidden sm:inline">ML Academy</span>
          </a>

          <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {progressPct}% 完成 ({completedCount}/{totalCount})
          </div>

          <div className="flex-1" />

          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[var(--muted-foreground)]"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline text-xs">搜索课程...</span>
            <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-[var(--border)] bg-[var(--muted)] px-1.5 text-[10px] font-mono">
              Ctrl+K
            </kbd>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
