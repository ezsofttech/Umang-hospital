import Link from "next/link";
import Image from "next/image";
import { getDoctors } from "@/data/doctors";

const VISIBLE_EXPERTISE = 5;

export default function ExpertTeam() {
  const doctors = getDoctors();

  return (
    <section className="border-t border-gray-200 bg-gray-50/50 py-10 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--umang-navy)]">
          OUR SPECIALISTS
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl">
          Meet Our Expert Team
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600 sm:mt-4 sm:text-base">
          Board-Certified Specialists Dedicated To Providing The Highest Quality Care.
        </p>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:gap-8">
          {doctors.map((doc) => {
            const expertise = doc.expertise ?? [];
            const visible = expertise.slice(0, VISIBLE_EXPERTISE);
            const moreCount = expertise.length - VISIBLE_EXPERTISE;

            return (
              <article
                key={doc.slug}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Header: dark bar with avatar + name + role */}
                <div className="flex items-center gap-4 bg-[#1e3a5f] px-4 py-4 sm:px-5 sm:py-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-white/10 sm:h-16 sm:w-16">
                    <Image
                      src={doc.image}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-white sm:text-xl">
                      {doc.name}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-white/85">
                      {doc.role}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5">
                  {/* Qualification & Experience row */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <i className="fi fi-sr-graduation-cap h-4 w-4 shrink-0 text-gray-500" aria-hidden />
                      {doc.qualification}
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <i className="fi fi-sr-clock h-4 w-4 shrink-0 text-gray-500" aria-hidden />
                      {doc.experience} years Experience
                    </span>
                  </div>

                  {/* Department */}
                  {doc.department && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-700">DEPARTMENT</p>
                      <p className="mt-0.5 text-sm text-[var(--umang-teal)]">
                        {doc.department}
                      </p>
                    </div>
                  )}

                  {/* About (truncated) */}
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-justify text-gray-600 sm:line-clamp-3">
                    {doc.about}
                  </p>

                  {/* Specialization pills - light gray bg, dark gray text, consistent gaps */}
                  {(expertise.length > 0) && (
                    <div className="mt-4">
                      <p className="text-xs font-bold text-gray-800">SPECIALIZATIONS</p>
                      <div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-2">
                        {visible.map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700"
                          >
                            {item}
                          </span>
                        ))}
                        {moreCount > 0 && (
                          <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700">
                            +{moreCount} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action buttons - clear gap between primary and secondary */}
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/doctors/${doc.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--umang-green)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
                    >
                      View Full Profile
                      <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
                    </Link>
                    <Link
                      href="/#appointment"
                      className="inline-flex items-center rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
