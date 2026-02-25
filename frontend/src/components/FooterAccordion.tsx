"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function FooterAccordion({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-xs font-bold uppercase tracking-wider text-[#699C78]"
        aria-expanded={open}
      >
        {title}
        <i className={`fi text-white/80 ${open ? "fi-sr-minus" : "fi-sr-plus"}`} aria-hidden />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
