"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Nearby exhibitions data
const nearbyExhibitions = [
  {
    id: 1,
    title: "Abstract Expressions: Digital Age",
    location: "Downtown Gallery",
    distance: "0.8 miles away",
    image: "/quiz_details/quiz_images/abstract-expressionism/abstract-expressionism-75420.jpg",
    dates: "Now through March 2025",
    description: "A comprehensive survey of digital abstract art from emerging contemporary artists.",
  },
  {
    id: 2,
    title: "Minimalism Reimagined",
    location: "City Art Museum",
    distance: "1.2 miles away",
    image: "/quiz_details/quiz_images/minimalism/minimalism-66781.jpg",
    dates: "Now through June 2025",
    description: "Exploring the intersection of minimalist principles with cutting-edge digital media.",
  },
  {
    id: 3,
    title: "Urban Perspectives",
    location: "Metropolitan Arts Center",
    distance: "2.1 miles away",
    image: "/quiz_details/quiz_images/contemporary-realism/contemporary-realism-53186.jpg",
    dates: "December 2025 - February 2026",
    description: "Contemporary photography capturing the essence of modern city life.",
  },
  {
    id: 4,
    title: "Color Theory Redux",
    location: "Westside Gallery",
    distance: "2.8 miles away",
    image: "/quiz_details/quiz_images/color-field-painting/color-field-painting-66557.jpg",
    dates: "January - April 2026",
    description: "Experimental explorations in color relationships and visual perception.",
  },
];

// Events data
const events = [
  {
    id: 1,
    title: "Gallery Opening Night",
    date: "December 15, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Main Gallery",
    type: "Opening Reception",
    image: "/quiz_details/quiz_images/expressionism/expressionism-58447.jpg",
  },
  {
    id: 2,
    title: "Artist Talk: Sarah Chen",
    date: "December 18, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Lecture Hall",
    type: "Artist Talk",
    image: "/quiz_details/quiz_images/pointillism/pointillism-42135.jpg",
  },
  {
    id: 3,
    title: "Workshop: Digital Art Basics",
    date: "December 20, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Studio A",
    type: "Workshop",
    image: "/quiz_details/quiz_images/art-nouveau/art-nouveau-40998.jpg",
  },
  {
    id: 4,
    title: "Curator's Tour",
    date: "December 22, 2025",
    time: "3:00 PM - 4:00 PM",
    location: "Exhibition Hall",
    type: "Guided Tour",
    image: "/quiz_details/quiz_images/rococo/rococo-43036.jpg",
  },
  {
    id: 5,
    title: "Film Screening: Art & Identity",
    date: "January 5, 2026",
    time: "7:00 PM - 9:00 PM",
    location: "Theater",
    type: "Film",
    image: "/quiz_details/quiz_images/mannerism-late-renaissance/mannerism-late-renaissance-56155.jpg",
  },
  {
    id: 6,
    title: "Members-Only Preview",
    date: "January 10, 2026",
    time: "5:00 PM - 8:00 PM",
    location: "All Galleries",
    type: "Members Event",
    image: "/quiz_details/quiz_images/synthetic-cubism/synthetic-cubism-45449.jpg",
  },
];

export default function ExhibitsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel every 7.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % nearbyExhibitions.length);
    }, 7500);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
            EXPLORE
          </p>
          <h1 className="text-5xl font-light tracking-tight text-black">
            Exhibitions & Events
          </h1>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-zinc-600">
            Discover nearby exhibitions and upcoming events in your area.
          </p>
        </div>
      </div>

      {/* Nearby Exhibitions Carousel */}
      <section className="border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
              NEARBY EXHIBITIONS
            </p>
            <h2 className="text-3xl font-light tracking-tight text-black">
              In Your Area
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="grid gap-8 md:grid-cols-2"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-200 relative">
                    <Image
                      src={nearbyExhibitions[currentSlide].image}
                      alt={nearbyExhibitions[currentSlide].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full border border-black px-4 py-1 text-xs font-light tracking-widest text-black">
                        {nearbyExhibitions[currentSlide].distance}
                      </span>
                    </div>
                    <h3 className="mb-2 text-3xl font-light tracking-tight text-black">
                      {nearbyExhibitions[currentSlide].title}
                    </h3>
                    <p className="mb-4 text-lg font-light text-zinc-600">
                      {nearbyExhibitions[currentSlide].location}
                    </p>
                    <p className="mb-4 text-sm font-light tracking-wide text-zinc-500">
                      {nearbyExhibitions[currentSlide].dates}
                    </p>
                    <p className="mb-6 font-light leading-relaxed text-zinc-700">
                      {nearbyExhibitions[currentSlide].description}
                    </p>
                    <div className="flex gap-4">
                      <button className="border border-black px-8 py-3 text-sm font-light tracking-widest text-black hover:bg-black hover:text-white transition-colors">
                        VIEW DETAILS
                      </button>
                      <button className="border border-zinc-300 px-8 py-3 text-sm font-light tracking-widest text-zinc-600 hover:border-black hover:text-black transition-colors">
                        GET DIRECTIONS
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {nearbyExhibitions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 transition-all ${
                    index === currentSlide
                      ? "w-12 bg-black"
                      : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
              UPCOMING EVENTS
            </p>
            <h2 className="text-3xl font-light tracking-tight text-black">
              Join Us
            </h2>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group cursor-pointer border border-zinc-200 bg-white hover:border-black transition-colors"
              >
                {/* Event Image */}
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="mb-3 inline-block border border-zinc-300 px-3 py-1 text-xs font-light tracking-widest text-zinc-600">
                    {event.type}
                  </div>
                  <h3 className="mb-2 text-xl font-light tracking-tight text-black">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm font-light text-zinc-600">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>
                  <button className="mt-4 text-sm font-light tracking-wide text-black underline hover:no-underline">
                    Register →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-12 text-center">
            <button className="border border-black px-10 py-3 text-sm font-light tracking-widest text-black hover:bg-black hover:text-white transition-colors">
              VIEW ALL EVENTS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}