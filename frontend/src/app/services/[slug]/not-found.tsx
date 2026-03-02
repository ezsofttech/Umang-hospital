import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/services" />
      <main className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="text-4xl font-bold text-(--umang-navy)">Service not found</h1>
        <p className="mt-4 max-w-md text-gray-600">
          The service you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/departments"
            className="rounded-md bg-(--umang-navy) px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Browse Departments
          </Link>
          <Link
            href="/"
            className="rounded-md border border-(--umang-navy) px-6 py-2 text-sm font-medium text-(--umang-navy) hover:bg-gray-50 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
