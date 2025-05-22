import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% fake tax
  const total = subtotal + tax;

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="p-4 max-w-7xl mx-auto"
  >
    <div className="p-4 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft /> Back to Shop
      </button>

      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-48 mx-auto mb-4 opacity-60"
          />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <Link
                      to={`/product/${item.id}`}
                      className="font-semibold text-lg text-blue-600 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    {/* Quantity Control */}
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <p className="font-bold text-green-700 text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      confirm("Remove this item?") && removeFromCart(item.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="border rounded-lg p-4 shadow-md space-y-2 text-right mb-6">
            <p className="text-gray-700">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-gray-700">Tax (10%): ${tax.toFixed(2)}</p>
            <h3 className="text-xl font-bold">
              Total: <span className="text-green-700">${total.toFixed(2)}</span>
            </h3>
          </div>

          <div className="flex justify-end">
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
    </motion.div>
  );
}

export default Cart;
