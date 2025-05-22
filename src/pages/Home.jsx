import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import { MdCategory } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Fetch categories on mount
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    setLoading(true);
    const fetch = selectedCategory ? getProductsByCategory : getProducts;
    fetch(selectedCategory)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Apply search & sort
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let temp = [...products];

      if (searchQuery) {
        temp = temp.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      switch (sortOption) {
        case "price_asc":
          temp.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          temp.sort((a, b) => b.price - a.price);
          break;
        case "az":
          temp.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "za":
          temp.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }

      setFilteredProducts(temp);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products, searchQuery, sortOption]);

  return (

    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="p-4 max-w-7xl mx-auto"
  >
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        🛍️ Trendy Products
      </h1>

      {/* Top Bar: Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div></div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="az">Name: A-Z</option>
          <option value="za">Name: Z-A</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto whitespace-nowrap py-2">
        <div className="inline-flex gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            <MdCategory />
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              <MdCategory />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>

    </motion.div>
  );
}

export default Home;
