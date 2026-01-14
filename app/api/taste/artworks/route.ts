// app/api/taste/artworks/route.ts
import { NextResponse } from "next/server";
import type { Artwork } from "@/app/types/artwork";
// import { db } from "@/lib/db"; // later

// TEMP: stub data
const MOCK_ARTWORKS: Artwork[] = [
  // Replace with real data or DB call
  {
    id: "1",
    title: "Composition with Red, Blue and Yellow",
    artist: "Piet Mondrian",
    imageUrl: "/mock/mondrian.jpg",
    style: "De Stijl",
  },
  // ...19 more
];

export async function GET() {
  // later: randomly sample 20 from your catalog
  const artworks = MOCK_ARTWORKS.slice(0, 20);
  return NextResponse.json({ artworks });
}
