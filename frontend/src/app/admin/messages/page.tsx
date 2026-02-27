"use client";

import { useMessages } from "@/hooks/useMessage";
import AdminMessageList from "@/components/admin/AdminMessageList";

export default function AdminMessagesPage() {
  const { data: messages = [], isLoading, error } = useMessages();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Messages</h1>
      {isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-600">
          Loading messages...
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Could not load messages.
        </div>
      )}
      {!isLoading && !error && <AdminMessageList initialMessages={messages} />}
    </div>
  );
}
