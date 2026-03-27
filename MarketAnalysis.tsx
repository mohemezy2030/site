import { Badge } from "@/components/ui/badge";
import { useMarketData } from "@/hooks/useMarketData";
import { Loader2, Wifi, WifiOff } from "lucide-react";

const volColor: Record<string, string> = {
  "منخفض": "text-chart-info",
  "عادي": "text-primary",
  "مرتفع": "text-chart-warning",
  "شديد": "text-destructive",
};

const MarketAnalysis = () => {
  const { markets, connected } = useMarketData();

  return (
    <div className="glass rounded-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold">تحليل الأسواق</h3>
        <div className="flex items-center gap-2 text-xs">
          {connected ? (
            <span className="flex items-center gap-1 text-primary">
              <Wifi className="w-3.5 h-3.5" />
              مباشر
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground">
              <WifiOff className="w-3.5 h-3.5" />
              جاري الاتصال...
            </span>
          )}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {markets.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>جاري تحميل بيانات الأسواق...</span>
          </div>
        ) : (
          markets.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <div>
                  <span className="font-mono font-bold text-sm">{m.symbol}</span>
                  <span className="text-xs text-muted-foreground mr-2 font-mono">
                    ${m.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: m.price < 10 ? 4 : 2 })}
                  </span>
                </div>
                {m.whale && (
                  <Badge variant="outline" className="text-xs border-accent text-accent">
                    🐋 نشاط حيتان
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">التغير: </span>
                  <span className={m.priceChangePercent >= 0 ? "text-primary" : "text-destructive"}>
                    {m.priceChangePercent >= 0 ? "+" : ""}{m.priceChangePercent.toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">التقلب: </span>
                  <span className={volColor[m.volatility]}>{m.volatility}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">الاتجاه: </span>
                  <span className={m.trend === "صاعد" ? "text-primary" : "text-destructive"}>{m.trend}</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-muted-foreground">القوة: </span>
                  <span className="text-foreground">{m.strength}%</span>
                </div>
                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${m.liquidity}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis;
