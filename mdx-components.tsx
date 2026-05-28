import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id, ...props }) => (
      <h1
        id={id}
        className="text-3xl font-bold tracking-tight mb-6 mt-8 scroll-m-20"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight mb-4 mt-8 pb-1 border-b border-[var(--border)] scroll-m-20"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3
        id={id}
        className="text-xl font-semibold mb-3 mt-6 scroll-m-20"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }) => (
      <h4
        id={id}
        className="text-lg font-medium mb-2 mt-4 scroll-m-20"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-7 mb-4 [&:not(:first-child)]:mt-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-[var(--primary)] underline underline-offset-4 hover:opacity-80"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-4 border-l-4 border-[var(--primary)] pl-4 italic text-[var(--muted-foreground)]"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-[var(--border)] px-4 py-2 text-left font-semibold bg-[var(--muted)]"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-[var(--border)] px-4 py-2"
        {...props}
      >
        {children}
      </td>
    ),
    hr: (props) => (
      <hr className="my-8 border-[var(--border)]" {...props} />
    ),
    ...components,
  };
}
