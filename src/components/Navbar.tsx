import { Home, Plane, Bus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getUser } from "@/lib/localStorage";

const Navbar = () => {
  const location = useLocation();
  const user = getUser();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Plane, label: "Flights", path: "/flights" },
    { icon: Bus, label: "Bus", path: "/bus" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-[var(--shadow-soft)]"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TravelAI
            </span>
          </motion.div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block font-medium">{user.name}</span>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
