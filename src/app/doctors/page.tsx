import Header from "@/components/Header";
import DoctorHero from "@/components/DoctorHero";
import DoctorProfile from "@/components/DoctorProfile";
import ExpertTeam from "@/components/ExpertTeam";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Expert Specialist Doctors | UMANG Hospital Bilaspur",
  description:
    "Meet our 20+ board-certified specialists in IVF, plastic surgery, cardiology, urology and more. Book an appointment at Umang Hospital, Bilaspur.",
};

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/doctors" />
      <main>
        <DoctorHero />
        <div id="profile">
          <DoctorProfile />
        </div>
        <ExpertTeam />
        <Footer />
      </main>
    </div>
  );
}
