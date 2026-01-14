// lib/visit/museums.ts

export type Museum = {
  slug: string;
  name: string;
  kind: "museum"; // future: "gallery" | "public-art" | ...
};

export type City = {
  slug: string;
  aliases?: string[];
  name: string;
  museums: Museum[];
};

export const CITIES: City[] = [
  {
    slug: "new-york-city",
    aliases: ["new-york"],
    name: "New York City",
    museums: [
      { slug: "the-metropolitan-museum-of-art", name: "The Metropolitan Museum of Art", kind: "museum" },
      { slug: "museum-of-modern-art", name: "Museum of Modern Art (MoMA)", kind: "museum" },
      { slug: "solomon-r-guggenheim-museum", name: "Solomon R. Guggenheim Museum", kind: "museum" },
      { slug: "whitney-museum-of-american-art", name: "Whitney Museum of American Art", kind: "museum" },
      { slug: "the-frick-collection", name: "The Frick Collection", kind: "museum" },
      { slug: "brooklyn-museum", name: "Brooklyn Museum", kind: "museum" },
    ],
  },
  {
    slug: "chicago",
    name: "Chicago",
    museums: [
      { slug: "art-institute-of-chicago", name: "Art Institute of Chicago", kind: "museum" },
      { slug: "museum-of-contemporary-art-chicago", name: "Museum of Contemporary Art Chicago", kind: "museum" },
      { slug: "smart-museum-of-art", name: "Smart Museum of Art", kind: "museum" },
    ],
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    museums: [
      { slug: "philadelphia-museum-of-art", name: "Philadelphia Museum of Art", kind: "museum" },
      { slug: "barnes-foundation", name: "Barnes Foundation", kind: "museum" },
      { slug: "pennsylvania-academy-of-the-fine-arts", name: "Pennsylvania Academy of the Fine Arts", kind: "museum" },
    ],
  },
  {
    slug: "detroit",
    name: "Detroit",
    museums: [
      { slug: "detroit-institute-of-arts", name: "Detroit Institute of Arts", kind: "museum" },
      { slug: "museum-of-contemporary-art-detroit", name: "Museum of Contemporary Art Detroit (MOCAD)", kind: "museum" },
    ],
  },
  {
    slug: "boston",
    name: "Boston",
    museums: [
      { slug: "museum-of-fine-arts-boston", name: "Museum of Fine Arts, Boston", kind: "museum" },
      { slug: "isabella-stewart-gardner-museum", name: "Isabella Stewart Gardner Museum", kind: "museum" },
      { slug: "institute-of-contemporary-art-boston", name: "Institute of Contemporary Art, Boston", kind: "museum" },
      { slug: "harvard-art-museums", name: "Harvard Art Museums", kind: "museum" },
    ],
  },
  {
    slug: "washington-dc",
    name: "Washington, DC",
    museums: [
      { slug: "national-gallery-of-art", name: "National Gallery of Art", kind: "museum" },
      { slug: "hirshhorn-museum-and-sculpture-garden", name: "Hirshhorn Museum and Sculpture Garden", kind: "museum" },
      { slug: "smithsonian-american-art-museum", name: "Smithsonian American Art Museum", kind: "museum" },
      { slug: "renwick-gallery", name: "Renwick Gallery", kind: "museum" },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    museums: [
      { slug: "lacma", name: "Los Angeles County Museum of Art (LACMA)", kind: "museum" },
      { slug: "the-getty-center", name: "The Getty Center", kind: "museum" },
      { slug: "the-broad", name: "The Broad", kind: "museum" },
      { slug: "hammer-museum", name: "Hammer Museum", kind: "museum" },
      { slug: "moca-los-angeles", name: "Museum of Contemporary Art, Los Angeles (MOCA)", kind: "museum" },
    ],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    museums: [
      { slug: "sfmoma", name: "San Francisco Museum of Modern Art (SFMOMA)", kind: "museum" },
      { slug: "de-young-museum", name: "de Young Museum", kind: "museum" },
      { slug: "legion-of-honor", name: "Legion of Honor", kind: "museum" },
      { slug: "asian-art-museum-of-san-francisco", name: "Asian Art Museum of San Francisco", kind: "museum" },
    ],
  },
];

export function getCityBySlug(citySlug: string): City | undefined {
  const normalized = normalizeSlugValue(citySlug);
  const canonical = CITY_SLUG_LOOKUP[normalized];
  if (!canonical) return undefined;
  return CITIES.find((c) => c.slug === canonical);
}

export function getMuseumBySlug(citySlug: string, museumSlug: string): Museum | undefined {
  const city = getCityBySlug(citySlug);
  if (!city) return undefined;
  return city.museums.find((m) => m.slug === museumSlug);
}

export function getCitySlugs(city: City): string[] {
  return [city.slug, ...(city.aliases ?? [])];
}

const CITY_SLUG_LOOKUP: Record<string, string> = buildCitySlugLookup();

function buildCitySlugLookup(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const city of CITIES) {
    map[normalizeSlugValue(city.slug)] = city.slug;
    for (const alias of city.aliases ?? []) {
      map[normalizeSlugValue(alias)] = city.slug;
    }
  }
  return map;
}

function normalizeSlugValue(citySlug: string) {
  return decodeURIComponent(citySlug).trim().toLowerCase().replace(/\/+$/, "");
}
