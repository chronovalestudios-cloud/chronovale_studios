"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "./ui/particles";
import { GodRays } from "./ui/god-rays";

// Make sure to register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalDynastyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const video = videoRef.current;
      if (video) {
        // Pause natural playback
        video.pause();
      }

      // 1. Smooth Video Scrubbing
      let scrollObj = { progress: 0 };
      gsap.to(scrollObj, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=3000", // Video scrubs over 3000px of scrolling
          scrub: 1.5, // Smoothing factor for buttery playback
        },
        progress: 1,
        ease: "none",
        onUpdate: () => {
          if (video && video.duration && video.readyState >= 2) {
            video.currentTime = scrollObj.progress * video.duration;
          }
        }
      });

      // 2. Parallax move + Blur fade transition
      gsap.to(video, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1200", // The fade happens over the first 1200px of scroll
          scrub: 1, 
        },
        y: "25%", // Parallax effect
        scale: 1.15, // Slight zoom to prevent edge clipping
        filter: "blur(24px)", // Blur blending
        opacity: 0, // Fade out into the background color
        ease: "power1.inOut",
        transformOrigin: "center top",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ background: "var(--warm-black)" }}
    >
      {/* 1. Base Layer: Cinematic Video (b_b_e_emp_.mp4) */}
      <div className="absolute inset-0 w-full h-[120%] overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/b_b_e_emp_.mp4"
          muted
          playsInline
          className="object-cover object-center w-full h-full"
          style={{ opacity: 0.65, transformOrigin: "center center" }}
        />
        {/* Gradient mask to blend the image out at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--warm-black)_80%)]" />
        
        {/* Volumetric Light Shafts */}
        <GodRays />
        
        {/* Ambient Floating Dust/Embers */}
        <Particles quantity={120} color="#E8943A" />
      </div>

      {/* Ambient Glows (Deepam Glow) */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#E8943A] opacity-[0.03] blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-[#C97B35] opacity-[0.04] blur-[80px] mix-blend-screen" />
      
      {/* Top Gradient Fade to blend with Nav */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--warm-black)] to-transparent" />
      
      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--warm-black)] via-[var(--warm-black)]/80 to-transparent" />
    </div>
  );
}
