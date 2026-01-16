import fs from "node:fs/promises";
import path from "node:path";
import UserTestClient from "@/app/taste-quiz/user-test-client";

export default async function UserTestPage() {
  const manifestPath = path.join(process.cwd(), "quiz_manifest_scored.json");
  const raw = await fs.readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(raw);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">PROTOTYPE</p>
          <h1 className="text-4xl font-light tracking-tight text-black">
            Taste Test
          </h1>
          <p className="mt-3 text-sm font-light text-zinc-600">
            Rate images quickly. We'll compute per-style scores and show why each score was produced.
          </p>
        </div>

        <UserTestClient manifest={manifest} />
      </div>
    </div>
  );
}
