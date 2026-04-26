'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import './about.css'; 

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

    const ctx = gsap.context(() => {
      const curvyPath = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';

      gsap.to('#bouncy-path', {
        morphSVG: curvyPath,
        ease: 'none', 
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom', 
          end: 'top center',   
          scrub: 1,            
        },
      });
    }, containerRef); 

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-wrapper">
      <p className="about-text">My Story</p>
      
      <div className="footer">
        <svg
          preserveAspectRatio="none"
          id="footer-img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2278 683"
        >
          {/* Gradient definitions have been removed entirely */}
          <path
            className="footer-svg"
            id="bouncy-path"
            fill="#ffffff" /* Changed to pure white */
            d="M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z"
          />
        </svg>
      </div>
    </div>
  );
}