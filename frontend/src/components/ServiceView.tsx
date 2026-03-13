import Link from "next/link";
import type { Subcategory, Category } from "@/types";
import { SITE_URL } from "@/lib/config";

const HOSPITAL_PHONE_1 = "+91 7710203022";
const HOSPITAL_PHONE_2 = "+91 8889450411";
const HOSPITAL_EMAIL = "umanghospital.hr@gmail.com";
const HOSPITAL_ADDRESS =
  "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2, Bilaspur, Chhattisgarh 495001";

type Props = {
  subcategory: Subcategory;
  category: Category | null;
  relatedServices: Subcategory[];
};

export function ServiceJsonLd({
  subcategory,
  category,
}: {
  subcategory: Subcategory;
  category: Category | null;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${SITE_URL}/services/${subcategory.slug}`,
    name: subcategory.title,
    description: subcategory.description,
    url: `${SITE_URL}/services/${subcategory.slug}`,
    procedureType: category?.title,
    image: subcategory.image
      ? subcategory.image.startsWith("http")
        ? subcategory.image
        : `${SITE_URL}${subcategory.image}`
      : undefined,
    provider: {
      "@type": "Hospital",
      name: "UMANG Hospital",
      url: SITE_URL,
      telephone: HOSPITAL_PHONE_1,
      email: HOSPITAL_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: HOSPITAL_ADDRESS,
        addressLocality: "Bilaspur",
        addressRegion: "Chhattisgarh",
        postalCode: "495001",
        addressCountry: "IN",
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Departments", item: `${SITE_URL}/departments` },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.title,
              item: `${SITE_URL}/departments/${category.slug || category._id}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: subcategory.title,
        item: `${SITE_URL}/services/${subcategory.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export default function ServiceView({ subcategory, category, relatedServices }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:px-8 lg:pt-24 lg:pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">

        {/* ── Left column: service content ── */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Summary card */}
          <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
              {subcategory.image && (
                <div className="h-44 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-48 sm:w-56">
                  <img
                    src={subcategory.image}
                    alt={`${subcategory.title} at UMANG Hospital Bilaspur`}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-(--umang-navy) sm:text-2xl">
                  {subcategory.title}
                </h2>
                {category && (
                  <p className="mt-1 text-sm font-medium text-(--umang-teal) sm:text-base">
                    {category.title}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-justify text-gray-700 sm:text-base">
                  {subcategory.description}
                </p>
                {category && (
                  <p className="mt-3 text-xs text-gray-500">
                    <span className="font-semibold text-(--umang-navy)">DEPARTMENT: </span>
                    <Link
                      href={`/departments/${category.slug || category._id}`}
                      className="text-(--umang-green) hover:underline"
                    >
                      {category.title}
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </article>

          {/* About / Explanation */}
          {subcategory.explanation && (
            <section aria-labelledby="about-service">
              <h2
                id="about-service"
                className="text-lg font-bold text-(--umang-navy) sm:text-xl"
              >
                About {subcategory.title}
              </h2>
              <div
                className="prose prose-sm sm:prose max-w-none mt-3 text-gray-700 
                  prose-headings:text-(--umang-navy) prose-a:text-(--umang-green)
                  prose-strong:text-(--umang-navy) leading-relaxed"
                dangerouslySetInnerHTML={{ __html: subcategory.explanation }}
              />
            </section>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {(subcategory.stats && subcategory.stats.length > 0
              ? subcategory.stats
              : [
                  { value: "10+", label: "Years of Experience" },
                  { value: "1000+", label: "Successful Cases" },
                  { value: "NABH", label: "Certified Hospital" },
                ]
            ).map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-(--umang-green) sm:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Department block */}
          {category && (
            <section className="rounded-lg bg-(--umang-navy) p-6 text-white">
              <h3 className="text-lg font-bold sm:text-xl">{category.title}</h3>
              {category.description && (
                <p className="mt-2 text-sm leading-relaxed text-justify text-white/95 sm:text-base">
                  {category.description}
                </p>
              )}
              <Link
                href={`/departments/${category.slug || category._id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white underline hover:no-underline"
              >
                View Department Details
                <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
              </Link>
            </section>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <aside
          className="w-full shrink-0 lg:w-80 xl:w-96"
          aria-label="Book appointment and related services"
        >
          {/* Appointment card — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:z-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-(--umang-navy)">
              Book Appointment
            </h3>
            <p className="mt-2 text-sm text-justify text-gray-600">
              Schedule a {subcategory.title} consultation at Umang Hospital, Bilaspur.
            </p>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${HOSPITAL_PHONE_1.replace(/\s/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--umang-teal) px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                <i className="fi fi-sr-phone-call" aria-hidden /> Call: {HOSPITAL_PHONE_1}
              </a>
              <a
                href={`tel:${HOSPITAL_PHONE_2.replace(/\s/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-(--umang-navy) px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                <i className="fi fi-sr-phone-call" aria-hidden /> Call: {HOSPITAL_PHONE_2}
              </a>
              <a
                href={`mailto:${HOSPITAL_EMAIL}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
              >
                <i className="fi fi-sr-envelope" aria-hidden /> Email for Appointment
              </a>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-(--umang-green) bg-white px-4 py-3 text-sm font-medium text-(--umang-green) transition hover:bg-(--umang-green) hover:text-white"
              >
                <i className="fi fi-sr-comment" aria-hidden /> Send Enquiry
              </Link>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-justify text-gray-600">
              <i className="fi fi-sr-marker mt-0.5 shrink-0" aria-hidden />
              {HOSPITAL_ADDRESS}
            </p>
          </div>

          {/* Related services */}
          {relatedServices.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-bold text-(--umang-navy)">
                {category ? `More in ${category.title}` : "Related Services"}
              </h3>
              <ul className="mt-3 space-y-2">
                {relatedServices.map((svc) => (
                  <li key={svc._id}>
                    <Link
                      href={`/services/${svc.slug || svc._id}`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-(--umang-green) transition-colors"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-(--umang-teal)" aria-hidden />
                      {svc.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {category && (
                <Link
                  href={`/departments/${category.slug || category._id}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--umang-navy) hover:text-(--umang-green) transition-colors"
                >
                  View All {category.title} Services
                  <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
                </Link>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
