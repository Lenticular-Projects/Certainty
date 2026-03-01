import Shell from "@/components/Shell";
import NavBar from "@/components/NavBar";
import Marquee from "@/components/Marquee";
import ManagerDashboard from "./ManagerDashboard";

export default function ManagerPage() {
  return (
    <Shell>
      <NavBar />
      <ManagerDashboard />
      <Marquee items={[]} />
    </Shell>
  );
}
