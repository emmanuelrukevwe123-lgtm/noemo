"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTradeRecord,
  getTradeById,
  saveAiTradeReview,
  updateTradeRecord
} from "@/lib/db/trades";
import { generateTradeReview } from "@/lib/ai/trade-review";
import { requireUser } from "@/lib/supabase/auth";
import { formDataToTradeInput } from "@/lib/validation/trade";

export type TradeActionState = {
  ok: boolean;
  error?: string;
  tradeId?: string;
};

export async function createTradeAction(formData: FormData): Promise<TradeActionState> {
  try {
    const { user, demoMode } = await requireUser();
    if (demoMode) {
      return { ok: false, error: "Demo mode is read-only. Configure Supabase to save trades." };
    }

    const input = formDataToTradeInput(formData);
    const screenshot = fileFromFormData(formData, "screenshot");
    const tradeId = await createTradeRecord(user.id, input, screenshot);

    revalidatePath("/app");
    revalidatePath("/app/trades");
    return { ok: true, tradeId };
  } catch (error) {
    return { ok: false, error: messageForError(error) };
  }
}

export async function updateTradeAction(
  tradeId: string,
  formData: FormData
): Promise<TradeActionState> {
  try {
    const { user, demoMode } = await requireUser();
    if (demoMode) {
      return { ok: false, error: "Demo mode is read-only. Configure Supabase to edit trades." };
    }

    const input = formDataToTradeInput(formData);
    const screenshot = fileFromFormData(formData, "screenshot");
    await updateTradeRecord(user.id, tradeId, input, screenshot);

    revalidatePath("/app");
    revalidatePath("/app/trades");
    revalidatePath(`/app/trades/${tradeId}`);
    return { ok: true, tradeId };
  } catch (error) {
    return { ok: false, error: messageForError(error) };
  }
}

export async function generateAiReviewAction(tradeId: string): Promise<TradeActionState> {
  try {
    const { user, demoMode } = await requireUser();
    if (demoMode) {
      return {
        ok: false,
        error: "Demo mode is read-only. Configure Supabase and OpenAI to save AI reviews."
      };
    }

    const trade = await getTradeById(user.id, tradeId);
    if (!trade) return { ok: false, error: "Trade not found." };

    const review = await generateTradeReview(trade);
    await saveAiTradeReview(user.id, tradeId, {
      summary: review.output.summary,
      structured_output: review.output,
      model: review.model,
      prompt_version: review.promptVersion,
      disclaimer: review.output.disclaimer
    });

    revalidatePath(`/app/trades/${tradeId}`);
    return { ok: true, tradeId };
  } catch (error) {
    return { ok: false, error: messageForError(error) };
  }
}

function fileFromFormData(formData: FormData, key: string) {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) return value;
  return null;
}

function messageForError(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Validation failed.";
  }

  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}
