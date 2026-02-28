import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PromoSlider from "../components/PromoSlider";

const Home = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-8 px-4 pt-5">
      {/* Hero */}
      <motion.div
        className="mb-5 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          <span className="bg-gradient-to-r from-primary to-blue-950 bg-clip-text text-transparent">
          Temukan Produk Favoritmu
          </span>
        </h1>
        <p className="text-muted-foreground font-medium">
          Belanja produk berkualitas dengan harga terbaik
        </p>
      </motion.div>

      {/* Promo Slider */}
      <PromoSlider />

      {/* Category Filter */}
      <motion.div
        className="mb-6 flex gap-4 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-8 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-primary/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredProducts.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-muted-foreground">Tidak ada produk ditemukan</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;