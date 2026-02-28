import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import EmptyState from "../components/EmptyState";
import OrderModal from "../components/OrderModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, orderProduct } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Wishlist Kosong"
        description="Belum ada produk yang kamu simpan. Yuk temukan produk favoritmu!"
        action={{ label: "Explore Produk", onClick: () => navigate("/") }}
      />
    );
  }

  return (
    <div className="pb-8 px-4 pt-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-medium text-foreground">Wishlist Saya</h1>
        <p className="text-muted-foreground mt-1">{wishlist.length} produk tersimpan</p>
      </motion.div>

      <AnimatePresence>
        <div className="flex flex-col gap-4">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-card rounded-2xl border border-border shadow-sm p-4 flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(168,213,226,0.2)" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <span className="text-xs text-primary font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h2 className="text-lg font-medium text-card-foreground">
                  {product.name}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {product.description}
                </p>
                <p className="text-primary font-bold mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0 mr-3">
                <motion.button
                  onClick={() => setSelectedProduct(product)}
                  className="px-8 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order
                </motion.button>
                <motion.button
                  onClick={() => removeFromWishlist(product.id)}
                  className="px-8 py-2 bg-destructive text-destructive-foreground rounded-full text-sm font-medium hover:bg-destructive/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hapus
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onConfirm={orderProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Wishlist;