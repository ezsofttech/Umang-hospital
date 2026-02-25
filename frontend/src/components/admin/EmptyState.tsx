"use client";

type Props = { icon?: string; title: string; description?: string };

export default function EmptyState({ icon = "fi-sr-document", title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-12 text-center shadow-sm">
      <div className="rounded-full bg-gray-100 p-4 text-gray-400">
        <i className={`fi ${icon} text-4xl`} aria-hidden />
      </div>
      <h3 className="mt-4 text-base font-semibold text-[var(--umang-navy)]">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>}
    </div>
  );
}
