import type { Metadata } from "next";
import Header from "@/components/Header";
import GalleryHero from "@/components/GalleryHero";
import Footer from "@/components/Footer";
import { fetchGallery } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";
import { API_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Gallery | UMANG Hospital Bilaspur",
  description:
    "View our hospital gallery – facilities, departments and moments at UMANG IVF & Super Specialty Hospital, Bilaspur.",
  openGraph: { title: "Gallery | UMANG Hospital Bilaspur", url: `${SITE_URL}/gallery` },
};

function imageSrc(url: string | null | undefined) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default async function GalleryPage() {
  let gallery: { id: string; title: string; image?: string | null; caption?: string | null; order: number }[] = [];
  let error = "";
  try {
    gallery = await fetchGallery(true);
  } catch {
    error = "Unable to load gallery.";
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/gallery" />
      <main>
        <GalleryHero
          title="Gallery"
          subtitle="Explore our hospital through images – facilities, departments and more at UMANG Hospital."
        />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-16">
          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {error}
            </div>
          )}
          {!error && gallery.length === 0 && (
            <p className="text-center text-gray-600">No gallery images yet. Check back soon.</p>
          )}
          {!error && gallery.length > 0 && (
            <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-2 grid-flow-dense gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
              {gallery.map((item, i) => {
                const isFeatured = i % 4 === 0;
                return (
                  <figure
                    key={item.id}
                    className={`group relative overflow-hidden rounded-lg bg-gray-100 ${
                      isFeatured ? "col-span-2 row-span-2 min-h-[280px] md:col-span-2 md:row-span-2 md:min-h-[360px]" : ""
                    }`}
                  >
                    {item.image ? (
                      <img
                        src={imageSrc(item.image)}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] opacity-80 ${isFeatured ? "min-h-[280px] md:min-h-[360px]" : "min-h-[180px]"}`} />
                    )}
                    {(item.title || item.caption) && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <p className="text-sm font-medium text-white">{item.title || ""}</p>
                        {item.caption && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-white/90">{item.caption}</p>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}
