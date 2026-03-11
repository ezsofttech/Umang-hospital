"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { aboutService } from "@/services/about.service";

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  mainImage?: string;
  experienceBadgeImage?: string;
}

const services = [
  {
    title: "Emergency care",
    description: "Fast, reliable help from professionals when every minute matters",
    icon: "/images/emergency-img.svg",
  },
  {
    title: "Lab & tests",
    description: "Accurate results delivered through modern diagnostic tools",
    icon: "/images/lab-img.svg",
  },
  {
    title: "Vaccines & care",
    description: "Comprehensive programs to protect your health and prevent disease",
    icon: "/images/vaccines-img.svg",
  },
  {
    title: "Expert advice",
    description: "Trusted consultations and treatment plans from certified specialists",
    icon: "/images/expert-img.svg",
  },
];

const DEFAULT_ABOUT: AboutData = {
  title: "Bilaspur's Premier IVF & Super Specialty Hospital",
  subtitle: "Super Specialty Hospital",
  description:
    "Umang IVF & Super Specialty Hospital Has Been Serving The People Of Bilaspur And Chhattisgarh With Dedication And Compassion. As The Region's Leading IVF Center And Super Specialty Hospital, We Combine Cutting-Edge Technology With Personalized Care — From Advanced Fertility Treatment, Cosmetic Surgery To Cardiology, Urology, And 24/7 Emergency Services.",
  features: [
    "Advanced IVF Lab With International-Standard Protocols",
    "Expert Plastic Surgeons & Dermatologists",
    "Board-Certified Cardiologists & Urologists",
    "24/7 Emergency And Ambulance Services",
    "Affordable, Transparent Pricing",
  ],
  mainImage: "/images/about-us-img.svg",
  experienceBadgeImage: "/images/15plus-ex-img.svg",
};

export default function AboutUs() {
  const [about, setAbout] = useState<AboutData>(DEFAULT_ABOUT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutService.getActive();
        if (data) {
          setAbout(data);
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        // Keep default data if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);
  return (
    <section id="about" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-(--umang-navy)">
              ABOUT US
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
              <span className="text-(--umang-navy)">{about.title.split('&')[0].trim()}&</span>
              <span className="text-(--umang-green)"> {about.subtitle}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-justify text-gray-700 sm:mt-4 sm:text-base">
              {about.description}
            </p>
            <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
              {about.features.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--umang-navy) text-white">
                    <i className="fi fi-sr-check text-sm" aria-hidden />
                  </span>
                  <span className="text-gray-800 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex justify-center my-6 sm:my-8 lg:justify-end lg:items-center">
            <div className="relative h-115 w-80 sm:h-72 sm:w-72 md:h-96 md:w-80 lg:h-125 lg:w-87.5">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${about.mainImage || '/images/about-us-img.svg'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute left-6 top-3 z-10 md:left-4 md:top-4 lg:top-2.5">
                <img
                  src={about.experienceBadgeImage || "/images/15plus-ex-img.svg"}
                  alt="15+ years experience"
                  className="h-20 w-auto sm:h-24 md:h-24 lg:h-28"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/15plus-ex-img.svg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-us-cards mt-4 grid grid-cols-1 border-b border-gray-200 sm:mt-8 sm:grid-cols-2 sm:border-2 sm:border-gray-200 md:mt-12 lg:mt-20 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="about-us-service-card flex flex-col border-b border-gray-200 bg-white px-4 py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:border-gray-200 sm:px-6 sm:py-8 first:sm:border-l-0"
            >
              <div className="about-us-card-icon flex h-14 w-14 shrink-0">
                <Image
                  src={s.icon}
                  alt={`${s.title} - ${s.description}`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold text-(--umang-navy)">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-justify text-gray-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
