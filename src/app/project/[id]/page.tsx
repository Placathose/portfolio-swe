import { projectSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = projectSource.getPage([id]);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen bg-white py-20 px-20 max-w-4xl mx-auto">
      <Link href="/projects" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Projects
      </Link>
      <article className="prose prose-neutral max-w-none">
        <MDX />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return projectSource.getPages().map((page) => ({
    id: page.slugs[0],
  }));
}

