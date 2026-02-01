import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { getPocketBase } from '@/lib/pocketbase';
import { formatDate } from '@/lib/formatdate';




const projects = [
  {
    id: "post-87429",
    title: "Create a 3D Character Lab",
    image: "/characterbuilder.png",
    imageAlt: "Featured Image for Create a 3D Character Lab",
    demoUrl: "https://r3f-charater-selector.netlify.app/",
    codeUrl: "",
    date: "Nov 2025",
    author: "Bruce Wyatt",
    tags: ["3D", "Pocketbase", "Three.js", "React Three Fiber"],
    hasDetails: true
  },
  {
    id: "post-87430",
    title: "Create a mini Shopify-like API",
    image: "/characterbuilder.png",
    imageAlt: "Featured Image for the mini Shopify-like API project",
    demoUrl: "",
    codeUrl: "https://github.com/Placathose/mini-shopify",
    date: "Jan 2026",
    author: "Bruce Wyatt",
    tags: ["Node.js", "Express", "PostgreSQL", "REST API"],
    hasDetails: true
  }
];

interface ProjectsSectionProps {
  showAll?: boolean;
  showTitle?: boolean;
}

async function getProjectsFromPocketBase() {
  try {
    const pb = getPocketBase();
    const pbUrl = process.env.POCKETBASE_URL || '';
    const records = await pb.collection('portfolio_projects').getFullList({
      sort: '-created',
    });

    console.log('PocketBase raw records:', JSON.stringify(records, null, 2));

    return records.map(record => ({
      id: record.id,
      title: record.title,
      image: record.image ? `${pbUrl}/api/files/portfolio_projects/${record.id}/${record.image}` : '/characterbuilder.png',
      imageAlt: record.imageAlt,
      demoUrl: record.demoUrl || undefined,
      codeUrl: record.codeUrl || undefined,
      infoUrl: record.infoUrl || undefined,
      date: formatDate(record.date),
      author: record.author,
      tags: typeof record.tags === 'string' ? JSON.parse(record.tags) : record.tags,
    }));
  } catch (error) {
    console.error('Error fetching from PocketBase:', error);
    return [];
  }
}

export default async function ProjectsSection({ showAll = false, showTitle = true }: ProjectsSectionProps) {
  const apiProjects = await getProjectsFromPocketBase();
  const allProjects = apiProjects.length > 0 ? apiProjects : projects; // Fallback to static

  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 4);
  
  return (
    <section className="py-20 px-5 lg:px-20 max-w-7xl mx-auto">
      {showTitle && <h2 className="text-4xl font-bold text-black mb-12">Projects</h2>}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 mx-auto w-full lg:grid-cols-4 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:gap-6">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}
      </div>
      
      {!showAll && (
        <div className="flex justify-center mt-12">
          <Link 
            href="/projects"
            className="group w-full max-w-xs rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 flex items-center justify-center py-3 px-3"
          >
            <span className="text-black font-medium text-lg group-hover:text-blue-600 transition-colors duration-200">
              Show more
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
