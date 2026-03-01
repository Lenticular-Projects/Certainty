import Shell from "@/components/Shell";
import NavBar from "@/components/NavBar";
import ReportContent from "./ReportContent";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  return (
    <Shell>
      <NavBar />
      <ReportContent callId={id} />
    </Shell>
  );
}
