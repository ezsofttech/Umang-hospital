import Link from "next/link";

export default function ContactHero() {
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
            <i className="fi fi-sr-angle-right text-white/70" aria-hidden />
            <li className="text-white font-medium" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-justify text-white/95 sm:mt-4 sm:text-lg">
          Get in touch with UMANG Hospital, Bilaspur. We&apos;re here to help with appointments,
          enquiries, and emergency care. Reach us by phone, email, or visit us in person.
        </p>
      </div>
    </section>
  );
}
