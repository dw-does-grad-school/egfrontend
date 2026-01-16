import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Header() {
    return (
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-light tracking-tight text-black">
                ECHO
              </Link>
              <div className="flex items-center gap-8">
                <Link href="/collections" className="text-sm font-light tracking-wide text-black hover:text-zinc-600 transition-colors">
                  COLLECTIONS
                </Link>
                <Link href="/exhibits" className="text-sm font-light tracking-wide text-black hover:text-zinc-600 transition-colors">
                  EXHIBITIONS
                </Link>
                <SignedIn>
                  <Link href="/profile" className="text-sm font-light tracking-wide text-black hover:text-zinc-600 transition-colors">
                    PROFILE
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in" className="text-sm font-light tracking-wide text-black hover:text-zinc-600 transition-colors">
                    SIGN IN
                  </Link>
                </SignedOut>
                <Link href="/visit" className="border border-black px-6 py-2 text-xs font-light tracking-widest text-black hover:bg-black hover:text-white transition-colors">
                  VISIT
                </Link>
              </div>
            </div>
          </div>
        </nav>
    );
}