import LiquidOverlay from "@/components/overlay/LiquidOverlay";
import Hero from "@/components/hero/hero";
import Portfolio from "@/components/portfolio/portfolio";
import About from "@/components/about/about";
import AboutBackground from "@/components/about/aboutBackground";
import TechStack from "@/components/techStack/techStack";

export default function Page() {
  return (
    // 1. Give the main wrapper a minimum height and a background color
    <main className="relative">
      


       {/* 3. Render your content below the overlay*/}
   <Hero />
   <section className="relative pt-30 pb-60 bg-black"><TechStack /></section>


<section className="relative h-[300vh]">
  <div className="sticky top-0 h-screen">
    <Portfolio />
  </div>
</section>
   <section className="relative w-full h-[100vh] bg-black overflow-hidden select-none">
            </section>
<About />

   <section className="relative w-full h-[100vh] bg-black overflow-hidden select-none">
            </section>
       
    </main>
  );
}