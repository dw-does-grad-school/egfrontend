"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Museum } from "../../lib/visit/museums";

export default function MuseumList({
  citySlug,
  museums,
}: {
  citySlug: string;
  museums: Museum[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return museums;
    return museums.filter((m) => m.name.toLowerCase().includes(q));
  }, [query, museums]);

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div>
        <label htmlFor="museum-search" className="mb-2 block text-xs font-light tracking-widest text-zinc-500">
          SEARCH MUSEUMS
        </label>
        <input
          id="museum-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a museum name…"
          className="w-full border border-zinc-200 bg-white px-4 py-3 text-sm font-light text-black outline-none transition-colors focus:border-black"
        />
      </div>

      {/* Museums Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((m) => (
          <Link
            key={m.slug}
            href={`/visit/${citySlug}/${m.slug}`}
            className="group border border-zinc-200 bg-white p-6 transition-colors hover:border-black"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-light tracking-tight text-black">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm font-light text-zinc-600">
                  Museum page
                </p>
              </div>
              <span className="text-xl font-light text-zinc-400 transition-colors group-hover:text-black">
                →
              </span>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full border border-zinc-200 bg-zinc-50 p-6 text-center font-light text-zinc-600">
            No museums match "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
