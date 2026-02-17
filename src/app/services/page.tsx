import Header from "@/components/Header";
import ServicesHero from "@/components/ServicesHero";
import ServiceSidebar from "@/components/ServiceSidebar";
import ServiceContent from "@/components/ServiceContent";
import WhenToConsult from "@/components/WhenToConsult";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IVF & Fertility Treatment | Our Services | UMANG Hospital Bilaspur",
  description:
    "Bilaspur's leading IVF center. Advanced fertility treatments, personalised care and latest reproductive technologies. Book a consultation at Umang Hospital.",
};

const hero = {
  title: "IVF & Fertility Treatment",
  subtitle:
    "Umang's Leading IVF Center Offering Advanced Fertility Treatments With High Success Rates. Our Experienced IVF Specialists Provide Personalized Care And The Latest Reproductive Technologies To Help Couples Achieve Their Dream Of Parenthood.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/services" />
      <main>
        <ServicesHero title={hero.title} subtitle={hero.subtitle} />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <ServiceSidebar />
            <div className="min-w-0 flex-1">
              <ServiceContent />
              <WhenToConsult />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
