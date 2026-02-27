import { useState, useEffect } from "react";
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";

const promos = [
  {
    id: 1,
    image: promo1,
    alt: "Promo Flash Sale",
  },
  {
    id: 2,
    image: promo2,
    alt: "Promo Lebaran",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/promo3/1200/400",
    alt: "New Arrivals",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/promo4/1200/400",
    alt: "Member Exclusive",
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
          <div key={promo.id} className="min-w-full">
            <img
              src={promo.image}
              alt={promo.alt}
              className="w-full h-70 md:h-67 object-cover"
            />
          </div>
        ))}
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
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