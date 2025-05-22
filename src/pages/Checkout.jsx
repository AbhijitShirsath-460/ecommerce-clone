import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addOrder } = useOrders();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all required fields.");
      return;
    }

    addOrder({
      name: formData.name,
      email: formData.email,
      address: formData.address,
      items: cartItems,
      total: totalPrice,
    });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      clearCart();
      setTimeout(() => navigate("/"), 3000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center p-6 max-w-md mx-auto"
      >
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
        <p className="text-gray-600">Thanks for shopping with us, {formData.name}!</p>
        <p className="text-sm mt-2 text-gray-500">Redirecting to Home...</p>
      </motion.div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">🧾 Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty. Go add something!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Order Summary */}
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-4">🛍️ Your Items:</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.title} × {item.quantity}</span>
                  <span className="font-semibold text-green-700">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <h4 className="text-lg font-bold">
              Total: <span className="text-green-700">${totalPrice.toFixed(2)}</span>
            </h4>
          </div>

          {/* Checkout Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3.5 left-3 text-gray-400" />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="pl-10 border px-4 py-2 rounded-md w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
            >
              Confirm Order
            </motion.button>
          </motion.form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
