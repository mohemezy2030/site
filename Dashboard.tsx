import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import TradesTable from "@/components/dashboard/TradesTable";
import MarketAnalysis from "@/components/dashboard/MarketAnalysis";
import ConfigsList from "@/components/dashboard/ConfigsList";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "متداول";

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">مرحباً {displayName} 👋</h1>
          <p className="text-muted-foreground">إليك ملخص نشاط التداول الخاص بك</p>
        </div>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TradesTable />
          </div>
          <div>
            <MarketAnalysis />
          </div>
        </div>
        <ConfigsList />
      </main>
    </div>
  );
};

export default Dashboard;
