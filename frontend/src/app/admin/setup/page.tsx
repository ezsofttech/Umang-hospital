"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ userId: "", name: "", email: "", password: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.userId || !form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/seed-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: form.userId, name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Setup failed");
      setSuccess(`Admin account "${data.name}" created! Redirecting to login…`);
      setTimeout(() => router.push("/admin/login"), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] text-white text-2xl font-bold shadow-lg">
            A
          </div>
          <h1 className="text-2xl font-bold text-[var(--umang-navy)]">UMANG Hospital</h1>
          <p className="mt-1 text-sm text-gray-500">One-time admin setup</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-1 text-lg font-semibold text-gray-800">Create Admin Account</h2>
          <p className="mb-6 text-sm text-gray-500">
            This setup page can only be used once. If an admin already exists, this page will return an error.
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">User ID</label>
              <input
                type="text"
                value={form.userId}
                onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))}
                placeholder="e.g. admin001"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Dr. Suresh Sharma"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@hospital.com"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Repeat password"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              <AlertCircle size={15} /> {error}
            </div>
          )}
          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
              <CheckCircle2 size={15} /> {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !!success}
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-[var(--umang-navy)] to-[var(--umang-teal)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create Admin Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <a href="/admin/login" className="text-[var(--umang-teal)] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
