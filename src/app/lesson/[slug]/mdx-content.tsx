"use client";

import { useEffect, useState } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { run } from "@mdx-js/mdx";
import { useMDXComponents } from "@/mdx-components";

interface Props {
  code: string;
}

export function MDXContent({ code }: Props) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await run(code, jsxRuntime);
        if (!cancelled) {
          setComponent(() => result.default);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          console.error("MDX run error:", e);
          setError(e instanceof Error ? e.message : "Failed to render MDX");
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
        <strong>渲染错误:</strong> {error}
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-[var(--muted)] rounded w-3/4" />
        <div className="h-4 bg-[var(--muted)] rounded w-1/2" />
        <div className="h-4 bg-[var(--muted)] rounded w-5/6" />
        <div className="h-32 bg-[var(--muted)] rounded" />
      </div>
    );
  }

  const MDXComponent = Component as React.ComponentType<{
    components?: Record<string, React.ComponentType<any>>;
  }>;
  return <MDXComponent components={components as Record<string, React.ComponentType<any>>} />;
}
