import { motion } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  BarChart3,
  Activity,
  Zap,
  Globe,
  Lock,
  LineChart,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "أسواق متعددة",
    description: "تداول في العملات الرقمية، الفوركس، الأسهم الأمريكية، المعادن وعقود الخيارات من مكان واحد.",
  },
  {
    icon: Cpu,
    title: "استراتيجيات ذكية",
    description: "سكالبينج، تداول عادي، تحليل فني متقدم مع RSI و EMA وأنماط الشموع.",
  },
  {
    icon: Activity,
    title: "رصد الحيتان",
    description: "اكتشاف تلقائي لنشاط الحيتان وصناع السوق مع تنبيهات فورية.",
  },
  {
    icon: BarChart3,
    title: "إدارة مخاطر ديناميكية",
    description: "تحديد حجم المركز والرافعة تلقائياً حسب تقلبات السوق والسيولة.",
  },
  {
    icon: ShieldCheck,
    title: "أمان متقدم",
    description: "تشفير مفاتيح API مع رفض أي مفتاح يسمح بالسحب. حمايتك أولويتنا.",
  },
  {
    icon: Zap,
    title: "وقف خسارة ذكي",
    description: "وقف خسارة وجني أرباح ديناميكي مع تتبع السعر والإغلاق التلقائي.",
  },
  {
    icon: LineChart,
    title: "تحليل السوق",
    description: "تحليل التقلبات، قوة الاتجاه، السيولة ونسبة ADX في الوقت الحقيقي.",
  },
  {
    icon: Lock,
    title: "خصوصية كاملة",
    description: "بياناتك مشفرة بالكامل ولا نملك صلاحية الوصول لأموالك أبداً.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            مزايا <span className="text-gradient-primary">استثنائية</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            كل ما تحتاجه للتداول الآلي الاحترافي في منصة واحدة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
