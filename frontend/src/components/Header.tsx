import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#departments", label: "Departments" },
  { href: "/services", label: "Our Services" },
  { href: "/#network", label: "Our Network" },
  { href: "/doctors", label: "Doctors" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header({
  currentPath = "/",
}: {
  currentPath?: string;
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] shadow-sm">
      {/* Top header row - logo left, contact right */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Image
              src="/images/nav-bar-logo.svg"
              alt="UMANG Hospital"
              width={140}
              height={48}
              className="h-10 w-auto sm:h-12"
            />
          </Link>
          <div className="hidden flex-wrap items-center justify-end gap-4 text-xs text-[#16355A] sm:flex sm:gap-6 sm:text-sm md:gap-8">
            <div className="flex min-w-0 items-center gap-2">
              <Image src="/images/watch-icon.svg" alt="" width={20} height={20} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              <div className="min-w-0">
                <p className="truncate font-medium sm:truncate-none">Mon–Fri 08:00–19:00</p>
                <p className="text-[10px] sm:text-xs">24/7 Emergency</p>
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Image src="/images/phone-icon.svg" alt="" width={20} height={20} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              <div className="min-w-0">
                <p className="font-medium">+91 7710203022</p>
                <p className="hidden text-xs sm:block">umanghospitalbsp@gmail.com</p>
              </div>
            </div>
            <div className="hidden min-w-0 items-center gap-2 md:flex md:pl-2">
              <Image src="/images/location-icon.svg" alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
              <div className="min-w-0">
                <p className="truncate font-medium">Rani Sati Mandir, Gaurav Path</p>
                <p className="text-xs">Bilaspur, Chhattisgarh 495001</p>
              </div>
            </div>
            </div>
          <MobileNav currentPath={currentPath} />
        </div>
      </div>

      {/* Bottom navigation row - hidden on mobile (use hamburger menu) */}
      <div className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 sm:gap-4 md:gap-6 md:py-3 md:px-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`text-sm font-semibold text-[#16355A] hover:text-[var(--umang-green)] sm:text-base ${
                (currentPath === "/services" && link.href === "/services") ||
                (currentPath === "/doctors" && link.href === "/doctors") ||
                (currentPath === "/contact" && link.href === "/contact") ||
                (currentPath === "/blogs" && link.href === "/blogs")
                  ? "text-[var(--umang-teal)]"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#emergency"
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 sm:text-sm"
          >
            <i className="fi fi-sr-plus text-sm sm:text-base" aria-hidden />
            24/7 Emergency
          </Link>
        </div>
      </div>
    </header>
  );
}
