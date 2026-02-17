import Link from "next/link";
import Image from "next/image";

const doctors = [
  {
    name: "Dr. Rajendra Singh",
    specialization: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    image: "/images/doctor-One-img.svg",
    experience: "15+",
  },
  {
    name: "Dr. Rajendra Singh",
    specialization: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    image: "/images/doctor-Two-img.svg",
    experience: "15+",
  },
  {
    name: "Dr. Rajendra Singh",
    specialization: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    image: "/images/doctor-three-img.svg",
    experience: "15+",
  },
  {
    name: "Dr. Rajendra Singh",
    specialization: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    image: "/images/doctor-four-img.svg",
    experience: "15+",
  },
];

export default function ExpertTeam() {
  return (
    <section className="border-t border-gray-200 bg-white py-10 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
          OUR SPECIALISTS
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-[#1e3a5f] sm:text-3xl md:text-4xl">
          Meet Our Expert Team
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600 sm:mt-4 sm:text-base">
          Board-Certified Specialists Dedicated To Providing The Highest Quality Care.
        </p>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {doctors.map((doc, i) => (
            <Link
              key={i}
              href={`/doctors#profile`}
              className="expert-team-card group block overflow-hidden rounded-t-2xl rounded-b-lg bg-white transition"
            >
              <div className="expert-team-card-image relative aspect-[3/4] min-h-[200px] overflow-hidden bg-gray-200 sm:min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition group-hover:scale-105"
                  style={{ backgroundImage: `url(${doc.image})` }}
                />
                <div className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
                  <Image
                    src="/images/15plus-ex-img.svg"
                    alt="15+ years experience"
                    width={72}
                    height={48}
                    className="h-12 w-auto sm:h-14 md:h-16"
                  />
                </div>
              </div>
              <div className="p-4 text-left sm:p-5">
                <h3 className="text-base font-bold text-[var(--umang-navy)] sm:text-lg">
                  {doc.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--umang-teal)] sm:mt-2">
                  {doc.specialization}
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:mt-1.5">{doc.qualification}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
