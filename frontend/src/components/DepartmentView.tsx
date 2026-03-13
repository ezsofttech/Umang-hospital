import Link from "next/link";
import type { Category, Subcategory } from "@/types";
import { SITE_URL } from "@/lib/config";

const HOSPITAL_PHONE_1 = "+91 7710203022";
const HOSPITAL_PHONE_2 = "+91 8889450411";
const HOSPITAL_EMAIL = "umanghospital.hr@gmail.com";
const HOSPITAL_ADDRESS =
  "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2, Bilaspur, Chhattisgarh 495001";

type Props = {
  category: Category;
  subcategories: Subcategory[];
  allCategories: Category[];
};

export function DepartmentJsonLd({
  category,
  subcategories,
}: {
  category: Category;
  subcategories: Subcategory[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/departments/${category.slug}`,
    name: `UMANG Hospital – ${category.title}`,
    description: category.description,
    url: `${SITE_URL}/departments/${category.slug}`,
    medicalSpecialty: category.title,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${category.title} Services`,
      itemListElement: subcategories.map((sub, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: sub.title,
        description: sub.description,
        url: `${SITE_URL}/services/${sub.slug || sub._id}`,
      })),
    },
    provider: {
      "@type": "Hospital",
      name: "UMANG Hospital",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: HOSPITAL_ADDRESS,
        addressLocality: "Bilaspur",
        addressRegion: "Chhattisgarh",
        postalCode: "495001",
        addressCountry: "IN",
      },
      telephone: HOSPITAL_PHONE_1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function DepartmentView({ category, subcategories, allCategories }: Props) {
  const otherCategories = allCategories
    .filter((c) => c._id !== category._id && c.active)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:px-8 lg:pt-24 lg:pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">

        {/* ── Left column: subcategory cards ── */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Department summary card */}
          <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-48 sm:w-56"
                />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-(--umang-navy) sm:text-2xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-(--umang-teal) sm:text-base">
                  UMANG Hospital – Bilaspur
                </p>
                <p className="mt-3 text-sm leading-relaxed text-justify text-gray-700 sm:text-base">
                  {category.description}
                </p>
              </div>
            </div>
          </article>

          {/* Services heading */}
          <section aria-labelledby="services-heading">
            <h2
              id="services-heading"
              className="text-lg font-bold text-(--umang-navy) sm:text-xl"
            >
              Our {category.title} Services
            </h2>

            {subcategories.length === 0 ? (
              <div className="mt-4 flex items-center justify-center rounded-lg bg-white py-12 shadow-sm border border-gray-200">
                <p className="text-gray-600">No services available for this department yet.</p>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/services/${sub.slug || sub._id}`}
                    className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--umang-navy) rounded-lg"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                      {sub.image && (
                        <div className="relative h-40 overflow-hidden bg-gray-100">
                          <img
                            src={sub.image}
                            alt={`${sub.title} at UMANG Hospital`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex grow flex-col p-4 sm:p-5">
                        <h3 className="text-base font-bold text-(--umang-navy) transition-colors group-hover:text-(--umang-green)">
                          {sub.title}
                        </h3>
                        <p className="mt-2 grow line-clamp-3 text-xs leading-relaxed text-justify text-gray-600 sm:text-sm">
                          {sub.description}
                        </p>
                        <span className="mt-auto pt-3 flex items-center gap-1 text-xs font-medium text-(--umang-teal)">
                          Learn More
                          <i className="fi fi-sr-arrow-right text-xs" aria-hidden />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ── Right sidebar ── */}
        <aside
          className="w-full shrink-0 lg:w-80 xl:w-96"
          aria-label="Book appointment and other departments"
        >
          {/* Appointment card — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:z-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-(--umang-navy)">
              Book Appointment
            </h3>
            <p className="mt-2 text-sm text-justify text-gray-600">
              Schedule a {category.title} consultation at Umang Hospital, Bilaspur.
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

          {/* Other departments */}
          {otherCategories.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-bold text-(--umang-navy)">Other Departments</h3>
              <ul className="mt-3 space-y-2">
                {otherCategories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/departments/${cat.slug || cat._id}`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-(--umang-green) transition-colors"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-(--umang-teal)" aria-hidden />
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/departments"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--umang-navy) hover:text-(--umang-green) transition-colors"
              >
                View All Departments
                <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
