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
          <h2 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl">
            Explore all departments
          </h2>
          <p className="text-sm text-justify text-gray-700 sm:text-base">
            <span className="text-[var(--umang-green)]">
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
                <article className="dept-card cursor-pointer transition-transform hover:scale-105">
                  <div
                    className="dept-card-image h-40 bg-gray-200 bg-cover bg-center sm:h-48"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="dept-card-content">
                    <h3 className="text-sm font-bold text-[var(--umang-navy)] sm:text-base">{category.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-justify text-[#4A4A4A] sm:mt-2 sm:text-sm">
                      {category.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
            <Link
              href="/departments"
              className="dept-card-cta flex min-h-[160px] flex-col justify-end bg-[#6FA179] p-4 text-white transition hover:opacity-95 sm:min-h-[200px] sm:p-6"
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
