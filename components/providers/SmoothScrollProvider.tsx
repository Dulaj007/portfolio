"use client";

/* =========================================================
   Imports
   - React hooks for lifecycle and references
   - Lenis for smooth scrolling behavior
   ========================================================= */
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";


/* =========================================================
   SmoothScrollProvider Component
   - Wraps the app to enable smooth scrolling globally
   - Uses Lenis for inertia-based scrolling
   ========================================================= */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {

  /* =========================================================
     Lenis Instance Reference
     - Stores Lenis instance across renders
     ========================================================= */
  const lenisRef = useRef<Lenis | null>(null);


  /* =========================================================
     Initialize Lenis on Mount
     - Sets up smooth scrolling behavior
     - Starts requestAnimationFrame loop
     ========================================================= */
  useEffect(() => {

    /* Create Lenis instance with custom settings */
    const lenis = new Lenis({
      duration: 1.2, /* Scroll duration (smoothness) */
      easing: (t: number) => 1 - Math.pow(1 - t, 3), /* Ease-out cubic */
      smoothWheel: true, /* Enable smooth mouse wheel */
    });

    /* Store instance in ref */
    lenisRef.current = lenis;

    /* =========================================================
       requestAnimationFrame Loop
       - Continuously updates Lenis scroll calculations
       ========================================================= */
    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time); /* Update Lenis */
      rafId = requestAnimationFrame(raf); /* Loop */
    };

    /* Start animation loop */
    rafId = requestAnimationFrame(raf);


    /* =========================================================
       Cleanup on Unmount
       - Stops animation loop
       - Destroys Lenis instance to prevent memory leaks
       ========================================================= */
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);


  /* =========================================================
     Render Children
     - Acts as a wrapper without adding extra DOM
     ========================================================= */
  return <>{children}</>;
}