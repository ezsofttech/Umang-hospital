import Link from "next/link";
import Image from "next/image";
import type { Doctor } from "@/data/doctors";
import { getDoctors } from "@/data/doctors";

const SITE_URL = "https://umanghospital.com";

const HOSPITAL_PHONE_1 = "+91 7710203022";
const HOSPITAL_PHONE_2 = "+91 8889450411";
const HOSPITAL_EMAIL = "umanghospitalbsp@gmail.com";
const HOSPITAL_ADDRESS =
  "In front of Rani Sati Mandir, Gaurav Path-Ring Road-2, Bilaspur, Chhattisgarh 495001";

type Props = { doctor: Doctor };

export default function DoctorProfileView({ doctor }: Props) {
  const otherDoctors = getDoctors().filter((d) => d.slug !== doctor.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:px-8 lg:pt-24 lg:pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left column: profile content */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Summary card with doctor image */}
          <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg bg-[#1e3a5f]/10 sm:h-48 sm:w-48 md:h-56 md:w-56">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-[var(--umang-navy)] sm:text-2xl">{doctor.name}</h2>
                <p className="mt-1 text-sm font-medium text-[var(--umang-teal)] sm:text-base">{doctor.role}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
                  <li>{doctor.qualification}</li>
                  <li className="flex items-center gap-2">
                    <i className="fi fi-sr-clock h-4 w-4 shrink-0 text-gray-500" aria-hidden />
                    {doctor.experience} years Experience
                  </li>
                  {doctor.department && (
                    <li>
                      <span className="font-semibold text-[#1e3a5f]">DEPARTMENT: </span>
                      <span className="text-[var(--umang-green)]">{doctor.department}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </article>

          {/* About */}
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
              About {doctor.name}
            </h2>
            <p className="mt-3 leading-relaxed text-justify text-gray-700 sm:text-base">{doctor.about}</p>
          </section>

          {/* Specializations */}
          {doctor.specializations && (
            <section aria-labelledby="specializations-heading">
              <h2 id="specializations-heading" className="text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
                Specializations
              </h2>
              <p className="mt-3 leading-relaxed text-justify text-gray-700 sm:text-base">{doctor.specializations}</p>
            </section>
          )}

          {/* Areas of expertise */}
          {doctor.expertise && doctor.expertise.length > 0 && (
            <section aria-labelledby="expertise-heading">
              <h2 id="expertise-heading" className="text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
                Areas of Expertise
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                {doctor.expertise.map((item, i) => (
                  <li key={i}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm">
                      <i className="fi fi-sr-check h-4 w-4 shrink-0 text-[var(--umang-green)]" aria-hidden />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Department block */}
          {doctor.department && (
            <section className="rounded-lg bg-[#1e3a5f] p-6 text-white">
              <h3 className="text-lg font-bold sm:text-xl">{doctor.department}</h3>
              {doctor.departmentDescription && (
                <p className="mt-2 text-sm leading-relaxed text-justify text-white/95 sm:text-base">
                  {doctor.departmentDescription}
                </p>
              )}
              <Link
                href={doctor.departmentHref ?? "/#departments"}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white underline hover:no-underline"
              >
                View Department Details
                <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
              </Link>
            </section>
          )}
        </div>

        {/* Right column: sidebar */}
        <aside className="w-full shrink-0 lg:w-80 xl:w-96" aria-label="Book appointment and other doctors">
          {/* Book appointment card - sticky on desktop so it stays visible when scrolling */}
          <div className="lg:sticky lg:top-24 lg:z-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[var(--umang-navy)]">
              Book Appointment with {doctor.name.split(" ").slice(1).join(" ").replace("Dr. ", "")}
            </h3>
            <p className="mt-2 text-sm text-justify text-gray-600">
              Schedule a consultation at Umang Hospital, Bilaspur.
            </p>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${HOSPITAL_PHONE_1.replace(/\s/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--umang-teal)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                <i className="fi fi-sr-phone-call" aria-hidden /> Call: {HOSPITAL_PHONE_1}
              </a>
              <a
                href={`tel:${HOSPITAL_PHONE_2.replace(/\s/g, "")}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
              >
                <i className="fi fi-sr-phone-call" aria-hidden /> Call: {HOSPITAL_PHONE_2}
              </a>
              <a
                href={`mailto:${HOSPITAL_EMAIL}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
              >
                <i className="fi fi-sr-envelope" aria-hidden /> Email for Appointment
              </a>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-justify text-gray-600">
              <i className="fi fi-sr-marker mt-0.5 shrink-0" aria-hidden />
              {HOSPITAL_ADDRESS}
            </p>
          </div>

          {/* Other doctors */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-[var(--umang-navy)]">Other Doctors</h3>
            <ul className="mt-3 space-y-2">
              {otherDoctors.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/doctors/${d.slug}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[var(--umang-green)]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--umang-teal)]" aria-hidden />
                    {d.name} – {d.tag.replace(/\s*&\s*.*$/, "")}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/doctors"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--umang-navy)] hover:text-[var(--umang-green)]"
            >
              View All Doctors
              <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function DoctorJsonLd({ doctor }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctors/${doctor.slug}`,
    url: `${SITE_URL}/doctors/${doctor.slug}`,
    name: doctor.name,
    jobTitle: doctor.role,
    description: doctor.about,
    medicalSpecialty: doctor.tag,
    credential: doctor.qualification,
    image: doctor.image.startsWith("/") ? `${SITE_URL}${doctor.image}` : doctor.image,
    worksFor: {
      "@type": "Hospital",
      name: "Umang IVF & Super Specialty Hospital",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bilaspur",
        addressRegion: "Chhattisgarh",
        postalCode: "495001",
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
