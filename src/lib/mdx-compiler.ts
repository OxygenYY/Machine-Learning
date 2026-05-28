import { compile, run } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";
import React from "react";

function escapeJsxLiteral(content: string): string {
  const result: string[] = [];
  let i = 0;
  while (i < content.length) {
    if (content.startsWith("```", i)) {
      const end = content.indexOf("\n```", i + 3);
      if (end !== -1) {
        result.push(content.slice(i, end + 4));
        i = end + 4;
        continue;
      }
    }
    if (content[i] === "`" && content[i + 1] !== "`") {
      const end = content.indexOf("`", i + 1);
      if (end !== -1) {
        result.push(content.slice(i, end + 1));
        i = end + 1;
        continue;
      }
    }
    if (content.startsWith("$$", i)) {
      const end = content.indexOf("$$", i + 2);
      if (end !== -1) {
        result.push(content.slice(i, end + 2));
        i = end + 2;
        continue;
      }
    }
    if (content[i] === "$" && content[i + 1] !== "$") {
      const end = content.indexOf("$", i + 1);
      if (end !== -1) {
        result.push(content.slice(i, end + 1));
        i = end + 1;
        continue;
      }
    }
    if (content[i] === "<" && i + 1 < content.length && /[a-zA-Z0-9\-]/.test(content[i + 1])) {
      result.push("{'<'}");
      i++;
      continue;
    }
    if (content[i] === "{") {
      result.push("{'{'}");
      i++;
      continue;
    }
    result.push(content[i]);
    i++;
  }
  return result.join("");
}

const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
] as any;

export async function compileMdxToJsx(
  rawContent: string,
  components?: MDXComponents
): Promise<React.ReactElement> {
  const escaped = escapeJsxLiteral(rawContent);

  const compiled = await compile(escaped, {
    outputFormat: "function-body",
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins,
  });

  const { default: MDXContent } = await run(String(compiled.value), {
    ...jsxRuntime,
  });

  return React.createElement(MDXContent, { components });
}
