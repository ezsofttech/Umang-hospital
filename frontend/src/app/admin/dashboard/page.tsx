import Link from "next/link";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardRecent from "@/components/admin/DashboardRecent";
import DataManagement from "@/components/admin/DataManagement";
import BlogsDataTable from "@/components/admin/BlogsDataTable";
import MessagesDataTable from "@/components/admin/MessagesDataTable";
import { API_URL } from "@/lib/config";

export default async function AdminDashboardPage() {
  let blogs: { id: string; title: string; createdAt: string }[] = [];
  let messages: { id: string; name: string; email: string; createdAt: string; read: boolean }[] = [];
  let error = "";
  let blogCount = 0;
  let messageCount = 0;

  // Quick API reachability check before loading data
  try {
    const ping = await fetch(`${API_URL}/blogs?published=false`, { cache: "no-store" });
    if (!ping.ok) throw new Error(`HTTP ${ping.status}`);
    const [blogsRes, messagesRes] = await Promise.all([
      ping.json() as Promise<typeof blogs>,
      fetch(`${API_URL}/messages`, { cache: "no-store" }).then((r) => r.json() as Promise<typeof messages>).catch(() => []),
    ]);
    blogCount = blogsRes.length;
    messageCount = messagesRes.length;
    blogs = blogsRes.slice(0, 10);
    messages = messagesRes.slice(0, 10);
  } catch (e) {
    error = "Could not load data. Is the API running?";
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">Welcome back! Here's your hospital admin overview.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2 font-medium text-white transition hover:bg-[var(--umang-navy)]/90"
        >
          <i className="fi fi-sr-plus" />
          <span className="hidden sm:inline">New Post</span>
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error} Set <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_API_URL</code> if the API runs elsewhere.
        </div>
      )}

      <DashboardStats
        blogCount={error ? undefined : blogCount}
        messageCount={error ? undefined : messageCount}
      />

      {/* Blogs Section */}
      <div className="space-y-4">
        <DataManagement title="Blog Management" />
        <BlogsDataTable 
          data={blogs}
          isLoading={false}
        />
      </div>

      {/* Messages Section */}
      <div className="space-y-4">
        <DataManagement title="Message Management" />
        <MessagesDataTable 
          data={messages}
          isLoading={false}
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardRecent
          type="blogs"
          items={blogs.map((b) => ({
            id: b.id,
            title: b.title,
            date: b.createdAt,
            href: `/admin/blogs/${b.id}`,
          }))}
          viewAllHref="/admin/blogs"
          error={!!error}
        />
        <DashboardRecent
          type="messages"
          items={messages.map((m) => ({
            id: m.id,
            title: `${m.name} — ${m.email}`,
            date: m.createdAt,
            href: `/admin/messages#${m.id}`,
            badge: m.read ? undefined : "new",
          }))}
          viewAllHref="/admin/messages"
          error={!!error}
        />
      </div>
    </div>
  );
}
