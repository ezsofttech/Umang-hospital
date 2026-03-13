"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogService } from "@/services/blog.service";
import type { Blog } from "@/types";

const fallbackArticles: Blog[] = [
  // {
  //   title: "How modern hospitals are redefining patient-centered care",
  //   category: "MEDICAL ADVICE",
  //   image: "/images/medical-ad-img.svg",
  //   slug: "hospital-patient-care",
  // },
  // {
  //   title: "How modern hospitals are redefining patient-centered care",
  //   category: "MEDICAL ADVICE",
  //   image: "/images/medical-ad-two.svg",
  //   slug: "hospital-patient-care",
  // },
  // {
  //   title: "How modern hospitals are redefining patient-centered care",
  //   category: "MEDICAL ADVICE",
  //   image: "/images/medical-ad-three.svg",
  //   slug: "hospital-patient-care",
  // },
];

export default function LatestStories() {
  const [articles, setArticles] = useState<
    (Blog | (typeof fallbackArticles)[0])[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll(true);
        const firstThree = blogs.slice(0, 3);

        if (firstThree.length > 0) {
          setArticles(firstThree);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="border-t border-gray-200 bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-(--umang-navy)">
              WELCOME TO PHYSICIAN
            </p>
            <h2 className="text-2xl font-bold text-(--umang-navy) sm:text-3xl md:text-4xl md:text-right">
              Latest stories and health tips wellness
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="story-card-zigzag overflow-hidden bg-gray-200"
              >
                <div className="story-card-image h-48 animate-pulse bg-gray-300" />
                <div className="p-4 sm:p-5">
                  <div className="h-3 w-20 animate-pulse bg-gray-300" />
                  <div className="mt-2 h-4 w-full animate-pulse bg-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gray-200 bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-(--umang-navy)">
            WELCOME TO PHYSICIAN
          </p>
          <h2 className="text-2xl font-bold text-(--umang-navy) sm:text-3xl md:text-4xl md:text-right">
            Latest stories and health tips wellness
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {articles.map((article, i) => {
            const isMiddle = i === 1;
            const slug: string = ("slug" in article && article.slug) || "hospital-patient-care";
            const image: string =
              ("image" in article && article.image) ||
              "/images/medical-ad-img.svg";
            const category: string =
              ("category" in article && String(article.category)) || "MEDICAL ADVICE";

            return (
              <Link
                key={i}
                href={`/blogs/${slug}`}
                className="story-card-zigzag group overflow-hidden bg-white transition hover:opacity-95"
              >
                <div
                  className={`bg-gray-300 bg-cover bg-center transition group-hover:scale-[1.02] story-card-image ${isMiddle ? "story-card-image-tall" : "story-card-image-short"}`}
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-(--umang-green)">
                    {category}
                  </p>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-(--umang-navy) group-hover:text-(--umang-green) sm:mt-2 sm:text-base">
                    {article.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
