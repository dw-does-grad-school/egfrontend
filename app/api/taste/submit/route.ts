// app/api/taste/submit/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { QuizAnswer } from "@/app/types/artwork";
import { callTasteVectorService } from "../../../lib/model";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { answers } = (await req.json()) as { answers: QuizAnswer[] };

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  // Stage 1: we won’t persist anything yet – just compute the baseline vector.
  // Stage 3: save raw answers and vectors to DB.

  try {
    const baselineVector = await callTasteVectorService({
      userId,
      answers,
    });

    return NextResponse.json({ baselineVector });
  } catch (err) {
    console.error(err);
    return new NextResponse("Failed to compute taste vector", {
      status: 500,
    });
  }
}
