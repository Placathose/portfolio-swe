import { notFound } from 'next/navigation';
import { getPocketBase } from '@/lib/pocketbase';
import { formatDate } from '@/lib/formatdate';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

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
          className="max-w-6xl mx-auto px-[1rem] grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,37.5rem)_18.75rem] gap-8 lg:gap-12"
        >
          {/* Title - spans all 3 columns */}
          <div className="lg:col-span-3">
            <Link
              href="/projects"
              className="text-blue-600 hover:underline mb-6 inline-block"
            >
        ← Back to Projects
      </Link>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{record.title}</h1>
          </div>

          {/* Author | Date - spans all 3 columns */}
          <div className="lg:col-span-3 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <span>By {record.author}</span>
              <span>|</span>
              <time>{formatDate(record.date)}</time>
            </div>
          </div>

          {/* Image - spans columns 1 and 2 */}
          <div className="lg:col-span-2 mb-12">
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
          <article className="lg:col-span-2 prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                h4: ({ ...props }) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
                h5: ({ ...props }) => <h5 className="text-lg font-bold mt-4 mb-2" {...props} />,
                p: ({ ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const inline = !className || !match;

                  return !inline ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus as { [key: string]: React.CSSProperties }}
                      language={language}
                      PreTag="div"
                      className="rounded-lg my-4"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
              } as Components}
            >
              {record.projectContent || ''}
            </ReactMarkdown>
      </article>
        </div>
    </div>
  );
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
}
}

