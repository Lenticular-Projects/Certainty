import Shell from "@/components/Shell";
import NavBar from "@/components/NavBar";
import Marquee from "@/components/Marquee";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <Shell>
      <NavBar />
      <DashboardContent />
      <Marquee items={[]} />
    </Shell>
  );
}
