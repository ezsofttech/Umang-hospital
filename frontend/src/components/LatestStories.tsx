import Link from "next/link";

const articles = [
  {
    title: "How modern hospitals are redefining patient-centered care",
    category: "MEDICAL ADVICE",
    image: "/images/medical-ad-img.svg",
  },
  {
    title: "How modern hospitals are redefining patient-centered care",
    category: "MEDICAL ADVICE",
    image: "/images/medical-ad-two.svg",
  },
  {
    title: "How modern hospitals are redefining patient-centered care",
    category: "MEDICAL ADVICE",
    image: "/images/medical-ad-three.svg",
  },
];

export default function LatestStories() {
  return (
    <section className="border-t border-gray-200 bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--umang-navy)]">
            WELCOME TO PHYSICIAN
          </p>
          <h2 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl md:text-4xl md:text-right">
            Latest stories and health tips wellness
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {articles.map((article, i) => {
            const isMiddle = i === 1;
            return (
              <Link
                key={i}
                href="/blogs"
                className="story-card-zigzag group overflow-hidden bg-white transition hover:opacity-95"
              >
                <div
                  className={`bg-gray-300 bg-cover bg-center transition group-hover:scale-[1.02] story-card-image ${isMiddle ? "story-card-image-tall" : "story-card-image-short"}`}
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--umang-green)]">
                    {article.category}
                  </p>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-[var(--umang-navy)] group-hover:text-[var(--umang-green)] sm:mt-2 sm:text-base">
                    {article.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
