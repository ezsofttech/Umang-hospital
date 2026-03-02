import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DoctorProfileHero from "@/components/DoctorProfileHero";
import DoctorProfileView, { DoctorJsonLd } from "@/components/DoctorProfileView";
import Footer from "@/components/Footer";
import { getDoctorBySlug, getAllDoctorSlugs, type Doctor as StaticDoctor } from "@/data/doctors";
import { fetchDoctorBySlug } from "@/lib/serverApi";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllDoctorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiDoc = await fetchDoctorBySlug(slug);
  const doctor = apiDoc ?? getDoctorBySlug(slug);
  if (!doctor) return { title: "Doctor Not Found | UMANG Hospital Bilaspur" };

  const about = doctor.about ?? '';
  const title = `${doctor.name} - ${doctor.role} | UMANG Hospital Bilaspur`;
  const description = about.slice(0, 155).trim() + (about.length > 155 ? "…" : "");

  return {
    title,
    description,
    openGraph: { title, description, type: "profile" },
    alternates: { canonical: `${SITE_URL}/doctors/${doctor.slug}` },
  };
}

export default async function DoctorProfilePage({ params }: Props) {
  const { slug } = await params;
  const apiDoc = await fetchDoctorBySlug(slug);
  const doctor = apiDoc ?? getDoctorBySlug(slug);
  if (!doctor) notFound();

  // Normalize to the shape DoctorProfileHero/View expects (same as StaticDoctor)
  const normalized: StaticDoctor = {
    slug: doctor.slug,
    name: doctor.name,
    tag: (doctor as any).tag ?? '',
    role: doctor.role,
    qualification: (doctor as any).qualification ?? '',
    about: (doctor as any).about ?? '',
    specializations: (doctor as any).specializations ?? '',
    image: (doctor as any).image ?? '/images/doctor-img.svg',
    experience: (doctor as any).experience ?? '0',
    department: (doctor as any).department,
    departmentDescription: (doctor as any).departmentDescription,
    departmentHref: (doctor as any).departmentHref,
    expertise: (doctor as any).expertise,
  };

  return (
    <div className="min-h-screen bg-white">
      <DoctorJsonLd doctor={normalized} />
      <Header currentPath="/doctors" />
      <main>
        <DoctorProfileHero doctor={normalized} />
        <DoctorProfileView doctor={normalized} />
      </main>
      <Footer />
    </div>
  );
}
