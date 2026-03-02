import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us | UMANG Hospital Bilaspur – Address, Phone, Email",
  description:
    "Contact UMANG IVF & Super Specialty Hospital, Bilaspur. Address: Rani Sati Mandir, Gaurav Path-Ring Road-2. Phone: +91 7710203022, +91 8889450411. Email: umanghospitalbsp@gmail.com. 24/7 emergency care.",
  keywords: [
    "contact Umang Hospital",
    "UMANG Hospital Bilaspur address",
    "Umang Hospital phone number",
    "IVF hospital contact Bilaspur",
  ],
  openGraph: {
    title: "Contact Us | UMANG Hospital Bilaspur",
    description:
      "Get in touch with UMANG IVF & Super Specialty Hospital, Bilaspur. Address, phone, email and map.",
    url: `${SITE_URL}/contact`,
  },
};

const CONTACT = {
  address: "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2, Bilaspur, Chhattisgarh 495001",
  phone1: "+91 7710203022",
  phone2: "+91 8889450411",
  email: "umanghospitalbsp@gmail.com",
  hours: "Mon–Fri 08:00–19:00",
  emergency: "24/7 Emergency",
  googlePlaceId: "ChIJC8IdN40LKDoR_sXGdLfwCzc",
};
const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/search/?api=1&query_place_id=";
const GOOGLE_MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir//?api=1&destination_place_id=";
const MAP_PANEL_ADDRESS = "Gaurav Path, in front of Rani Sati Mandir, Ring Road-2, Bilaspur, Chhattisgarh 495001";
const MAP_PANEL_RATING = "5.0";
const MAP_PANEL_REVIEWS = "1,139";

function getMapEmbedUrl() {
  const key =
    process.env.GOOGLE_MAPS_EMBED_API_KEY?.trim() ||
    process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key) return null;
  return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=place_id:${CONTACT.googlePlaceId}&zoom=15`;
}

function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "UMANG IVF & Super Specialty Hospital",
    description:
      "Bilaspur's premier IVF center and super specialty hospital. Advanced fertility, gynecology, plastic surgery, cardiology, NABH certified.",
    url: SITE_URL,
    telephone: [CONTACT.phone1, CONTACT.phone2],
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2",
      addressLocality: "Bilaspur",
      addressRegion: "Chhattisgarh",
      postalCode: "495001",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    priceRange: "₹₹",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ContactPage() {
  const mapUrl = `${GOOGLE_MAPS_PLACE_URL}${CONTACT.googlePlaceId}`;
  const mapEmbedUrl = getMapEmbedUrl();

  return (
    <div className="min-h-screen bg-white">
      <ContactJsonLd />
      <Header currentPath="/contact" />
      <main>
        <ContactHero />

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-16">
          {/* Row 1: Contact information + Send us a message side by side */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Contact information */}
            <section aria-labelledby="contact-info-heading" className="flex flex-col gap-4 sm:gap-6">
              <h2 id="contact-info-heading" className="text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
                Contact information
              </h2>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--umang-green)]">
                  <i className="fi fi-sr-marker text-sm" aria-hidden />
                  Office
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-justify text-gray-700 sm:text-base">
                  {CONTACT.address}
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--umang-teal)] hover:underline"
                >
                  <i className="fi fi-sr-marker text-sm" aria-hidden />
                  View on Google Maps
                  <i className="fi fi-sr-arrow-up-right text-sm" aria-hidden />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch">
                <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--umang-green)]">
                    <i className="fi fi-sr-phone-call text-sm" aria-hidden />
                    Phone
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 sm:text-base">{CONTACT.phone1}</p>
                  <p className="mt-0.5 text-sm text-gray-700 sm:text-base">{CONTACT.phone2}</p>
                  <a
                    href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-[var(--umang-navy)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95 sm:mt-4"
                  >
                    <i className="fi fi-sr-phone-call text-sm" aria-hidden />
                    Call now
                  </a>
                </div>
                <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--umang-green)]">
                    <i className="fi fi-sr-envelope text-sm" aria-hidden />
                    Email
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 sm:text-base">{CONTACT.email}</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 sm:mt-4"
                  >
                    <i className="fi fi-sr-envelope text-sm" aria-hidden />
                    Email us
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--umang-green)]">
                  <i className="fi fi-sr-clock text-sm" aria-hidden />
                  Opening hours
                </h3>
                <p className="mt-2 text-sm text-gray-700 sm:text-base">{CONTACT.hours}</p>
                <p className="mt-1 text-sm font-medium text-gray-800 sm:text-base">
                  {CONTACT.emergency}
                </p>
              </div>
            </section>

            {/* Send us a message */}
            <ContactForm />
          </div>

          {/* Row 2: Find us full width */}
          <section aria-labelledby="map-heading" className="mt-8 flex flex-col gap-4 sm:gap-6 sm:mt-10 lg:mt-12">
            <h2 id="map-heading" className="text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
              Find us
            </h2>
            {/* Google Maps–style layout: info panel left, map right */}
            <div className="grid gap-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:grid-cols-[minmax(0,320px)_1fr] md:min-h-[360px]">
              {/* Left: place info panel */}
              <div className="flex flex-col gap-3 border-b border-gray-200 bg-white p-4 md:border-b-0 md:border-r md:border-gray-200 md:p-5">
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                      Umang IVF and Super Speciality Hospital
                    </h3>
                    <p className="text-sm leading-snug text-gray-600">
                      {MAP_PANEL_ADDRESS}
                    </p>
                    <a
                      href={`${GOOGLE_MAPS_DIRECTIONS_URL}${CONTACT.googlePlaceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#4285F4] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3367D6]"
                    >
                      <i className="fi fi-sr-marker text-sm" aria-hidden />
                      Directions
                    </a>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#4285F4] hover:underline"
                    >
                      <span aria-hidden className="text-amber-400">★★★★★</span>
                      <span>{MAP_PANEL_RATING}</span>
                      <span className="text-gray-500">·</span>
                      <span>{MAP_PANEL_REVIEWS} reviews</span>
                    </a>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4285F4] hover:underline"
                >
                  <i className="fi fi-sr-marker text-sm" aria-hidden />
                  View larger map
                </a>
              </div>
              {/* Right: map */}
              <div className="aspect-[4/3] min-h-[240px] overflow-hidden bg-gray-100 md:aspect-auto md:h-full md:min-h-[360px]">
                    {mapEmbedUrl ? (
                      <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="UMANG Hospital location on Google Maps"
                        className="h-full min-h-[240px] w-full"
                      />
                    ) : (
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-2 bg-gray-100 p-6 text-center transition hover:bg-gray-200"
                      >
                        <i className="fi fi-sr-marker text-4xl text-gray-500" aria-hidden />
                        <span className="text-sm font-medium text-gray-700 sm:text-base">
                          UMANG Hospital, Bilaspur
                        </span>
                        <span className="text-sm text-[var(--umang-teal)] underline">
                          Open in Google Maps
                        </span>
                      </a>
                    )}
              </div>
            </div>
            <p className="text-sm text-justify text-gray-600 sm:text-base">
              Visit us at our campus in Bilaspur for consultations, appointments, and emergency
              care. We are located near Rani Sati Mandir on Gaurav Path, Ring Road-2.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
