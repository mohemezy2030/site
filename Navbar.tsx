import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">TradeBot</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">المزايا</a>
          <a href="#" className="hover:text-foreground transition-colors">البورصات</a>
          <a href="#" className="hover:text-foreground transition-colors">الأسعار</a>
        </div>
        <Button size="sm" onClick={() => navigate("/auth")}>
          لوحة التحكم
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
