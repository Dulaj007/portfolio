"use client";

import { useState, useRef, useMemo } from "react";
import Balatro from "./heroBackground";
import "./animationStyles.css";
import { createParallaxHandler } from "./useParallax";
import HeroNavbar from "./HeroNavbar";

/**
 * Hero Section Component
 * - Handles parallax interaction (mouse move)
 * - Displays animated background (memoized)
 * - Contains main hero text + CTA
 */
export default function Hero() {

  const parallax = useMemo(() => createParallaxHandler(), []);
  /**
   * Navigation menu toggle state
   */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /**
   * Refs used for parallax transform (avoids re-renders)
   */
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  /**
   * Memoized background to prevent re-render on state change
   */
  const background = useMemo(() => {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 animate-bg-fade-spin origin-center">
        <Balatro />
      </div>
    );
  }, []);

  return (
    <section
      /**
       * Mouse-based parallax movement
       */
      onMouseMove={(e) => parallax(e.nativeEvent, titleRef, subtitleRef)}
      className="relative w-full h-[130vh] bg-black overflow-hidden select-none"
    >
      {/* Background Layer */}
      {background}

      {/* Top Navigation */}
      <HeroNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white px-6 text-center pointer-events-none">
        
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl"
          style={{ transition: "transform 0.15s ease-out" }}
        >
          <span className="block overflow-hidden">

            {/* Left Slide Text */}
            <span className="block opacity-0 animate-slide-left">
              Full Stack
              <span className="inline-block animate-spin-pause mx-4 pointer-events-auto">
                +
              </span>
            </span>

            {/* Right Slide Text */}
            <span className="block opacity-0 animate-slide-right">
              Game Dev
            </span>

          </span>
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="pl-3 md:pl-auto
            mt-4 md:mt-6 
            flex items-center justify-center 
            text-xl md:text-4xl xl:text-7xl 
            font-medium 
            tracking-[0.3em] md:tracking-[0.4em] 
            uppercase 
            text-white 
            overflow-hidden
          "
          style={{ transition: "transform 0.15s ease-out" }}
        >
          <span className="block animate-reveal-down text-center">
            Yasitha Dulaj
          </span>
        </div>

        {/* CTA - Open to Work */}
        <div className="absolute bottom-6 md:bottom-10 left-6  md:left-auto md:right-16 z-20 overflow-hidden py-2 pointer-events-auto">
          <a
            href="#contact"
            className="flex flex-col items-start gap-1 text-white group cursor-pointer md:animate-reveal-up"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-medium tracking-wide">
                OPEN TO WORK
              </span>

              {/* Rotating Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[spin_4s_linear_infinite]"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>

            {/* Location */}
            <span className="text-sm md:text-lg font-light text-gray-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
              Based in Sri Lanka
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}