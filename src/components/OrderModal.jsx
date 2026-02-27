import { useState } from "react";

const OrderModal = ({ product, onConfirm, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleConfirm = () => {
    onConfirm(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Konfirmasi Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Product Info */}
        <div className="flex gap-4 items-center mb-6 p-3 bg-gray-50 rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-xl"
          />
          <div>
            <p className="text-xs text-indigo-500 font-semibold uppercase">{product.category}</p>
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <p className="text-indigo-600 font-bold">{formatPrice(product.price)}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Jumlah Pesanan
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl hover:bg-indigo-200 transition-colors"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl hover:bg-indigo-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6 p-3 bg-indigo-50 rounded-xl">
          <span className="text-gray-600 font-semibold">Total</span>
          <span className="text-indigo-600 font-bold text-lg">
            {formatPrice(product.price * quantity)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            🛒 Order Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;