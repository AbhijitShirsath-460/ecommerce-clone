import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";


function ProductCard({ product }) {
  return (
     <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow rounded-lg p-4 cursor-pointer"
    >
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 hover:scale-105">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-green-600 font-bold text-lg">${product.price}</p>
          <FaCartPlus className="text-blue-500 hover:text-blue-700 text-xl transition" />
        </div>
      </div>
    </Link>

    </motion.div>
  );
}

export default ProductCard;
