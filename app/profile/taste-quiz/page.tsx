import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type QuizImage = {
  path: string;
  style: string;
};

const QUIZ_IMAGE_ROOT = path.join(
  process.cwd(),
  'public',
  'quiz_details',
  'quiz_images',
);

const IMAGE_COUNT = 9;

async function getRandomQuizImages(): Promise<QuizImage[]> {
  try {
    const subdirs = await fs.readdir(QUIZ_IMAGE_ROOT, { withFileTypes: true });
    const allImages: QuizImage[] = [];

    for (const entry of subdirs) {
      if (!entry.isDirectory()) continue;

      const dirPath = path.join(QUIZ_IMAGE_ROOT, entry.name);
      const files = await fs.readdir(dirPath);

      files
        .filter(
          (file) =>
            file.toLowerCase().endsWith('.jpg') ||
            file.toLowerCase().endsWith('.jpeg'),
        )
        .forEach((file) => {
          allImages.push({
            path: `/quiz_details/quiz_images/${entry.name}/${file}`,
            style: entry.name,
          });
        });
    }

    if (!allImages.length) return [];

    // Shuffle and take the first N entries.
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, IMAGE_COUNT);
  } catch (error) {
    console.error('Failed to load quiz images', error);
    return [];
  }
}

function formatStyleName(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function TasteQuizPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const quizImages = await getRandomQuizImages();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-light tracking-tight text-black">
          Taste Profiling Quiz
        </h1>
        <p className="mt-3 text-sm font-light text-zinc-600">
          A personalized quiz to understand your art preferences. The experience
          is coming soon.
        </p>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-sm font-light text-zinc-700">
            We&apos;ll use your responses to tailor exhibitions, collections, and
            recommendations once the quiz is live. In the meantime, here&apos;s a
            rotating selection of artworks from the quiz library to make things
            feel real.
          </p>
        </div>

        {quizImages.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <p className="text-xs font-light tracking-widest text-zinc-500">
                  QUIZ IMAGE POOL
                </p>
                <h2 className="text-2xl font-light tracking-tight text-black">
                  Random picks from the upcoming quiz
                </h2>
              </div>
              <span className="text-xs font-light text-zinc-500">
                Pulled fresh on each visit
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {quizImages.map((image, idx) => (
                <div
                  key={`${image.path}-${idx}`}
                  className="group overflow-hidden border border-zinc-200 bg-white"
                >
                  <div className="relative aspect-[4/5] bg-zinc-100">
                    <Image
                      src={image.path}
                      alt={`${formatStyleName(image.style)} artwork`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={idx < 2}
                    />
                  </div>
                  <div className="border-t border-zinc-200 p-4">
                    <p className="text-xs font-light tracking-widest text-zinc-500">
                      {formatStyleName(image.style)}
                    </p>
                    <p className="mt-1 text-sm font-light text-black">
                      Preview from our quiz dataset
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

