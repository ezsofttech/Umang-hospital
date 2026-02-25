"use client";

import Link from "next/link";

type Props = { blogCount?: number; messageCount?: number };

export default function DashboardStats({ blogCount, messageCount }: Props) {
  const stats = [
    {
      title: "Active Blogs",
      value: blogCount ?? "—",
      description: "Total published posts",
      href: "/admin/blogs",
      icon: "fi-sr-document",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "New Messages",
      value: messageCount ?? "—",
      description: "Unread contact submissions",
      href: "/admin/messages",
      icon: "fi-sr-envelope",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "This Month",
      value: "—",
      description: "Activity this month",
      href: "/admin/dashboard",
      icon: "fi-sr-calendar",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Total Users",
      value: "—",
      description: "Registered users",
      href: "/admin/dashboard",
      icon: "fi-sr-user",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link
          key={stat.title}
          href={stat.href}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition group-hover:opacity-5`} />
          <div className="relative z-10">
            <div className={`inline-flex rounded-lg bg-gradient-to-br ${stat.color} p-2.5 text-white`}>
              <i className={`fi ${stat.icon} text-xl`} aria-hidden />
            </div>
            <h2 className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {stat.title}
            </h2>
            <p className="mt-2 text-2xl font-bold text-[var(--umang-navy)] sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-gray-600">{stat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
