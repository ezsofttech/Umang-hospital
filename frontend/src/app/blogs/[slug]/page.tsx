import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import BlogsHero from "@/components/BlogsHero";
import Footer from "@/components/Footer";
import { fetchBlogs, fetchBlogBySlug } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/config";

/** Strip HTML tags so meta description is plain text */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const blogs = await fetchBlogs(true);
    return blogs
      .filter((b) => typeof b.slug === 'string' && b.slug.length > 0)
      .map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: "Post not found" };
  const title = `${post.title} | UMANG Hospital Blog`;
  const rawDescription = post.excerpt ?? stripHtml(post.body);
  const description = rawDescription.slice(0, 160);
  const imageUrl = post.image
    ? post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`
    : undefined;
  return {
    title,
    description,
    keywords: post.keywords ?? (post.tags?.join(", ") ?? undefined),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.image
    ? post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt ?? stripHtml(post.body).slice(0, 160),
    "url": `${SITE_URL}/blogs/${post.slug}`,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": post.author
      ? { "@type": "Person", "name": post.author }
      : { "@type": "Organization", "name": "UMANG Hospital" },
    "publisher": {
      "@type": "Organization",
      "name": "UMANG Hospital",
      "url": SITE_URL,
    },
    ...(imageUrl ? { "image": imageUrl } : {}),
    ...(post.keywords ? { "keywords": post.keywords } : {}),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

          {post.image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.body }}
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


