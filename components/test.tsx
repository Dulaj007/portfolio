"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import AboutBackground from "./aboutBackground";

export default function About() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "end 0.5" means the progress hits 1.0 when the 
    // end of the container reaches the middle of the viewport.
    offset: ["start start", "end 1"], 
  });

  const text =
    "I design and develop immersive digital experiences that blend creativity with technology, focusing on smooth interactions, modern aesthetics, and performance-driven solutions.";

  const words = text.split(" ");

  return (
    /* h-[300vh] provides more "scroll distance" for the user to read */
    <section ref={containerRef} className="relative h-[300vh] bg-black">
       
      <div className="sticky top-0 h-[80vh] flex items-center justify-center px-6">
        <p className="max-w-7xl text-center text-2xl md:text-6xl font-medium leading-relaxed flex flex-wrap justify-center gap-x-2 md:gap-x-3">
          {words.map((word, i) => {
            // We use a slight overlap (0.1) so the transition 
            // between words feels smoother/softer.
            const start = i / words.length;
            const end = start + (1 / words.length);

            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const filter = useTransform(progress, range, [
    "blur(8px)",
    "blur(0px)",
  ]);

  return (
    <motion.span
      style={{ opacity, filter }}
      className="text-white will-change-[opacity,filter]"
    >
      {word}
    </motion.span>
  );
};