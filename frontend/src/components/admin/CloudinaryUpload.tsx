"use client";

import { useRef, useState } from "react";
import { API_URL } from "@/lib/config";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
}

export default function CloudinaryUpload({
  value,
  onChange,
  folder = "umang-hospital",
  label = "Image",
  required = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_URL}/upload/image?folder=${folder}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Upload failed");
      }
      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 transition
          ${uploading ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-[var(--umang-teal)] hover:bg-gray-100"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleChange}
          disabled={uploading}
        />
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Uploading to Cloudinary…
          </div>
        ) : (
          <>
            <i className="fi fi-sr-upload text-2xl text-gray-400" aria-hidden />
            <p className="text-sm text-gray-600">Click or drag & drop to upload</p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10 MB</p>
          </>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}

      {/* Preview */}
      {value && !uploading && (
        <div className="mt-3 flex items-center gap-3">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-24 rounded-lg border border-gray-200 object-cover shadow-sm"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
