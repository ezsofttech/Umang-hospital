import Link from "next/link";

export default function ServicesHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-[#1e3a5f] px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-3 text-xs text-[#FFFFFF] sm:mb-4 sm:text-sm">
          <Link href="/" className="hover:text-[var(--umang-teal)]">
            Home
          </Link>
          <span className="mx-1.5 sm:mx-2">&#8250;</span>
          <span className="text-[#FFFFFF]">Service Page</span>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-3 max-w-5xl text-base leading-relaxed text-white/95 sm:mt-4 sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
