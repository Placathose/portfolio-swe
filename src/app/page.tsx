import BioSection from '@/components/BioSection';
import ProjectsSection from '@/components/ProjectsSection';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-between px-5 lg:px-20 py-16 lg:py-32 max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-2">
          {/* Avatar */}
          <div className="w-[336px] h-[336px] lg:w-42 lg:h-42 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden group cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out order-1 lg:order-2">
            <Image
              src="/profile.png"
              alt="Profile picture"
              width={336}
              height={336}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Name Section */}
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1">
            <h1 className="text-black text-[60px] font-bold leading-none mb-2 text-center lg:text-left">Hey 👋, I&apos;m</h1>
            <h1 className="text-black text-[90px] font-bold leading-none text-center lg:text-left">BRUCE WYATT</h1>
            <p className="text-center lg:text-left my-6 lg:my-0">Your next Hire</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="my-8 lg:my-0">
          <BioSection />
        </div>


      </div>

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  );
}
