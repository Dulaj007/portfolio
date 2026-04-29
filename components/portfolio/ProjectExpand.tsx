/**
 * ============================================================================
 * File: E:\Projects\ydulaj\components\portfolio\ProjectExpand.tsx
 * Description: The main React component utilizing GSAP for advanced scroll 
 * animations, 3D mouse tracking, and full-screen wipe effects.
 * ============================================================================
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; 
import Image from 'next/image';

// Import the strictly typed data and interface from the constants file
import { projects, type Project } from './projectData';

export default function ProjectExpand() {
  /** * ==========================================
   * REFS: DOM Element Trackers
   * ==========================================
   */
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const globalProgressRef = useRef<SVGPathElement>(null);
  
  // Background 3D Text & Bubble Refs
  const bgTextContainerRef = useRef<HTMLDivElement>(null); 
  const bgTextOuterRef = useRef<HTMLDivElement>(null);
  const bgTextInnerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  
  // Arrays of refs for the dynamic project items mapping
  const wipeOuterRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const wipeInnerRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const innerProgressRefs = useRef<(SVGPathElement | null)[]>([]);
  
  // 3D wrapper refs for each project's individual content
  const projOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let splitTitles: SplitText | null = null;
    let handlePointerMove: (e: PointerEvent) => void;
    let handlePointerLeave: () => void;

    const section = sectionRef.current;
    const textContainer = bgTextContainerRef.current;
    const textOuter = bgTextOuterRef.current;
    const textInner = bgTextInnerRef.current;
    const bubblesContainer = bubblesRef.current;

    /** * Context ensures all GSAP animations are scoped to this component 
     * and makes cleanup incredibly easy.
     */
    const ctx = gsap.context(() => {
      
      /**
       * --------------------------------------------------
       * 1. TEXT & BUBBLE TRANSITION EFFECT
       * --------------------------------------------------
       * Animates the background text and bubbles when the section
       * scrolls into view (not scrubbed).
       */
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', 
        },
      });

      if (textInner) {
        const targetHeadings = gsap.utils.toArray<HTMLElement>('h2', textInner);
        splitTitles = new SplitText(targetHeadings, { type: 'chars' });

        introTl.from(splitTitles.chars, {
          x: 150,
          opacity: 0,
          duration: 0.7,
          ease: 'power4.out',
          stagger: 0.04,
        }, 0); 
      }

      if (bubblesContainer) {
        const bubbles = bubblesContainer.children;
        gsap.set(bubbles, { scale: 0.3, opacity: 0 }); 

        introTl.to(bubbles, {
          scale: 1,
          opacity: 1, 
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.1,
        }, 0.2); 
      }

      /**
       * --------------------------------------------------
       * 2. 3D MOUSE HOVER EFFECT
       * --------------------------------------------------
       * Creates a parallax 3D tilting effect based on cursor position.
       */
      if (section && textContainer && textOuter && textInner) {
        gsap.set(textContainer, { perspective: 650 });

        const outerRX = gsap.quickTo(textOuter, "rotationX", { ease: "power3" });
        const outerRY = gsap.quickTo(textOuter, "rotationY", { ease: "power3" });
        const innerX = gsap.quickTo(textInner, "x", { ease: "power3" });
        const innerY = gsap.quickTo(textInner, "y", { ease: "power3" });

        const projAnimations = projects.map((_, i) => {
          const pOuter = projOuterRefs.current[i];
          const pInner = projInnerRefs.current[i];
          const pContainer = infoRefs.current[i];

          if (pContainer && pOuter && pInner) {
            gsap.set(pContainer, { perspective: 1000 });
            return {
              oRX: gsap.quickTo(pOuter, "rotationX", { ease: "power3" }),
              oRY: gsap.quickTo(pOuter, "rotationY", { ease: "power3" }),
              iX: gsap.quickTo(pInner, "x", { ease: "power3" }),
              iY: gsap.quickTo(pInner, "y", { ease: "power3" }),
            };
          }
          return null;
        });

        handlePointerMove = (e: PointerEvent) => {
          const cy = e.clientY / window.innerHeight;
          const cx = e.clientX / window.innerWidth;

          outerRX(gsap.utils.interpolate(5, -5, cy));
          outerRY(gsap.utils.interpolate(-5, 5, cx));
          innerX(gsap.utils.interpolate(-10, 10, cx));
          innerY(gsap.utils.interpolate(-10, 10, cy));

          projAnimations.forEach((anim) => {
            if (anim) {
              anim.oRX(gsap.utils.interpolate(8, -8, cy));
              anim.oRY(gsap.utils.interpolate(-8, 8, cx));
              anim.iX(gsap.utils.interpolate(-15, 15, cx));
              anim.iY(gsap.utils.interpolate(-15, 15, cy));
            }
          });
        };

        handlePointerLeave = () => {
          outerRX(0);
          outerRY(0);
          innerX(0);
          innerY(0);

          projAnimations.forEach((anim) => {
            if (anim) {
              anim.oRX(0);
              anim.oRY(0);
              anim.iX(0);
              anim.iY(0);
            }
          });
        };

        section.addEventListener("pointermove", handlePointerMove);
        section.addEventListener("pointerleave", handlePointerLeave);
      }

      /**
       * --------------------------------------------------
       * 3. SCALE VIDEO & DRAW LINE (UNPINNED)
       * --------------------------------------------------
       * Expands the initial video box into full screen on scroll.
       */
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom', 
          scrub: 1,
        }
      });

      scaleTl.to(globalProgressRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 0);

      scaleTl.to(videoContainerRef.current, {
        top: '150vh', 
        width: '100vw',
        height: '100vh',
        ease: 'none',
      }, 0);

      /**
       * --------------------------------------------------
       * 4. PROJECT CONTENT TIMELINE (PINNED)
       * --------------------------------------------------
       * Controls the wipe transition between the projects
       * while the section is pinned to the screen.
       */
      
      // Setup initial states for the full-screen wipe effect
      for (let i = 1; i < projects.length; i++) {
        gsap.set(wipeOuterRefs.current[i], { yPercent: 100 }); // Push mask window down
        gsap.set(wipeInnerRefs.current[i], { yPercent: -100 }); // Push content up to counteract mask
        gsap.set(videoRefs.current[i], { yPercent: 15, opacity: 0.8 }); // Video parallax start position
      }
      gsap.set(videoRefs.current[0], { opacity: 0.8 }); 

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom', 
          end: () => `+=${window.innerHeight * (projects.length * 1.5)}`, 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true, 
        },
      });

      pinTl.to(infoRefs.current[0], {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      }, 0);

      for (let i = 1; i < projects.length; i++) {
        // 4A. Animate the scroll line of the previous project
        pinTl.to(innerProgressRefs.current[i - 1], {
          strokeDashoffset: 0,
          ease: 'none',
        });

        // 4B. Fade out previous text content
        pinTl.to(infoRefs.current[i - 1], {
          opacity: 0,
          y: -20,
          ease: 'power1.inOut',
        });

        // 4C. Execute full-screen wipe transition for the next project
        pinTl.to(wipeOuterRefs.current[i], {
          yPercent: 0,
          ease: 'power2.inOut',
        }, '<'); 

        pinTl.to(wipeInnerRefs.current[i], {
          yPercent: 0,
          ease: 'power2.inOut',
        }, '<');

        pinTl.to(videoRefs.current[i], {
          yPercent: 0,
          ease: 'power2.out', 
        }, '<'); 

        // 4D. Fade in new text content
        pinTl.to(infoRefs.current[i], {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        });
      }

      // Final cleanup animation to hide the very last scroll indicator
