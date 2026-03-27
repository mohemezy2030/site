import { useState, useEffect, useRef, useCallback } from "react";

export interface MarketData {
  symbol: string;
  price: number;
  priceChange24h: number;
  priceChangePercent: number;
  high24h: number;
  low24h: number;
  volume: number;
  volatility: "منخفض" | "عادي" | "مرتفع" | "شديد";
  trend: "صاعد" | "هابط";
  strength: number;
  liquidity: number;
  whale: boolean;
  source: "binance" | "rest";
}

const BINANCE_SYMBOLS = ["btcusdt", "ethusdt", "solusdt"];
const DISPLAY_MAP: Record<string, string> = {
  btcusdt: "BTC/USDT",
  ethusdt: "ETH/USDT",
  solusdt: "SOL/USDT",
};

function calcVolatility(high: number, low: number, price: number): MarketData["volatility"] {
  if (price === 0) return "عادي";
  const range = ((high - low) / price) * 100;
  if (range < 1.5) return "منخفض";
  if (range < 4) return "عادي";
  if (range < 8) return "مرتفع";
  return "شديد";
}

function calcStrength(changePercent: number): number {
  const abs = Math.abs(changePercent);
  return Math.min(100, Math.round(abs * 10 + 30));
}

function calcLiquidity(volume: number, symbol: string): number {
  // Rough relative scale based on typical volumes
  const thresholds: Record<string, number> = {
    btcusdt: 50000,
    ethusdt: 30000,
    solusdt: 5000,
  };
  const threshold = thresholds[symbol] || 10000;
  return Math.min(99, Math.round((volume / threshold) * 80 + 10));
}

function detectWhale(volume: number, symbol: string): boolean {
  const whaleThresholds: Record<string, number> = {
    btcusdt: 80000,
    ethusdt: 50000,
    solusdt: 10000,
  };
  return volume > (whaleThresholds[symbol] || 20000);
}

export function useMarketData() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const forexTimerRef = useRef<ReturnType<typeof setInterval>>();

  const updateCryptoMarket = useCallback((data: any) => {
    const symbol = (data.s || "").toLowerCase();
    const displaySymbol = DISPLAY_MAP[symbol];
    if (!displaySymbol) return;

    const price = parseFloat(data.c);
    const high = parseFloat(data.h);
    const low = parseFloat(data.l);
    const changePercent = parseFloat(data.P);
    const volume = parseFloat(data.v);

    const market: MarketData = {
      symbol: displaySymbol,
      price,
      priceChange24h: parseFloat(data.p),
      priceChangePercent: changePercent,
      high24h: high,
      low24h: low,
      volume,
      volatility: calcVolatility(high, low, price),
      trend: changePercent >= 0 ? "صاعد" : "هابط",
      strength: calcStrength(changePercent),
      liquidity: calcLiquidity(volume, symbol),
      whale: detectWhale(volume, symbol),
      source: "binance",
    };

    setMarkets((prev) => {
      const idx = prev.findIndex((m) => m.symbol === displaySymbol);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = market;
        return updated;
      }
      return [...prev, market];
    });
  }, []);

  const fetchForexData = useCallback(async () => {
    try {
      // EUR/USD from frankfurter
      const eurRes = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD");
      if (eurRes.ok) {
        const eurData = await eurRes.json();
        const eurPrice = eurData.rates?.USD || 0;
        
        // Get yesterday's rate for change calculation
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];
        const eurYestRes = await fetch(`https://api.frankfurter.app/${yStr}?from=EUR&to=USD`);
        let eurChange = 0;
        if (eurYestRes.ok) {
          const eurYestData = await eurYestRes.json();
          const yesterdayPrice = eurYestData.rates?.USD || eurPrice;
          eurChange = ((eurPrice - yesterdayPrice) / yesterdayPrice) * 100;
        }

        setMarkets((prev) => {
          const market: MarketData = {
            symbol: "EUR/USD",
            price: eurPrice,
            priceChange24h: eurPrice * (eurChange / 100),
            priceChangePercent: eurChange,
            high24h: eurPrice * 1.002,
            low24h: eurPrice * 0.998,
            volume: 0,
            volatility: Math.abs(eurChange) < 0.3 ? "منخفض" : Math.abs(eurChange) < 0.8 ? "عادي" : "مرتفع",
            trend: eurChange >= 0 ? "صاعد" : "هابط",
            strength: calcStrength(eurChange),
            liquidity: 95,
            whale: false,
            source: "rest",
          };
          const idx = prev.findIndex((m) => m.symbol === "EUR/USD");
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = market;
            return updated;
          }
          return [...prev, market];
        });
      }
    } catch (e) {
      console.warn("Failed to fetch EUR/USD:", e);
    }

    try {
      // Gold price from metals.live
      const goldRes = await fetch("https://api.metals.live/v1/spot");
      if (goldRes.ok) {
        const goldData = await goldRes.json();
        const goldItem = goldData.find?.((item: any) => item.gold !== undefined);
        const goldPrice = goldItem?.gold || 0;

        if (goldPrice > 0) {
          setMarkets((prev) => {
            const existing = prev.find((m) => m.symbol === "XAU/USD");
            const prevPrice = existing?.price || goldPrice;
            const change = ((goldPrice - prevPrice) / prevPrice) * 100;

            const market: MarketData = {
              symbol: "XAU/USD",
              price: goldPrice,
              priceChange24h: goldPrice - prevPrice,
              priceChangePercent: change,
              high24h: goldPrice * 1.005,
              low24h: goldPrice * 0.995,
              volume: 0,
              volatility: Math.abs(change) < 0.3 ? "منخفض" : Math.abs(change) < 1 ? "عادي" : "مرتفع",
              trend: change >= 0 ? "صاعد" : "هابط",
              strength: calcStrength(change),
              liquidity: 85,
              whale: false,
              source: "rest",
            };
            const idx = prev.findIndex((m) => m.symbol === "XAU/USD");
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = market;
              return updated;
            }
            return [...prev, market];
          });
        }
      }
    } catch (e) {
      console.warn("Failed to fetch XAU/USD:", e);
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    const streams = BINANCE_SYMBOLS.map((s) => `${s}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onopen = () => {
      setConnected(true);
      console.log("Binance WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.data) {
          updateCryptoMarket(msg.data);
        }
      } catch (e) {
        console.warn("WS parse error:", e);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("Binance WebSocket disconnected, reconnecting in 5s...");
      reconnectTimerRef.current = setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (err) => {
      console.warn("WebSocket error:", err);
      ws.close();
    };

    wsRef.current = ws;
  }, [updateCryptoMarket]);

  useEffect(() => {
    connectWebSocket();
    fetchForexData();

    // Poll forex/gold every 60 seconds
    forexTimerRef.current = setInterval(fetchForexData, 60000);

    return () => {
      wsRef.current?.close();
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (forexTimerRef.current) clearInterval(forexTimerRef.current);
    };
  }, [connectWebSocket, fetchForexData]);

  return { markets, connected };
}
