"use client";

import { useState, useRef, useMemo } from "react";
import Balatro from "../overlay/LiquidOverlay";

// 🔥 1. Moved styles OUTSIDE the component so React doesn't 
// re-inject and recalculate them on every single state change.
const ANIMATION_STYLES = `
  /* 1. Fast Spin Pause for the '+' */
  @keyframes fast-spin-pause {
    0% { transform: rotate(0deg); }
    8% { transform: rotate(360deg); } 
    100% { transform: rotate(360deg); } 
  }
  .animate-spin-pause {
    animation: fast-spin-pause 6s ease-in-out infinite; 
  }

  /* 2. Fade In + Slight Spin for Background */
  @keyframes fade-spin-in {
    0% { opacity: 0; transform: scale(1.1) rotate(-8deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  .animate-bg-fade-spin {
    animation: fade-spin-in 2.5s ease-out forwards;
  }

  /* 3. Slide In Left for "Full Stack +" */
  @keyframes slide-in-left {
    0% { opacity: 0; transform: translateX(-30vw); }
    100% { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-left {
    animation: slide-in-left 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* 4. Slide In Right for "Game Dev" */
  @keyframes slide-in-right {
    0% { opacity: 0; transform: translateX(30vw); }
    100% { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-right {
    animation: slide-in-right 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* 5. Masked Reveal Down (Top to Bottom, No Fade) */
  @keyframes reveal-down {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(0); }
  }
  .animate-reveal-down {
    /* "both" ensures it stays hidden at -100% before the delay finishes */
    animation: reveal-down 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: 0.3s; 
  }

  /* 6. Masked Reveal Up (Bottom to Top, No Fade) */
  @keyframes reveal-up {
    0% { transform: translateY(110%); }
    100% { transform: translateY(0); }
  }
  .animate-reveal-up {
    animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: 0.6s;
  }
`;

export default function Hero() {
  // State to manage menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs to directly manipulate the DOM elements without re-rendering the component
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Directly update the transform style to prevent background flashing
  const handleMouseMove = (e) => {
    if (typeof window !== "undefined") {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // 🔥 TWEAK THESE NUMBERS TO CHANGE HOW FAR IT MOVES
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
      }
    }
  };

  // 🔥 2. useMemo caches the background so it DOES NOT re-render when the menu state changes
  const memoizedBackground = useMemo(() => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 animate-bg-fade-spin origin-center">
      <Balatro />
    </div>
  ), []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[130vh] bg-black overflow-hidden select-none"
    >
      
      {/* Inject styles statically */}
      <style dangerouslySetInnerHTML={{__html: ANIMATION_STYLES}} />

      {/* Render the cached background */}
      {memoizedBackground}

      {/* 🔥 Animated Top Right Navigation */}
      <div className="absolute top-8 right-8 md:top-10 md:right-10 z-30 flex items-center justify-end">
        
        {/* Expanding Menu Items (1 2 3) */}
        <nav 
          className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "w-[240px] md:w-[300px] opacity-100 mr-4" : "w-0 opacity-0 mr-0 pointer-events-none"
          }`}
        >
          <ul className="flex items-center gap-4 md:gap-6 min-w-max w-full uppercase justify-end">
            {["About", "Work", "Connect"].map((item, index) => (
              <li 
                key={item}
                className={`transition-all duration-500 ease-out transform ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms" }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white text-sm md:text-base font-medium relative group pb-1 transition-all duration-300 hover:text-[#ff0e00] hover:scale-95 hover:brightness-90"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-[#ff0e00] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu Icon (Transforms into X) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-40 text-white hover:text-red-400 transition-colors duration-300 focus:outline-none flex items-center justify-center w-10 h-10"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="overflow-visible"
          >
            {/* Top Line */}
            <line 
              x1="3" y1="6" x2="21" y2="6" 
              className={`origin-center transition-all duration-300 ease-in-out ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            {/* Middle Line */}
            <line 
              x1="3" y1="12" x2="21" y2="12" 
              className={`transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            {/* Bottom Line */}
            <line 
              x1="3" y1="18" x2="21" y2="18" 
              className={`origin-center transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </svg>
        </button>
      </div>

      {/* 🔥 Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white px-6 text-center pointer-events-none">
        
        {/* Main Name Heading */}
        <h1 
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-[8rem] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl"
          style={{ transition: 'transform 0.15s ease-out' }}
        >
          <span className="block text-white overflow-hidden "> 
            
            {/* Slides in from the left */}
            <span className="block opacity-0 animate-slide-left">
              Full Stack 
              <span className="inline-block animate-spin-pause mx-4 pointer-events-auto">+</span>
            </span> 
            
            {/* Slides in from the right */}
            <span className="block opacity-0 animate-slide-right">
              Game Dev
            </span>
            
          </span>
        </h1>

        {/* Subtitle / Roles - Wrapped in an overflow-hidden mask */}
        <div 
          ref={subtitleRef}
          className="mt-4 md:mt-6 flex items-center justify-center space-x-4 md:space-x-4 text-center text-xl md:text-4xl xl:text-7xl font-medium tracking-[0.4em] uppercase text-white overflow-hidden "
          style={{ transition: 'transform 0.15s ease-out' }}
        >
          {/* Inner span handles the Masked Reveal Down (Top to Bottom) */}
          <span className="block animate-reveal-down text-center">
            Yasitha Dulaj
          </span>
        </div>
        
        {/* 🔥 Open to Work Badge - Bottom Right Container has overflow-hidden mask */}
        <div className="absolute bottom-12 right-8 md:bottom-16 md:right-16 z-20 overflow-hidden pb-2 pt-2 pointer-events-auto">
          <a 
            href="#contact"
            className="flex flex-col items-start gap-1 text-white group cursor-pointer animate-reveal-up"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-medium tracking-wide">OPEN TO WORK</span>
              
              {/* Slowly Spinning Sparkle Icon */}
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
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
              </svg>
            </div>

            {/* Location with Left-to-Right Underline Animation on Hover */}
            <span className="text-sm md:text-lg font-light text-gray-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
              Based in Sri Lanka
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}