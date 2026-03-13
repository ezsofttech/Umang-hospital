import type { Metadata } from "next";
import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutUs from "@/components/AboutUs";
import ExpertTeam from "@/components/ExpertTeam";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "About UMANG Hospital Bilaspur – IVF & Super Specialty Hospital",
  description:
    "Learn about UMANG IVF & Super Specialty Hospital in Bilaspur, Chhattisgarh. State-of-the-art facilities, experienced doctors, and comprehensive healthcare services including fertility treatments, plastic surgery, and emergency care.",
  keywords: [
    "about Umang Hospital",
    "UMANG IVF Hospital Bilaspur",
    "super specialty hospital Chhattisgarh",
    "best fertility hospital",
    "hospital services Bilaspur",
  ],
  openGraph: {
    title: "About UMANG Hospital Bilaspur",
    description:
      "Discover UMANG IVF & Super Specialty Hospital – Bilaspur's leading healthcare provider with advanced fertility treatments and specialist services.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/about-us-img.svg`,
        width: 1200,
        height: 630,
        alt: "UMANG Hospital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About UMANG Hospital Bilaspur",
    description:
      "Discover UMANG IVF & Super Specialty Hospital – Bilaspur's leading healthcare provider.",
    images: [`${SITE_URL}/images/about-us-img.svg`],
  },
};

function AboutJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/about`,
    name: "UMANG IVF & Super Specialty Hospital",
    url: SITE_URL,
    description:
      "State-of-the-art IVF and super specialty hospital providing advanced fertility treatments, plastic surgery, and comprehensive healthcare services in Bilaspur, Chhattisgarh.",
    image: `${SITE_URL}/images/about-us-img.svg`,
    telephone: "+91 7710203022",
    email: "umanghospital.hr@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2",
      addressLocality: "Bilaspur",
      addressRegion: "Chhattisgarh",
      postalCode: "495001",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.facebook.com/umanghospital",
      "https://www.instagram.com/umanghospital",
      "https://www.youtube.com/@umanghospital",
    ],
    priceRange: "₹₹",
    department: [
      {
        "@type": "Thing",
        name: "IVF & Fertility",
      },
      {
        "@type": "Thing",
        name: "Plastic Surgery",
      },
      {
        "@type": "Thing",
        name: "General Surgery",
      },
      {
        "@type": "Thing",
        name: "Emergency Care",
      },
    ],
    award: [
      {
        "@type": "Thing",
        name: "NABH Certified",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "19:00",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />
      <Header />
      <AboutHero />
      <AboutUs />
      <ExpertTeam />
      <Footer />
    </>
  );
}
