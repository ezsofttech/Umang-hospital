import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DepartmentHero from '@/components/DepartmentHero';
import { fetchCategories } from '@/lib/serverApi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Departments | UMANG Hospital Bilaspur',
  description:
    'Explore specialized departments at UMANG Hospital, Bilaspur — IVF & Fertility, Gynecology, Plastic Surgery, Hair Transplant and more.',
};

export default async function DepartmentsPage() {
  const categories = await fetchCategories();

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/departments" />
      <main>
        <DepartmentHero
          title="Our Departments"
          description="Explore our specialized departments and services. Click on any department to view our comprehensive treatment options."
        />

        <section className="bg-gray-50 py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 md:items-end">
              <h2 className="text-2xl font-bold text-(--umang-navy) sm:text-3xl md:text-4xl">
                All Departments
              </h2>
              <p className="text-sm text-justify text-gray-700 sm:text-base">
                <span className="text-(--umang-green)">
                  Umang IVF And Superspeciality Hospital, Bilaspur
                </span>{' '}
                offers advanced services in maternity, gynecology, plastic surgery, and hair
                treatments with experienced specialists.
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-gray-600">No departments available at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/departments/${category.slug || category._id}`}
                    className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--umang-navy) rounded-lg"
                  >
                    <article className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow group-hover:shadow-md flex h-full flex-col">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-4 sm:p-5 flex flex-col h-full">
                        <h3 className="text-base font-bold text-(--umang-navy) transition-colors group-hover:text-(--umang-green)">
                          {category.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-justify text-gray-600 sm:text-sm">
                          {category.description}
                        </p>
                        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-medium text-(--umang-teal)">
                          Read more
                          <i className="fi fi-sr-arrow-right text-xs" aria-hidden />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

