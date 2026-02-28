"use client";

import { useCallback } from "react";

const COLORS = ["#e5651c", "#f27d3a", "#2d9e90", "#40b8a8", "#c8922a", "#17324a"];

export function useConfetti() {
  const spawn = useCallback(() => {
    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = "-8px";
      el.style.width = `${4 + Math.random() * 7}px`;
      el.style.height = `${4 + Math.random() * 7}px`;
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.setProperty("--duration", `${1.8 + Math.random() * 1.5}s`);
      el.style.setProperty("--rotate", `${360 + Math.random() * 720}deg`);
      el.style.animationDelay = `${Math.random() * 0.6}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }
  }, []);

  return spawn;
}
