/* =========================================================
   Imports
   - Sections and components used to build the page
   ========================================================= */

import Hero from "@/components/hero/hero";
import About from "@/components/about/about";
import ProjectExpand from "@/components/portfolio/ProjectExpand";
import Footer from "@/components/footer/footer";


/* =========================================================
   Main Page Component
   - Composes all sections into a single layout
   ========================================================= */
export default function Page() {
 
  return (
    /* =========================================================
       Main Wrapper
       - Relative positioning for layered elements
       - Black background for overall theme
       ========================================================= */
    <main className="relative bg-black">

      {/* =========================================================
          Page Sections
          - Ordered layout of hero, projects, about, and footer
          - Additional components (e.g., overlays, tech stack)
            can be inserted here if needed
          ========================================================= */}
      <Hero />
      <ProjectExpand/>
      <About/>
      <Footer/>

    </main>
  );
}