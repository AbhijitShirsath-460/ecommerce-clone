import { useOrders } from "../context/OrderContext";
import { motion } from "framer-motion";

function OrderHistory() {
  const { orders } = useOrders();

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">📜 Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl p-4 sm:p-6 shadow-md bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 mb-2">
                <div>🆔 Order ID: {order.id}</div>
                <div>{new Date(order.date).toLocaleString()}</div>
              </div>

              <div className="mb-2 font-medium text-gray-800">
                👤 {order.name} • {order.email}
              </div>
              <div className="text-sm mb-3 text-gray-600">
                📍 Address: {order.address}
              </div>

              <div className="text-sm text-gray-700 font-medium mb-2">🧾 Items:</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.quantity} — $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="text-right text-green-700 font-bold text-base">
                Total: ${order.total.toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
