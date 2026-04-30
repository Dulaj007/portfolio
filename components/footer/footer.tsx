// E:\Projects\ydulaj\components\footer\footer.tsx
"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ==========================================
 * COMPONENT: Footer
 * ==========================================
 * The global footer for the application. Contains a call-to-action,
 * contact information, animated social media links, and a large 
 * responsive branding typography section at the bottom.
 * Now enhanced with GSAP ScrollTrigger entry animations.
 */
const Footer = () => {
  /**
   * ==========================================
   * 1. DOM REFERENCES
   * ==========================================
   * Ref for the entire footer section to scope our GSAP animations.
   */
  const footerRef = useRef<HTMLElement>(null);

  /**
   * ==========================================
   * 2. GSAP ANIMATION LIFECYCLE
   * ==========================================
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Context scopes all animations to the footer element
    // and makes cleanup incredibly easy.
    const ctx = gsap.context(() => {
      // Create a master timeline triggered when the footer enters the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%", // Start when the top of the footer hits 80% down the viewport
        },
      });

      // 1. Animate upper content: Headers, Paragraphs, Buttons, Social Links
      // Slide them up and fade them in with a slight stagger
      tl.from(".animate-fade-up", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Animate the massive branding text at the bottom
      // Using yPercent: 100 inside an overflow-hidden container gives it a "revealing from the floor" effect
      tl.from(
        ".animate-big-text",
        {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.6" // Start this slightly before the fade-up animations finish
      );
    }, footerRef);

    // Cleanup animations on unmount
    return () => ctx.revert();
  }, []);

  return (
    /**
     * ==========================================
     * MAIN CONTAINER
     * ==========================================
     * A dark-themed footer that stretches to at least 90% of the viewport height.
     * Uses Flexbox to organize the upper content and the massive text at the bottom.
     */
    <footer 
      ref={footerRef}
      className="w-full bg-black text-zinc-100 min-h-[90vh] flex flex-col font-sans relative overflow-hidden"
    >
      
      {/**
       * ==========================================
       * UPPER SECTION
       * ==========================================
       * Creates a responsive split layout. On mobile, it stacks vertically.
       * On desktop (md:), it splits into left (Contact) and right (Socials) columns.
       */}
      {/* Upper part */}
      <div className="flex-grow flex flex-col md:flex-row justify-between items-start px-6 pt-20 pb-16 md:px-16 md:pt-24 lg:px-24">
        
        {/**
         * ==========================================
         * LEFT COLUMN: CALL TO ACTION
         * ==========================================
         * Displays the primary "LET'S WORK TOGETHER" message, an email link,
         * and a hover-animated contact button with a directional arrow.
         * Classes `animate-fade-up` added for GSAP targeting.
         */}
        {/* Left */}
        <div className="flex flex-col gap-y-2 max-w-6xl">
          <h3 className="animate-fade-up text-xl md:text-5xl font-bold tracking-tight text-zinc-300">
            LET’S WORK TOGETHER.
          </h3>
          <p className="animate-fade-up text-base md:text-xl leading-relaxed text-zinc-400">
            Do you have any questions? Ideas? Or just curious? <br />
            Leave a message{" "}
            <Link
              href="mailto:yasithadulaj@gmail.com"
              className="text-cream-color font-semibold hover:underline"
            >
              yasithadulaj@gmail.com
            </Link>
          </p>
          <div className="animate-fade-up">
            <a href="mailto:yasithadulaj@gmail.com">
            <button className="hover:bg-white gap-2 items-center justify-center px-3 flex flex-row border border-white p-2 text-white mt-1 text-lg hover:scale-98 hover:text-black rounded-full w-40 transition-transform duration-500">
              <span className="flex">Contact</span>        
              <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 rotate-45"
                  >
                  <path
                      d="M12 4V20M12 4L8 8M12 4L16 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
              </svg>
            </button>
            </a>
          </div>
        </div>

        {/**
         * ==========================================
         * RIGHT COLUMN: SOCIAL LINKS
         * ==========================================
         * Displays a list of external social profiles (Instagram, LinkedIn, GitHub).
         * Each link features SVG icons with hover effects (scaling and rotating).
         * Classes `animate-fade-up` added for GSAP targeting.
         */}
        {/* Right */}
        <div className="flex flex-col items-start gap-y-6 md:items-end md:text-right mt-12 md:mt-0">
          <h3 className="animate-fade-up text-xl md:text-3xl font-bold tracking-tight text-red-600 mr-8">
            CONNECT WITH ME.
          </h3>

          <div className="flex flex-col items-start md:items-end gap-y-4">

            {/* Instagram */}
            <Link
              href="https://instagram.com/itsdulaj/"
              target="_blank"
              className=" flex items-center gap-x-3 group text-red-600 hover:text-red-400  transition-all"
            >
              <svg
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm9.25 1.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
              <span className="text-base md:text-xl animate-fade-up">Instagram</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rotate-45 animate-fade-up"
                >
                <path
                    d="M12 4V20M12 4L8 8M12 4L16 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="http://www.linkedin.com/in/yasitha-dulaj"
              target="_blank"
              className=" flex items-center gap-x-3 group text-red-600 hover:text-red-400  transition-all"
            >
              <svg
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 mb-1" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.95 1.7-2.2 3.5-2.2 3.75 0 4.45 2.47 4.45 5.68V24h-4v-8.4c0-2-.03-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.45V24h-4V8z" />
              </svg>
              <span className="text-base md:text-xl animate-fade-up">LinkedIn</span>    
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rotate-45 animate-fade-up"
                >
                <path
                    d="M12 4V20M12 4L8 8M12 4L16 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/Dulaj007"
              target="_blank"
              className=" flex items-center gap-x-3 group text-red-600 hover:text-red-400  transition-all"
            >
              <svg
                className="w-5 h-5  transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.88 3.16 9.02 7.55 10.49.55.1.75-.24.75-.53v-1.87c-3.07.67-3.72-1.48-3.72-1.48-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.7-1.47-2.45-.28-5.02-1.22-5.02-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.15-5.04 5.43.39.33.73.99.73 2v2.96c0 .29.2.64.76.53 4.38-1.47 7.54-5.61 7.54-10.49C23.01 5.24 18.27.5 12 .5z" />
              </svg>
              <span className="text-base md:text-xl animate-fade-up">GitHub</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rotate-45 animate-fade-up"
                >
                <path
                    d="M12 4V20M12 4L8 8M12 4L16 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </Link>

          </div>
        </div>
      </div>

      {/**
       * ==========================================
       * BIG TEXT: BRANDING
       * ==========================================
       * An edge-to-edge typography display at the bottom of the section.
       * Split into spans to allow GSAP to slide each part up from the bottom boundary.
       * The `flex` and `overflow-hidden` on the parent allow the 100% y translation to hide the text underneath.
       */}
      {/* Big Text */}
      <div className="w-full flex-shrink-0 flex items-end justify-center overflow-hidden">
        <h1
          className="leading-none text-[30vw] mb-5 font-serif font-bold text-cream-color tracking-tighter flex overflow-hidden"
          style={{ letterSpacing: "-0.06em" }}
        >
          <span className="animate-big-text block">y</span>
          <span className="animate-big-text block text-red-600">dulaj.</span>
        </h1>
      </div>

      {/**
       * ==========================================
       * BOTTOM BAR: COPYRIGHT
       * ==========================================
       * Small, absolutely positioned copyright notice pinned to the bottom.
       */}
      {/* Bottom bar */}
      <div className="w-full flex absolute bottom-1 justify-center items-center px-8 py-4 text-xs font-mono">
        <span className="animate-fade-up">© 2025 YASITHA DULAJ.</span>
      </div>

      {/**
       * ==========================================
       * STYLES: CUSTOM VARIABLES
       * ==========================================
       * Scoped JSX styling to define a specific custom hex color used in this component.
       */}
      <style jsx global>{`
        .text-cream-color {
          color: #f8f6f0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;