import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DepartmentNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/departments" />
      <main className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="text-4xl font-bold text-[var(--umang-navy)]">Department not found</h1>
        <p className="mt-4 max-w-md text-gray-600">
          The department you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/departments"
          className="mt-8 inline-block rounded-md bg-[var(--umang-navy)] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition"
        >
          View All Departments
        </Link>
      </main>
      <Footer />
    </div>
  );
}
