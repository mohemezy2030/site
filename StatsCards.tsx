import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { useTradeStats } from "@/hooks/useTradingData";

const StatsCards = () => {
  const stats = useTradeStats();

  const cards = [
    {
      label: "إجمالي الأرباح",
      value: `$${stats.totalPnl.toFixed(2)}`,
      change: stats.totalPnl >= 0 ? `+${stats.totalPnl.toFixed(2)}` : `${stats.totalPnl.toFixed(2)}`,
      up: stats.totalPnl >= 0,
      icon: DollarSign,
    },
    {
      label: "الصفقات المفتوحة",
      value: `${stats.openTrades}`,
      change: `${stats.buyCount} شراء · ${stats.sellCount} بيع`,
      up: true,
      icon: Activity,
    },
    {
      label: "نسبة الفوز",
      value: `${stats.winRate.toFixed(1)}%`,
      change: "",
      up: true,
      icon: TrendingUp,
    },
    {
      label: "أكبر خسارة",
      value: stats.biggestLoss < 0 ? `$${stats.biggestLoss.toFixed(2)}` : "$0.00",
      change: stats.biggestLossSymbol || "-",
      up: false,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat, i) => (
        <div key={i} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <stat.icon className={`h-5 w-5 ${stat.up ? "text-primary" : "text-destructive"}`} />
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          {stat.change && (
            <div className={`text-xs mt-1 ${stat.up ? "text-primary" : "text-destructive"}`}>
              {stat.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
