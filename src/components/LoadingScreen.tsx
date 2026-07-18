"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "enter" | "hold" | "open" | "exit" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("enter");
  const openedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const t = window.setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 350);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const timers: number[] = [];
    let removeVideoListener: (() => void) | undefined;

    const openOnce = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      setPhase("open");
    };

    // Logo revela da esquerda → direita
    timers.push(window.setTimeout(() => setPhase("hold"), 80));

    // Depois da logo, abre do centro junto com o vídeo
    timers.push(
      window.setTimeout(() => {
        const video = document.querySelector<HTMLVideoElement>(
          ".loading-bg-video"
        );

        if (video && video.readyState >= 2) {
          openOnce();
          return;
        }

        if (video) {
          const onReady = () => openOnce();
          video.addEventListener("loadeddata", onReady, { once: true });
          removeVideoListener = () =>
            video.removeEventListener("loadeddata", onReady);
        }

        // Fallback para não travar se o vídeo demorar
        timers.push(window.setTimeout(openOnce, 1600));
      }, 1550)
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      removeVideoListener?.();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const t = window.setTimeout(() => setPhase("exit"), 1100);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 480);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  const isOpen = phase === "open" || phase === "exit";
  const isExit = phase === "exit";
  const logoActive = phase !== "enter";

  return (
    <div
      className={`loading-screen ${isOpen ? "is-open" : ""} ${isExit ? "is-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando Academia Imperial"
      aria-busy={!isExit}
    >
      {/* Vídeo cinematográfico atrás das cortinas */}
      <div className="loading-video-wrap" aria-hidden>
        <video
          className="loading-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/fundoherovid.mp4" type="video/mp4" />
        </video>
        <div className="loading-video-grade" />
      </div>

      {/* Cortinas que abrem do centro para cima e para baixo */}
      <div className="loading-curtain loading-curtain--top" aria-hidden />
      <div className="loading-curtain loading-curtain--bottom" aria-hidden />

      {/* Logo central — revela da esquerda para a direita */}
      <div
        className={`loading-logo-stage ${logoActive ? "is-revealing" : ""} ${isOpen ? "is-parting" : ""}`}
      >
        <div className="loading-logo-mask">
          <Image
            src="/icon.png"
            alt="Academia Imperial"
            width={1432}
            height={901}
            priority
            unoptimized
            className="loading-logo"
          />
        </div>
      </div>
    </div>
  );
}
