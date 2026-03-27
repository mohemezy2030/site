import { motion } from "framer-motion";
import { ArrowLeft, Bot, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">منصة التداول الآلي الأذكى</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            تداول بذكاء مع
            <br />
            <span className="text-gradient-primary">الذكاء الاصطناعي</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            بوت تداول متقدم يدعم العملات الرقمية، الفوركس، الأسهم والمعادن.
            استراتيجيات ذكية مع رصد نشاط الحيتان وإدارة مخاطر ديناميكية.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 glow-primary"
              onClick={() => navigate("/auth")}
            >
              ابدأ التداول الآن
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              اكتشف المزايا
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-20"
        >
          {[
            { icon: Bot, label: "استراتيجية ذكية", value: "6+" },
            { icon: TrendingUp, label: "بورصة مدعومة", value: "8+" },
            { icon: Shield, label: "تشفير متقدم", value: "AES-256" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-6 text-center">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
