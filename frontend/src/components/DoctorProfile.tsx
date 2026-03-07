import Link from "next/link";
import Image from "next/image";

const doctor = {
  tag: "LEAD IVF SPECIALIST",
  name: "Dr. Geetika Sharma",
  role: "SENIOR GYNECOLOGIST, OBSTETRICIAN & IVF SPECIALIST",
  qualification: "MBBS, MS (Obstetrics & Gynecology)",
  about:
    "Dr. Geetika Sharma Is One Of The Most Trusted Gynecologists And IVF Specialists In Bilaspur, Chhattisgarh. With Over 15 Years Of Experience, She Has Helped Thousands Of Women With Pregnancy Care, Fertility Treatments, And Gynecological Surgeries. She Leads Our IVF Center With Exceptional Success Rates.",
  specializations:
    "She Specializes In IVF, IUI, High-Risk Pregnancies, Normal And Cesarean Deliveries, Laparoscopic Gynecological Surgeries, And Comprehensive Infertility Treatments.",
  image: "/images/doctor-img.svg",
  experience: "15+",
};

export default function DoctorProfile() {
  return (
    <section className="bg-white py-10 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:h-auto lg:max-w-sm shrink-0">
              <div
                className="h-full w-full rounded-full bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${doctor.image})` }}
              />
              <div className="absolute right-2 top-2 sm:right-3 sm:top-3 md:right-4 md:top-4">
                <Image
                  src="/images/15plus-ex-img.svg"
                  alt="15+ years experience"
                  width={80}
                  height={80}
                  className="h-14 w-auto sm:h-16 md:h-20"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-(--umang-navy)">
              {doctor.tag}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-(--umang-navy) sm:text-3xl md:text-4xl">{doctor.name}</h2>
            <p className="mt-1.5 text-sm text-(--umang-teal) sm:mt-2 sm:text-base">{doctor.role}</p>
            <p className="mt-4 text-sm sm:mt-6 sm:text-base">
              <span className="font-semibold text-(--umang-navy)">Qualifications: </span>
              <span className="text-(--umang-navy)">{doctor.qualification}</span>
            </p>
            <p className="mt-4 leading-relaxed text-justify text-(--umang-navy) sm:mt-6 sm:text-base">{doctor.about}</p>
            <p className="mt-4 leading-relaxed text-justify text-(--umang-navy) sm:mt-6 sm:text-base">{doctor.specializations}</p>
            <Link
              href="#appointment"
              className="mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-(--umang-navy) px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1e3a8a] sm:mt-8 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
