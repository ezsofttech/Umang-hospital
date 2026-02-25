const benefits = [
  "Expert consultation For All Gynecological Syndrome",
  "Treatment For Menstrual Disorders And PCOS",
  "Minimally Invasive Gynecological Surgeries",
  "Menopause Management And Hormonal Therapy",
  "Cancer Screening And Preventive Care",
  "Family Planning And Contraception Counseling",
  "Complete Pregnancy Care From Conception To Delivery",
];

export default function ServiceContent() {
  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div
        className="h-48 w-full bg-gray-200 bg-cover bg-center sm:h-64 md:h-80"
        style={{ backgroundImage: "url(/images/ivf-img.svg)" }}
      />
      <div className="space-y-4 text-[var(--umang-navy)] sm:space-y-6">
        <p className="text-sm leading-relaxed text-justify sm:text-base">
          At Umang IVF & Super Speciality Hospital, Our Plastic Surgery Department Is Led By
          Experienced, Board-Certified Plastic Surgeons Who Combine Artistic Vision With Surgical
          Precision. We Offer A Comprehensive Range Of Cosmetic Procedures Including Rhinoplasty
          (Nose Surgery), Liposuction, Tummy Tuck (Abdominoplasty), Breast Augmentation And
          Reduction, Facelifts, Eyelid Surgery (Blepharoplasty), And Ear Correction (Otoplasty).
          Each Procedure Is Tailored To The Individual Patient&apos;s Goals And Anatomy. Our
          Reconstructive Surgery Services Address Burns, Trauma Scars, Congenital Deformities Like
          Cleft Lip And Palate, And Post-Cancer Reconstruction.
        </p>
        <p className="text-sm leading-relaxed text-justify sm:text-base">
          We Use Advanced Microsurgical Techniques For Optimal Outcomes. Patient Safety Is Our Top
          Priority. Every Procedure Begins With A Thorough Consultation Where We Discuss Realistic
          Expectations, Surgical Options, Risks, And Recovery. We Use The Latest Minimally Invasive
          Techniques Wherever Possible To Minimize Scarring And Reduce Recovery Time. Our Advanced
          Cosmetic Therapies Are Equipped With Modern Monitoring Systems And The Latest Surgical
          Instruments. Post-Operative Care Includes Regular Follow-Ups, Wound Care Guidance, And
          Support Throughout Your Recovery Journey.
        </p>
      </div>

      <section className="pt-4 sm:pt-6">
        <h2 className="text-xl font-bold text-[var(--umang-navy)] sm:text-2xl md:text-3xl">
          Benefits of Our{" "}
          <span className="text-[var(--umang-green)]">Gynecology & Obstetrics Services</span>
        </h2>
        <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
          {benefits.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 sm:gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--umang-navy)]" />
              <span className="text-sm text-[var(--umang-navy)] sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
