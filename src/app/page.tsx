import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Departments from "@/components/Departments";
import ExpertHero from "@/components/ExpertHero";
import StatsBar from "@/components/StatsBar";
import PatientStories from "@/components/PatientStories";
import LatestStories from "@/components/LatestStories";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Departments />
        <ExpertHero />
        <StatsBar />
        <PatientStories />
        <LatestStories />
        <Footer />
      </main>
    </div>
  );
}
