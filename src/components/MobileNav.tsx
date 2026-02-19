"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#departments", label: "Departments" },
  { href: "/services", label: "Our Services" },
  { href: "/#network", label: "Our Network" },
  { href: "/doctors", label: "Doctors" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact Us" },
  { href: "/#blogs", label: "Blogs" },
];

export default function MobileNav({
  currentPath = "/",
}: {
  currentPath?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#16355A] hover:bg-gray-100"
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute left-0 right-0 top-full z-50 mt-0 border-t border-gray-100 bg-white shadow-lg"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col py-2">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 text-sm font-semibold ${
                      (currentPath === "/services" && link.href === "/services") ||
                      (currentPath === "/doctors" && link.href === "/doctors")
                        ? "text-[var(--umang-teal)]"
                        : "text-[#16355A] hover:bg-gray-50 hover:text-[var(--umang-green)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#emergency"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  ✚ 24/7 Emergency
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
