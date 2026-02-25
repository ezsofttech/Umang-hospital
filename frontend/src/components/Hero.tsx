import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-gray-700 sm:min-h-[500px] md:min-h-[600px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-img.svg)" }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col justify-center px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-24 md:min-h-[600px] md:py-32 lg:px-8">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="block">Best IVF Center & Super Specialty Hospital in Bilaspur</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:mt-6 sm:text-lg">
          Where Advanced Fertility Science Meets Compassionate Care. From IVF & Gynecology To Plastic
          Surgery, Hair Transplant, Cardiology — Experience World-Class Healthcare With Proven Results At Bilaspur&apos;s Premier Hospital.
        </p>
        <Link
          href="#appointment"
          className="mt-6 inline-flex w-fit items-center justify-center rounded-lg border-2 border-white bg-white px-6 py-3 text-[#16355A] font-semibold transition hover:bg-transparent hover:text-white sm:mt-8 sm:px-8 sm:py-3.5"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}
