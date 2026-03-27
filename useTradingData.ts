import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Trade {
  id: string;
  symbol: string;
  side: string;
  entry_price: number;
  quantity: number;
  stop_loss: number | null;
  take_profit: number | null;
  leverage: number;
  pnl: number | null;
  status: string;
  opened_at: string;
  closed_at: string | null;
}

export interface TradingConfig {
  id: string;
  symbol: string;
  timeframe: string;
  risk_per_trade: number;
  strategy: string;
  is_active: boolean;
  api_key_id: string;
  api_keys?: { exchange: string } | null;
}

export interface ApiKey {
  id: string;
  exchange: string;
  market_type: string;
  label: string | null;
  is_valid: boolean;
  created_at: string;
}

export const useTrades = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trades", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trades")
        .select("*")
        .order("opened_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as Trade[];
    },
    enabled: !!user,
  });
};

export const useTradingConfigs = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["trading_configs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trading_configs")
        .select("*, api_keys(exchange)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as TradingConfig[];
    },
    enabled: !!user,
  });
};

export const useApiKeys = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["api_keys", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("api_keys")
        .select("id, exchange, market_type, label, is_valid, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ApiKey[];
    },
    enabled: !!user,
  });
};

export const useTradeStats = () => {
  const { data: trades } = useTrades();

  const stats = {
    totalPnl: 0,
    openTrades: 0,
    winRate: 0,
    biggestLoss: 0,
    biggestLossSymbol: "",
    buyCount: 0,
    sellCount: 0,
  };

  if (!trades || trades.length === 0) return stats;

  const closedTrades = trades.filter((t) => t.status === "closed" && t.pnl !== null);
  const openTrades = trades.filter((t) => t.status === "open");

  stats.openTrades = openTrades.length;
  stats.buyCount = openTrades.filter((t) => t.side === "buy").length;
  stats.sellCount = openTrades.filter((t) => t.side === "sell").length;
  stats.totalPnl = closedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);

  const wins = closedTrades.filter((t) => (t.pnl || 0) > 0).length;
  stats.winRate = closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0;

  const losses = closedTrades.filter((t) => (t.pnl || 0) < 0);
  if (losses.length > 0) {
    const worst = losses.reduce((min, t) => ((t.pnl || 0) < (min.pnl || 0) ? t : min));
    stats.biggestLoss = worst.pnl || 0;
    stats.biggestLossSymbol = worst.symbol;
  }

  return stats;
};
