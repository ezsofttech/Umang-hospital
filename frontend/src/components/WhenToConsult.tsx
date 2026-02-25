const items = [
  "Irregular Or Painful Menstrual Periods",
  "Heavy Bleeding Or Spotting Between Periods",
  "Pelvic Pain Or Discomfort",
  "Vaginal Discharge With Unusual Color Or Odor",
  "Difficulty Getting Pregnant",
  "Hot Flashes And Menopause Symptoms",
  "Breast Lumps Or Tenderness",
];

export default function WhenToConsult() {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 md:pb-28">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden border border-gray-200">
          <div className="bg-[#1e3a5f] px-4 py-3 text-center sm:px-6 sm:py-4">
            <h2 className="text-lg font-bold text-white sm:text-xl">When to Consult a Doctor</h2>
          </div>
          <div className="bg-white px-4 py-6 sm:px-6 sm:py-8">
            <ul className="space-y-2.5 sm:space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-justify text-gray-700 sm:gap-3 sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
