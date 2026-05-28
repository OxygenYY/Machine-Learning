"use client";

import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, Circle } from "lucide-react";

export function CompleteButton({ slug }: { slug: string }) {
  const { isComplete, markComplete, markIncomplete } = useProgress();
  const completed = isComplete(slug);

  return (
    <Button
      variant={completed ? "default" : "outline"}
      size="sm"
      className="gap-2"
      onClick={() => {
        if (completed) {
          markIncomplete(slug);
        } else {
          markComplete(slug);
        }
      }}
    >
      {completed ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          已完成
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          标记完成
        </>
      )}
    </Button>
  );
}
