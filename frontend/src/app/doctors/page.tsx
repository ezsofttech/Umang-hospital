import Header from "@/components/Header";
import DoctorHero from "@/components/DoctorHero";
import ExpertTeam from "@/components/ExpertTeam";
import Footer from "@/components/Footer";
import { fetchDoctors } from "@/lib/serverApi";

export const metadata = {
  title: "Expert Specialist Doctors | UMANG Hospital Bilaspur",
  description:
    "Meet our board-certified specialists in IVF, plastic surgery, cardiology, urology and more. View profiles and book an appointment at Umang Hospital, Bilaspur.",
};

export default async function DoctorsPage() {
  const apiDoctors = await fetchDoctors(true);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/doctors" />
      <main>
        <DoctorHero />
        <ExpertTeam doctors={apiDoctors.length > 0 ? apiDoctors : undefined} />
      </main>
      <Footer />
    </div>
  );
}
