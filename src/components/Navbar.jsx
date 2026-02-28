import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Heart, ClipboardList, Search , Store} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { wishlist } = useApp();
  const location = useLocation();
  const [focused, setFocused] = useState(false);
  const isHome = location.pathname === "/";

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/wishlist", label: "Wishlist", icon: Heart },
    { path: "/transactions", label: "Transactions", icon: ClipboardList },
  ];

  return (
    <nav className="bg-card/100 border-b border-border sticky top-0 z-50 backdrop-blur-3xl">
      <div className="w-full max-w-[1600px] mx-auto px-10 py-7 flex items-center gap-6">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 text-primary mr-auto"
          whileHover={{ scale: 1.05 }}
        >
          <Store className="w-8 h-8" />
          <span className="text-3xl font-bold tracking-tight text-foreground">
            Farhan<span className="text-primary">Pedia</span>
          </span>
        </motion.div>

        {/* Search Bar — hanya muncul di halaman Home */}
        {isHome && (
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`relative transition-all duration-300 ${focused ? "scale-[1.01]" : ""}`}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full pl-12 pr-4 py-2.5 bg-input-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>
          </motion.div>
        )}

        {/* Nav Links */}
        <div className="flex gap-2 items-center">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-white text-muted-foreground hover:bg-muted"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:block">{link.label}</span>
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