import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProductById, getProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  FaArrowLeft,
  FaCartPlus,
  FaHeart,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);

        getProductsByCategory(data.category.id)
          .then((items) => {
            const filtered = items.filter((p) => p.id !== data.id);
            setSimilarProducts(filtered.slice(0, 4));
          })
          .catch(console.error);
      })
      .catch((err) => {
        console.error("Product not found:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Product not found or removed.
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition"
      >
        <FaArrowLeft /> Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image Carousel */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-md shadow"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${product.title}-${idx}`}
                  className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Info */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{product.title}</h2>
              <motion.button
                onClick={() => toggleWishlist(product)}
                whileTap={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-red-500 text-xl"
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                {inWishlist ? <FaHeart /> : <FaRegHeart />}
              </motion.button>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              {[1, 2, 3, 4].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-sm text-gray-600 ml-2">(123 reviews)</span>
            </div>

            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg mb-1">
              Category:{" "}
              <span className="text-blue-500 font-medium">{product.category.name}</span>
            </p>
            <p className="text-2xl font-bold text-green-700 mb-6">${product.price}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
            aria-label="Add product to cart"
          >
            <FaCartPlus />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Similar Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
