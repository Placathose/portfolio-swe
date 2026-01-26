import { notFound } from 'next/navigation';
import { getPocketBase } from '@/lib/pocketbase';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pb = getPocketBase();
  const pbUrl = process.env.POCKETBASE_URL || '';

  try {
    const record = await pb.collection('portfolio_projects').getOne(id);

    return (
      <div className="min-h-screen bg-white py-20">
        <div
          className="max-w-6xl mx-auto px-8"
          style={{
            display: 'grid',
            gridTemplateColumns: '14rem minmax(0, 37.5rem) 18.75rem',
            columnGap: '3rem',
          }}
        >
          {/* Title - spans all 3 columns */}
          <div style={{ gridColumn: '1 / -1' }}>
            <Link
              href="/projects"
              className="text-blue-600 hover:underline mb-6 inline-block"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-5xl font-bold mb-6">{record.title}</h1>
          </div>

          {/* Author | Date - spans all 3 columns */}
          <div style={{ gridColumn: '1 / -1' }} className="mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <span>By {record.author}</span>
              <span>|</span>
              <time>{record.date}</time>
            </div>
          </div>

          {/* Image - spans columns 1 and 2 */}
          <div style={{ gridColumn: '1 / 3' }} className="mb-12">
            <Image
              src={record.image ? `${pbUrl}/api/files/portfolio_projects/${record.id}/${record.image}` : '/characterbuilder.png'}
              alt={record.imageAlt || record.title}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
              unoptimized={record.image?.startsWith('http')}
            />
          </div>

          {/* Details article - column 2 only */}
          <article style={{ gridColumn: '2' }} className="prose prose-lg max-w-none">
            {/* Placeholder for content - will be replaced with markdown/JSON later */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Project details will be rendered here...
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }
}

