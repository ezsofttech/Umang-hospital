import Link from "next/link";

const departments = [
  { title: "IVF & Fertility Treatment", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/ivf-img.svg" },
  { title: "Gynecology & Obstetrics", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/gynecology-img.svg" },
  { title: "Plastic Surgery", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/plastic-surgery-img.svg" },
  { title: "Hair Transplant", description: "Advanced Hair Restoration With Natural Results For Lasting Confidence.", image: "/images/hair-transplant-img.svg" },
  { title: "IVF & Fertility Treatment", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/medical-ad-img.svg" },
  { title: "Gynecology & Obstetrics", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/medical-ad-two.svg" },
  { title: "Plastic Surgery", description: "Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood", image: "/images/medical-ad-three.svg" },
];

export default function Departments() {
  return (
    <section id="departments" className="bg-gray-50 py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 md:items-end">
          <h2 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl">
            Explore all departments
          </h2>
          <p className="text-sm text-justify text-gray-700 sm:text-base">
            <span className="text-[var(--umang-green)]">
              Umang IVF And Superspeciality Hospital, Bilaspur Is A Leading Healthcare Center,{" "}
            </span>
            Offering Advanced Services In Maternity, Pediatrics, Gynecology, IVF, ICU Care, And
            Minimally Invasive Surgeries.
          </p>
        </div>
        {/* Mobile: horizontal scroll (one row); sm+: grid */}
        <div className="-mx-4 grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {departments.map((dept, i) => (
            <article key={i} className="dept-card min-w-[280px] sm:min-w-0">
              <div
                className="dept-card-image h-40 bg-gray-200 bg-cover bg-center sm:h-48"
                style={{ backgroundImage: `url(${dept.image})` }}
              />
              <div className="dept-card-content">
                <h3 className="text-sm font-bold text-[var(--umang-navy)] sm:text-base">{dept.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-justify text-[#4A4A4A] sm:mt-2 sm:text-sm">
                  {dept.description}
                </p>
              </div>
            </article>
          ))}
          <Link
            href="/services"
            className="dept-card-cta flex min-h-[160px] min-w-[280px] flex-col justify-end bg-[#6FA179] p-4 text-white transition hover:opacity-95 sm:min-w-0 sm:min-h-[200px] sm:p-6"
          >
            <span className="block text-lg font-bold leading-tight sm:text-xl md:text-2xl">
              Explore
            </span>
            <span className="block text-lg font-bold leading-tight sm:text-xl md:text-2xl">
              More Services
            </span>
            <i className="fi fi-sr-arrow-up-right mt-3 h-6 w-6 sm:mt-4 sm:h-8 sm:w-8" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
