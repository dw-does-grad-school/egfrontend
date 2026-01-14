"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Collection data with distances
const collections = [
  {
    id: 1,
    name: "Metropolitan Museum of Modern Art",
    type: "Museum",
    distance: 2.3,
    collectionSize: "12,000+ works",
    featured: "Contemporary Art",
    hours: "Open daily 10am - 6pm",
    admission: "Free",
    image: "/quiz_details/quiz_images/pop-art/pop-art-69568.jpg",
    highlights: ["Abstract Expressionism", "Digital Art", "Photography"],
  },
  {
    id: 2,
    name: "Downtown Contemporary Gallery",
    type: "Gallery",
    distance: 4.7,
    collectionSize: "800+ works",
    featured: "Emerging Artists",
    hours: "Wed-Sun 11am - 7pm",
    admission: "Free",
    image: "/quiz_details/quiz_images/contemporary-realism/contemporary-realism-45456.jpg",
    highlights: ["Local Artists", "Mixed Media", "Installations"],
  },
  {
    id: 3,
    name: "City Arts Center",
    type: "Arts Center",
    distance: 6.2,
    collectionSize: "3,500+ works",
    featured: "Regional Art",
    hours: "Tue-Sat 10am - 5pm",
    admission: "$15",
    image: "/quiz_details/quiz_images/realism/realism-33117.jpg",
    highlights: ["American Art", "Sculpture", "Textiles"],
  },
  {
    id: 4,
    name: "Riverside Museum",
    type: "Museum",
    distance: 8.9,
    collectionSize: "6,000+ works",
    featured: "Modern & Contemporary",
    hours: "Open daily 9am - 8pm",
    admission: "$20",
    image: "/quiz_details/quiz_images/high-renaissance/high-renaissance-40766.jpg",
    highlights: ["European Art", "Asian Art", "Modern Design"],
  },
  {
    id: 5,
    name: "Westside Gallery Collective",
    type: "Gallery",
    distance: 12.4,
    collectionSize: "1,200+ works",
    featured: "Contemporary Photography",
    hours: "Thu-Sun 12pm - 6pm",
    admission: "Free",
    image: "/quiz_details/quiz_images/new-realism/new-realism-40455.jpg",
    highlights: ["Photography", "Video Art", "New Media"],
  },
  {
    id: 6,
    name: "National Art Museum",
    type: "Museum",
    distance: 18.5,
    collectionSize: "25,000+ works",
    featured: "World-Class Collection",
    hours: "Open daily 10am - 5pm",
    admission: "$25",
    image: "/quiz_details/quiz_images/baroque/baroque-54737.jpg",
    highlights: ["Ancient to Modern", "Global Collection", "Master Works"],
  },
  {
    id: 7,
    name: "Suburban Arts Institute",
    type: "Institute",
    distance: 23.1,
    collectionSize: "4,500+ works",
    featured: "Educational Collection",
    hours: "Mon-Fri 9am - 6pm",
    admission: "$12",
    image: "/quiz_details/quiz_images/early-renaissance/early-renaissance-40617.jpg",
    highlights: ["Teaching Collection", "Student Works", "Workshops"],
  },
  {
    id: 8,
    name: "Harbor District Gallery",
    type: "Gallery",
    distance: 28.7,
    collectionSize: "900+ works",
    featured: "Maritime & Coastal Art",
    hours: "Daily 11am - 7pm",
    admission: "Free",
    image: "/quiz_details/quiz_images/ukiyo-e/ukiyo-e-48480.jpg",
    highlights: ["Coastal Art", "Maritime History", "Local Culture"],
  },
  {
    id: 9,
    name: "Regional Fine Arts Museum",
    type: "Museum",
    distance: 34.2,
    collectionSize: "15,000+ works",
    featured: "Comprehensive Collection",
    hours: "Tue-Sun 10am - 6pm",
    admission: "$18",
    image: "/quiz_details/quiz_images/post-impressionism/post-impressionism-42354.jpg",
    highlights: ["Renaissance", "Impressionism", "Contemporary"],
  },
  {
    id: 10,
    name: "Northside Contemporary Space",
    type: "Gallery",
    distance: 42.8,
    collectionSize: "600+ works",
    featured: "Experimental Art",
    hours: "Fri-Sun 1pm - 8pm",
    admission: "Donation",
    image: "/quiz_details/quiz_images/action-painting/action-painting-67188.jpg",
    highlights: ["Avant-Garde", "Performance", "Interactive"],
  },
  {
    id: 11,
    name: "State Museum of Art",
    type: "Museum",
    distance: 56.3,
    collectionSize: "30,000+ works",
    featured: "State Collection",
    hours: "Wed-Mon 9am - 5pm",
    admission: "$22",
    image: "/quiz_details/quiz_images/northern-renaissance/northern-renaissance-40354.jpg",
    highlights: ["Regional History", "Folk Art", "Decorative Arts"],
  },
  {
    id: 12,
    name: "University Art Gallery",
    type: "Gallery",
    distance: 78.4,
    collectionSize: "5,000+ works",
    featured: "Academic Collection",
    hours: "Mon-Fri 10am - 4pm",
    admission: "Free",
    image: "/quiz_details/quiz_images/symbolism/symbolism-54552.jpg",
    highlights: ["Student Art", "Faculty Works", "Visiting Artists"],
  },
  {
    id: 13,
    name: "Provincial Art Center",
    type: "Arts Center",
    distance: 92.1,
    collectionSize: "8,000+ works",
    featured: "Provincial Collection",
    hours: "Daily 10am - 6pm",
    admission: "$15",
    image: "/quiz_details/quiz_images/naive-art-primitivism/naive-art-primitivism-53904.jpg",
    highlights: ["Local Heritage", "Traditional Crafts", "Modern Art"],
  },
];

