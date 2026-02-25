"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "917710203022";
const WHATSAPP_MESSAGE = "Hello, I would like to book an appointment at Umang Hospital.";

export default function WhatsAppSticky() {
  const pathname = usePathname();
  
  // Hide WhatsApp icon on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20BD5A] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:h-16 sm:w-16"
      aria-label="Book now on WhatsApp"
      title="Book now on WhatsApp"
    >
      <i className="fi fi-brands-whatsapp text-3xl sm:text-4xl pt-2" aria-hidden />
    </a>
  );
}
