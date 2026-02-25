export default function ExpertHero() {
  return (
    <section className="relative min-h-[320px] overflow-hidden sm:min-h-[380px] md:min-h-[440px]">
      {/* Full-width background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hospital-img.svg)" }}
      />
      {/* Top edge gradient (soft frame) */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/40 to-transparent"
        aria-hidden
      />
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />
      {/* Bottom edge gradient (soft transition to stats) */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/30 to-transparent"
        aria-hidden
      />
      {/* Hero text - lower left */}
      <div className="relative z-20 mx-auto flex max-w-7xl items-end px-4 pb-10 pt-16 sm:px-6 sm:pb-14 sm:pt-20 md:min-h-[440px] md:pb-20 md:pt-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-lg font-medium leading-tight text-white sm:text-xl md:text-2xl md:leading-snug lg:text-3xl">
            We&apos;re{" "}
            <span
              className="inline-block px-2 py-0.5 text-white"
              style={{ backgroundColor: "var(--umang-green)" }}
            >
              40+ medical experts
            </span>{" "}
            driven by innovation and excellence in healthcare
          </p>
        </div>
      </div>
    </section>
  );
}
