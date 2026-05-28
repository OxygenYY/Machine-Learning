import { loadAllLessons } from "@/lib/content";
import { LessonLayoutClient } from "./layout-client";
import type { SearchItem } from "@/lib/search-index";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allLessons = loadAllLessons();

  const partLessons = Array.from(
    new Map(
      allLessons.map((l) => [
        l.meta.part,
        { part: l.meta.part, lessons: [] as { slug: string; title: string; order: number }[] },
      ])
    ).values()
  );

  for (const lesson of allLessons) {
    const group = partLessons.find((p) => p.part === lesson.meta.part);
    if (group) {
      group.lessons.push({
        slug: lesson.meta.slug,
        title: lesson.meta.title,
        order: lesson.meta.order,
      });
    }
  }

  const searchItems: SearchItem[] = allLessons.map((l) => ({
    slug: l.meta.slug,
    title: l.meta.title,
    description: l.meta.description,
    part: l.meta.part,
    keywords: l.meta.keywords,
  }));

  return (
    <LessonLayoutClient partLessons={partLessons} searchItems={searchItems}>
      {children}
    </LessonLayoutClient>
  );
}
