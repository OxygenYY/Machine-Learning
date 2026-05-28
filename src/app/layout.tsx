import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ML Academy - 从零开始学习 Machine Learning",
    template: "%s | ML Academy",
  },
  description:
    "从零基础开始，系统性学习 Machine Learning 与 PyTorch 的完整课程。54 节详尽课程，从数学基础到 Transformers 与 LLM。",
  keywords: [
    "machine learning",
    "pytorch",
    "deep learning",
    "教程",
    "课程",
    "机器学习",
    "深度学习",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
