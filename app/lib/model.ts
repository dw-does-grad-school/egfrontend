// lib/model.ts
import type { QuizAnswer } from "@/app/types/artwork";

const TASTE_SERVICE_URL = process.env.TASTE_SERVICE_URL!; // e.g. Modal/HF endpoint

export async function callTasteVectorService(params: {
  userId: string;
  answers: QuizAnswer[];
}) {
  const res = await fetch(TASTE_SERVICE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Taste service error");
  }

  const data: { baselineVector: number[] } = await res.json();
  return data.baselineVector;
}
