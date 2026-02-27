import { useState, useEffect } from "react";

const promos = [
  {
    id: 1,
    title: "Flash Sale Hari Ini!",
    subtitle: "Diskon hingga 50% untuk semua produk elektronik",
    bg: "from-indigo-500 to-purple-600",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "Free Ongkir Se-Indonesia",
    subtitle: "Berlaku untuk pembelian di atas Rp200.000",
    bg: "from-pink-500 to-rose-500",
    emoji: "🚚",
  },
  {
    id: 3,
    title: "New Arrivals!",
    subtitle: "Produk terbaru sudah tersedia, cek sekarang!",
    bg: "from-teal-400 to-cyan-600",
    emoji: "🎉",
  },
  {
    id: 4,
    title: "Member Exclusive",
    subtitle: "Daftar sekarang dan dapatkan cashback 10%",
    bg: "from-orange-400 to-yellow-500",
    emoji: "👑",
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + promos.length) % promos.length);
  const next = () => setCurrent((c) => (c + 1) % promos.length);

  return (
    <div className="mb-10">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`min-w-full bg-gradient-to-r ${promo.bg} text-white px-10 py-10 flex items-center justify-between`}
            >
              <div>
                <p className="text-4xl mb-2">{promo.emoji}</p>
                <h2 className="text-2xl font-extrabold mb-1">{promo.title}</h2>
                <p className="text-white/80 text-sm">{promo.subtitle}</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 transition-colors px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap">
                Lihat Promo →
              </button>
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {promos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;