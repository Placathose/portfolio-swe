import BioSection from '@/components/BioSection';
import ProjectsSection from '@/components/ProjectsSection';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';

export default async function Home() {
  return (
    <div className=" pt-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center lg:gap-15 px-5 lg:px-20 py-8 lg:py-16 max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-2">
          {/* Avatar */}
          <div className="w-[168px] h-[168px] lg:w-42 lg:h-42 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden group cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out order-1 lg:order-2">
            <Image
              src="/profile.png"
              alt="Profile picture"
              width={168}
              height={168}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Name Section */}
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1">
            <h1 className="text-black text-[60px] font-bold leading-none mb-2 text-center lg:text-left">Hey 👋, I&apos;m</h1>
            <h1 className="text-black text-[90px] font-bold leading-none text-center lg:text-left">BRUCE W.P.</h1>
            <div>

            </div>
            <p className="text-center lg:text-left my-6 lg:my-0">Your next Hire</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="my-2 lg:my-0 w-full">
          <BioSection />
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <div className="flex gap-[10px]">
            <a
              href="https://www.linkedin.com/in/bruce-ww/"
              className="w-[30px] h-[30px] rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-gray-700" />
            </a>
            <a
              href="https://github.com/Placathose"
              className="w-[30px] h-[30px] rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-gray-700" />
            </a>
          </div>
        </div>


      </div>

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  );
}
