import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    wishlist: "bg-indigo-600",
    order: "bg-green-600",
    remove: "bg-red-500",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl text-white shadow-lg text-sm font-semibold animate-bounce-in ${styles[type]}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 text-lg leading-none">
        ×
      </button>
    </div>
  );
};

export default Toast;