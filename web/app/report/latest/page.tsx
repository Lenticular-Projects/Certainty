import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";

export default function LatestReportPage() {
  const db = getDb();

  const call = db
    .prepare("SELECT id FROM calls WHERE status = 'complete' ORDER BY call_date DESC LIMIT 1")
    .get() as { id: string } | undefined;

  if (call) {
    redirect(`/report/${call.id}`);
  }

  // No calls — redirect to dashboard
  redirect("/dashboard");
}
