import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { useApp } from "../context/AppContext";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const { transactions } = useApp();
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Belum Ada Transaksi"
        description="Kamu belum melakukan order apapun. Yuk mulai belanja!"
        action={{ label: "Mulai Belanja", onClick: () => navigate("/") }}
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
        <h1 className="text-3xl font-medium text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-1">{transactions.length} transaksi tercatat</p>
      </motion.div>

      <AnimatePresence>
        <div className="flex flex-col gap-4">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="bg-card rounded-2xl border border-border shadow-sm p-4 flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(168,213,226,0.2)" }}
            >
              <img
                src={transaction.product.image}
                alt={transaction.product.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <span className="text-xs text-primary font-medium uppercase tracking-wide">
                  {transaction.product.category}
                </span>
                <h2 className="text-lg font-medium text-card-foreground">
                  {transaction.product.name}
                </h2>

                {/* Quantity & price per item */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(transaction.product.price)} × {transaction.quantity} item
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                <p className="text-xs text-muted-foreground font-mono">{transaction.orderId}</p>
              </div>

              <div className="text-right shrink-0">
                {/* Total harga sudah dikali quantity */}
                <p className="text-primary font-bold text-lg">
                  {formatPrice(transaction.product.price * transaction.quantity)}
                </p>
                <span className="inline-block mt-1 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  ✅ Success
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TransactionHistory;