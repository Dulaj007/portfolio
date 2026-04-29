'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ==========================================
 * COMPONENT: About
 * ==========================================
 * This component features a split layout with two main visual effects:
 * 1. Background typography that scrolls horizontally in opposing directions based on page scroll.
 * 2. A foreground "letter" or card that reacts to the mouse position with a 3D parallax tilt effect.
 */
export default function About() {
  /**
   * ==========================================
   * 1. DOM REFERENCES (REFS)
   * ==========================================
   * These refs are used to bind DOM elements directly to GSAP animations,
   * avoiding the need for standard React state triggers which would cause
   * unnecessary and unperformant re-renders during high-frequency events (like scrolling/mouse move).
   */
  const sectionRef = useRef<HTMLElement>(null);
  
  // Background Text Refs: Target the individual scrolling text lines
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line5Ref = useRef<HTMLDivElement>(null);
  const line6Ref = useRef<HTMLDivElement>(null);

  // 3D Letter Refs: Target the nested containers required for the 3D parallax effect
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const letterOuterRef = useRef<HTMLDivElement>(null);
  const letterInnerRef = useRef<HTMLDivElement>(null);

  /**
   * ==========================================
   * 2. GSAP ANIMATION LIFECYCLE
   * ==========================================
   */
  useEffect(() => {
    // Register ScrollTrigger so GSAP knows how to link animations to the scrollbar
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const letterContainer = letterContainerRef.current;
    const letterOuter = letterOuterRef.current;
    const letterInner = letterInnerRef.current;

    let handlePointerMove: (e: PointerEvent) => void;
    let handlePointerLeave: () => void;

    // Create a GSAP Context. This is crucial in React to group all animations
    // so they can be easily killed/reverted when the component unmounts.
    const ctx = gsap.context(() => {
      
      /**
       * ==========================================
       * SCROLL ANIMATION FOR BACKGROUND TEXT
       * ==========================================
       * Creates a timeline linked to the section's scroll position.
       * 'scrub: 1' means the animation progress is tied directly to the scrollbar,
       * but with a 1-second smoothing delay so it feels fluid.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // Start when section enters screen from bottom
          end: 'bottom top',   // End when section leaves screen at top
          scrub: 1,            // Smooth scrubbing linked to scroll
        },
      });

      // Animate the background lines horizontally.
      // xPercent moves them relative to their own width in opposing directions
      // The '0' at the end ensures they all start animating at the exact same time.
      tl.to(line1Ref.current, { xPercent: -30, ease: 'none' }, 0);
      tl.to(line2Ref.current, { xPercent: 30, ease: 'none' }, 0);
      tl.to(line3Ref.current, { xPercent: -30, ease: 'none' }, 0);


      /**
       * ==========================================
       * 3D MOUSE HOVER EFFECT FOR LETTER
       * ==========================================
       * Uses mouse coordinates to calculate rotation and translation values.
       */
      if (section && letterContainer && letterOuter && letterInner) {
        // Set perspective on the parent to create the illusion of 3D depth
        gsap.set(letterContainer, { perspective: 1000 }); 

        // gsap.quickTo is heavily optimized for continuous, high-frequency updates (like mousemove)
        const outerRX = gsap.quickTo(letterOuter, "rotationX", { ease: "power3" });
        const outerRY = gsap.quickTo(letterOuter, "rotationY", { ease: "power3" });
        const innerX = gsap.quickTo(letterInner, "x", { ease: "power3" });
        const innerY = gsap.quickTo(letterInner, "y", { ease: "power3" });

        handlePointerMove = (e: PointerEvent) => {
          // Normalize mouse coordinates to a 0-1 range based on window size
          const cy = e.clientY / window.innerHeight;
          const cx = e.clientX / window.innerWidth;

          // Interpolate rotations and translations based on mouse position
          outerRX(gsap.utils.interpolate(10, -10, cy)); 
          outerRY(gsap.utils.interpolate(-10, 10, cx));
          innerX(gsap.utils.interpolate(-20, 20, cx));
          innerY(gsap.utils.interpolate(-20, 20, cy));
        };

        handlePointerLeave = () => {
          // Snap everything back to a flat, default state when the mouse leaves
          outerRX(0);
          outerRY(0);
          innerX(0);
          innerY(0);
        };

        // Attach listener to the whole section so it reacts continuously
        section.addEventListener("pointermove", handlePointerMove);
        section.addEventListener("pointerleave", handlePointerLeave);
      }
    }, sectionRef);

    /**
     * ==========================================
     * 3. CLEANUP
     * ==========================================
     * Runs when the component unmounts to prevent memory leaks,
     * duplicate event listeners, and stranded GSAP scroll triggers.
     */
    return () => {
      if (section) {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
      }
      ctx.revert();
    };
  }, []);

  // Helper string to prevent text from ending during scroll. 
  // It is repeated enough times to overflow the screen horizontally.
  const repeatedText = "YASITHA DULAJ YASITHA DULAJ YASITHA DULAJ YASITHA DULAJ YASITHA DULAJ YASITHA DULAJ YASITHA DULAJ ";

  /**
   * ==========================================
   * 4. JSX RENDER
   * ==========================================
   */
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-auto mt-5 md:mt-20 bg-black flex items-center justify-center overflow-hidden py-20 select-none"
    >
      
      {/**
       * ==========================================
       * BACKGROUND SCROLLING TEXT LAYER
       * ==========================================
       * Uses transparent text with a webkit-stroke to create an outlined typography effect.
       */}
      {/* Background Scrolling Text */}
      <div className="absolute inset-0 flex flex-col justify-center z-0 gap-15 pointer-events-none overflow-hidden leading-[0.8]">
        
        <div 
          ref={line1Ref} 
          className="whitespace-nowrap text-[14vw] md:text-[12vw] lg:text-[9.5vw] font-black uppercase tracking-tighter"
          style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)', color: 'transparent' }}
        >
          {repeatedText}
        </div>

        <div 
          ref={line2Ref} 
          className="whitespace-nowrap text-[14vw] md:text-[12vw] lg:text-[9.5vw] font-black uppercase tracking-tighter -ml-[50%] -mt-[2vw]"
          style={{ WebkitTextStroke: '2px rgba(255, 0, 0, 0.4)', color: 'transparent' }}
        >
          {repeatedText}
        </div>

        <div 
          ref={line3Ref} 
          className="whitespace-nowrap text-[14vw] md:text-[12vw] lg:text-[9.5vw] font-black uppercase tracking-tighter -mt-[2vw]"
          style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)', color: 'transparent' }}
        >
          {repeatedText}
        </div>

      </div>

      {/**
       * ==========================================
       * FOREGROUND CONTENT (3D LETTER)
       * ==========================================
       * Nesting structure required for GSAP 3D effect:
       * 1. Perspective container
       * 2. Rotation container (Outer)
       * 3. Translation container (Inner / Actual Card)
       */}

      {/* Foreground "Letter" Content with 3D Wrappers */}
      {/* 1. Perspective Container */}
      <div ref={letterContainerRef} className="relative z-10 w-[90%] max-w-3xl pointer-events-none">
        
        {/* 2. Outer Rotation Container */}
        <div ref={letterOuterRef} className="w-full">
          
          {/* 3. Inner Translation Container (The actual visible card) */}
          <div 
            ref={letterInnerRef}
            className="w-full bg-[#f8f8f8] text-black p-6 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative pointer-events-auto"
          >
            
            {/* Noise Texture Layer to give the card a paper-like, tactile feel */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply"
              style={{ backgroundImage: 'url("https://assets.codepen.io/16327/noise.png")' }}
            />

            {/* Text Content Layer */}
            <div className="relative z-10 flex flex-col gap-3 md:gap-6 text-sm md:text-base lg:text-2xl font-medium leading-relaxed tracking-wide font-bold">
         <p> With <span className='text-red-600 hover-sweep'>3 years</span> of experience delivering interactive projects, I leverage every available resource and modern tool to push my <span className='text-red-600 hover-sweep'>work</span> to its <span className='text-red-600 hover-sweep'>absolute limits.</span> This ensures that every final product is optimized, high-performance, and SEO-friendly, focusing on achieving the <span className='text-red-600 hover-sweep'>best </span> possible <span className='text-red-600 hover-sweep'>outcome for the client</span> by combining technical rigor with maximum efficiency. </p> <p> I am currently a 3rd-year <span className='text-red-600 hover-sweep'>Software Engineering</span> undergraduate at the Open University of Sri Lanka, where I balance academic knowledge with a hands-on obsession for building complex systems like my recent indie horror game <span className='text-red-600 hover-sweep'>WARD21</span>, which I developed entirely from scratch. </p> <p> I am a firm <span className='text-red-600 hover-sweep'>believer</span> in the power <span className='text-red-600 hover-sweep'>of feedback</span> and <span className='text-red-600 hover-sweep'>continuous support. </span> If you are looking for a developer who is fully committed to the "long game" and isn't afraid to innovate to deliver a superior product, let’s talk. </p>
            </div>

          </div>
        </div>
      </div>
      
    </section>
  );
}