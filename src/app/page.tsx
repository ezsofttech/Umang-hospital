import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Departments from "@/components/Departments";
import ExpertHero from "@/components/ExpertHero";
import StatsBar from "@/components/StatsBar";
import PatientStories from "@/components/PatientStories";
import LatestStories from "@/components/LatestStories";
import Footer from "@/components/Footer";
import { getGooglePlaceReviews } from "@/lib/google-places";

export default async function Home() {
  const googleReviews = await getGooglePlaceReviews();
  const googlePlaceId = process.env.GOOGLE_PLACE_ID?.trim() || undefined;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Departments />
        <ExpertHero />
        <StatsBar />
        <PatientStories reviews={googleReviews ?? undefined} googlePlaceId={googlePlaceId} />
        <LatestStories />
        <Footer />
      </main>
    </div>
  );
}
