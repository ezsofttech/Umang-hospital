import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartmentHero from "@/components/DepartmentHero";
import DepartmentView, { DepartmentJsonLd } from "@/components/DepartmentView";
import { fetchCategoryBySlug, fetchSubcategoriesByCategory, fetchCategories } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

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
  const description =
    category.description ||
    `Comprehensive ${category.title.toLowerCase()} services at UMANG Hospital, Bilaspur.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/departments/${category.slug}`,
      type: "website",
      images: category.image
        ? [{ url: category.image.startsWith("http") ? category.image : `${SITE_URL}${category.image}`, alt: category.title }]
        : undefined,
    },
    alternates: { canonical: `${SITE_URL}/departments/${category.slug}` },
    keywords: [
      category.title,
      `${category.title} Bilaspur`,
      `${category.title} UMANG Hospital`,
      "medical services",
      "hospital Bilaspur",
      "healthcare Chhattisgarh",
    ],
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [category, allCategories] = await Promise.all([
    fetchCategoryBySlug(slug),
    fetchCategories(),
  ]);

  if (!category) notFound();

  const subcategories = await fetchSubcategoriesByCategory(category._id);

  return (
    <div className="min-h-screen bg-white">
      <DepartmentJsonLd category={category} subcategories={subcategories} />
      <Header currentPath="/departments" />
      <main>
        <DepartmentHero 
          title={category.title} 
          description={category.shortDescription || category.description} 
        />
        <DepartmentView
          category={category}
          subcategories={subcategories}
          allCategories={allCategories}
        />
      </main>
      <Footer />
    </div>
  );
}
