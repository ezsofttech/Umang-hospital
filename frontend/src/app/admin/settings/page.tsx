"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import { KeyRound, User, CheckCircle2, AlertCircle, Eye, EyeOff, DatabaseZap } from "lucide-react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

function SettingsContent() {
  const { user, token, refreshUser } = useAuth();
  const searchParams = useSearchParams();
  const isFirstLogin = searchParams.get("firstLogin") === "1";

  // Change password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  // Slug migration state
  const [migrating, setMigrating] = useState(false);
  const [migrateSuccess, setMigrateSuccess] = useState("");
  const [migrateError, setMigrateError] = useState("");

  async function handleRunMigration() {
    setMigrating(true);
    setMigrateSuccess("");
    setMigrateError("");
    try {
      const res = await fetch(`${API_URL}/api/migration/slugs/run`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Migration failed");
      setMigrateSuccess(data.message ?? "Slug migration completed successfully.");
    } catch (err: unknown) {
      setMigrateError(err instanceof Error ? err.message : "Migration failed. Is the API running?");
    } finally {
      setMigrating(false);
    }
  }

  // Auto-focus password section if firstLogin
  useEffect(() => {
    if (isFirstLogin) {
      document.getElementById("oldPassword")?.focus();
    }
  }, [isFirstLogin]);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPwError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New password and confirm password do not match.");
      return;
    }
    setPwLoading(true);
    try {
      const data = await authService.changePassword(token!, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setPwSuccess(data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Refresh user to clear isFirstLogin flag
      await refreshUser();
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setPwLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* First-login banner */}
      {isFirstLogin && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>
            <strong>Welcome!</strong> This is your first login. Please change your temporary password to secure your account.
          </p>
        </div>
      )}

      {/* Profile Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <User size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Profile</h2>
            <p className="text-sm text-gray-500">Your account information</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Name</p>
            <p className="mt-1 text-sm font-medium text-gray-800">{user?.name ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">User ID</p>
            <p className="mt-1 text-sm font-medium text-gray-800">{user?.userId ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Email</p>
            <p className="mt-1 text-sm font-medium text-gray-800">{user?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Role</p>
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
              user?.role === "admin"
                ? "bg-[var(--umang-navy)]/10 text-[var(--umang-navy)]"
                : "bg-teal-50 text-teal-700"
            }`}>
              {user?.role ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <KeyRound size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Change Password</h2>
            <p className="text-sm text-gray-500">
              {isFirstLogin ? "Set a new password to secure your account" : "Update your password regularly for security"}
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Current password */}
          <div>
            <label htmlFor="oldPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
              <button
                type="button"
                onClick={() => setShowOld((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {pwError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              <AlertCircle size={15} />
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
              <CheckCircle2 size={15} />
              {pwSuccess}
            </div>
          )}

          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[var(--umang-navy)] to-[var(--umang-teal)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {pwLoading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Database Tools Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <DatabaseZap size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Database Tools</h2>
            <p className="text-sm text-gray-500">Fix missing slugs on all records (categories, subcategories, doctors, blogs)</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={handleRunMigration}
            disabled={migrating}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DatabaseZap size={15} />
            {migrating ? "Running migration…" : "Run Slug Migration"}
          </button>
          <p className="text-xs text-gray-400">
            Generates slugs for any records that are missing them. Safe to run multiple times.
          </p>
        </div>

        {migrateError && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            <AlertCircle size={15} />
            {migrateError}
          </div>
        )}
        {migrateSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
            <CheckCircle2 size={15} />
            {migrateSuccess}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading settings…</div>}>
      <SettingsContent />
    </Suspense>
  );
}

