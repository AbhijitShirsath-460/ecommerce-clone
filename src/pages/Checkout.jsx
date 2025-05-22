import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
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
    setLoading(true); // ✅ show spinner
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      clearCart();
      setTimeout(() => navigate("/"), 3000); // redirect after success
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
        className="text-center p-6 max-w-lg mx-auto"
      >
        <div className="text-center p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Placed!</h2>
          <p className="text-gray-600">Thanks for shopping with us, {formData.name}!</p>
          <p className="text-sm mt-2">Redirecting to Home...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🧾 Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Go add something!</p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="mb-6 border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">🛍️ Your Items:</h3>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-semibold text-green-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <h4 className="text-lg font-bold">
              Total:{" "}
              <span className="text-green-700">${totalPrice.toFixed(2)}</span>
            </h4>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Confirm Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;
