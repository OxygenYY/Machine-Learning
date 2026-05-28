import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <GraduationCap className="h-16 w-16 mx-auto mb-6 text-[var(--muted-foreground)]" />
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-lg text-[var(--muted-foreground)] mb-8">
          页面未找到 — 该课程可能尚未编写或链接已失效
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Button>
          </Link>
          <Link href="/lesson/python-basics">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              从第一课开始
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
