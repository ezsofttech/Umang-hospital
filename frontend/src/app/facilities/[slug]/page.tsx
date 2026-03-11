import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import FacilitiesHero from "@/components/FacilitiesHero";
import Footer from "@/components/Footer";
import { fetchFacilities, fetchFacilitiesBySlug } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

/** Strip HTML tags so meta description is plain text */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const facilities = await fetchFacilities(true);
    return facilities
      .filter((f) => typeof f.slug === 'string' && f.slug.length > 0)
      .map((f) => ({ slug: f.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const facility = await fetchFacilitiesBySlug(slug);
  if (!facility) return { title: "Facility not found" };
  const title = `${facility.title} | UMANG Hospital Facilities`;
  const rawDescription = facility.excerpt ?? stripHtml(facility.body);
  const description = rawDescription.slice(0, 160);
  const imageUrl = facility.image
    ? facility.image.startsWith("http") ? facility.image : `${SITE_URL}${facility.image}`
    : undefined;
  return {
    title,
    description,
    keywords: facility.keywords ?? (facility.tags?.join(", ") ?? undefined),
    authors: facility.author ? [{ name: facility.author }] : undefined,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/facilities/${facility.slug}`,
      type: "article",
      publishedTime: facility.createdAt,
      modifiedTime: facility.updatedAt,
      images: imageUrl ? [{ url: imageUrl, alt: facility.title }] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/facilities/${facility.slug}`,
    },
  };
}

export default async function FacilityPage({ params }: Props) {
  const { slug } = await params;
  const facility = await fetchFacilitiesBySlug(slug);
  if (!facility) notFound();

  const imageUrl = facility.image
    ? facility.image.startsWith("http") ? facility.image : `${SITE_URL}${facility.image}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": facility.title,
    "description": facility.excerpt ?? stripHtml(facility.body).slice(0, 160),
    "url": `${SITE_URL}/facilities/${facility.slug}`,
    "datePublished": facility.createdAt,
    "dateModified": facility.updatedAt,
    "author": facility.author
      ? { "@type": "Person", "name": facility.author }
      : { "@type": "Organization", "name": "UMANG Hospital" },
    "publisher": {
      "@type": "Organization",
      "name": "UMANG Hospital",
      "url": SITE_URL,
    },
    ...(imageUrl ? { "image": imageUrl } : {}),
    ...(facility.keywords ? { "keywords": facility.keywords } : {}),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header currentPath="/facilities" />
      <main>
        <FacilitiesHero title={facility.title} />

        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <time dateTime={facility.createdAt}>
              {new Date(facility.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {facility.updatedAt !== facility.createdAt && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {new Date(facility.updatedAt).toLocaleDateString("en-IN")}</span>
              </>
            )}
          </div>

          {facility.excerpt && (
            <p className="mb-6 text-justify text-lg text-gray-600">{facility.excerpt}</p>
          )}

          {facility.image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: facility.body }}
          />
        </article>

        <div className="border-t border-gray-200 bg-gray-50/50 py-8">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-95"
            >
              <i className="fi fi-sr-arrow-left text-sm" aria-hidden />
              Back to facilities
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
