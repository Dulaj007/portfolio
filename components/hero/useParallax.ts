/* =========================================================
   Generic Ref Type
   - Ensures we are working with valid HTML elements
   - Supports null (before mount / after unmount)
   ========================================================= */
type RefType<T extends HTMLElement> = React.RefObject<T | null>;


/* =========================================================
   Smooth Mouse-Based Parallax Handler
   - Creates a reusable parallax effect for elements
   - Uses interpolation (lerp) for smooth motion
   - Driven by requestAnimationFrame for performance
   ========================================================= */
export const createParallaxHandler = () => {

  /* =========================================================
     Current Position (what is rendered)
     ========================================================= */
  let currentX = 0;
  let currentY = 0;

  /* =========================================================
     Target Position (where we want to move toward)
     ========================================================= */
  let targetX = 0;
  let targetY = 0;

  /* =========================================================
     requestAnimationFrame ID
     - Used to track animation loop
     - Prevents multiple loops running simultaneously
     ========================================================= */
  let rafId: number | null = null;


  /* =========================================================
     Linear Interpolation (LERP)
     - Smoothly transitions from start → end
     - factor controls speed (0.1 = smooth/slow)
     ========================================================= */
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };


  /* =========================================================
     Animation Loop
     - Continuously updates position using lerp
     - Applies transform to referenced elements
     ========================================================= */
  const animate = (
    titleRef: RefType<HTMLElement>,
    subtitleRef: RefType<HTMLElement>
  ) => {

    /* Smoothly move current position toward target */
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    /* Create CSS transform */
    const transform = `translate(${currentX}px, ${currentY}px)`;

    /* Apply transform to title */
    if (titleRef.current) {
      titleRef.current.style.transform = transform;
    }

    /* Apply transform to subtitle */
    if (subtitleRef.current) {
      subtitleRef.current.style.transform = transform;
    }

    /* Continue animation loop */
    rafId = requestAnimationFrame(() =>
      animate(titleRef, subtitleRef)
    );
  };


  /* =========================================================
     Mouse Move Handler
     - Calculates cursor position relative to screen center
     - Converts it into a controlled movement range
     ========================================================= */
  const handleMouseMove = (
    e: MouseEvent,
    titleRef: RefType<HTMLElement>,
    subtitleRef: RefType<HTMLElement>
  ) => {

    /* Prevent execution during SSR */
    if (typeof window === "undefined") return;

    /* Normalize mouse position (-1 to 1 range) */
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    /* Maximum movement range in pixels */
    const maxMove = 8;

    /* Clamp movement to avoid excessive shifting */
    targetX = Math.max(-maxMove, Math.min(maxMove, x * -maxMove));
    targetY = Math.max(-maxMove, Math.min(maxMove, y * -maxMove));

    /* Start animation loop if not already running */
    if (!rafId) {
      animate(titleRef, subtitleRef);
    }
  };


  /* =========================================================
     Return Handler
     - Can be attached to mousemove events
     ========================================================= */
  return handleMouseMove;
};