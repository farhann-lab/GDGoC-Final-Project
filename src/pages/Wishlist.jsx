import { useApp } from "../context/AppContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, orderProduct } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-6xl mb-4">🤍</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Wishlist Kosong</h2>
        <p className="text-gray-400">Belum ada produk yang kamu wishlist. Yuk explore catalog!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Wishlist Saya</h1>
        <p className="text-gray-500 mt-1">{wishlist.length} produk tersimpan</p>
      </div>
      <div className="flex flex-col gap-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div className="flex-1">
              <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
                {product.category}
              </span>
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-indigo-600 font-bold mt-1">{formatPrice(product.price)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => orderProduct(product)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                🛒 Order Now
              </button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="px-4 py-2 bg-red-50 text-red-500 border border-red-300 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;