import { useApp } from "../context/AppContext";

const TransactionHistory = () => {
  const { transactions } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-6xl mb-4">🧾</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Belum Ada Transaksi</h2>
        <p className="text-gray-400">Kamu belum melakukan order apapun. Yuk mulai belanja!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-500 mt-1">{transactions.length} transaksi tercatat</p>
      </div>
      <div className="flex flex-col gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition-shadow"
          >
            <img
              src={transaction.product.image}
              alt={transaction.product.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div className="flex-1">
              <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
                {transaction.product.category}
              </span>
              <h2 className="text-lg font-bold text-gray-800">{transaction.product.name}</h2>
              <p className="text-sm text-gray-500">{transaction.date}</p>
              <p className="text-xs text-gray-400 font-mono">{transaction.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-indigo-600 font-bold text-lg">
                {formatPrice(transaction.product.price)}
              </p>
              <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                ✅ Success
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;