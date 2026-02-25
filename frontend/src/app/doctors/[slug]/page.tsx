import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DoctorProfileHero from "@/components/DoctorProfileHero";
import DoctorProfileView, { DoctorJsonLd } from "@/components/DoctorProfileView";
import Footer from "@/components/Footer";
import { getDoctorBySlug, getAllDoctorSlugs } from "@/data/doctors";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllDoctorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: "Doctor Not Found | UMANG Hospital Bilaspur" };

  const title = `${doctor.name} - ${doctor.role} | UMANG Hospital Bilaspur`;
  const description =
    doctor.about.slice(0, 155).trim() + (doctor.about.length > 155 ? "…" : "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
    alternates: {
      canonical: `/doctors/${doctor.slug}`,
    },
  };
}

export default async function DoctorProfilePage({ params }: Props) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <div className="min-h-screen bg-white">
      <DoctorJsonLd doctor={doctor} />
      <Header currentPath="/doctors" />
      <main>
        <DoctorProfileHero doctor={doctor} />
        <DoctorProfileView doctor={doctor} />
      </main>
      <Footer />
    </div>
  );
}
