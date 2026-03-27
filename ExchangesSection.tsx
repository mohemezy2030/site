import { motion } from "framer-motion";

const exchanges = [
  { name: "Binance", type: "عملات رقمية" },
  { name: "Bybit", type: "عملات رقمية" },
  { name: "OKX", type: "عملات رقمية" },
  { name: "OANDA", type: "فوركس" },
  { name: "Capital.com", type: "فوركس" },
  { name: "Alpaca", type: "أسهم أمريكية" },
  { name: "Tradier", type: "عقود خيارات" },
  { name: "XAUUSD", type: "معادن" },
];

const ExchangesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            البورصات <span className="text-gradient-accent">المدعومة</span>
          </h2>
          <p className="text-muted-foreground">اتصل ببورصتك المفضلة وابدأ التداول فوراً</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {exchanges.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl p-5 text-center hover:border-accent/30 transition-all group"
            >
              <div className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{ex.name}</div>
              <div className="text-xs text-muted-foreground">{ex.type}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExchangesSection;
