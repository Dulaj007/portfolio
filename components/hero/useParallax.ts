type RefType<T extends HTMLElement> = React.RefObject<T | null>;

/**
 * Smooth mouse-based parallax handler
 */
export const createParallaxHandler = () => {
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId: number | null = null;

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = (
    titleRef: RefType<HTMLElement>,
    subtitleRef: RefType<HTMLElement>
  ) => {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    const transform = `translate(${currentX}px, ${currentY}px)`;

    if (titleRef.current) {
      titleRef.current.style.transform = transform;
    }

    if (subtitleRef.current) {
      subtitleRef.current.style.transform = transform;
    }

    rafId = requestAnimationFrame(() =>
      animate(titleRef, subtitleRef)
    );
  };

  const handleMouseMove = (
    e: MouseEvent,
    titleRef: RefType<HTMLElement>,
    subtitleRef: RefType<HTMLElement>
  ) => {
    if (typeof window === "undefined") return;

    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const maxMove = 8;

    targetX = Math.max(-maxMove, Math.min(maxMove, x * -maxMove));
    targetY = Math.max(-maxMove, Math.min(maxMove, y * -maxMove));

    if (!rafId) {
      animate(titleRef, subtitleRef);
    }
  };

  return handleMouseMove;
};