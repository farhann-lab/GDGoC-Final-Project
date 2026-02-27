import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import OrderModal from "./OrderModal";

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const { orderProduct } = useApp();

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <>
      <motion.div
        className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168,213,226,0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-8 h-8 border-4 rounded-full"
                style={{
                  borderColor: "var(--primary)",
                  borderTopColor: "transparent",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          <motion.img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Category Badge */}
          <motion.div
            className="absolute top-3 left-3 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-xs font-medium text-secondary-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.category}
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            onClick={() =>
              wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
            }
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              wishlisted
                ? "bg-destructive text-destructive-foreground"
                : "bg-white/80 text-foreground hover:bg-destructive hover:text-destructive-foreground"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className="w-5 h-5"
              fill={wishlisted ? "currentColor" : "none"}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-medium text-card-foreground mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <motion.div
              className="text-xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              {formatPrice(product.price)}
            </motion.div>

            <motion.button
              onClick={() => setShowModal(true)}
              className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 text-accent-foreground" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <OrderModal
          product={product}
          onConfirm={orderProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;