import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Heart, ClipboardList } from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { wishlist } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/wishlist", label: "Wishlist", icon: Heart },
    { path: "/transactions", label: "Transactions", icon: ClipboardList },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          className="text-xl font-medium text-primary"
          whileHover={{ scale: 1.05 }}
        >
          🛍️ ShopCatalog
        </motion.h1>
        
        <div className="flex gap-2 items-center">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{link.label}</span>
                  {link.path === "/wishlist" && wishlist.length > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;