import Link from "next/link";

const services = [
  { name: "IVF & Fertility Treatment", href: "/services", active: true },
  { name: "Gynecology & Obstetrics", href: "/services/gynecology", active: false },
  { name: "Plastic Surgery", href: "/services/plastic-surgery", active: false },
  { name: "Hair Transplant", href: "/services/hair-transplant", active: false },
  { name: "Cardiology", href: "/services/cardiology", active: false },
  { name: "Urology", href: "/services/urology", active: false },
];

export default function ServiceSidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <nav className="flex flex-row gap-0 overflow-x-auto rounded-lg border border-[var(--umang-navy)] lg:flex-col lg:overflow-visible lg:rounded-lg lg:border-2 lg:border-[#1e3a5f]">
        {services.map((s, i) => (
          <Link
            key={i}
            href={s.href}
            className={
              s.active
                ? "shrink-0 whitespace-nowrap bg-[var(--umang-navy)] px-4 py-3 text-xs font-medium text-[#FFFFFF] sm:px-5 sm:py-3.5 sm:text-sm lg:border-b lg:border-[#1e3a5f]"
                : "shrink-0 whitespace-nowrap border-b border-[var(--umang-navy)] bg-white px-4 py-3 text-xs font-medium text-[#1e3a5f] hover:bg-gray-50 sm:px-5 sm:py-3.5 sm:text-sm lg:border-b lg:border-[#1e3a5f] last:lg:border-b-0"
            }
          >
            {s.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
