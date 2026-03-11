import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FacilitiesHero from "@/components/FacilitiesHero";
import Footer from "@/components/Footer";
import { fetchFacilities } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Facilities | Medical & Hospital Facilities | UMANG Hospital Bilaspur",
  description:
    "Explore our state-of-the-art facilities and advanced medical equipment at UMANG IVF & Super Specialty Hospital, Bilaspur.",
  openGraph: { title: "Facilities | UMANG Hospital Bilaspur", url: `${SITE_URL}/facilities` },
};

export default async function FacilitiesPage() {
  let facilities: { id: string; title: string; slug: string; excerpt: string | null; image?: string | null; createdAt: string }[] = [];
  let error = "";
  try {
    facilities = await fetchFacilities(true);
  } catch {
    error = "Unable to load facilities.";
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/facilities" />
      <main>
        <FacilitiesHero
          title="Facilities"
          subtitle="Discover our comprehensive range of world-class medical facilities and equipment at UMANG Hospital."
        />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-16">
          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {error}
            </div>
          )}
          {!error && facilities.length === 0 && (
            <p className="text-center text-gray-600">No facilities available yet. Check back soon.</p>
          )}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <Link
                  href={`/facilities/${facility.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-[var(--umang-teal)] hover:shadow-md"
                >
                  {facility.image ? (
                    <div className="h-44 overflow-hidden bg-gray-100">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] opacity-80" />
                  )}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <time className="text-xs font-medium text-gray-500" dateTime={facility.createdAt}>
                      {new Date(facility.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-[var(--umang-navy)] line-clamp-2 sm:text-xl">
                      {facility.title}
                    </h2>
                    {facility.excerpt && (
                      <p className="mt-2 line-clamp-3 text-justify text-sm text-gray-600">{facility.excerpt}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--umang-teal)]">
                      Learn more
                      <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  );
}
