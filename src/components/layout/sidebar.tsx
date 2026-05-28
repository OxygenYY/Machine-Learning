"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/hooks/use-progress";
import { usePathname } from "next/navigation";
import { COURSE_PARTS, type LessonMeta } from "@/lib/constants";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Brain,
  Cpu,
  Target,
  Network,
  Zap,
  Rocket,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

const PART_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  Cpu,
  Target,
  Network,
  Zap,
  Rocket,
};

interface SidebarLesson {
  slug: string;
  title: string;
  order: number;
}

interface SidebarProps {
  lessons: { part: string; lessons: SidebarLesson[] }[];
  onNavigate?: () => void;
}

export function Sidebar({ lessons: partLessons, onNavigate }: SidebarProps) {
  const { isComplete, completedCount } = useProgress();
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop() || "";

  // Find which part contains the current lesson
  const currentPart = partLessons.find((p) =>
    p.lessons.some((l) => l.slug === currentSlug)
  );

  const [openItems, setOpenItems] = useState<string[]>([]);
  useEffect(() => {
    if (currentPart) {
      setOpenItems((prev) =>
        prev.includes(currentPart.part)
          ? prev
          : [...prev, currentPart.part]
      );
    }
  }, [currentPart]);

  return (
    <aside className="flex h-full flex-col bg-[var(--sidebar)]">
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="font-semibold text-sm">课程目录</h2>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          54 节课 &middot; {completedCount} 已完成
        </p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="px-2 py-1"
        >
          {COURSE_PARTS.map((part) => {
            const Icon = PART_ICONS[part.icon] || BookOpen;
            const partData = partLessons.find((p) => p.part === part.id);
            const lessons = partData?.lessons || [];
            const partCompleted = lessons.filter((l) => isComplete(l.slug)).length;

            return (
              <AccordionItem
                key={part.id}
                value={part.id}
                className="border-0"
              >
                <AccordionTrigger className="hover:bg-[var(--sidebar-accent)] rounded-lg px-2 py-2 hover:no-underline">
                  <div className="flex items-center gap-2 text-left">
                    <Icon className="h-4 w-4 text-[var(--primary)] shrink-0" />
                    <div>
                      <div className="text-sm font-medium leading-tight">
                        Part {part.number}: {part.title}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {partCompleted}/{part.lessons} 完成
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-0.5 pl-1">
                    {lessons.map((lesson, idx) => {
                      const active = lesson.slug === currentSlug;
                      const done = isComplete(lesson.slug);
                      return (
                        <li key={lesson.slug}>
                          <a
                            href={`/lesson/${lesson.slug}`}
                            onClick={onNavigate}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                              active
                                ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                                : "hover:bg-[var(--sidebar-accent)] text-[var(--sidebar-foreground)]"
                            )}
                          >
                            <span className="w-5 text-center text-xs text-[var(--muted-foreground)] shrink-0">
                              {done ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 inline" />
                              ) : (
                                `${part.number}.${idx + 1}`
                              )}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
