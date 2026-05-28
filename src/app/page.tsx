import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Cpu,
  Target,
  Network,
  Zap,
  Rocket,
  ArrowRight,
  ChevronRight,
  Clock,
  BarChart3,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSE_PARTS, type PartMeta } from "@/lib/constants";
import { loadAllLessons } from "@/lib/content";

const PART_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Brain,
  Cpu,
  Target,
  Network,
  Zap,
  Rocket,
};

const STATS = [
  { icon: BookOpen, label: "课程章节", value: "6" },
  { icon: Code2, label: "精选课程", value: "54" },
  { icon: Clock, label: "预计学时", value: "40h+" },
  { icon: BarChart3, label: "实战练习", value: "100+" },
];

export default function HomePage() {
  const allLessons = loadAllLessons();
  const firstLesson = allLessons[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-6 w-6 text-[var(--primary)]" />
            ML Academy
          </Link>
          <div className="flex items-center gap-3">
            {firstLesson && (
              <Link href={`/lesson/${firstLesson.meta.slug}`}>
                <Button size="sm">
                  开始学习 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-6">
            PyTorch 2.x &middot; 从零基础到进阶
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            从零开始学习
            <br />
            <span className="text-[var(--primary)]">Machine Learning</span>
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10">
            完整、系统的机器学习课程。从 Python 基础和数学原理开始，逐步深入到
            Transformers、LLM 架构与工业级部署。
            54 节精心设计的课程，带你掌握 PyTorch 和现代 ML 技术栈。
          </p>
          <div className="flex items-center justify-center gap-4">
            {firstLesson && (
              <Link href={`/lesson/${firstLesson.meta.slug}`}>
                <Button size="lg" className="gap-2 text-base">
                  开始免费学习 <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link href="#curriculum">
              <Button variant="outline" size="lg">
                查看课程大纲
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--border)] bg-[var(--muted)]/50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-[var(--primary)]" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target audience */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">适合谁学？</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "零基础初学者",
              desc: "不需要任何 ML 背景。课程从 Python 基础和数学原理开始，循序渐进地构建知识体系。",
            },
            {
              title: "转行开发者",
              desc: "有编程经验但想进入 AI 领域？课程聚焦实战，帮助你快速建立 ML 工程师的核心竞争力。",
            },
            {
              title: "在校学生",
              desc: "作为大学课程的补充或自学路径，提供比教科书更直观的理论讲解和更丰富的代码实例。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--border)] p-6"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="bg-[var(--muted)]/50 border-y border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">课程大纲</h2>
          <p className="text-center text-[var(--muted-foreground)] mb-12">
            6 个阶段，54 节课，从数学基础到工业级部署
          </p>

          <div className="space-y-4">
            {COURSE_PARTS.map((part) => {
              const Icon = PART_ICONS[part.icon] || BookOpen;
              const partLessons = allLessons.filter(
                (l) => l.meta.part === part.id
              );

              return (
                <div
                  key={part.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-[var(--primary)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            Part {part.number}
                          </Badge>
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {part.lessons} 节课
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">
                          {part.title}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)] mt-1">
                          {part.description}
                        </p>

                        {partLessons.length > 0 && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {partLessons.slice(0, 6).map((l) => (
                              <Link
                                key={l.meta.slug}
                                href={`/lesson/${l.meta.slug}`}
                                className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-1"
                              >
                                <ChevronRight className="h-3 w-3 shrink-0" />
                                <span className="truncate">{l.meta.title}</span>
                              </Link>
                            ))}
                            {partLessons.length > 6 && (
                              <span className="text-sm text-[var(--muted-foreground)] py-1">
                                + {partLessons.length - 6} 更多课程...
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">准备好开始你的 ML 之旅了吗？</h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-8">
          54 节课，完全免费。从零开始，成为机器学习工程师。
        </p>
        {firstLesson && (
          <Link href={`/lesson/${firstLesson.meta.slug}`}>
            <Button size="lg" className="gap-2 text-base">
              开始第一课 <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted-foreground)]">
        ML Academy &mdash; 从零开始学习 Machine Learning with PyTorch
      </footer>
    </div>
  );
}
