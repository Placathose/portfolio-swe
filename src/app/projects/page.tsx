import ProjectsSection from '@/components/ProjectsSection';

export default async function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-2 max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-black mb-5">Projects</h1>
        <ProjectsSection showAll={true} showTitle={false} />
      </div>
    </div>
  );
}
