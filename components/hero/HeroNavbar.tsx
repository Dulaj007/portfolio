"use client";

/* =========================================================
   Hero Navbar Component
   - Controls top-right navigation in hero section
   - Includes animated expanding menu + hamburger toggle
   ========================================================= */

type HeroNavbarProps = {
  isMenuOpen: boolean;                 /* Controls menu open/close state */
  setIsMenuOpen: (value: boolean) => void; /* Function to toggle state */
};

export default function HeroNavbar({
  isMenuOpen,
  setIsMenuOpen,
}: HeroNavbarProps) {
  return (
    /* =========================================================
       Main Container
       - Positioned top-right of hero section
       - High z-index to stay above background elements
       ========================================================= */
    <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 flex items-center justify-end">
      
      {/* =========================================================
          Expanding Navigation Menu
          - Smooth width + opacity transition
          - Hidden when closed (width: 0, no pointer events)
          ========================================================= */}
      <nav
        className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "w-[240px] md:w-[300px] opacity-100 mr-4"
            : "w-0 opacity-0 mr-0 pointer-events-none"
        }`}
      >
        {/* =========================================================
            Navigation List
            - Horizontal layout with spacing
            - Uppercase styling for clean UI
            ========================================================= */}
        <ul className="flex items-center gap-4 md:gap-6 min-w-max w-full uppercase justify-end">
          
          {/* =========================================================
              Menu Items (About, Work, Connect)
              - Animated slide-in effect
              - Staggered delay for smooth sequence
              ========================================================= */}
          {["About", "Work", "Connect"].map((item, index) => (
            <li
              key={item}
              className={`transition-all duration-500 ease-out transform ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 100}ms` /* Stagger animation */
                  : "0ms",
              }}
            >
              {/* =========================================================
                  Navigation Link
                  - Hover effects: color, scale, brightness
                  - Underline animation using span
                  ========================================================= */}
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white text-sm md:text-base font-medium relative group pb-1 transition-all duration-300 hover:text-red-500 hover:scale-90 hover:brightness-90"
              >
                {item}

                {/* Animated underline */}
                <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* =========================================================
          Menu Toggle Button (Hamburger → X)
          - Toggles menu open/close state
          - Includes animated SVG transformation
          ========================================================= */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative z-40 text-white hover:text-red-600 hover:scale-96 transition-colors duration-100 focus:outline-none flex items-center justify-center w-10 h-10"
      >
        {/* =========================================================
            SVG Icon (3 lines → transforms into X)
            ========================================================= */}
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
          {/* =========================================================
              Top Line
              - Moves down + rotates when open
              ========================================================= */}
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            className={`origin-center transition-all duration-300 ease-in-out ${
              isMenuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />

          {/* =========================================================
              Middle Line
              - Fades and shrinks when open
              ========================================================= */}
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            className={`transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-0 scale-x-0"
                : "opacity-100 scale-x-100"
            }`}
          />

          {/* =========================================================
              Bottom Line
              - Moves up + rotates when open
              ========================================================= */}
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            className={`origin-center transition-all duration-300 ease-in-out ${
              isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </svg>
      </button>
    </div>
  );
}