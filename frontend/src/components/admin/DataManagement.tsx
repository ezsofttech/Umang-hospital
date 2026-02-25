"use client";

import { useState } from "react";

type Props = {
  onFilterChange?: (filter: string) => void;
  onSearchChange?: (search: string) => void;
  title?: string;
};

export default function DataManagement({ 
  onFilterChange, 
  onSearchChange,
  title = "Data Management"
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedShow, setSelectedShow] = useState("10");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export data");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[var(--umang-navy)]">{title}</h2>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          {/* Filter Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Filter
            </label>
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--umang-navy)]/20"
            >
              <option value="all">All Items</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Show Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Show
            </label>
            <select
              value={selectedShow}
              onChange={(e) => setSelectedShow(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--umang-navy)]/20"
            >
              <option value="10">10 Items</option>
              <option value="25">25 Items</option>
              <option value="50">50 Items</option>
              <option value="100">100 Items</option>
            </select>
          </div>

          {/* Status/Active Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--umang-navy)]/20"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none sm:min-w-[240px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--umang-navy)]/20"
            />
            <i className="fi fi-sr-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 active:bg-red-700"
          >
            <i className="fi fi-sr-download text-lg" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
