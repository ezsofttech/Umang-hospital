import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-100 py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-white px-5 py-8 shadow-md sm:px-8 sm:py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            OUR PARTNERS
          </p>
          <h2 className="mt-1 text-center text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg md:text-xl">
            Our Associations And Recognition
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:mt-8 sm:gap-6 md:gap-8">
            <Image
              src="/images/NABH.svg"
              alt="NABH Certified"
              width={80}
              height={56}
              className="h-12 w-auto object-contain sm:h-14"
            />
            <Image
              src="/images/HDFC%20ERGO.svg"
              alt="HDFC ERGO"
              width={120}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
            />
            <Image
              src="/images/TATA%20AIG.svg"
              alt="TATA AIG"
              width={120}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
            />
            <Image
              src="/images/partner.svg"
              alt="Partner"
              width={80}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
            />
            <Image
              src="/images/partner-two.svg"
              alt="Partner"
              width={80}
              height={48}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
