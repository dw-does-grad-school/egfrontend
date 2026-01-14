import fs from "node:fs/promises";
import path from "node:path";
import UserTestClient from "@/app/taste-quiz/user-test-client";

export default async function UserTestPage() {
  const manifestPath = path.join(process.cwd(), "quiz_manifest_scored.json");
  const raw = await fs.readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(raw);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">EchoGallery Taste Test (Prototype)</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Rate images quickly. We’ll compute per-style scores and show why each score was produced.
        </p>
      </div>

      <UserTestClient manifest={manifest} />
    </div>
  );
}
