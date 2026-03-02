import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogsHero from "@/components/BlogsHero";
import Footer from "@/components/Footer";
import { fetchBlogs } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blogs | Health & Wellness Articles | UMANG Hospital Bilaspur",
  description:
    "Read health tips, patient stories and wellness articles from UMANG IVF & Super Specialty Hospital, Bilaspur.",
  openGraph: { title: "Blogs | UMANG Hospital Bilaspur", url: `${SITE_URL}/blogs` },
};

export default async function BlogsPage() {
  let blogs: { id: string; title: string; slug: string; excerpt: string | null; image?: string | null; createdAt: string }[] = [];
  let error = "";
  try {
    blogs = await fetchBlogs(true);
  } catch {
    error = "Unable to load posts.";
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/blogs" />
      <main>
        <BlogsHero
          title="Blogs"
          subtitle="Health tips, patient stories and expert insights from UMANG Hospital, Bilaspur."
        />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-16">
          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {error}
            </div>
          )}
          {!error && blogs.length === 0 && (
            <p className="text-center text-gray-600">No blog posts yet. Check back soon.</p>
          )}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-[var(--umang-teal)] hover:shadow-md"
                >
                  {post.image ? (
                    <div className="h-44 overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] opacity-80" />
                  )}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <time className="text-xs font-medium text-gray-500" dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 text-lg font-bold text-[var(--umang-navy)] line-clamp-2 sm:text-xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-justify text-sm text-gray-600">{post.excerpt}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--umang-teal)]">
                      Read more
                      <i className="fi fi-sr-arrow-right text-sm" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  );
}
