import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

function escapeJsxLiteral( content: string): string {
  // Split content by code blocks (```) and inline code (`)
  // Only escape < outside code blocks
  const result: string[] = [];
  let i = 0;
  while (i < content.length) {
    // Check for code block start
    if (content.startsWith("```", i)) {
      const end = content.indexOf("\n```", i + 3);
      if (end !== -1) {
        result.push(content.slice(i, end + 4));
        i = end + 4;
        continue;
      }
    }
    // Check for inline code
    if (content[i] === "`" && content[i + 1] !== "`") {
      const end = content.indexOf("`", i + 1);
      if (end !== -1) {
        result.push(content.slice(i, end + 1));
        i = end + 1;
        continue;
      }
    }
    // Check for math block
    if (content.startsWith("$$", i)) {
      const end = content.indexOf("$$", i + 2);
      if (end !== -1) {
        result.push(content.slice(i, end + 2));
        i = end + 2;
        continue;
      }
    }
    // Check for inline math
    if (content[i] === "$" && content[i + 1] !== "$") {
      const end = content.indexOf("$", i + 1);
      if (end !== -1) {
        result.push(content.slice(i, end + 1));
        i = end + 1;
        continue;
      }
    }
    // Regular text: escape < followed by non-space (JSX tag)
    if (content[i] === "<" && i + 1 < content.length && /[a-zA-Z0-9\-]/.test(content[i + 1])) {
      result.push("{'<'}");
      i++;
      continue;
    }
    // Regular text: escape { (JSX expression)
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

export async function compileMdx(rawContent: string): Promise<string> {
  const escaped = escapeJsxLiteral(rawContent);
  const result = await compile(escaped, {
    outputFormat: "function-body",
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
    ],
  });

  return String(result.value);
}
