'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCategories } from '@/hooks/useCategories';

export default function DepartmentsPage() {
  const { data: categories = [], isLoading, error } = useCategories();

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/departments" />
      <main>
        {/* Hero Section */}
        <section className="relative bg-(--umang-navy) py-16 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Our Departments
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
              Explore our specialized departments and services. Click on any department to view our comprehensive treatment options.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-gray-600">Loading departments...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-red-600">Failed to load departments</div>
              </div>
            ) : (
              <>
                <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 md:items-end">
                  <h2 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl">
                    All Departments
                  </h2>
                  <p className="text-sm text-justify text-gray-700 sm:text-base">
                    <span className="text-[var(--umang-green)]">
                      Umang IVF And Superspeciality Hospital, Bilaspur
                    </span>
                    {' '}offers advanced services in maternity, gynecology, plastic surgery, and hair treatments with experienced specialists.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {categories.map((category) => (
                    <Link key={category._id} href={`/departments/${category._id}`}>
                      <article className="group cursor-pointer">
                        <div
                          className="h-48 bg-gray-200 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${category.image})` }}
                        />
                        <div className="mt-4">
                          <h3 className="text-sm font-bold text-[var(--umang-navy)] sm:text-base group-hover:text-[var(--umang-green)] transition-colors">
                            {category.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-justify text-gray-600 sm:text-sm">
                            {category.description}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
