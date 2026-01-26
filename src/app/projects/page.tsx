import ProjectsSection from '@/components/ProjectsSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-2 max-w-7xl mx-auto">
        <div className="mb-5 pt-6 px-20">
          <h1 className="text-6xl font-bold text-black">Projects</h1>
          {/* <Link href="/projects/new">
            <Button>Add New Project</Button>
          </Link> */}
        </div>
        <ProjectsSection showAll={true} showTitle={false} />
      </div>
    </div>
  );
}
