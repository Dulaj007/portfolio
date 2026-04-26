"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useVideoTexture, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ✅ Slides
const slides = [
  { type: "video", src: "/videos/vid1.mp4", color: "#000000", title: "Project One" },
  { type: "image", src: "/images/img1.jpg", color: "#000000", title: "Creative Design" },
  { type: "image", src: "/images/img2.jpg", color: "#000000", title: "Modern UI" },
  { type: "image", src: "/images/img2.jpg", color: "#000000", title: "3D Experience" },
  { type: "video", src: "/videos/vid3.mp4", color: "#000000", title: "Final Showcase" },
];


// =======================
// 🧩 OVERLAY (HTML UI) - UPDATED FOR SIDEBAR SCROLLSPY
// =======================
function Overlay({ current }: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf: number;

    const update = () => {
      // Calculate which slide is currently closest to the center
      const index = Math.max(
        0,
        Math.min(slides.length - 1, Math.floor(current.current + 0.5))
      );

      setActiveIndex(index);
      raf = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(raf);
  }, [current]);

  return (
    <div
      style={{
        position: "absolute",
        left: "80px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "white",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "40px", // Spacing between the list items
      }}
    >
      {slides.map((slide, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            style={{
              opacity: isActive ? 1 : 0.3, // Dim inactive items
              transform: isActive ? "translateX(10px)" : "translateX(0px)", // Slight bump to the right for active
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Year & Active Indicator Dot */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", marginBottom: "8px", fontWeight: "bold" }}>
              <span>2024</span>
              {isActive && (
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff0055" }} />
              )}
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "42px", margin: 0, textTransform: "uppercase", fontWeight: 800 }}>
              {slide.title}
            </h1>

            {/* Subtitle / Type */}
            <div style={{ fontSize: "12px", letterSpacing: "1.5px", marginTop: "8px", textTransform: "uppercase", color: "#aaa" }}>
              {slide.type} PROJECT ➔
            </div>

            {/* Show buttons only under the active item */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                opacity: isActive ? 1 : 0,
                maxHeight: isActive ? "50px" : "0px",
                overflow: "hidden",
                transition: "all 0.5s ease",
              }}
            >
              <button style={btnStyle}>Read More</button>
              <button style={btnStyleOutline}>See Project</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const btnStyle = {
  padding: "10px 18px",
  background: "white",
  color: "black",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnStyleOutline = {
  padding: "10px 18px",
  background: "transparent",
  color: "white",
  border: "1px solid white",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};


// =======================
// 🎞️ SLIDE
// =======================
function Slide({ item, index, current }: any) {
  const mesh = useRef<THREE.Mesh>(null!);

  const texture =
    item.type === "video"
      ? useVideoTexture(item.src, { muted: true, loop: true, autoplay: true })
      : useTexture(item.src);

  useFrame(() => {
    const offset = index - current.current;

    const targetY = -offset * 3.4;

    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.08);
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, 0, 0.08);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, offset * 0.25, 0.08);

    const scale = 1.4 - Math.abs(offset) * 0.08;
    mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
  });

  return (
    <mesh ref={mesh}>
      <RoundedPlane width={4.5} height={2.5} radius={0.2} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}


// =======================
// 🎨 BACKGROUND
// =======================
function Background({ current }: any) {
  const { scene } = useThree();

  const currentColor = useRef(new THREE.Color("#000"));
  const targetColor = useRef(new THREE.Color("#000"));

  useFrame(() => {
    const index = Math.max(0, Math.min(slides.length - 1, Math.round(current.current)));
    targetColor.current.set(slides[index].color);

    currentColor.current.lerp(targetColor.current, 0.02);
    scene.background = currentColor.current;
  });

  return null;
}


// =======================
// 🔵 ROUNDED GEOMETRY
// =======================
function RoundedPlane({ width = 4.5, height = 2.5, radius = 0.2 }: any) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape, 32);

  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox!;
  const size = new THREE.Vector2(
    bbox.max.x - bbox.min.x,
    bbox.max.y - bbox.min.y
  );

  const pos = geometry.attributes.position;
  const uv = [];

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    uv.push((x - bbox.min.x) / size.x, (y - bbox.min.y) / size.y);
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

  return <primitive object={geometry} />;
}


// =======================
// 🎮 SLIDER
// =======================
function Slider({ current, containerRef }: any) {
  const target = useRef(0);
  const isActive = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    // 👇 Detect if section fully fits viewport
    const checkIfFullyVisible = () => {
      const rect = el.getBoundingClientRect();

      const fullyVisible =
        rect.top <= 0 && rect.bottom >= window.innerHeight;

      isActive.current = fullyVisible;
    };

    const handleScroll = () => {
      checkIfFullyVisible();
    };

    const handleWheel = (e: WheelEvent) => {
      // ❌ NOT active → allow normal page scroll
      if (!isActive.current) return;

      // ✅ active → control slider
      e.preventDefault();

      if (ticking) return;
      ticking = true;

      if (e.deltaY > 0) {
        target.current = Math.min(target.current + 1, slides.length - 1);
      } else {
        target.current = Math.max(target.current - 1, 0);
      }

      setTimeout(() => (ticking = false), 250);
    };

    checkIfFullyVisible();

    window.addEventListener("scroll", handleScroll);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef]);

  useFrame(() => {
    current.current = THREE.MathUtils.lerp(
      current.current,
      target.current,
      0.08
    );
  });

  return (
    <>
      <Background current={current} />
      {slides.map((item, i) => (
        <Slide key={i} item={item} index={i} current={current} />
      ))}
    </>
  );
}


// =======================
// 🌐 PAGE
// =======================
export default function Portfolio() {
  const currentRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      {/* Overlay UI */}
      <Overlay current={currentRef} />

      <Canvas
        camera={{ position: [0.5, 0.0, 7], fov: 45 }}
        onCreated={({ camera }) => {
          camera.rotation.set(0, 0.25, 0);
        }}
      >
        <color attach="background" args={["#000"]} />

        {/* ✅ pass containerRef here */}
        <Slider current={currentRef} containerRef={containerRef} />

    
      </Canvas>
    </div>
  );
}