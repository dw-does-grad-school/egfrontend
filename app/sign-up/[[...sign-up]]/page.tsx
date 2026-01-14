import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light tracking-tight text-black">
            ECHO
          </h1>
          <p className="mt-2 text-sm font-light tracking-wide text-zinc-600">
            Create your account
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-zinc-200",
            }
          }}
        />
      </div>
    </div>
  );
}

