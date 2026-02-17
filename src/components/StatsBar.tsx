const stats = [
  { value: "500+", label: "National healthcare honors" },
  { value: "200+", label: "People we have treated" },
  { value: "5,000+", label: "OPD Patients Treated" },
  { value: "5,000+", label: "Communities we reach out" },
  { value: "5,000+", label: "Skilled staff on our team" },
];

export default function StatsBar() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-8 md:flex-nowrap md:justify-between md:gap-x-16 lg:px-8">
        {stats.map((stat, i) => (
          <div key={i} className="min-w-0 text-center sm:flex-1">
            <p className="text-2xl font-bold text-[var(--umang-green)] sm:text-3xl md:text-4xl">{stat.value}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-800 sm:mt-1 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
