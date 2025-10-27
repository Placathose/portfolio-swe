import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  demoUrl?: string;
  codeUrl?: string;
  infoUrl?: string;
  date: string;
  author: string;
  tags: string[];
  hasDetails?: boolean;
}

export default function ProjectCard({
  id,
  title,
  image,
  imageAlt,
  demoUrl,
  codeUrl,
  infoUrl,
  date,
  author,
  tags,
  hasDetails = false
}: ProjectCardProps) {
  return (
    <article 
      id={id} 
      className="group w-full rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
    >
      <div className="overflow-hidden w-full relative aspect-[800/600]">
        <a 
          className="block w-full h-full relative" 
          href={demoUrl || '#'} 
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="loader"></div>
          <img
            src={image}
            alt={imageAlt}
            width={400}
            height={300}
            className="w-full h-full object-cover block transition-transform duration-500 ease-in-out scale-[1.001] group-hover:scale-105"
            decoding="async"
          />
        </a>
        <div className="absolute bottom-0 left-0 w-full px-4 py-8 pb-4 opacity-0 bg-gradient-to-t from-black/70 via-black/60 to-transparent transform translate-y-5 transition-all duration-300 ease-in-out flex z-[12] items-center justify-between gap-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <div className="flex gap-2">
            {infoUrl && (
              <a 
                className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white no-underline transition-colors duration-200 ease-in-out hover:bg-white/30" 
                title="More info" 
                target="_blank" 
                href={infoUrl}
                aria-label="More info"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-3H7V4h2v5z"/>
                </svg>
              </a>
            )}
            {codeUrl && (
              <a 
                className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white no-underline transition-colors duration-200 ease-in-out hover:bg-white/30" 
                title="Code" 
                target="_blank" 
                href={codeUrl}
                aria-label="Code on Github"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-1 items-center px-3 py-3 pb-6 text-xs text-gray-600">
        <time className="cursor-default">{date}</time> by <a className="text-blue-600 no-underline hover:underline" href="#">{author}</a>
      </div>

      <div className="flex flex-wrap gap-1 px-2 pb-3">
        {tags.map((tag, index) => (
          <a 
            key={index} 
            href="#"
            className="lowercase bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium no-underline transition-colors duration-200 ease-in-out hover:bg-gray-200"
          >
            {tag}
          </a>
        ))}
      </div>

      {hasDetails && (
        <div className="px-3 pb-3">
          <Link 
            href={`/project/${id}`}
            className="inline-block text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            View Details →
          </Link>
        </div>
      )}
    </article>
  );
}
