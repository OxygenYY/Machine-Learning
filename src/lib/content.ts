import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LessonMeta } from "./constants";
import { COURSE_PARTS } from "./constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface LessonContent {
  meta: LessonMeta;
  rawContent: string;
  headings: { level: number; text: string; id: string }[];
}

let cachedLessons: LessonContent[] | null = null;

function extractHeadings(rawContent: string): {
  level: number;
  text: string;
  id: string;
}[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(rawContent)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w一-鿿\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}

export function loadAllLessons(): LessonContent[] {
  if (cachedLessons) return cachedLessons;

  const lessons: LessonContent[] = [];

  for (const part of COURSE_PARTS) {
    const partDir = path.join(CONTENT_DIR, part.id);
    if (!fs.existsSync(partDir)) continue;

    const files = fs
      .readdirSync(partDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort();

    for (const file of files) {
      const filePath = path.join(partDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const slug = file.replace(/^\d+-/, "").replace(/\.mdx$/, "");

      const meta: LessonMeta = {
        title: data.title || slug,
        slug,
        description: data.description || "",
        part: part.id,
        order: data.order || 0,
        difficulty: data.difficulty || "beginner",
        estimatedMinutes: data.estimatedMinutes || 20,
        objectives: data.objectives || [],
        prerequisites: data.prerequisites || [],
        keywords: data.keywords || [],
        colabUrl: data.colabUrl || undefined,
      };

      lessons.push({
        meta,
        rawContent: content,
        headings: extractHeadings(content),
      });
    }
  }

  // Sort within parts by order
  lessons.sort((a, b) => {
    const partDiff =
      COURSE_PARTS.findIndex((p) => p.id === a.meta.part) -
      COURSE_PARTS.findIndex((p) => p.id === b.meta.part);
    if (partDiff !== 0) return partDiff;
    return a.meta.order - b.meta.order;
  });

  cachedLessons = lessons;
  return lessons;
}

export function getLessonBySlug(slug: string): LessonContent | undefined {
  return loadAllLessons().find((l) => l.meta.slug === slug);
}

export function getLessonsByPart(partId: string): LessonContent[] {
  return loadAllLessons().filter((l) => l.meta.part === partId);
}

export function getAdjacentLessons(
  slug: string
): { prev: LessonContent | null; next: LessonContent | null } {
  const lessons = loadAllLessons();
  const idx = lessons.findIndex((l) => l.meta.slug === slug);
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}

export function getPartBySlug(slug: string) {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return null;
  return COURSE_PARTS.find((p) => p.id === lesson.meta.part) || null;
}

export function getAllLessonsMeta(): (LessonMeta & {
  headings: { level: number; text: string; id: string }[];
})[] {
  return loadAllLessons().map((l) => ({
    ...l.meta,
    headings: l.headings,
  }));
}
