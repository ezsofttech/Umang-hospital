import { Fragment } from "react";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
};

export default function DepartmentHero({ title, description, breadcrumb }: Props) {
  return (
    <section className="bg-(--umang-navy) px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-3 text-xs text-white/90 sm:mb-4 sm:text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-(--umang-teal) transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden><i className="fi fi-sr-angle-right text-white/70" /></li>
            <li>
              <Link href="/departments" className="hover:text-(--umang-teal) transition-colors">
                Departments
              </Link>
            </li>
            {breadcrumb?.map((crumb) => (
              <Fragment key={crumb.href}>
                <li aria-hidden><i className="fi fi-sr-angle-right text-white/70" /></li>
                <li>
                  <Link href={crumb.href} className="hover:text-(--umang-teal) transition-colors">
                    {crumb.label}
                  </Link>
                </li>
              </Fragment>
            ))}
            <li aria-hidden><i className="fi fi-sr-angle-right text-white/70" /></li>
            <li className="font-medium text-white" aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-justify text-white/95 sm:mt-4 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
