import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { wishlist } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/transactions", label: "Transactions" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🛍️ ShopCatalog</h1>
        <div className="flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium relative transition-colors ${
                location.pathname === link.path
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {link.label}
              {link.path === "/wishlist" && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;