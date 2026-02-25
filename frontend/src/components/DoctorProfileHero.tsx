import Link from "next/link";
import type { Doctor } from "@/data/doctors";

type Props = { doctor: Doctor };

export default function DoctorProfileHero({ doctor }: Props) {
  const subtitle = `${doctor.role} at Umang IVF & Super Speciality Hospital, Bilaspur`;

  return (
    <section className="bg-[var(--umang-navy)] px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-3 text-xs text-white/90 sm:mb-4 sm:text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[var(--umang-teal)]">
                Home
              </Link>
            </li>
            <i className="fi fi-sr-angle-right text-white/70" aria-hidden />
            <li>
              <Link href="/doctors" className="hover:text-[var(--umang-teal)]">
                Our Doctors
              </Link>
            </li>
            <i className="fi fi-sr-angle-right text-white/70" aria-hidden />
            <li className="text-white font-medium" aria-current="page">{doctor.name}</li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {doctor.name}
        </h1>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-justify text-white/95 sm:mt-4 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
