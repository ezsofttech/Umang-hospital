import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Contact US", href: "/#contact" },
  { label: "Careers", href: "/#careers" },
  { label: "Doctors", href: "/doctors" },
  { label: "Gallery", href: "/#gallery" },
  { label: "IVF", href: "/services" },
  { label: "Blogs", href: "/#blogs" },
];

const departments = [
  "INFERTILITY / IVF / REPRODUCTIVE MEDICINE",
  "OBSTETRICS and GYNAECOLOGY",
  "BURN/PLASTIC SURGERY",
  "CARDIOLOGY",
  "COSMETIC SURGERY",
  "LASER SURGERY",
  "PAEDIATRICS / NEONATOLOGY",
  "EMERGENCY MEDICINE",
];

const social = [
  { name: "Facebook", href: "#", aria: "Facebook", icon: "fi-brands-facebook" },
  { name: "X", href: "#", aria: "X (Twitter)", icon: "fi-brands-twitter" },
  { name: "Google", href: "#", aria: "Google", icon: "fi-brands-google" },
  { name: "YouTube", href: "#", aria: "YouTube", icon: "fi-brands-youtube" },
  { name: "LinkedIn", href: "#", aria: "LinkedIn", icon: "fi-brands-linkedin" },
];

const insuranceLogos = [
  { src: "/images/HDFC%20ERGO.svg", alt: "HDFC ERGO" },
  { src: "/images/TATA%20AIG.svg", alt: "TATA AIG Insurance" },
  { src: "/images/partner.svg", alt: "Care Health Insurance" },
  { src: "/images/partner-two.svg", alt: "ICICI Lombard" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white">
      {/* White area: space for certification band; band overlaps into dark section (md+) */}
      <div className="relative bg-white pb-12 md:pb-0 md:pt-14">
        {/* Certification band: in flow on mobile; floating overlap on desktop (Figma) */}
        <div className="mx-auto max-w-4xl px-4 md:absolute md:left-1/2 md:top-0 md:z-10 md:-translate-x-1/2 md:px-6">
          <div className="flex flex-col rounded-xl border-2 border-[#1A243D] bg-white py-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 md:gap-12 md:py-4 md:px-12 lg:px-16">
            <div className="flex flex-col items-center sm:items-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#16355A] opacity-40 md:mb-4">
                NABH CERTIFIED
              </p>
              <Image
                src="/images/NABH.svg"
                alt="NABH Accreditation - Safe and Quality Care"
                width={100}
                height={50}
                className="h-14 w-auto object-contain sm:h-12"
              />
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#16355A] opacity-40 md:mb-4">
                LEADING INSURANCE PROVIDER
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 md:justify-end">
                {insuranceLogos.map((logo, i) => (
                  <Image
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={50}
                    className="h-14 w-auto object-contain sm:h-12"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer - dark navy; extra top padding so band overlaps into this (Figma) */}
      <div className="bg-[#141630] text-white">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 sm:pt-24 sm:pb-20 md:pt-28 md:pb-28 lg:px-8">
          <div className="grid gap-10 text-left sm:gap-14 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-20">
            {/* Column 1: Logo + Follow Us */}
            <div>
              <div className="inline-block bg-white px-4 py-2 sm:px-4 sm:py-3">
                <Image
                  src="/images/uamng-final.svg"
                  alt="UMANG Hospital - IVF & Super Specialty Centre"
                  width={180}
                  height={100}
                  className="h-auto w-32 object-contain sm:w-40"
                />
              </div>
              <p className="mt-10 text-sm font-medium text-white/95 sm:mb-1 sm:mt-24">
                Follow Us on
              </p>
              <div className="flex">
                {social.map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90 sm:h-10 sm:w-10"
                    aria-label={s.aria}
                  >
                    <i className={`fi ${s.icon} text-lg sm:text-xl`} aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#699C78]">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/90 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Department */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#699C78]">
                DEPARTMENT
              </h3>
              <ul className="space-y-2.5">
                {departments.map((name, i) => (
                  <li key={i}>
                    <Link
                      href="/#departments"
                      className="text-sm text-white/90 transition hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Office, Phone, Email */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#699C78]">
                OFFICE
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                In front of Rani Sati Mandir, Gaurav Path-Ring Road-2, Bilaspur,
                Chhattisgarh 495001
              </p>
              <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-[#699C78]">
                PHONE
              </h3>
              <p className="text-sm text-white/90">
                +91 7710203022 / +91 8889450411
              </p>
              <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-[#699C78]">
                EMAIL
              </h3>
              <p className="text-sm text-white/90">umanghospitalbsp@gmail.com</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 text-center text-xs text-white/50 sm:text-sm">
            Made with <span className="text-red-500" aria-hidden>❤️</span> by EZ
            Softtech Pvt Ltd.
          </div>
        </div>
      </div>
    </footer>
  );
}
