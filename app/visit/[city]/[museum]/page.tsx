// app/visit/[city]/[museum]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCityBySlug, getMuseumBySlug, CITIES } from "../../../lib/visit/museums";

export default async function MuseumPage({ params }: { params: Promise<{ city: string; museum: string }> }) {
  const { city: citySlug, museum: museumSlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return notFound();

  const museum = getMuseumBySlug(citySlug, museumSlug);
  if (!museum) return notFound();

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
            <Link href={`/visit/${city.slug}`} className="underline underline-offset-2 hover:text-black transition-colors">
              {city.name}
            </Link>
            <span className="mx-2 text-zinc-400">/</span>
            <span className="text-black">{museum.name}</span>
          </div>
          <h1 className="text-5xl font-light tracking-tight text-black">
            {museum.name}
          </h1>
          <p className="mt-4 font-light text-zinc-600">
            {city.name}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
              ABOUT THIS PAGE
            </p>
            <h2 className="text-2xl font-light tracking-tight text-black">
              Museum Page Scaffold
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Planned Content */}
            <div className="border border-zinc-200 bg-white p-8">
              <h3 className="mb-4 text-lg font-light tracking-tight text-black">
                Planned Content
              </h3>
              <ul className="space-y-3 font-light text-zinc-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-black" />
                  <span>Visitor essentials (hours, admission guidance, accessibility notes)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-black" />
                  <span>Collection focus tags (e.g., modern, contemporary, encyclopedic)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-black" />
                  <span>Open-access / dataset notes for research ingestion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-black" />
                  <span>"Nearby" gallery expansion (future)</span>
                </li>
              </ul>
            </div>

            {/* Research Posture */}
            <div className="border border-zinc-200 bg-white p-8">
              <h3 className="mb-4 text-lg font-light tracking-tight text-black">
                Research Posture
              </h3>
              <p className="font-light leading-relaxed text-zinc-700">
                This page intentionally avoids logos, copied curatorial text, and unlicensed images. It is designed
                to be enriched later using open-access content, official APIs, or licensed datasets.
              </p>
            </div>
          </div>

          {/* Disclosure */}
          <div className="mt-8 border border-zinc-200 bg-zinc-50 p-6 font-light text-zinc-700">
            <span className="font-normal">Disclosure:</span> Not affiliated with, endorsed by, or sponsored by {museum.name}.
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/visit/${city.slug}`}
              className="border border-zinc-300 px-8 py-3 text-center text-sm font-light tracking-widest text-zinc-700 transition-colors hover:border-black hover:text-black"
            >
              BACK TO {city.name.toUpperCase()}
            </Link>
            <button
              type="button"
              className="border border-black bg-black px-8 py-3 text-sm font-light tracking-widest text-white transition-colors hover:bg-zinc-900"
              disabled
              aria-disabled="true"
              title="Coming soon"
            >
              GENERATE VISIT PLAN (COMING SOON)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  // Pre-render all museum pages from the data list
  return CITIES.flatMap((city) =>
    city.museums.map((museum) => ({
      city: city.slug,
      museum: museum.slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; museum: string }> }) {
  const { city: citySlug, museum: museumSlug } = await params;
  const city = getCityBySlug(citySlug);
  const museum = getMuseumBySlug(citySlug, museumSlug);

  if (!city || !museum) return { title: "Visit" };

  return {
    title: `${museum.name} | Visit | EchoGallery`,
    description: `Museum page scaffold for ${museum.name} in ${city.name}.`,
  };
}
