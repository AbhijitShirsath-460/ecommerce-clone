import { useOrders } from "../context/OrderContext";

function OrderHistory() {
  const { orders } = useOrders();

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📜 Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="mb-2 text-sm text-gray-500">
                Order ID: {order.id} —{" "}
                {new Date(order.date).toLocaleString()}
              </div>
              <div className="mb-1 font-medium">
                {order.name} • {order.email}
              </div>
              <div className="text-sm mb-2 text-gray-600">
                Address: {order.address}
              </div>

              <div className="text-sm text-gray-700 font-medium mb-1">
                Items:
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.quantity} — $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="text-right text-green-700 font-bold">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
