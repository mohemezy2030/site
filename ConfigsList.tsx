import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings } from "lucide-react";
import { useTradingConfigs } from "@/hooks/useTradingData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const strategyLabels: Record<string, string> = {
  scalping: "سكالبينج",
  normal: "تداول عادي",
  technical: "تحليل فني",
};

const ConfigsList = () => {
  const { data: configs, isLoading } = useTradingConfigs();
  const queryClient = useQueryClient();

  const toggleConfig = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from("trading_configs")
      .update({ is_active: !isActive })
      .eq("id", id);
    if (error) {
      toast.error("فشل تحديث الإعداد");
    } else {
      queryClient.invalidateQueries({ queryKey: ["trading_configs"] });
    }
  };

  return (
    <div className="glass rounded-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold">إعدادات التداول</h3>
        <Button size="sm" variant="outline">
          <Settings className="h-4 w-4 ml-2" />
          إضافة إعداد
        </Button>
      </div>
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
      ) : !configs || configs.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">لا توجد إعدادات تداول. أضف مفتاح API أولاً ثم أنشئ إعداداً.</div>
      ) : (
        <div className="p-5 space-y-3">
          {configs.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleConfig(c.id, c.is_active)}
                >
                  {c.is_active ? (
                    <Pause className="h-4 w-4 text-chart-warning" />
                  ) : (
                    <Play className="h-4 w-4 text-primary" />
                  )}
                </Button>
                <div>
                  <div className="font-mono font-bold text-sm">{c.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.api_keys?.exchange || "—"} · {c.timeframe}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-xs">
                  {strategyLabels[c.strategy] || c.strategy}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  مخاطرة: {(Number(c.risk_per_trade) * 100).toFixed(1)}%
                </span>
                <Badge variant={c.is_active ? "default" : "outline"} className="text-xs">
                  {c.is_active ? "نشط" : "متوقف"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigsList;
