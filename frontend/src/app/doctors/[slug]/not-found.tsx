import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DoctorNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/doctors" />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl">
            Doctor not found
          </h1>
          <p className="mt-2 text-justify text-gray-600">
            The doctor profile you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/doctors"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[var(--umang-navy)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1e3a8a] sm:text-base"
          >
            View all doctors
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
