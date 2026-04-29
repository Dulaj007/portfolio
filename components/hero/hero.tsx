"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Balatro from "./heroBackground";
import "./animationStyles.css";
import { createParallaxHandler } from "./useParallax";
import HeroNavbar from "./HeroNavbar";
import TecStack from "../tecStack/tecStack";

export default function Hero() {
  /**
   * ==========================================
   * 1. MEMOIZED HANDLERS
   * ==========================================
   * Create a memoized instance of the parallax handler so it doesn't 
   * recreate on every render.
   */
  const parallax = useMemo(() => createParallaxHandler(), []);
  
  /**
   * ==========================================
   * 2. STATE MANAGEMENT
   * ==========================================
   */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  // State to track if the background should be rendered (for performance optimization)
  const [showBg, setShowBg] = useState<boolean>(true);

  /**
   * ==========================================
   * 3. DOM REFERENCES (REFS)
   * ==========================================
   * These refs are used by GSAP to target specific DOM elements 
   * without needing to query the DOM directly.
   */
  // Ref for the entire hero section so GSAP can track its scroll position
  const heroRef = useRef<HTMLElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  // Refs for the Hero text 3D parallax effect container
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Refs for the Tech Stack 3D parallax effect container
  const techContainerRef = useRef<HTMLDivElement | null>(null);
  const techOuterRef = useRef<HTMLDivElement | null>(null);
  const techInnerRef = useRef<HTMLDivElement | null>(null);

  /**
   * ==========================================
   * 4. GSAP ANIMATIONS & EVENT LISTENERS
   * ==========================================
   */
  useEffect(() => {
    // Register the ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP Context for easy and safe cleanup when the component unmounts
    const ctx = gsap.context(() => {
      
      /**
       * BACKGROUND PERFORMANCE OPTIMIZATION
       * Tracks the Hero section. If the Hero is in the viewport, showBg is true. 
       * If it leaves, showBg is false. This unmounts heavy WebGL components when out of view.
       */
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top bottom", // When the top of the hero enters the bottom of the screen
        end: "bottom top",   // When the bottom of the hero leaves the top of the screen
        onToggle: (self) => {
          setShowBg(self.isActive);
        },
      });

    }, heroRef);

    /**
     * HERO 3D MOUSE PARALLAX EFFECT
     * Tilts the hero text slightly based on the user's cursor position.
     */
    const container = containerRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;

    let handlePointerMove: (e: PointerEvent) => void;
    let handlePointerLeave: () => void;

    if (container && outer && inner) {
      gsap.set(container, { perspective: 650 });

      // quickTo is highly optimized for performance-heavy mouse tracking animations
      const outerRX = gsap.quickTo(outer, "rotationX", { ease: "power3" });
      const outerRY = gsap.quickTo(outer, "rotationY", { ease: "power3" });
      const innerX = gsap.quickTo(inner, "x", { ease: "power3" });
      const innerY = gsap.quickTo(inner, "y", { ease: "power3" });

      handlePointerMove = (e: PointerEvent) => {
        outerRX(gsap.utils.interpolate(5, -5, e.clientY / window.innerHeight));
        outerRY(gsap.utils.interpolate(-5, 5, e.clientX / window.innerWidth));
        innerX(gsap.utils.interpolate(-10, 10, e.clientX / window.innerWidth));
        innerY(gsap.utils.interpolate(-10, 10, e.clientY / window.innerHeight));
      };

      handlePointerLeave = () => {
        // Reset positions when the cursor leaves the container
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    /**
     * TECH STACK 3D MOUSE PARALLAX EFFECT
     * Similar to the hero text, but localized to the dimensions of the Tech Stack container.
     */
    const techContainer = techContainerRef.current;
    const techOuter = techOuterRef.current;
    const techInner = techInnerRef.current;

    let handleTechPointerMove: (e: PointerEvent) => void;
    let handleTechPointerLeave: () => void;

    if (techContainer && techOuter && techInner) {
      gsap.set(techContainer, { perspective: 1000 });

      const tOuterRX = gsap.quickTo(techOuter, "rotationX", { ease: "power3" });
      const tOuterRY = gsap.quickTo(techOuter, "rotationY", { ease: "power3" });
      const tInnerX = gsap.quickTo(techInner, "x", { ease: "power3" });
      const tInnerY = gsap.quickTo(techInner, "y", { ease: "power3" });

      handleTechPointerMove = (e: PointerEvent) => {
        // Calculate cursor position relative to the tech container itself, not the whole window
        const rect = techContainer.getBoundingClientRect();
        const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        tOuterRX(gsap.utils.interpolate(5, -5, relY));
        tOuterRY(gsap.utils.interpolate(-5, 5, relX));
        tInnerX(gsap.utils.interpolate(-10, 10, relX));
        tInnerY(gsap.utils.interpolate(-10, 10, relY));
      };

      handleTechPointerLeave = () => {
        tOuterRX(0);
        tOuterRY(0);
        tInnerX(0);
        tInnerY(0);
      };

      techContainer.addEventListener("pointermove", handleTechPointerMove);
      techContainer.addEventListener("pointerleave", handleTechPointerLeave);
    }

    /**
     * CLEANUP PHASE
     * Removes event listeners and reverts GSAP context to prevent memory leaks on unmount.
     */
    return () => {
      ctx.revert(); // Cleans up the ScrollTrigger automatically
      
      if (container) {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      }
      if (techContainer) {
        techContainer.removeEventListener("pointermove", handleTechPointerMove);
        techContainer.removeEventListener("pointerleave", handleTechPointerLeave);
      }
    };
  }, []);

  /**
   * ==========================================
   * 5. MEMOIZED COMPONENT RENDERING
   * ==========================================
   * Background memo is strictly dependent on the showBg state.
   */
  const background = useMemo(() => {
    // If showBg is false, return null to completely unmount the WebGL component!
    if (!showBg) return null; 

    return (
      <>
        <style>{`
          @keyframes customFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-only {
            animation: customFadeIn 2.5s ease-in-out forwards;
          }
        `}</style>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 animate-fade-only origin-center">
          <Balatro />
        </div>
      </>
    );
  }, [showBg]);

  /**
   * ==========================================
   * 6. JSX RENDER
   * ==========================================
   */
  return (
    <>
    <section
      ref={heroRef} // Attach the ref here so GSAP knows when the section is visible
      onMouseMove={(e) => parallax(e.nativeEvent, titleRef, subtitleRef)}
      className="relative w-full h-[330vh] bg-black overflow-hidden select-none"
    >
      {/* Dynamic Background Layer */}
      {background}

      {/* Top Navigation Component */}
      <HeroNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Hero Content Area */}
      <div 
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 sm:px-6 md:px-8 text-center"
      >
        
        {/* 3D GSAP Wrapper for Hero Titles */}
        <div ref={outerRef} className="flex flex-col items-center justify-center pointer-events-none w-full">
          <div ref={innerRef} className="flex flex-col items-center justify-center w-full">

            <h1
              ref={titleRef}
              className="text-[20vw] sm:text-7xl md:text-[8rem] lg:text-[10rem] xl:text-[11rem] font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85] drop-shadow-2xl"
            >
              <span className="block overflow-hidden">
                <span className="block opacity-0 animate-slide-left ">
                  Full Stack
                  <span className="inline-block animate-spin-pause mx-2 md:mx-4 pointer-events-auto">
                    +
                  </span>
                </span>
                <span className="block opacity-0 animate-slide-right">
                  Game Dev
                </span>
              </span>
            </h1>

            <div
              ref={subtitleRef}
              className="mt-3 md:mt-6 flex items-center justify-center text-base sm:text-xl md:text-4xl xl:text-7xl font-medium tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase text-white overflow-hidden w-full"
            >
              <span className="block animate-reveal-down text-center">
                Yasitha Dulaj
              </span>
            </div>

          </div>
        </div>

        {/* Call to Action (CTA) Box */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-16 z-20 overflow-hidden py-2 pointer-events-auto">
          <a
            href="#contact"
            className="flex flex-col items-center md:items-start gap-1 text-white group cursor-pointer md:animate-reveal-up"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide whitespace-nowrap">
                OPEN TO WORK
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_4s_linear_infinite] w-6 h-6 md:w-7 md:h-7">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm md:text-lg font-light text-gray-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
              Based in Sri Lanka
            </span>
          </a>
        </div>

      </div>
      
      {/* 3D GSAP Wrapper for Tech Stack Area */}
      <div ref={techContainerRef} className="relative z-10 w-full px-4 sm:px-6 md:px-8 pt-10 md:pt-60">
        <div ref={techOuterRef} className="w-full">
          <div ref={techInnerRef} className="w-full">
            <TecStack />
          </div>
        </div>
      </div>

    </section>
    </>
  );
}