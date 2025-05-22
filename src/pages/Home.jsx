import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import { MdCategory, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Adjust for mobile/desktop, can make dynamic if needed

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
        setCurrentPage(1); // Reset to first page on category change
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
      setCurrentPage(1); // Reset to first page on filter change
    }, 300);

    return () => clearTimeout(timer);
  }, [products, searchQuery, sortOption]);

  // Calculate pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up on page change
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 max-w-7xl mx-auto"
    >
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
              aria-label="Previous Page"
            >
              <MdChevronLeft size={28} />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-blue-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
              aria-label="Next Page"
            >
              <MdChevronRight size={28} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Home;
