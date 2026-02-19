import Link from "next/link";

export default function DoctorHero() {
  return (
    <section className="bg-[var(--umang-navy)] px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-3 text-xs text-white/90 sm:mb-4 sm:text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[var(--umang-teal)]">
                Home
              </Link>
            </li>
            <span className="text-white/70" aria-hidden>&#8250;</span>
            <li className="text-white font-medium" aria-current="page">
              Our Doctors
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Our Expert Doctors
        </h1>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-justify text-white/95 sm:mt-4 sm:text-lg">
          Physician leads with expert care and compassion, improving health in every step we take.
          Our team brings new ideas, tools, and heart to ensure every patient is heard and helped.
        </p>
        <p className="mt-2 max-w-4xl text-base leading-relaxed text-justify text-white/90 sm:mt-3 sm:text-lg">
          Senior Consultants & Specialists at Umang IVF & Super Speciality Hospital, Bilaspur. Our
          board-certified team brings decades of experience in IVF, Plastic Surgery, Cardiology,
          Urology, and more.
        </p>
      </div>
    </section>
  );
}
