import { getLessonBySlug, getAdjacentLessons, loadAllLessons } from "@/lib/content";
import { notFound, redirect } from "next/navigation";
import { LessonNav } from "@/components/layout/lesson-nav";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { CompleteButton } from "@/components/layout/complete-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DIFFICULTY_CONFIG } from "@/lib/constants";
import { Clock, ListChecks } from "lucide-react";
import type { Metadata } from "next";
import { compileMdxToJsx } from "@/lib/mdx-compiler";
import { useMDXComponents } from "@/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lessons = loadAllLessons();
  return lessons.map((l) => ({ slug: l.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Not Found" };
  return {
    title: lesson.meta.title,
    description: lesson.meta.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    const all = loadAllLessons();
    if (all.length > 0) {
      redirect(`/lesson/${all[0].meta.slug}`);
    }
    notFound();
  }

  const { prev, next } = getAdjacentLessons(slug);
  const diffConfig = DIFFICULTY_CONFIG[lesson.meta.difficulty];
  const components = useMDXComponents({});
  const mdxElement = await compileMdxToJsx(lesson.rawContent, components);

  return (
    <div className="animate-fade-in">
      {/* Lesson header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className={diffConfig.color}>
            {diffConfig.label}
          </Badge>
          <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {lesson.meta.estimatedMinutes} 分钟
          </span>
          <div className="ml-auto">
            <CompleteButton slug={slug} />
          </div>
          {lesson.meta.colabUrl && (
            <a
              href={lesson.meta.colabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              Open in Colab &rarr;
            </a>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {lesson.meta.title}
        </h1>

        {lesson.meta.description && (
          <p className="text-lg text-[var(--muted-foreground)]">
            {lesson.meta.description}
          </p>
        )}

        {lesson.meta.objectives.length > 0 && (
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="h-4 w-4 text-[var(--primary)]" />
              <h3 className="font-semibold text-sm">学习目标</h3>
            </div>
            <ul className="space-y-1.5">
              {lesson.meta.objectives.map((obj, i) => (
                <li
                  key={i}
                  className="text-sm text-[var(--muted-foreground)] flex items-start gap-2"
                >
                  <span className="text-[var(--primary)] mt-0.5 text-xs">&bull;</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lesson content */}
      <div className="flex gap-8">
        <div className="flex-1 min-w-0 max-w-3xl">
          <article className="prose dark:prose-invert max-w-none">
            {mdxElement}
          </article>

          <Separator className="my-8" />

          <LessonNav
            prev={prev ? { slug: prev.meta.slug, title: prev.meta.title } : null}
            next={next ? { slug: next.meta.slug, title: next.meta.title } : null}
          />
        </div>

        {lesson.headings.length > 0 && (
          <aside className="hidden xl:block w-56 shrink-0">
            <TableOfContents headings={lesson.headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
