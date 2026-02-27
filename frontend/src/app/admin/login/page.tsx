"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const searchParams = useSearchParams();
  // `next` is used by middleware but redirect is handled by AuthContext
  void searchParams;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!userId.trim() || !password.trim()) {
      setError("Please enter both ID and password.");
      return;
    }
    setIsLoading(true);
    try {
      await login(userId.trim(), password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)] text-white text-2xl font-bold shadow-lg">
            A
          </div>
          <h1 className="text-2xl font-bold text-[var(--umang-navy)]">UMANG Hospital</h1>
          <p className="mt-1 text-sm text-gray-500">Admin Panel</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-1 text-lg font-semibold text-gray-800">Sign in</h2>
          <p className="mb-6 text-sm text-gray-500">Enter your credentials to continue</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="userId" className="mb-1.5 block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. admin001"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
                autoFocus
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-[var(--umang-navy)] to-[var(--umang-teal)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-500">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

