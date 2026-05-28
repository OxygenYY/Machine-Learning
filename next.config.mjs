/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@mdx-js/mdx", "remark-gfm", "remark-math", "rehype-katex", "rehype-slug", "rehype-pretty-code", "shiki"],
};

export default nextConfig;
