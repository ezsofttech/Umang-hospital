import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchCategoryBySlug, fetchSubcategoriesByCategory, fetchCategories } from "@/lib/serverApi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umanghospital.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    return categories
      .filter((cat) => typeof cat.slug === 'string' && cat.slug.length > 0)
      .map((cat) => ({ slug: cat.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);
  if (!category) return { title: "Department not found" };

  const title = `${category.title} | UMANG Hospital Bilaspur`;
  const description = category.description || `Comprehensive ${category.title.toLowerCase()} services at UMANG Hospital, Bilaspur. Expert medical care with advanced facilities and experienced specialists.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/departments/${category.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/departments/${category.slug}`,
    },
    keywords: [
      category.title,
      `${category.title} Bilaspur`,
      `${category.title} UMANG Hospital`,
      "medical services",
      "hospital Bilaspur",
      "healthcare Chhattisgarh"
    ],
  };
}

// Structured Data Component
function DepartmentJsonLd({ category, subcategories }: { category: any, subcategories: any[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": `UMANG Hospital - ${category.title}`,
    "description": category.description,
    "url": `${SITE_URL}/departments/${category.slug}`,
    "medicalSpecialty": category.title,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${category.title} Services`,
      "itemListElement": subcategories.map((sub, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": sub.title,
        "description": sub.description,
        "url": `${SITE_URL}/services/${sub.slug || sub._id}`,
      }))
    },
    "provider": {
      "@type": "Hospital",
      "name": "UMANG Hospital",
      "url": SITE_URL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bilaspur",
        "addressRegion": "Chhattisgarh",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const subcategories = await fetchSubcategoriesByCategory(category._id);

  return (
    <div className="min-h-screen bg-white">
      <DepartmentJsonLd category={category} subcategories={subcategories} />
      <Header currentPath="/departments" />
      <main>
        <section className="relative bg-(--umang-navy) py-16 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4" aria-label="Breadcrumb">
              <Link
                href="/departments"
                className="inline-block text-white/80 hover:text-white transition"
              >
                ← Back to Departments
              </Link>
            </nav>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {category.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
              {category.description}
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16 md:py-24" aria-labelledby="services-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="services-heading" className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl mb-8">
              Our {category.title} Services
            </h2>

            {subcategories.length === 0 ? (
              <div className="flex justify-center items-center py-12 bg-white rounded-lg">
                <p className="text-lg text-gray-600">No services available for this department</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map((subcategory) => (
                  <Link 
                    key={subcategory._id} 
                    href={`/services/${subcategory.slug || subcategory._id}`}
                    className="group"
                  >
                    <article className="cursor-pointer h-full">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 group-hover:shadow-lg h-full flex flex-col">
                        {subcategory.image && (
                          <div className="relative h-40 bg-gray-200">
                            <img
                              src={subcategory.image}
                              alt={`${subcategory.title} services at UMANG Hospital`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-sm font-bold text-[var(--umang-navy)] sm:text-base group-hover:text-[var(--umang-green)] transition-colors">
                            {subcategory.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm flex-grow">
                            {subcategory.description}
                          </p>
                          <div className="mt-4 flex items-center text-xs text-[var(--umang-green)] font-medium">
                            Learn More
                            <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
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
      </main>
      <Footer />
    </div>
  );
}