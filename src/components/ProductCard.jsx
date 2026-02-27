import { useState } from "react";
import { useApp } from "../context/AppContext";
import OrderModal from "./OrderModal";

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useApp();
  const [showModal, setShowModal] = useState(false);
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
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
            {product.category}
          </span>
          <h2 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h2>
          <p className="text-sm text-gray-500 flex-1 mb-3">{product.description}</p>
          <p className="text-indigo-600 font-bold text-lg mb-4">
            {formatPrice(product.price)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
              }
              className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                wishlisted
                  ? "bg-red-50 text-red-500 border-red-300 hover:bg-red-100"
                  : "bg-indigo-50 text-indigo-600 border-indigo-300 hover:bg-indigo-100"
              }`}
            >
              {wishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              🛒 Order Now
            </button>
          </div>
        </div>
      </div>

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