'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCategory } from '@/hooks/useCategories';
import { useSubcategoriesByCategory } from '@/hooks/useSubcategories';

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategory(categoryId);
  const { data: subcategories = [], isLoading: subcategoriesLoading, error: subcategoriesError } = useSubcategoriesByCategory(categoryId);

  const loading = categoryLoading || subcategoriesLoading;
  const error = categoryError || subcategoriesError;

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath={`/departments/${categoryId}`} />
      <main>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-red-600">Failed to load department details</div>
          </div>
        ) : category ? (
          <>
            {/* Hero Section */}
            <section className="relative bg-(--umang-navy) py-16 sm:py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link
                  href="/departments"
                  className="inline-block mb-4 text-white/80 hover:text-white transition"
                >
                  ← Back to Departments
                </Link>
                <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  {category.title}
                </h1>
                <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
                  {category.description}
                </p>
              </div>
            </section>

            {/* Subcategories Grid */}
            <section className="bg-gray-50 py-12 sm:py-16 md:py-24">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl mb-8">
                  Our Services
                </h2>

                {subcategories.length === 0 ? (
                  <div className="flex justify-center items-center py-12 bg-white rounded-lg">
                    <p className="text-lg text-gray-600">No services available for this department</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {subcategories.map((subcategory) => (
                      <Link key={subcategory._id} href={`/subcategories/${subcategory.slug || subcategory._id}`}>
                        <article className="group cursor-pointer h-full">
                          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 group-hover:shadow-lg h-full flex flex-col">
                            {subcategory.image && (
                              <div
                                className="h-40 bg-gray-200 bg-cover bg-center"
                                style={{ backgroundImage: `url(${subcategory.image})` }}
                              />
                            )}
                            <div className="p-4 flex-grow flex flex-col">
                              <h3 className="text-sm font-bold text-[var(--umang-navy)] sm:text-base group-hover:text-[var(--umang-green)] transition-colors">
                                {subcategory.title}
                              </h3>
                              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm flex-grow">
                                {subcategory.description}
                              </p>
                              <div className="mt-4 inline-block text-xs font-semibold text-[var(--umang-green)] group-hover:text-[var(--umang-navy)] transition-colors">
                                Learn More →
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-600">Department not found</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
