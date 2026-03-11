"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export default function Departments() {
  const { data: categories = [], isLoading, error } = useCategories();
  const limitedCategories = categories.slice(0, 11);

  return (
    <section id="departments" className="bg-gray-50 py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 md:items-end">
          <h2 className="text-2xl font-bold text-(--umang-navy) sm:text-3xl md:text-4xl">
            Explore all departments
          </h2>
          <p className="text-sm text-justify text-gray-700 sm:text-base">
            <span className="text-(--umang-green)">
              Umang IVF And Superspeciality Hospital, Bilaspur Is A Leading Healthcare Center,{" "}
            </span>
            Offering Advanced Services In Maternity, Pediatrics, Gynecology, IVF, ICU Care, And
            Minimally Invasive Surgeries.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-600">Loading departments...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-12">
            <div className="text-red-600">Failed to load departments</div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
            {limitedCategories.map((category) => (
              <Link key={category._id} href={`/departments/${category.slug || category._id}`}>
                <article className="dept-card cursor-pointer transition-transform hover:scale-105 flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="dept-card-image h-44 w-full object-cover"
                  />
                  <div className="dept-card-content flex flex-col h-full p-4 sm:p-5">
                    <h3 className="text-base font-bold text-(--umang-navy)">{category.title}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-justify text-gray-600 sm:text-sm">
                      {category.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-(--umang-teal)">
                      Read more
                      <i className="fi fi-sr-arrow-right text-xs" aria-hidden />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
            <Link
              href="/departments"
              className="dept-card-cta flex min-h-40 flex-col justify-end bg-[#6FA179] p-4 text-white transition hover:opacity-95 sm:min-h-50 sm:p-6"
            >
              <span className="block text-lg font-bold leading-tight sm:text-xl md:text-2xl">
                Explore
              </span>
              <span className="block text-lg font-bold leading-tight sm:text-xl md:text-2xl">
                All Departments
              </span>
              <i className="fi fi-sr-arrow-up-right mt-3 h-6 w-6 sm:mt-4 sm:h-8 sm:w-8" aria-hidden />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
