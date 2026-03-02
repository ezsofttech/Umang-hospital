import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartmentHero from "@/components/DepartmentHero";
import ServiceView, { ServiceJsonLd } from "@/components/ServiceView";
import {
  fetchSubcategoryBySlug,
  fetchCategoryById,
  fetchSubcategories,
  fetchSubcategoriesByCategory,
} from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const subcategories = await fetchSubcategories();
    return subcategories
      .filter((sub) => typeof sub.slug === "string" && sub.slug.length > 0)
      .map((sub) => ({ slug: sub.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subcategory = await fetchSubcategoryBySlug(slug);
  if (!subcategory) return { title: "Service not found" };

  const title = `${subcategory.title} | UMANG Hospital Bilaspur`;
  const description =
    subcategory.description ||
    `Expert ${subcategory.title.toLowerCase()} services at UMANG Hospital, Bilaspur.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${subcategory.slug}`,
      type: "website",
      images: subcategory.image
        ? [
            {
              url: subcategory.image.startsWith("http")
                ? subcategory.image
                : `${SITE_URL}${subcategory.image}`,
              alt: `${subcategory.title} services at UMANG Hospital`,
            },
          ]
        : undefined,
    },
    alternates: { canonical: `${SITE_URL}/services/${subcategory.slug}` },
    keywords: [
      subcategory.title,
      `${subcategory.title} Bilaspur`,
      `${subcategory.title} UMANG Hospital`,
      "medical services",
      "hospital Bilaspur",
      "healthcare Chhattisgarh",
    ],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const subcategory = await fetchSubcategoryBySlug(slug);

  if (!subcategory) notFound();

  const category = subcategory.categoryId
    ? await fetchCategoryById(subcategory.categoryId)
    : null;

  const allInCategory = category
    ? await fetchSubcategoriesByCategory(category._id)
    : [];

  const relatedServices = allInCategory
    .filter((s) => s._id !== subcategory._id)
    .slice(0, 6);

  const breadcrumb = category
    ? [{ label: category.title, href: `/departments/${category.slug || category._id}` }]
    : undefined;

  return (
    <div className="min-h-screen bg-white">
      <ServiceJsonLd subcategory={subcategory} category={category} />
      <Header currentPath="/services" />
      <main>
        <DepartmentHero
          title={subcategory.title}
          description={subcategory.description}
          breadcrumb={breadcrumb}
        />
        <ServiceView
          subcategory={subcategory}
          category={category}
          relatedServices={relatedServices}
        />
      </main>
      <Footer />
    </div>
  );
}
