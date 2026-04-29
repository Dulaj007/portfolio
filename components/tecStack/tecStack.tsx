'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Note: SplitText is a Club GSAP premium plugin

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiLaravel,
  SiCodeigniter,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiFigma,
  SiPython,
  SiSharp,
  SiReact,
  SiUnity,
  SiUnrealengine,
} from 'react-icons/si';

/**
 * ==========================================
 * DATA CONSTANT: allTechItems
 * ==========================================
 * An array of objects representing the technology stack.
 * Each object contains the display name of the tech and its corresponding 
 * React Icon component. Keeping this outside the component prevents 
 * recreation on every render.
 */
const allTechItems = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'Framer Motion', icon: <SiFramer /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'Laravel', icon: <SiLaravel /> },
  { name: 'CodeIgniter', icon: <SiCodeigniter /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Android', icon: <FaJava /> },
  { name: 'React Native', icon: <SiReact /> },
  { name: 'C#', icon: <SiSharp /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Figma', icon: <SiFigma /> },
  { name: 'Unity', icon: <SiUnity /> },
  { name: 'Unreal Engine', icon: <SiUnrealengine /> },
];

/**
 * ==========================================
 * COMPONENT: TecStack
 * ==========================================
 * Displays a highly animated, responsive grid of technology stack icons.
 * Uses GSAP SplitText for entry animations on the typography.
 */
export default function TecStack() {
  /**
   * ==========================================
   * 1. DOM REFERENCES (REFS)
   * ==========================================
   * Used to target the specific text elements for the GSAP SplitText animations.
   */
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  /**
   * ==========================================
   * 2. GSAP ANIMATION LIFECYCLE
   * ==========================================
   */
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    if (!titleRef.current || !descRef.current) return;

    // Split the text into characters
    const splitTitle = new SplitText(titleRef.current, { type: 'chars' });
    const splitDesc = new SplitText(descRef.current, { type: 'chars' });

    // Combine characters to animate them in one smooth sequence
    const allChars = [...splitTitle.chars, ...splitDesc.chars];

    // Character sliding/fading animation triggered on scroll
    gsap.from(allChars, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%', 
      },
      x: 150,
      opacity: 0,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.04,
    });

    // Cleanup to prevent memory leaks on component unmount
    return () => {
      splitTitle.revert();
      splitDesc.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /**
   * ==========================================
   * 3. JSX RENDER
   * ==========================================
   */
  return (
    <section className="w-full min-h-screen text-white py-16 md:py-20 lg:py-28 relative px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/**
         * ==========================================
         * HEADER SECTION
         * ==========================================
         * Contains the title and description, targeted by GSAP refs.
         */}
        {/* LEFT / HEADER */}
        <div className="flex flex-col justify-center text-center">
          <h1 
            ref={titleRef} 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tight"
          >
            I BUILD<br className='md:hidden'/>  THINGS <br />
            THAT DON’T <br />
            BREAK AT <span className="text-red-500">2 AM.</span>
          </h1>

          <p 
            ref={descRef} 
            className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-xl mb-8 md:mb-10 px-2 sm:px-0"
          >
            From simple websites to full platforms — and even game worlds.
          </p>
        </div>

        {/**
         * ==========================================
         * TECH STACK GRID SECTION
         * ==========================================
         * Dynamically maps over the `allTechItems` array to render responsive, 
         * interactive cards with hover states and blurred glow effects.
         */}
        {/* RIGHT / CARDS */}
        <div className="w-full mt-6 sm:mt-10">
          {/* GRID: Responsive columns mapping */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-6">
            {allTechItems.map((tech, i) => (
              <div
                key={i}
                className="group relative border border-gray-800 xl:rounded-2xl p-3 lg:p-8  flex flex-col items-center justify-center gap-3 lg:gap-4 bg-black/10 backdrop-blur-2xl hover:border-red-500 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl group-hover:scale-125 md:group-hover:scale-130 text-gray-300 group-hover:text-red-500 transition duration-500">
                  {tech.icon}
                </div>

                <p className="text-xs sm:text-sm md:text-base group-hover:scale-110 text-gray-400 group-hover:text-white text-center duration-500">
                  {tech.name}
                </p>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-red-500/10 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}