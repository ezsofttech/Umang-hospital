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
    qualification:
      "D.G.O, D.N.B, Advanced Diploma in Reproductive Medicine, Fellowship in IVF",

    about:
      "Dr. Geetika Sharma is a highly qualified IVF Specialist with D.G.O, D.N.B, Advanced Diploma in Reproductive Medicine, and Fellowship in IVF. She specializes in infertility evaluation and advanced reproductive treatments, providing personalized fertility care using modern IVF techniques and evidence-based protocols to help couples achieve successful pregnancy outcomes.",

    specializations:
      "She specializes in IVF, ICSI, IUI, infertility evaluation, reproductive medicine, high-risk pregnancy management, and comprehensive fertility treatments.",

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
      "Infertility Diagnosis & Treatment",
      "Reproductive Medicine",
      "Fertility Preservation",
      "High-Risk Pregnancy Management",
      "Hormonal & Ovulation Disorders Treatment",
    ],
  },

  {
    slug: "dr-vikas-sharma",
    tag: "PLASTIC SURGEON & HAIR TRANSPLANT SPECIALIST",
    name: "Dr. Vikas Sharma",
    role: "Plastic Surgeon & Hair Transplant Specialist",
    qualification: "MBBS, MCh (Plastic Surgery)",

    about:
      "Dr. Vikas Sharma is a qualified Plastic Surgeon with MBBS and MCh in Plastic Surgery. He specializes in cosmetic, reconstructive, and hair transplant procedures, delivering safe and advanced surgical care with a focus on aesthetic excellence and natural-looking results.",

    specializations:
      "He specializes in cosmetic surgery, hair transplant procedures, reconstructive surgery, burn reconstruction, and aesthetic surgical treatments.",

    image: "/images/doctor-One-img.svg",
    experience: "15+",
    department: "Burn / Plastic Surgery",
    departmentDescription:
      "Expert plastic surgery and hair transplant care at Umang Hospital, Bilaspur.",
    departmentHref: "/#departments",

    expertise: [
      "Hair Transplant Surgery",
      "Cosmetic & Aesthetic Surgery",
      "Reconstructive Surgery",
      "Burn Reconstruction",
      "Scar Revision Surgery",
      "Skin & Soft Tissue Reconstruction",
      "Facial Cosmetic Procedures",
      "Body Contouring Procedures",
    ],
  },

  {
    slug: "dr-dubey",
    tag: "CARDIOLOGY SPECIALIST",
    name: "Dr. (Col.) Y.S. Dubey",
    role: "Senior Consultant Cardiologist",
    qualification: "MBBS, MD, DM (Cardiology)",

    about:
      "Dr. (Col.) Y.S. Dubey is a highly qualified Cardiologist with MBBS, MD, and DM in Cardiology. He specializes in the diagnosis, treatment, and prevention of cardiovascular diseases, providing advanced cardiac care using modern diagnostic and therapeutic techniques.",

    specializations:
      "He specializes in heart disease management, cardiac evaluation, hypertension treatment, preventive cardiology, and comprehensive cardiovascular care.",

    image: "/images/doctor-Two-img.svg",
    experience: "15+",
    department: "Cardiology",
    departmentHref: "/#departments",

    expertise: [
      "Heart Disease Diagnosis & Treatment",
      "ECG & Cardiac Evaluation",
      "Hypertension Management",
      "Preventive Cardiology",
      "Heart Failure Management",
      "Cardiac Risk Assessment",
      "Non-Invasive Cardiology Procedures",
      "Comprehensive Cardiac Care",
    ],
  },

  {
    slug: "dr-aradhana-tode",
    tag: "DENTAL & ORAL HEALTH SPECIALIST",
    name: "Dr. Aradhana Tode",
    role: "Dental Surgeon & Oral Health Specialist",
    qualification:
      "BDS, MHA, CERP (American Dental Association), PGDCC, FMC (Germany)",

    about:
      "Dr. Aradhana Tode is a qualified Dental Surgeon with BDS and advanced certifications in dental and healthcare management. She specializes in comprehensive dental care, cosmetic dentistry, and preventive oral health treatments, providing modern and patient-focused dental solutions.",

    specializations:
      "She specializes in cosmetic dentistry, preventive dental care, oral health management, smile design, and comprehensive dental treatments.",

    image: "/images/doctor-three-img.svg",
    experience: "15+",
    department: "Dental Care",
    departmentHref: "/#departments",

    expertise: [
      "Cosmetic Dentistry",
      "Smile Design",
      "Preventive Dental Care",
      "Dental Restoration Procedures",
      "Oral Health Treatment",
      "Teeth Whitening",
      "Dental Consultation & Diagnosis",
      "Comprehensive Dental Care",
    ],
  },
  {
  slug: "dr-sangeeta-joshi",
  tag: "PEDIATRICS SPECIALIST",
  name: "Dr. Sangeeta Joshi",
  role: "Consultant Pediatrician",
  qualification: "MBBS, MD Pediatrics",

  about:
    "Dr. Sangeeta Joshi is a qualified Pediatrician with MBBS and MD in Pediatrics. She specializes in the medical care of infants, children, and adolescents, providing comprehensive pediatric care including diagnosis, treatment, preventive care, and growth and developmental monitoring using modern and evidence-based medical practices.",

  specializations:
    "She specializes in newborn care, child health management, vaccination, growth and development monitoring, pediatric illness treatment, and preventive pediatric healthcare.",

  image: "/images/doctor-four-img.svg",
  experience: "15+",
  department: "Pediatrics",
  departmentDescription:
    "Expert pediatric care including newborn care, vaccination, and child health management at Umang Hospital, Bilaspur.",
  departmentHref: "/#departments",

  expertise: [
    "Newborn Care & Neonatal Management",
    "Child Health Evaluation & Treatment",
    "Vaccination & Immunization",
    "Growth & Development Monitoring",
    "Pediatric Infection Treatment",
    "Nutritional Assessment & Guidance",
    "Preventive Pediatric Healthcare",
    "General Pediatric Consultation",
  ],
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
