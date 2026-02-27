import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToWishlist = (product) => {
    const alreadyAdded = wishlist.find((item) => item.id === product.id);
    if (!alreadyAdded) {
      setWishlist([...wishlist, product]);
      showToast(`${product.name} ditambahkan ke wishlist!`, "wishlist");
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
    showToast("Produk dihapus dari wishlist", "remove");
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const orderProduct = (product, quantity = 1) => {
    const newTransaction = {
      id: Date.now(),
      product,
      quantity,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      orderId: `ORD-${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast(`${product.name} x${quantity} berhasil dipesan!`, "order");
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        transactions,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        orderProduct,
      }}
    >
      {children}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);