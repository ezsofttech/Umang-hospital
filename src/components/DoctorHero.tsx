export default function DoctorHero() {
  return (
    <section className="relative overflow-hidden bg-[#6CAAB7] min-h-[260px] sm:min-h-[280px] md:min-h-[300px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:flex-row md:justify-between md:py-16 lg:px-8">
        <div className="max-w-3xl text-center text-white md:text-left">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Expert Specialist Doctors in Bilaspur
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/95 sm:mt-4 sm:text-lg">
            Our Team Of 20+ Board-Certified Specialists Brings Decades Of Combined Experience In
            IVF, Plastic Surgery, Cardiology, Urology, And More.
          </p>
        </div>
        <div className="relative h-48 w-48 shrink-0 sm:h-56 sm:w-56 md:h-72 md:w-80">
          <div
            className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/images/expert-img.svg)" }}
          />
          <div className="absolute -inset-3 bg-[#0d9488]/20 blur-2xl sm:-inset-4" aria-hidden />
        </div>
      </div>
    </section>
  );
}
