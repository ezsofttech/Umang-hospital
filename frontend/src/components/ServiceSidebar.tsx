"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSubcategories } from "@/hooks/useSubcategories";

type Service = {
  title: string;
  slug: string;
};

export default function ServiceSidebar() {
  const { data: subcategories = [] } = useSubcategories();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (subcategories.length > 0) {
      const firstSixServices = subcategories
        .slice(0, 6)
        .map((sub) => ({ title: sub.title, slug: sub.slug }));
      setServices(firstSixServices);
    }
  }, [subcategories]);
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <nav className="flex flex-row gap-0 overflow-x-auto border border-(--umang-navy) lg:flex-col lg:overflow-visible lg:rounded-lg lg:border-2 lg:border-[#1e3a5f]">
        {services.map((s, i) => (
          <Link
            key={i}
            href={`/services/${s.slug}`}
            className="shrink-0 whitespace-nowrap border-b border-(--umang-navy) bg-white px-4 py-3 text-xs font-medium text-[#1e3a5f] hover:bg-gray-50 sm:px-5 sm:py-3.5 sm:text-sm lg:border-b lg:border-[#1e3a5f] first:lg:rounded-t-lg last:lg:rounded-b-lg last:lg:border-b-0"
          >
            {s.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
