"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { generateAiReviewAction } from "@/lib/actions/trades";
import { Button } from "@/components/ui/button";

export function AiReviewButton({
  tradeId,
  disabled
}: {
  tradeId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <Button
        type="button"
        variant="moss"
        disabled={disabled || isPending}
        onClick={() => {
          setError("");
          startTransition(async () => {
            const result = await generateAiReviewAction(tradeId);
            if (!result.ok) {
              setError(result.error ?? "Unable to generate review.");
              return;
            }
            router.refresh();
          });
        }}
      >
        <Sparkles size={16} />
        {isPending ? "Reviewing..." : "Generate AI review"}
      </Button>
      {error ? <p className="mt-2 text-sm font-medium text-ember">{error}</p> : null}
    </div>
  );
}
