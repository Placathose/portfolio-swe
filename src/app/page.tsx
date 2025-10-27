import BioSection from '@/components/BioSection';
import ProjectsSection from '@/components/ProjectsSection';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-between px-20 py-32 max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="w-full flex flex-row items-start gap-2">
          {/* Name Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-black text-[60px] font-bold leading-none mb-2">Hey 👋, I&apos;m</h1>
            <h1 className="text-black text-[90px] font-bold leading-none">BRUCE WYATT</h1>
            <p>Your next Hire</p>
          </div>
          
          {/* Avatar */}
          <div className="w-42 h-42 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden group cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
            <Image
              src="/profile.png"
              alt="Profile picture"
              width={168}
              height={168}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Bio Section */}
        <BioSection />
        
       
      </div>

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  );
}
