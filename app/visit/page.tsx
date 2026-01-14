import Link from "next/link";
import { CITIES } from "../lib/visit/museums";

export default function VisitIndexPage() {
  return (
    <>
      {/* Page Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
            VISIT
          </p>
          <h1 className="text-5xl font-light tracking-tight text-black">
            Museum Research
          </h1>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-zinc-600">
            Explore curated museum pages designed for research visits. Each entry is a scaffold ready for enrichment with hours, datasets, and accessibility details.
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
              SELECT A CITY
            </p>
            <h2 className="text-3xl font-light tracking-tight text-black">
              Choose Your Destination
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/visit/${city.slug}`}
                className="group border border-zinc-200 bg-white p-6 transition-colors hover:border-black"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-light tracking-tight text-black">
                      {city.name}
                    </h3>
                    <p className="mt-2 text-sm font-light text-zinc-600">
                      {city.museums.length} museum{city.museums.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="text-xl font-light text-zinc-400 transition-colors group-hover:text-black">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
