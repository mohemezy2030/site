import { Badge } from "@/components/ui/badge";
import { useTrades } from "@/hooks/useTradingData";

const TradesTable = () => {
  const { data: trades, isLoading } = useTrades();

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border">
        <h3 className="text-lg font-bold">الصفقات الأخيرة</h3>
      </div>
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
      ) : !trades || trades.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">لا توجد صفقات بعد. ابدأ بإعداد بوت التداول!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-right p-4 font-medium">الرمز</th>
                <th className="text-right p-4 font-medium">الاتجاه</th>
                <th className="text-right p-4 font-medium">سعر الدخول</th>
                <th className="text-right p-4 font-medium">الرافعة</th>
                <th className="text-right p-4 font-medium">وقف الخسارة</th>
                <th className="text-right p-4 font-medium">جني الأرباح</th>
                <th className="text-right p-4 font-medium">الربح/الخسارة</th>
                <th className="text-right p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono font-semibold">{trade.symbol}</td>
                  <td className="p-4">
                    <Badge variant={trade.side === "buy" ? "default" : "destructive"} className="text-xs">
                      {trade.side === "buy" ? "شراء" : "بيع"}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono">{Number(trade.entry_price).toLocaleString()}</td>
                  <td className="p-4 font-mono text-accent">{trade.leverage}x</td>
                  <td className="p-4 font-mono text-destructive">{trade.stop_loss ? Number(trade.stop_loss).toLocaleString() : "-"}</td>
                  <td className="p-4 font-mono text-primary">{trade.take_profit ? Number(trade.take_profit).toLocaleString() : "-"}</td>
                  <td className={`p-4 font-mono font-semibold ${(trade.pnl || 0) >= 0 ? "text-primary" : "text-destructive"}`}>
                    {trade.pnl !== null ? `$${Number(trade.pnl).toFixed(2)}` : "-"}
                  </td>
                  <td className="p-4">
                    <Badge variant={trade.status === "open" ? "outline" : "secondary"} className="text-xs">
                      {trade.status === "open" ? "مفتوحة" : trade.status === "closed" ? "مغلقة" : "ملغاة"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradesTable;
