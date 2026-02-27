"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import type { StaffUser } from "@/types";
import { UserPlus, Trash2, ToggleLeft, ToggleRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminStaffPage() {
  const { token, user } = useAuth();

  // List state
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  // Create state
  const [form, setForm] = useState({ userId: "", name: "", email: "", password: "", role: "staff" as "admin" | "staff" });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState("");
  const [createError, setCreateError] = useState("");

  const fetchStaff = useCallback(async () => {
    setListLoading(true);
    setListError("");
    try {
      const data = await authService.getAllUsers(token!);
      setStaff(data.filter((u) => u.role === "staff"));
    } catch (err: unknown) {
      setListError(err instanceof Error ? err.message : "Failed to load staff");
    } finally {
      setListLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchStaff();
  }, [token, fetchStaff]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreateSuccess("");
    if (!form.userId || !form.name || !form.email || !form.password) {
      setCreateError("All fields are required.");
      return;
    }
    setCreating(true);
    try {
      const data = await authService.createStaff(token!, {
        ...form,
      });
      setCreateSuccess(`Staff member "${data.name}" created! They must change their password on first login.`);
      setForm({ userId: "", name: "", email: "", password: "", role: "staff" });
      fetchStaff();
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Failed to create staff");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggleStatus(staffUser: StaffUser) {
    try {
      await authService.updateUserStatus(token!, staffUser.userId, !staffUser.isActive);
      setStaff((prev) =>
        prev.map((u) => (u.userId === staffUser.userId ? { ...u, isActive: !u.isActive } : u))
      );
    } catch {
      // silently ignore
    }
  }

  async function handleDelete(staffUserId: string) {
    if (!confirm("Are you sure you want to delete this staff member? This cannot be undone.")) return;
    try {
      await authService.deleteUser(token!, staffUserId);
      setStaff((prev) => prev.filter((u) => u.userId !== staffUserId));
    } catch {
      // silently ignore
    }
  }

  if (user?.role !== "admin") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        You do not have permission to access this page.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Create Staff Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <UserPlus size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Add Staff Member</h2>
            <p className="text-sm text-gray-500">Create a new staff or admin account</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">User ID</label>
              <input
                type="text"
                value={form.userId}
                onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))}
                placeholder="e.g. staff001"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Dr. Suresh Patel"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="staff@hospital.com"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Temporary Password</label>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Min. 6 characters"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "admin" | "staff" }))}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-2 focus:ring-[var(--umang-teal)]/20 sm:w-48"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {createError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              <AlertCircle size={15} /> {createError}
            </div>
          )}
          {createSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
              <CheckCircle2 size={15} /> {createSuccess}
            </div>
          )}

          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-gradient-to-r from-[var(--umang-navy)] to-[var(--umang-teal)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create Staff Account"}
          </button>
        </form>
      </div>

      {/* Staff List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-800">Staff Members ({staff.length})</h2>
          <p className="text-sm text-gray-500">Manage existing staff accounts</p>
        </div>

        {listLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--umang-teal)] border-t-transparent" />
          </div>
        ) : listError ? (
          <div className="px-6 py-8 text-center text-sm text-red-500">{listError}</div>
        ) : staff.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <UserPlus size={20} />
            </div>
            <p className="text-sm font-medium text-gray-500">No staff members yet</p>
            <p className="mt-1 text-xs text-gray-400">Create your first staff account above</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {staff.map((s) => (
              <li key={s._id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-gray-800">{s.name}</p>
                    {s.isFirstLogin && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        First Login Pending
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-gray-400">
                    ID: {s.userId} · {s.email}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(s)}
                    title={s.isActive ? "Deactivate" : "Activate"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    {s.isActive ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.userId)}
                    title="Delete staff"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
