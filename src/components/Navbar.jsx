import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useCart();
  const { user, login, logout, authLoading } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyStore
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-red-500 font-medium">
            ❤️ Wishlist
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-blue-600 font-medium">
            🧾 Orders
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2 text-sm">
              <img src={user.photo} alt="User" className="w-8 h-8 rounded-full" />
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={logout}
                disabled={authLoading}
                className={`text-red-500 hover:underline ${authLoading ? "opacity-50 cursor-wait" : ""}`}
              >
                {authLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              disabled={authLoading}
              className={`text-blue-600 hover:underline font-medium ${authLoading ? "opacity-50 cursor-wait" : ""}`}
            >
              {authLoading ? "Logging in..." : "Login with Google"}
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;
