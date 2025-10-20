import BioSection from '@/components/BioSection';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-between px-20 py-32 max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="w-full flex flex-row items-start gap-2">
          {/* Name Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-black text-[60px] font-bold leading-none mb-2">Hey 👋, I'm</h1>
            <h1 className="text-black text-[90px] font-bold leading-none">BRUCE WYATT</h1>
            <p>Your next Hire</p>
          </div>
          
          {/* Avatar Placeholder */}
          <div className="w-42 h-42 rounded-full bg-gray-200 flex-shrink-0"></div>
        </div>

        {/* Bio Section */}
        <BioSection />
        
       
      </div>

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  );
}
