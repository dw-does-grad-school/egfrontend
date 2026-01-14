import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-white">

      {/* Profile Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-light tracking-tight text-black">Your Profile</h1>
          <p className="mt-2 text-sm font-light text-zinc-600">Manage your account and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-light tracking-tight text-black">Account Information</h2>
            <div className="space-y-3">
              <div className="border-l-2 border-black pl-4">
                <p className="text-xs font-light tracking-widest text-zinc-500">NAME</p>
                <p className="mt-1 font-light text-black">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div className="border-l-2 border-black pl-4">
                <p className="text-xs font-light tracking-widest text-zinc-500">EMAIL</p>
                <p className="mt-1 font-light text-black">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              <div className="border-l-2 border-black pl-4">
                <p className="text-xs font-light tracking-widest text-zinc-500">MEMBER SINCE</p>
                <p className="mt-1 font-light text-black">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-light tracking-tight text-black">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/exhibits"
                className="block border border-zinc-200 px-4 py-3 text-sm font-light tracking-wide text-black hover:border-black hover:bg-zinc-50 transition-colors"
              >
                Browse Exhibitions →
              </Link>
              <Link 
                href="/collections"
                className="block border border-zinc-200 px-4 py-3 text-sm font-light tracking-wide text-black hover:border-black hover:bg-zinc-50 transition-colors"
              >
                View Your Collections →
              </Link>
              <button 
                className="w-full border border-zinc-200 px-4 py-3 text-sm font-light tracking-wide text-black hover:border-black hover:bg-zinc-50 transition-colors text-left"
              >
                Saved Artworks →
              </button>
              <Link 
                href="/profile/taste-quiz"
                className="block border border-[#7f1d2a] bg-[#7f1d2a] px-4 py-3 text-sm font-light tracking-wide text-white transition-colors hover:border-[#6b1624] hover:bg-[#6b1624]"
              >
                Take the Taste Quiz →
              </Link>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mt-6 border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-light tracking-tight text-black">Preferences</h2>
          <p className="text-sm font-light text-zinc-600">
            Manage your notification settings, privacy preferences, and more. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}