const radiusOptions = [5, 10, 25, 50, 100];

export default function CollectionsPage() {
  const [selectedRadius, setSelectedRadius] = useState(25);

  // Filter collections by selected radius
  const filteredCollections = collections.filter(
    (collection) => collection.distance <= selectedRadius
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
            DISCOVER
          </p>
          <h1 className="text-5xl font-light tracking-tight text-black">
            Nearby Collections
          </h1>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-zinc-600">
            Explore museums and galleries in your area. Adjust the search radius to discover more institutions.
          </p>
        </div>
      </div>

      {/* Radius Filter */}
      <div className="border-b border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
                SEARCH RADIUS
              </p>
              <p className="text-sm font-light text-zinc-600">
                Showing {filteredCollections.length} {filteredCollections.length === 1 ? 'location' : 'locations'} within {selectedRadius} miles
              </p>
            </div>

            {/* Radius Buttons */}
            <div className="flex flex-wrap gap-2">
              {radiusOptions.map((radius) => (
                <button
                  key={radius}
                  onClick={() => setSelectedRadius(radius)}
                  className={`border px-6 py-2 text-xs font-light tracking-widest transition-colors ${
                    selectedRadius === radius
                      ? "border-black bg-black text-white"
                      : "border-zinc-300 text-zinc-600 hover:border-black hover:text-black"
                  }`}
                >
                  {radius} MI
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filteredCollections.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-light text-zinc-600">
                No collections found within {selectedRadius} miles.
              </p>
              <p className="mt-2 text-sm font-light text-zinc-500">
                Try increasing your search radius.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="group cursor-pointer border border-zinc-200 bg-white hover:border-black transition-colors"
                >
                  {/* Collection Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Collection Details */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-block border border-zinc-300 px-3 py-1 text-xs font-light tracking-widest text-zinc-600">
                        {collection.type}
                      </span>
                      <span className="text-xs font-light tracking-wide text-zinc-500">
                        {collection.distance} mi
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-light tracking-tight text-black">
                      {collection.name}
                    </h3>

                    <div className="mb-4 space-y-2 text-sm font-light text-zinc-600">
                      <div className="flex items-center gap-2">
                        <span className="text-xs tracking-widest text-zinc-500">
                          FEATURED:
                        </span>
                        <span>{collection.featured}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs tracking-widest text-zinc-500">
                          SIZE:
                        </span>
                        <span>{collection.collectionSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs tracking-widest text-zinc-500">
                          HOURS:
                        </span>
                        <span>{collection.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs tracking-widest text-zinc-500">
                          ADMISSION:
                        </span>
                        <span>{collection.admission}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {collection.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-zinc-100 px-2 py-1 text-xs font-light text-zinc-700"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 border border-black py-2 text-xs font-light tracking-widest text-black hover:bg-black hover:text-white transition-colors">
                        VIEW
                      </button>
                      <button className="flex-1 border border-zinc-300 py-2 text-xs font-light tracking-widest text-zinc-600 hover:border-black hover:text-black transition-colors">
                        DIRECTIONS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
              MAP VIEW
            </p>
            <h2 className="text-3xl font-light tracking-tight text-black">
              Visualize Your Options
            </h2>
          </div>
          <div className="flex aspect-[21/9] items-center justify-center border border-zinc-300 bg-white">
            <div className="text-center">
              <p className="text-sm font-light text-zinc-600">Interactive map coming soon</p>
              <p className="mt-2 text-xs font-light text-zinc-500">
                View all locations on an interactive map
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}