import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umang-hospital.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UMANG Hospital | Best IVF Center & Super Specialty Hospital in Bilaspur",
    template: "%s | UMANG Hospital",
  },
  description:
    "Umang IVF & Super Specialty Hospital, Bilaspur. Advanced fertility, gynecology, plastic surgery, hair transplant, cardiology. NABH certified. Book an appointment.",
  keywords: [
    "IVF center Bilaspur",
    "super specialty hospital Bilaspur",
    "Umang Hospital",
    "fertility treatment Chhattisgarh",
    "NABH certified hospital",
    "plastic surgery",
    "cardiology",
    "gynecology",
    "hair transplant Bilaspur",
  ],
  authors: [{ name: "UMANG Hospital", url: SITE_URL }],
  creator: "UMANG Hospital",
  publisher: "UMANG Hospital",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/images/uamng-final.svg",
    shortcut: "/images/uamng-final.svg",
    apple: "/images/uamng-final.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "UMANG Hospital",
    title: "UMANG Hospital | Best IVF Center & Super Specialty Hospital in Bilaspur",
    description:
      "Umang IVF & Super Specialty Hospital, Bilaspur. Advanced fertility, gynecology, plastic surgery, hair transplant, cardiology. NABH certified. Book an appointment.",
    images: [
      {
        url: "/images/uamng-final.svg",
        width: 500,
        height: 500,
        alt: "UMANG Hospital - IVF & Super Speciality Centre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMANG Hospital | Best IVF Center & Super Specialty Hospital in Bilaspur",
    description:
      "Umang IVF & Super Specialty Hospital, Bilaspur. Advanced fertility, gynecology, plastic surgery, hair transplant, cardiology. NABH certified.",
    images: ["/images/uamng-final.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    // Add when you have them: google: "google-site-verification-code", yandex: "yandex-verification-code"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "UMANG Hospital",
    "alternateName": "Umang IVF & Super Specialty Hospital",
    "description": "Leading IVF center and super specialty hospital in Bilaspur, Chhattisgarh. NABH certified with advanced medical facilities.",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/uamng-final.svg`,
    "image": `${SITE_URL}/images/uamng-final.svg`,
    "telephone": "+91-XXXX-XXXX",
    "email": "info@umanghospital.com",
    "hasCredential": "NABH Certified",
    "medicalSpecialty": [
      "IVF & Fertility Treatment",
      "Gynecology & Obstetrics", 
      "Plastic Surgery",
      "Hair Transplant",
      "Cardiology"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hospital Address",
      "addressLocality": "Bilaspur",
      "addressRegion": "Chhattisgarh", 
      "postalCode": "495001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.0797,
      "longitude": 82.1409
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "currenciesAccepted": "INR",
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/umanghospital",
      "https://www.instagram.com/umanghospital",
      "https://www.youtube.com/umanghospital"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@flaticon/flaticon-uicons@3.3.1/css/brands/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@flaticon/flaticon-uicons@3.3.1/css/solid/all.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <WhatsAppSticky />
      </body>
    </html>
  );
}
