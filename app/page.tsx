import SplashIntro from "@/components/effects/SplashIntro";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <SplashIntro duration={4000}>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden bg-zinc-900">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/quiz_details/quiz_images/abstract-expressionism/abstract-expressionism-66855.jpg"
              alt="Abstract Expressionism Artwork"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/40 to-zinc-900/80" />
          </div>
          
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <div className="max-w-2xl">
              <div className="mb-4 inline-block border border-white/30 px-4 py-1 text-xs tracking-widest text-white/70">
                NOW OPEN
              </div>
              <h1 className="mb-6 text-6xl font-light leading-tight tracking-tight text-white md:text-7xl">
                Contemporary<br />Digital Gallery
              </h1>
              <p className="mb-8 max-w-lg text-lg font-light leading-relaxed text-zinc-300">
                Experience curated collections of modern and contemporary art in an immersive digital environment.
              </p>
              <div className="flex gap-4">
                <button className="bg-white px-8 py-3 text-sm font-light tracking-widest text-black hover:bg-zinc-100 transition-colors">
                  EXPLORE NOW
                </button>
                <button className="border border-white px-8 py-3 text-sm font-light tracking-widest text-white hover:bg-white hover:text-black transition-colors">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Exhibition */}
        <section className="border-b border-zinc-200 bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">FEATURED EXHIBITION</p>
                <h2 className="text-4xl font-light tracking-tight text-black">Current Highlights</h2>
              </div>
              <Link href="/exhibits" className="text-sm font-light tracking-wide text-black hover:text-zinc-600 transition-colors">
                View all exhibitions →
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Exhibition 1 */}
              <div className="group cursor-pointer bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-200 relative">
                  <Image
                    src="/quiz_details/quiz_images/color-field-painting/color-field-painting-68129.jpg"
                    alt="Abstract Expressions Exhibition"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border border-t-0 border-zinc-200 p-6">
                  <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
                    THROUGH MARCH 2025
                  </p>
                  <h3 className="mb-3 text-2xl font-light tracking-tight text-black">
                    Abstract Expressions: Digital Age
                  </h3>
                  <p className="mb-4 font-light leading-relaxed text-zinc-600">
                    A comprehensive survey of digital abstract art from emerging contemporary artists pushing the boundaries of form and color.
                  </p>
                  <span className="text-sm font-light tracking-wide text-black underline">
                    Learn more
                  </span>
                </div>
              </div>

              {/* Exhibition 2 */}
              <div className="group cursor-pointer bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-200 relative">
                  <Image
                    src="/quiz_details/quiz_images/minimalism/minimalism-66333.jpg"
                    alt="Minimalism Reimagined Exhibition"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border border-t-0 border-zinc-200 p-6">
                  <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">
                    THROUGH JUNE 2025
                  </p>
                  <h3 className="mb-3 text-2xl font-light tracking-tight text-black">
                    Minimalism Reimagined
                  </h3>
                  <p className="mb-4 font-light leading-relaxed text-zinc-600">
                    Exploring the intersection of minimalist principles with cutting-edge digital media and interactive installations.
                  </p>
                  <span className="text-sm font-light tracking-wide text-black underline">
                    Learn more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="border-b border-zinc-200 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="mb-2 text-xs font-light tracking-widest text-zinc-500">PERMANENT COLLECTION</p>
              <h2 className="text-4xl font-light tracking-tight text-black">Artworks & Artists</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {/* Art piece 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-zinc-100 relative">
                  <Image
                    src="/quiz_details/quiz_images/fauvism/fauvism-42559.jpg"
                    alt="Digital Harmony by Sarah Chen"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-light text-black">Sarah Chen</p>
                  <p className="text-xs font-light italic text-zinc-500">Digital Harmony, 2024</p>
                </div>
              </div>

              {/* Art piece 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-zinc-100 relative">
                  <Image
                    src="/quiz_details/quiz_images/cubism/cubism-61514.jpg"
                    alt="Fragments by Marcus Rodriguez"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-light text-black">Marcus Rodriguez</p>
                  <p className="text-xs font-light italic text-zinc-500">Fragments, 2023</p>
                </div>
              </div>

              {/* Art piece 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-zinc-100 relative">
                  <Image
                    src="/quiz_details/quiz_images/impressionism/impressionism-9511.jpg"
                    alt="Stillness by Yuki Tanaka"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-light text-black">Yuki Tanaka</p>
                  <p className="text-xs font-light italic text-zinc-500">Stillness, 2024</p>
                </div>
              </div>

              {/* Art piece 4 */}
              <div className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-zinc-100 relative">
                  <Image
                    src="/quiz_details/quiz_images/romanticism/romanticism-43968.jpg"
                    alt="Echoes by Emma Laurent"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-light text-black">Emma Laurent</p>
                  <p className="text-xs font-light italic text-zinc-500">Echoes, 2023</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button className="border border-black px-10 py-3 text-sm font-light tracking-widest text-black hover:bg-black hover:text-white transition-colors">
                EXPLORE COLLECTION
              </button>
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-light tracking-tight">Plan Your Visit</h2>
                <p className="mb-8 font-light leading-relaxed text-zinc-300">
                  Open daily with extended hours on weekends. Experience our exhibitions in person or explore our digital gallery from anywhere in the world.
                </p>
                <div className="space-y-4">
                  <div className="border-l-2 border-white pl-4">
                    <p className="text-xs font-light tracking-widest text-zinc-400">HOURS</p>
                    <p className="mt-1 font-light">Monday–Friday: 10:00 AM – 6:00 PM</p>
                    <p className="font-light">Saturday–Sunday: 10:00 AM – 8:00 PM</p>
                  </div>
                  <div className="border-l-2 border-white pl-4">
                    <p className="text-xs font-light tracking-widest text-zinc-400">ADMISSION</p>
                    <p className="mt-1 font-light">Free for all visitors</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  <button className="w-full bg-white py-4 text-sm font-light tracking-widest text-black hover:bg-zinc-100 transition-colors">
                    BOOK A TOUR
                  </button>
                  <button className="w-full border border-white py-4 text-sm font-light tracking-widest text-white hover:bg-white hover:text-black transition-colors">
                    BECOME A MEMBER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-zinc-50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-light tracking-tight text-black">ECHO</h3>
                <p className="text-sm font-light text-zinc-600">
                  Art Curation for the 21st Century and Beyond
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-light tracking-widest text-zinc-500">EXPLORE</h4>
                <ul className="space-y-2 text-sm font-light text-zinc-700">
                  <li><Link href="/exhibits" className="hover:text-black transition-colors">Exhibitions</Link></li>
                  <li><Link href="/profile" className="hover:text-black transition-colors">Collection</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Artists</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-light tracking-widest text-zinc-500">VISIT</h4>
                <ul className="space-y-2 text-sm font-light text-zinc-700">
                  <li><Link href="#" className="hover:text-black transition-colors">Plan Your Visit</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Accessibility</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Group Tours</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-light tracking-widest text-zinc-500">CONNECT</h4>
                <ul className="space-y-2 text-sm font-light text-zinc-700">
                  <li><Link href="#" className="hover:text-black transition-colors">Newsletter</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Social Media</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-zinc-200 pt-8 text-center">
              <p className="text-xs font-light text-zinc-500">
                © 2025 Echo Gallery. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </SplashIntro>
  );
}
