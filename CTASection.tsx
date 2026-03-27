import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-12 md:p-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            جاهز لبدء <span className="text-gradient-primary">التداول الآلي</span>؟
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            أضف مفتاح API الخاص بك، اختر استراتيجيتك، ودع البوت يعمل من أجلك.
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 glow-primary"
            onClick={() => navigate("/auth")}
          >
            ابدأ الآن مجاناً
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
