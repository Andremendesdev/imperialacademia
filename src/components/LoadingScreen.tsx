"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dispatchLoadingReveal } from "@/lib/loading-reveal";

type Phase = "enter" | "hold" | "open" | "exit" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("enter");
  const openedRef = useRef(false);
  const revealedRef = useRef(false);

  const revealHero = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    dispatchLoadingReveal();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const t = window.setTimeout(() => {
        revealHero();
        setPhase("done");
        document.body.style.overflow = "";
      }, 350);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const timers: number[] = [];

    const openOnce = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      setPhase("open");
    };

    timers.push(window.setTimeout(() => setPhase("hold"), 80));
    timers.push(window.setTimeout(openOnce, 1550));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
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
    // Só revela o hero quando as cortinas já abriram e o loading começa a sumir
    revealHero();
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
      <div className="loading-video-wrap" aria-hidden>
        <Image
          src="/galeria-1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="loading-bg-image"
        />
        <div className="loading-video-grade" />
      </div>

      <div className="loading-curtain loading-curtain--top" aria-hidden />
      <div className="loading-curtain loading-curtain--bottom" aria-hidden />

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
