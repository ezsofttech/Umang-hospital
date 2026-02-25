import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import BlogsHero from "@/components/BlogsHero";
import Footer from "@/components/Footer";
import { getBlogBySlug, getBlogs } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umanghospital.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs(true);
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post not found" };
  const title = `${post.title} | UMANG Hospital Blog`;
  const description = post.excerpt ?? post.body.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/blogs" />
      <main>
        <BlogsHero title={post.title} />

        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {post.updatedAt !== post.createdAt && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-IN")}</span>
              </>
            )}
          </div>

          {post.excerpt && (
            <p className="mb-6 text-justify text-lg text-gray-600">{post.excerpt}</p>
          )}

          <div
            className="blog-body space-y-4 text-justify text-gray-700 [&_p]:leading-relaxed [&_p]:text-justify [&_a]:text-[var(--umang-teal)] [&_a]:underline [&_a:hover]:opacity-90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--umang-navy)] [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[var(--umang-navy)]"
            dangerouslySetInnerHTML={{ __html: formatBody(post.body) }}
          />
        </article>

        <div className="border-t border-gray-200 bg-gray-50/50 py-8">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-95"
            >
              <i className="fi fi-sr-arrow-left text-sm" aria-hidden />
              Back to blogs
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

function formatBody(body: string): string {
  return body
    .split("\n\n")
    .map((p) => (p.trim() ? `<p>${escapeHtml(p)}</p>` : ""))
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
