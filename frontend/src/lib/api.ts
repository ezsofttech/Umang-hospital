const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  description: string;
  read: boolean;
  createdAt: string;
};

export async function getBlogs(publishedOnly = false): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/blogs?published=${publishedOnly}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlog(id: string): Promise<Blog> {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`${API_BASE}/blogs/slug/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  published?: boolean;
}): Promise<Blog> {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
}

export async function updateBlog(
  id: string,
  data: Partial<{ title: string; slug: string; excerpt: string; body: string; published: boolean }>
): Promise<Blog> {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update blog");
  return res.json();
}

export async function deleteBlog(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/blogs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");
}

export async function getMessages(): Promise<Message[]> {
  const res = await fetch(`${API_BASE}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function markMessageRead(id: string): Promise<Message> {
  const res = await fetch(`${API_BASE}/messages/${id}/read`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to mark read");
  return res.json();
}

export async function deleteMessage(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/messages/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete message");
}

export async function submitMessage(data: {
  name: string;
  email: string;
  description: string;
}): Promise<Message> {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
