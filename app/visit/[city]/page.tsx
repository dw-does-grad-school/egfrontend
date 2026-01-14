// app/visit/[city]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { CITIES, getCityBySlug, getCitySlugs } from "../../lib/visit/museums";
import MuseumList from "./museum-list";

export const dynamicParams = true;

export default async function CityVisitPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return notFound();

  return (
    <>
      {/* Breadcrumb & Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 text-sm font-light text-zinc-600">
            <Link href="/visit" className="underline underline-offset-2 hover:text-black transition-colors">
              Visit
            </Link>
            <span className="mx-2 text-zinc-400">/</span>
            <span className="text-black">{city.name}</span>
          </div>
          <h1 className="text-5xl font-light tracking-tight text-black">
            {city.name}
          </h1>
          <p className="mt-4 font-light text-zinc-600">
            {city.museums.length} museum{city.museums.length === 1 ? "" : "s"} in this collection
          </p>
        </div>
      </div>

      {/* Museums Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <MuseumList citySlug={city.slug} museums={city.museums} />
        </div>
      </section>
    </>
  );
}

// Optional: pre-render known city routes
export function generateStaticParams() {
  // Keep it simple: hard-coded pages come from the data layer at build-time
  // If you later move this to a DB, remove this.
  return CITIES.flatMap((city) => getCitySlugs(city).map((slug) => ({ city: slug })));
}
