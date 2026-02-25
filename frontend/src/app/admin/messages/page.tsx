import { getMessages } from "@/lib/api";
import AdminMessageList from "@/components/admin/AdminMessageList";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof getMessages>> = [];
  let error = "";
  try {
    messages = await getMessages();
  } catch (e) {
    error = "Could not load messages.";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--umang-navy)]">Messages</h1>
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}
      <AdminMessageList initialMessages={messages} />
    </div>
  );
}
