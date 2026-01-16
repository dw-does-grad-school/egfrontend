import Link from "next/link";

export default function ComingSoonPage() {
        return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-center">
          <h1 className="text-4xl font-light tracking-wide text-black">
                Remember, this app is a work in progress, and an academic prototype.
          </h1>
          <p className="mt-4 text-lg font-light text-black/70">
                We're working hard to bring you something amazing, but bear with us that only one person is working on this, 
                and it may take some time. In the meantime, feel free to explore the existing features and provide feedback!
          </p>
          <Link href="https://forms.gle/uknq3n82NGgRXcEo9" className="mt-8 bg-black px-6 py-3 text-sm font-light tracking-widest text-white hover:bg-zinc-800 transition-colors">
                PROVIDE FEEDBACK
          </Link>
          <Link href="/" className="mt-4 bg-black px-6 py-3 text-sm font-light tracking-widest text-white hover:bg-zinc-800 transition-colors">
                RETURN HOME
          </Link>
        </div>
        )
}