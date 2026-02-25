"use client";

import { useRef } from "react";
import type { GoogleReview } from "@/lib/google-places";

const FALLBACK_TESTIMONIALS: GoogleReview[] = [
  {
    quote:
      "After years of trying, we finally became parents thanks to the IVF treatment at Umang Hospital. Dr. Geetika's expertise and emotional support was incredible. The best fertility center in Bilaspur!",
    name: "Priya Sharma",
    location: "Bilaspur",
    avatar: "/images/doctor-img.svg",
    rating: 4,
  },
  {
    quote:
      "The care and professionalism at Umang Hospital is unmatched. From consultation to recovery, every step was smooth and reassuring.",
    name: "Rahul Verma",
    location: "Bilaspur",
    avatar: "/images/doctor-img.svg",
    rating: 4,
  },
  {
    quote:
      "Our family is grateful for the compassionate treatment we received. The doctors and staff made us feel at home.",
    name: "Anita Patel",
    location: "Raipur",
    avatar: "/images/doctor-img.svg",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <i key={i} className="fi fi-sr-star h-4 w-4 shrink-0 text-[#5D8B6C] sm:h-5 sm:w-5" aria-hidden />
        ) : (
          <i key={i} className="fi fi-sr-star h-4 w-4 shrink-0 text-[#C9D6CE] opacity-40 sm:h-5 sm:w-5" aria-hidden />
        )
      )}
    </div>
  );
}

const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/search/?api=1&query_place_id=";

type PatientStoriesProps = {
  reviews?: GoogleReview[] | null;
  googlePlaceId?: string | null;
};

export default function PatientStories({ reviews, googlePlaceId }: PatientStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const testimonials = reviews?.length ? reviews : FALLBACK_TESTIMONIALS;
  const placeUrl = googlePlaceId ? `${GOOGLE_MAPS_PLACE_URL}${encodeURIComponent(googlePlaceId)}` : null;

  return (
    <section className="bg-white py-10 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--umang-navy)]">
              COMPASSION AT THE HEART OF ALL CARE
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl">
              Patient care stories that inspire us
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-justify text-gray-600 sm:text-base">
              Physician leads with expert care and compassion, improving health in every step we
              take. Our team brings new ideas, tools, and heart to ensure every patient is heard
              and helped.
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-8 flex gap-4 overflow-x-auto pb-4 scroll-smooth sm:mt-12 sm:gap-6 md:gap-8"
          style={{ scrollbarWidth: "thin" }}
        >
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="min-w-[280px] max-w-[320px] shrink-0 rounded-xl bg-[#f8f7fa] p-5 shadow-sm sm:min-w-[320px] sm:max-w-[360px] sm:p-6"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-3 text-sm italic leading-relaxed text-justify text-[#1e293b] sm:mt-4 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 sm:mt-6">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-gray-300 bg-cover bg-center sm:h-12 sm:w-12"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div className="min-w-0">
                  <p className="truncate font-bold text-[#1e293b] sm:text-base">{t.name}</p>
                  <p className="text-xs text-gray-500 sm:text-sm">{t.relativeTime ?? t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        {placeUrl && (
          <p className="mt-6 text-center sm:mt-8">
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--umang-green)] hover:underline"
            >
              View all reviews on Google
              <i className="fi fi-sr-arrow-up-right text-sm" aria-hidden />
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
