import ProjectCard from './ProjectCard';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to get projects from MDX files by reading them directly
async function getProjectsFromMDX() {
  try {
    const contentDir = path.join(process.cwd(), 'content/projects');
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    
    if (mdxFiles.length === 0) {
      return [];
    }
    
    return mdxFiles.map(file => {
      try {
        const filePath = path.join(contentDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        const projectData = {
          id: data.id || file.replace('.mdx', ''),
          title: data.title || '',
          image: data.image || '',
          imageAlt: data.imageAlt || data.title || '',
          demoUrl: data.demoUrl,
          infoUrl: data.infoUrl,
          codeUrl: data.codeUrl,
          date: data.date || '',
          author: data.author || '',
          tags: data.tags ? (typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags as string[]) : [],
          hasDetails: true
        };
        
        return projectData;
      } catch {
        // Skip individual files that fail to parse
        return null;
      }
    }).filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {
    // Silently fail and return empty array - fallback to static projects
    return [];
  }
}

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

export default async function ProjectsSection({ showAll = false, showTitle = true }: ProjectsSectionProps) {
  const mdxProjects = await getProjectsFromMDX();
  // Prioritize static projects array over MDX for card display
  // MDX files are for detail pages, static array is source of truth for card metadata
  const allProjects = [...projects, ...mdxProjects.filter(mp => !projects.some(p => p.id === mp.id))];
  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 4);
  
  return (
    <section className="py-20 px-20 max-w-7xl mx-auto">
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
