import ProjectCard from './ProjectCard';
import Link from 'next/link';
      import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to get projects from MDX files by reading them directly
async function getProjectsFromMDX() {
  try {
    const contentDir = path.join(process.cwd(), 'content/projects');
    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    
    return mdxFiles.map(file => {
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
    });
  } catch (err) {
    console.error('Error reading MDX files:', err);
    return [];
  }
}

const projects = [
  {
    id: "post-87429",
    title: "How to Unroll Images with Three.js",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2020/01/Unrolling_featured-1-400x300.jpg?x69130",
    imageAlt: "Featured Image for How to Unroll Images with Three.js",
    demoUrl: "https://tympanus.net/Development/UnrollingImages/",
    infoUrl: "https://tympanus.net/codrops/2020/01/22/how-to-unroll-images-with-three-js/",
    codeUrl: "https://github.com/akella/UnrollingImages",
    date: "Jan 22, 2020",
    author: "Yuri Artiukh",
    tags: ["3D", "scroll", "Three.js", "WebGL"],
    hasDetails: true
  },
  {
    id: "post-87255",
    title: "Origami: 12 Free Animated 3D Objects",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2024/07/3dmotiongraphic-featured_2_mo-400x300.jpg?x69130",
    imageAlt: "Origami 3D Objects",
    demoUrl: "https://tympanus.net/Development/Origami",
    infoUrl: "https://tympanus.net/codrops/2024/07/30/origami-12-free-animated-3d-objects/",
    codeUrl: "https://github.com/d3adrabbit/origami",
    date: "Jul 30, 2024",
    author: "deadrabbbbit",
    tags: ["3D", "React Three Fiber", "Three.js", "WebGL"]
  },
  {
    id: "post-87430",
    title: "3D Folding Layout Technique for HTML Elements",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2020/01/FoldingDOM_featured-400x300.jpg?x69130",
    imageAlt: "3D Folding Layout",
    demoUrl: "http://tympanus.net/Tutorials/FoldingDOM/",
    infoUrl: "https://tympanus.net/codrops/2020/01/14/3d-folding-technique/",
    codeUrl: "https://github.com/Anemolo/FoldingDOM",
    date: "Jan 14, 2020",
    author: "Daniel Velasquez",
    tags: ["3D", "scroll"]
  },
  {
    id: "post-87437",
    title: "Making Gooey Image Hover Effects with Three.js",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2019/10/ThumbnailGooeyHoverEffect-400x300.jpg?x69130",
    imageAlt: "Gooey Image Hover Effects",
    demoUrl: "http://tympanus.net/Tutorials/GooeyImageHoverEffects/",
    infoUrl: "https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/",
    codeUrl: "https://github.com/Aqro/gooey-hover-codrops",
    date: "Oct 23, 2019",
    author: "Arno Di Nunzio",
    tags: ["distortion", "GSAP", "hover", "slideshow", "Three.js", "WebGL"]
  },
  {
    id: "post-87306",
    title: "Gradient Mask Hover Effect from Evervault",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2023/05/gradientmask-400x300.jpg?x69130",
    imageAlt: "Gradient Mask Hover Effect",
    demoUrl: "http://tympanus.net/Tutorials/AnimatedCodeBackground/",
    infoUrl: "https://tympanus.net/codrops/2023/05/17/recreating-the-gradient-mask-hover-effect-from-evervault/",
    codeUrl: "https://github.com/codrops/AnimatedCodeBackground/",
    date: "May 17, 2023",
    author: "Manoela Ilic",
    tags: ["css-mask", "hover", "typography"]
  },
  {
    id: "post-87279",
    title: "On-Scroll Animation Ideas for Sticky Sections",
    image: "https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2024/01/stickycardnewfeatured-400x300.gif?x69130",
    imageAlt: "Sticky Sections Animation",
    demoUrl: "https://tympanus.net/Development/StickySections/",
    infoUrl: "https://tympanus.net/codrops/2024/01/31/on-scroll-animation-ideas-for-sticky-sections/",
    codeUrl: "https://github.com/codrops/StickySections/",
    date: "Jan 31, 2024",
    author: "Manoela Ilic",
    tags: ["GSAP", "scroll", "sticky"]
  }
];

interface ProjectsSectionProps {
  showAll?: boolean;
  showTitle?: boolean;
}

export default async function ProjectsSection({ showAll = false, showTitle = true }: ProjectsSectionProps) {
  const mdxProjects = await getProjectsFromMDX();
  console.log('MDX Projects:', mdxProjects);
  const allProjects = [...mdxProjects, ...projects.filter(p => !mdxProjects.some(mp => mp.id === p.id))];
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
