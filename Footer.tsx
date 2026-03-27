import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-bold">TradeBot</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 TradeBot. جميع الحقوق محفوظة. التداول ينطوي على مخاطر.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
