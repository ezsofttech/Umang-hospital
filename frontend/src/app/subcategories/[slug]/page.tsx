'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSubcategory } from '@/hooks/useSubcategories';
import { useCategory } from '@/hooks/useCategories';

export default function SubcategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: subcategory, isLoading: subcategoryLoading, error: subcategoryError } = useSubcategory(slug);
  const { data: category, isLoading: categoryLoading } = useCategory(subcategory?.categoryId || '');

  const loading = subcategoryLoading || subcategoryLoading;
  const error = subcategoryError;

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath={`/subcategories/${slug}`} />
      <main>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-red-600">Failed to load service details</div>
          </div>
        ) : subcategory ? (
          <>
            {/* Hero Section */}
            <section className="relative bg-(--umang-navy) py-16 sm:py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-4">
                  <Link
                    href={category ? `/departments/${category.slug || category._id}` : '/departments'}
                    className="inline-block w-fit text-white/80 hover:text-white transition"
                  >
                    ← Back to {category ? category.title : 'Departments'}
                  </Link>
                </div>
                <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  {subcategory.title}
                </h1>
                <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
                  {subcategory.description}
                </p>
              </div>
            </section>

            {/* Details Section */}
            <section className="bg-gray-50 py-12 sm:py-16 md:py-24">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {subcategory.image && (
                  <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={subcategory.image}
                      alt={subcategory.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-[var(--umang-navy)] mb-6">
                    About this service
                  </h2>
                  
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: subcategory.explanation }}
                  />

                  {/* CTA Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-[var(--umang-navy)] mb-4">
                      Ready to schedule a consultation?
                    </h3>
                    <Link
                      href="/contact"
                      className="inline-block bg-[var(--umang-navy)] hover:bg-[var(--umang-green)] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid gap-6 mt-12 sm:grid-cols-3">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-[var(--umang-green)] mb-2">
                      10+
                    </div>
                    <p className="text-gray-600">Years of Experience</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-[var(--umang-green)] mb-2">
                      500+
                    </div>
                    <p className="text-gray-600">Successful Treatments</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-[var(--umang-green)] mb-2">
                      100%
                    </div>
                    <p className="text-gray-600">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-gray-600">Service not found</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
