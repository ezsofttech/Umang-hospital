'use client';

import { useEffect, useState, useRef } from 'react';
import { statisticsService, type Statistic } from '@/services/statistics.service';

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    label: '',
    value: '',
  });

  // Fetch statistics on mount
  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await statisticsService.getAll();
      setStatistics(data);
    } catch (err) {
      console.error('Failed to load statistics:', err);
      setError('Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.label.trim() || !formData.value.trim()) {
      setError('Label and value are required');
      return;
    }

    try {
      setIsSaving(true);
      if (editingId) {
        await statisticsService.update(editingId, formData);
        setSuccess('Statistic updated successfully!');
      } else {
        await statisticsService.create(formData);
        setSuccess('Statistic created successfully! Ready to add another.');
      }
      await loadStatistics();
      resetForm();
      setTimeout(() => setSuccess(null), 4000);
      // Focus on label input after successful save
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, 100);
    } catch (err) {
      console.error('Error saving statistic:', err);
      setError('Failed to save statistic');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (stat: Statistic) => {
    setFormData({
      label: stat.label,
      value: stat.value,
    });
    setEditingId(stat._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return;

    try {
      setError(null);
      await statisticsService.delete(id);
      setSuccess('Statistic deleted successfully!');
      await loadStatistics();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error deleting statistic:', err);
      setError('Failed to delete statistic');
    }
  };

  const resetForm = () => {
    setFormData({
      label: '',
      value: '',
    });
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--umang-teal)] border-t-transparent" />
        <p className="mt-4 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--umang-navy)] to-[var(--umang-teal)]">
              <i className="fi fi-sr-chart-simple text-white text-lg" aria-hidden />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--umang-navy)]">Statistics</h1>
              <p className="text-sm text-gray-600">Manage hospital achievement statistics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
          <i className="fi fi-sr-exclamation text-lg mt-0.5" aria-hidden />
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 flex items-start gap-3">
          <i className="fi fi-sr-check text-lg mt-0.5" aria-hidden />
          <div>{success}</div>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--umang-teal)]/10">
            <i className="fi fi-sr-plus-small text-[var(--umang-teal)]" aria-hidden />
          </div>
          <h2 className="text-lg font-semibold text-[var(--umang-navy)]">
            {editingId ? 'Edit Statistic' : 'Add New Statistic'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label <span className="text-red-500">*</span>
              </label>
              <input
                ref={labelInputRef}
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                placeholder="e.g., National healthcare honors"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--umang-teal)] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="e.g., 500+"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--umang-teal)] focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--umang-teal)] text-white rounded-lg hover:bg-[var(--umang-teal)]/90 disabled:opacity-50 font-medium transition text-sm"
            >
              <i className={`fi fi-sr-${editingId ? 'edit' : 'plus'}`} aria-hidden />
              {isSaving ? 'Saving...' : editingId ? 'Update Statistic' : 'Add Statistic'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition text-sm"
              >
                <i className="fi fi-sr-cross-small" aria-hidden />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Statistics Table Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="fi fi-sr-list text-[var(--umang-navy)]" aria-hidden />
            <h3 className="text-lg font-semibold text-[var(--umang-navy)]">All Statistics</h3>
            <span className="ml-auto bg-[var(--umang-teal)]/10 text-[var(--umang-teal)] px-3 py-1 rounded-full text-sm font-medium">
              {statistics.length} total
            </span>
          </div>
        </div>

        {statistics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="rounded-full bg-gray-100 p-4 mb-4">
              <i className="fi fi-sr-chart-simple text-4xl text-gray-400" aria-hidden />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No statistics yet</h3>
            <p className="text-sm text-gray-600">Create your first statistic above to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {statistics.map((stat) => (
                  <tr key={stat._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{stat.label}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--umang-green)]/10 text-[var(--umang-green)] rounded-lg font-semibold">
                        {stat.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => handleEdit(stat)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-[var(--umang-teal)] hover:bg-[var(--umang-teal)]/10 rounded-lg transition font-medium text-xs"
                      >
                        <i className="fi fi-sr-edit" aria-hidden />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stat._id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition font-medium text-xs"
                      >
                        <i className="fi fi-sr-trash" aria-hidden />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
