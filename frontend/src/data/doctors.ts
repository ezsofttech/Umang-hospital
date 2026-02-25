export type Doctor = {
  slug: string;
  name: string;
  tag: string;
  role: string;
  qualification: string;
  about: string;
  specializations: string;
  image: string;
  experience: string;
  /** Short label for department block, e.g. "Infertility / IVF / Reproductive Medicine" */
  department?: string;
  /** Department description for the blue block */
  departmentDescription?: string;
  /** Department link (anchor or path) */
  departmentHref?: string;
  /** Areas of expertise as tags */
  expertise?: string[];
};

const doctors: Doctor[] = [
  {
    slug: "dr-geetika-sharma",
    tag: "LEAD IVF SPECIALIST",
    name: "Dr. Geetika Sharma",
    role: "Senior Consultant & IVF Specialist",
    qualification: "MBBS, MS (OBG), Fellowship in Reproductive Medicine",
    about:
      "Dr. Geetika Sharma has over 15 years of experience in Obstetrics, Gynaecology, and Reproductive Medicine. She leads the IVF & Reproductive Medicine department at Umang IVF & Super Speciality Hospital, Bilaspur, with a focus on personalized treatment and high IVF success rates. Her expertise includes complex infertility cases, high-risk pregnancies, advanced laparoscopic gynaecological surgeries, and comprehensive women's healthcare.",
    specializations:
      "She Specializes In IVF, IUI, High-Risk Pregnancies, Normal And Cesarean Deliveries, Laparoscopic Gynecological Surgeries, And Comprehensive Infertility Treatments.",
    image: "/images/doctor-img.svg",
    experience: "15+",
    department: "Infertility / IVF / Reproductive Medicine",
    departmentDescription:
      "Best IVF Centre in Bilaspur with advanced fertility treatments — IUI, IVF, ICSI, egg freezing, and donor programs led by Dr. Geetika Sharma.",
    departmentHref: "/services",
    expertise: [
      "In Vitro Fertilization (IVF)",
      "Intracytoplasmic Sperm Injection (ICSI)",
      "Intrauterine Insemination (IUI)",
      "High-Risk Pregnancy Management",
      "Laparoscopic Gynaecology",
      "PCOS & Endometriosis Treatment",
      "Recurrent Miscarriage Management",
      "Egg Freezing & Donor Programs",
    ],
  },
  {
    slug: "dr-rajendra-singh",
    tag: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    name: "Dr. Rajendra Singh",
    role: "Plastic Surgeon & Hair Transplant Specialist",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    about:
      "Dr. Rajendra Singh Is A Renowned Plastic Surgeon And Hair Transplant Specialist At Umang Hospital, Bilaspur. With Over 15 Years Of Experience, He Delivers Expert Care In Cosmetic, Reconstructive, And Hair Restoration Procedures.",
    specializations:
      "Specializations Include Rhinoplasty, Liposuction, Abdominoplasty, Breast Surgery, Facelifts, Blepharoplasty, Otoplasty, Burn Reconstruction, And Advanced Hair Transplant Techniques.",
    image: "/images/doctor-One-img.svg",
    experience: "15+",
    department: "Burn / Plastic Surgery",
    departmentDescription: "Expert plastic surgery and hair transplant care at Umang Hospital, Bilaspur.",
    departmentHref: "/#departments",
    expertise: ["Rhinoplasty", "Liposuction", "Hair Transplant", "Burn Reconstruction", "Cosmetic Surgery"],
  },
  {
    slug: "dr-anil-verma",
    tag: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    name: "Dr. Anil Verma",
    role: "Plastic Surgeon & Hair Transplant Specialist",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    about:
      "Dr. Anil Verma Brings Extensive Experience In Plastic Surgery And Hair Restoration To Umang Hospital. He Is Committed To Patient-Centered Care And Natural-Looking Results.",
    specializations:
      "Expert In Cosmetic Surgery, Hair Transplant, Reconstructive Procedures, And Minimally Invasive Aesthetic Treatments.",
    image: "/images/doctor-Two-img.svg",
    experience: "15+",
    department: "Burn / Plastic Surgery",
    departmentHref: "/#departments",
    expertise: ["Cosmetic Surgery", "Hair Transplant", "Reconstructive Procedures"],
  },
  {
    slug: "dr-sunita-patel",
    tag: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    name: "Dr. Sunita Patel",
    role: "Plastic Surgeon & Hair Transplant Specialist",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    about:
      "Dr. Sunita Patel Is A Skilled Plastic Surgeon At Umang Hospital With A Focus On Safe, Evidence-Based Cosmetic And Reconstructive Surgery For Patients In Bilaspur And Chhattisgarh.",
    specializations:
      "Specializations Include Body Contouring, Facial Rejuvenation, Hair Transplant, And Post-Burn Reconstruction.",
    image: "/images/doctor-three-img.svg",
    experience: "15+",
    department: "Burn / Plastic Surgery",
    departmentHref: "/#departments",
    expertise: ["Body Contouring", "Facial Rejuvenation", "Hair Transplant"],
  },
  {
    slug: "dr-vikram-sharma",
    tag: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    name: "Dr. Vikram Sharma",
    role: "Plastic Surgeon & Hair Transplant Specialist",
    qualification: "MBBS, MS (Surgery), MCh (Plastic Surgery)",
    about:
      "Dr. Vikram Sharma Is Part Of Umang Hospital's Expert Plastic Surgery And Hair Transplant Team, Delivering High-Quality Care With A Personal Touch For Every Patient.",
    specializations:
      "Expert In Cosmetic Surgery, Hair Restoration, Skin Grafting, And Reconstructive Procedures.",
    image: "/images/doctor-four-img.svg",
    experience: "15+",
    department: "Burn / Plastic Surgery",
    departmentHref: "/#departments",
    expertise: ["Cosmetic Surgery", "Hair Restoration", "Reconstructive Procedures"],
  },
];

export function getDoctors(): Doctor[] {
  return doctors;
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function getAllDoctorSlugs(): string[] {
  return doctors.map((d) => d.slug);
}
