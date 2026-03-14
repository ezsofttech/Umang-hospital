import type { Metadata } from "next";
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
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {facilities.map((facility, index) => {
              const isImageRight = index % 2 === 1;
              return (
                <li key={facility.id} className="flex">
                  <article
                    className={`flex min-h-[280px] w-full flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md sm:h-[340px] sm:flex-row md:h-[360px] ${isImageRight ? "sm:flex-row-reverse" : ""}`}
                  >
                    {/* Image column (~40%) - left on even cards, right on odd */}
                    <div
                      className={`h-52 w-full shrink-0 overflow-hidden border-b-2 border-gray-200 bg-gray-100 sm:h-full sm:w-[42%] sm:border-b-0 ${
                        isImageRight
                          ? "rounded-t-2xl sm:rounded-t-none sm:rounded-r-2xl sm:border-l-2"
                          : "rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl sm:border-r-2"
                      }`}
                    >
                      {facility.image ? (
                        <img
                          src={facility.image}
                          alt={facility.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] opacity-90" />
                      )}
                    </div>
                    {/* Title + description column (~58%) - right on even cards, left on odd */}
                    <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5 md:gap-5 md:p-6">
                      <div className="px-4">
                        <h2 className="text-lg font-bold leading-snug text-[var(--umang-navy)] sm:text-xl">
                          {facility.title}
                        </h2>
                      </div>
                      <div className="flex flex-1 flex-col px-4 py-2">
                        {facility.excerpt ? (
                          <p className="line-clamp-5 flex-1 text-base leading-relaxed text-gray-600 text-justify md:line-clamp-6">
                            {facility.excerpt}
                          </p>
                        ) : null}
                        <time className="mt-3 block text-sm text-gray-400" dateTime={facility.createdAt}>
                          {new Date(facility.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  );
}
