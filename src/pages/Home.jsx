import products from "../data/products";
import ProductCard from "../components/ProductCard";
import PromoSlider from "../components/PromoSlider";

const Home = () => {
  return (
    <div>
      <PromoSlider />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Catalog</h1>
        <p className="text-gray-500 mt-1">Temukan produk favoritmu di sini!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;