// 4E. Final cleanup animation to hide the very last scroll indicator
      const lastProgressRef = innerProgressRefs.current[projects.length - 1] as Element | null;
      const lastIndicator = lastProgressRef?.closest('.inner-scroll-indicator');
      
      if (lastIndicator) {
        pinTl.to(lastIndicator, {
          opacity: 0,
          ease: 'power1.in',
        });
      }

    }, sectionRef);

    /**
     * --------------------------------------------------
     * 5. CLEANUP
     * --------------------------------------------------
     */
    return () => {
      if (splitTitles) splitTitles.revert();
      if (section) {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[200vh] bg-black overflow-hidden select-none">
      
      {/* BACKGROUND LAYER: 0vh - 100vh Space */}
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none">
        
        {/* Blur Bubbles */}
        <div ref={bubblesRef} className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute hidden md:block top-[15%] right-[15%] w-[350px] h-[350px] bg-white/20 md:bg-white opacity-8 rounded-full blur-[80px]" />
          <div className="absolute bottom-[40%]  md:bottom-[60%] left-[10%] w-[500px] h-[200px] bg-white/20 md:bg-white opacity-3 rounded-full blur-[120px]" />
        </div>

        {/* 3D Text Container */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10 ">
          <div ref={bgTextContainerRef} className="w-full">
            <div ref={bgTextOuterRef} className="w-full flex flex-col items-center text-center">
              <div ref={bgTextInnerRef} className="w-full">
                <h2 className="text-[10vw] md:text-8xl lg:text-[9rem] font-black text-white uppercase tracking-tighter leading-[1.1] ">
                  Selected <span className="text-red-600">Work</span>
                </h2>
                <h2 className="text-[8vw] md:text-6xl lg:text-[6.6rem] font-black text-white uppercase tracking-tighter leading-[1.1] ">
                  Say <span className="text-red-600">No</span><br className='md:hidden'/> To Templates
                </h2>
                <h2 className="text-[8vw] md:text-6xl lg:text-[6.6rem] font-black text-white uppercase tracking-tighter leading-[1.1] ">
                  Say Yes <br className='md:hidden'/> To <span className="text-red-600">Feedback</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Global Scroll Indicator */}
        <div className="global-scroll-indicator absolute bottom-[30vh] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-[180px] h-[90px] z-10">
          <span className="absolute bottom-12 md:bottom-15 text-white text-base md:text-lg font-medium tracking-widest">
            Scroll
          </span>
          <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full overflow-visible">
            <path d="M 20 20 Q 100 120 180 20" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" pathLength="100" />
            <path 
              ref={globalProgressRef} 
              d="M 20 20 Q 100 120 180 20" 
              fill="none" 
              stroke="#dc2626" 
              strokeWidth="6" 
              strokeLinecap="round" 
              pathLength="100" 
              strokeDasharray="100" 
              strokeDashoffset="100" 
            />
          </svg>
        </div>

      </div>

      {/* FOREGROUND LAYER: Expanding Video Container */}
      <div 
        ref={videoContainerRef} 
        className="absolute top-[70vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[15px] h-[15px] flex items-center justify-center bg-black overflow-hidden pointer-events-auto"
      >
        {projects.map((project: Project, index: number) => (
          <div 
            key={project.id} 
            ref={(el) => { wipeOuterRefs.current[index] = el; }} // Mask window
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ zIndex: index }} // Ensures new videos stack correctly on top
          >
            <div 
              ref={(el) => { wipeInnerRefs.current[index] = el; }} // Inner moving content
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              
              <video 
                ref={(el) => { videoRefs.current[index] = el; }}
                src={project.videoSrc} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              
              {/* Project Info Overlay */}
              <div 
                ref={(el) => { infoRefs.current[index] = el; }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 translate-y-10 bg-black/40 pointer-events-none"
              >
                <div ref={(el) => { projOuterRefs.current[index] = el; }} className="w-full flex flex-col items-center justify-center">
                  <div ref={(el) => { projInnerRefs.current[index] = el; }} className="w-full flex flex-col items-center justify-center">
                    
                    <div className="mb-4 drop-shadow-xl">
                      {project.isLogo ? (
                        <Image src={project.title} alt="Project Logo" width={300} height={100} className="object-contain w-auto h-16 md:h-24" />
                      ) : (
                        <h3 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter text-center">
                          {project.title}
                        </h3>
                      )}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-200 font-medium tracking-wide mb-10 text-center drop-shadow-md">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto drop-shadow-lg">
                      <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors uppercase tracking-wider">
                        See Case Study
                      </button>
                      <button className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors uppercase tracking-wider bg-black/20 backdrop-blur-sm">
                        {project.customButtonText}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Inner Scroll Progress Indicator (Per Project) */}
                <div className="inner-scroll-indicator absolute bottom-4 md:bottom-10 flex flex-col items-center justify-center w-[150px] h-[75px]">
                  <span className="absolute bottom-2 md:bottom-6 text-white text-sm md:text-base font-medium tracking-widest">
                    Scroll
                  </span>
                  <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full overflow-visible">
                    <path d="M 20 20 Q 100 120 180 20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="6" strokeLinecap="round" />
                    <path 
                      ref={(el) => { innerProgressRefs.current[index] = el; }}
                      d="M 20 20 Q 100 120 180 20" 
                      fill="none" 
                      stroke="#dc2626" 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                      pathLength="100" 
                      strokeDasharray="100" 
                      strokeDashoffset="100" 
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}