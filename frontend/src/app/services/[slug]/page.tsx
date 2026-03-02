import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchSubcategoryBySlug, fetchCategoryById, fetchSubcategories } from "@/lib/serverApi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umanghospital.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const subcategories = await fetchSubcategories();
    return subcategories.map((sub) => ({ slug: sub.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subcategory = await fetchSubcategoryBySlug(slug);
  if (!subcategory) return { title: "Service not found" };

  const title = `${subcategory.title} | UMANG Hospital Bilaspur`;
  const description = subcategory.description || `Expert ${subcategory.title.toLowerCase()} services at UMANG Hospital, Bilaspur. Advanced medical care with experienced specialists and state-of-the-art facilities.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${subcategory.slug}`,
      type: "website",
      images: subcategory.image ? [{
        url: subcategory.image.startsWith('http') ? subcategory.image : `${SITE_URL}${subcategory.image}`,
        alt: `${subcategory.title} services at UMANG Hospital`
      }] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/services/${subcategory.slug}`,
    },
    keywords: [
      subcategory.title,
      `${subcategory.title} Bilaspur`,
      `${subcategory.title} UMANG Hospital`,
      "medical services",
      "hospital Bilaspur",
      "healthcare Chhattisgarh"
    ],
  };
}

// Structured Data Component
function ServiceJsonLd({ subcategory, category }: { subcategory: any, category: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": subcategory.title,
    "description": subcategory.description,
    "url": `${SITE_URL}/services/${subcategory.slug}`,
    "medicalCode": {
      "@type": "MedicalCode",
      "codingSystem": "UMANG-SERVICE",
      "codeValue": subcategory._id
    },
    "procedureType": category?.title,
    "bodyLocation": subcategory.title.includes("Hair") ? "Scalp" : undefined,
    "provider": {
      "@type": "Hospital",
      "name": "UMANG Hospital",
      "url": SITE_URL,
      "hasCredential": "NABH Certified",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bilaspur",
        "addressRegion": "Chhattisgarh",
        "addressCountry": "IN"
      },
      "telephone": "+91-XXXX-XXXX",
      "email": "info@umanghospital.com"
    },
    "offers": {
      "@type": "Offer",
      "name": subcategory.title,
      "description": subcategory.explanation,
      "seller": {
        "@type": "Hospital",
        "name": "UMANG Hospital"
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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const subcategory = await fetchSubcategoryBySlug(slug);
  
  if (!subcategory) {
    notFound();
  }

  const category = subcategory.categoryId ? await fetchCategoryById(subcategory.categoryId) : null;

  return (
    <div className="min-h-screen bg-white">
      <ServiceJsonLd subcategory={subcategory} category={category} />
      <Header currentPath="/services" />
      <main>
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": SITE_URL
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Departments",
                  "item": `${SITE_URL}/departments`
                },
                ...(category ? [{
                  "@type": "ListItem",
                  "position": 3, 
                  "name": category.title,
                  "item": `${SITE_URL}/departments/${category.slug || category._id}`
                }] : []),
                {
                  "@type": "ListItem",
                  "position": category ? 4 : 3,
                  "name": subcategory.title,
                  "item": `${SITE_URL}/services/${subcategory.slug}`
                }
              ]
            })
          }}
        />

        {/* Hero Section */}
        <section className="relative bg-(--umang-navy) py-16 sm:py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4" aria-label="Breadcrumb">
              {category ? (
                <Link
                  href={`/departments/${category.slug || category._id}`}
                  className="inline-block text-white/80 hover:text-white transition"
                >
                  ← Back to {category.title}
                </Link>
              ) : (
                <Link
                  href="/departments"
                  className="inline-block text-white/80 hover:text-white transition"
                >
                  ← Back to Departments
                </Link>
              )}
            </nav>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {subcategory.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
              {subcategory.description}
            </p>
          </div>
        </section>

        {/* Details Section */}
        <section className="bg-gray-50 py-12 sm:py-16 md:py-24" aria-labelledby="service-details">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {subcategory.image && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={subcategory.image}
                  alt={`${subcategory.title} at UMANG Hospital Bilaspur`}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            <article className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <header>
                <h2 id="service-details" className="text-2xl font-bold text-[var(--umang-navy)] mb-6">
                  About {subcategory.title}
                </h2>
              </header>
              
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
                  className="inline-block bg-[var(--umang-navy)] hover:bg-[var(--umang-green)] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--umang-navy)]"
                  aria-describedby="contact-description"
                >
                  Get in Touch
                </Link>
                <p id="contact-description" className="sr-only">
                  Contact UMANG Hospital to schedule your {subcategory.title} consultation
                </p>
              </div>
            </article>

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
                  1000+
                </div>
                <p className="text-gray-600">Successful Cases</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-[var(--umang-green)] mb-2">
                  NABH
                </div>
                <p className="text-gray-600">Certified Hospital</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}