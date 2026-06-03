"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { googleReviews, googleReviewsMeta } from "@/lib/google-reviews";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
              : "fill-zinc-700 text-zinc-700"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof googleReviews)[number];
}) {
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <article
      className="google-review-card glass-card w-[min(88vw,340px)] shrink-0 rounded-2xl border border-white/8 p-5 sm:w-[320px]"
      aria-label={`Avaliação de ${review.name}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-800/30 bg-amber-950/50 font-display text-lg text-neon-gold"
            aria-hidden
          >
            {initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{review.name}</p>
            <p className="text-[10px] tracking-wide text-zinc-600">
              {review.date}
            </p>
          </div>
        </div>
        <GoogleIcon className="h-5 w-5 shrink-0 opacity-90" />
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400">
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}

export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const marqueeItems = [...googleReviews, ...googleReviews];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resultados"
      aria-labelledby="reviews-heading"
      className="relative overflow-x-clip bg-[var(--bg-deep)] py-12 sm:py-14 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(217,119,6,0.06)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-15" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between ${
            visible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <div className="max-w-xl">
            <Badge
              variant="neon"
              className="mb-3 w-fit gap-1.5 px-2.5 py-1 text-[8px] font-semibold tracking-[0.18em] uppercase sm:text-[9px]"
            >
              <span
                className="neon-dot glow-pulse h-1 w-1 rounded-full"
                aria-hidden
              />
              Avaliações Google
            </Badge>

            <h2 id="reviews-heading" className="space-y-0 leading-none">
              <span className="block font-display text-[clamp(1.75rem,5vw,3rem)] leading-[0.9] tracking-[0.02em] text-[var(--white-neon)]">
                QUEM TREINA,
              </span>
              <span className="block font-display text-[clamp(1.75rem,5vw,3rem)] leading-[0.9] tracking-[0.02em] text-amber-500 text-glow-gold">
                RECOMENDA.
              </span>
            </h2>
          </div>

          <a
            href={googleReviewsMeta.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass-card flex w-fit items-center gap-3 rounded-2xl border border-white/8 px-4 py-3 transition-[border-color,box-shadow] duration-300 hover:border-amber-800/45 hover:shadow-[0_0_24px_rgba(217,119,6,0.18)] ${
              visible ? "animate-slide-up delay-100" : "opacity-0"
            }`}
          >
            <GoogleIcon className="h-8 w-8" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-semibold leading-none text-white">
                  {googleReviewsMeta.rating}
                </span>
                <Star
                  size={18}
                  className="fill-amber-400 text-amber-400"
                  aria-hidden
                />
              </div>
              <p className="text-[11px] text-zinc-500">
                +{googleReviewsMeta.totalReviews} avaliações no Google
              </p>
            </div>
          </a>
        </div>

        <div
          className={`google-reviews-marquee relative -mx-6 sm:-mx-0 ${
            visible ? "animate-fade-in delay-200" : "opacity-0"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg-deep)] to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg-deep)] to-transparent sm:w-20"
            aria-hidden
          />

          <div className="overflow-hidden">
            <div
              className="google-reviews-track flex w-max gap-4 px-6 sm:gap-5 sm:px-0"
              role="list"
              aria-label="Avaliações de clientes no Google"
            >
              {marqueeItems.map((review, index) => (
                <ReviewCard
                  key={`${review.id}-${index}`}
                  review={review}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
