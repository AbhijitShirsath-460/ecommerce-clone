import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useCart();
  const { user, login, logout, authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md transition-shadow duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-blue-600">
          MyStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" label="Home" isActive={isActive("/")} />
          <NavLink to="/wishlist" label="❤️ Wishlist" isActive={isActive("/wishlist")} />
          <NavLink to="/orders" label="🧾 Orders" isActive={isActive("/orders")} />

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
              {authLoading ? "Logging in..." : "Login"}
            </button>
          )}
        </nav>

        {/* Hamburger Menu Icon */}
        <button className="md:hidden text-gray-700 text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav (Slide Down) */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        } px-6 bg-white border-t border-gray-200`}
      >
        <div className="flex flex-col gap-4 py-4">
          <NavLink to="/" label="Home" isActive={isActive("/")} onClick={closeMenu} />
          <NavLink to="/wishlist" label="❤️ Wishlist" isActive={isActive("/wishlist")} onClick={closeMenu} />
          <NavLink to="/orders" label="🧾 Orders" isActive={isActive("/orders")} onClick={closeMenu} />
          <Link to="/cart" onClick={closeMenu} className="text-gray-700 hover:text-blue-600">
            🛒 Cart ({cartItems.length})
          </Link>

          {user ? (
            <div className="flex flex-col text-sm gap-1">
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                disabled={authLoading}
                className="text-left text-red-500 hover:underline"
              >
                {authLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                login();
                closeMenu();
              }}
              disabled={authLoading}
              className="text-left text-blue-600 hover:underline"
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

// Reusable nav link component with highlight
const NavLink = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`font-medium ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
    } hover:text-blue-600 transition`}
  >
    {label}
  </Link>
);

export default Navbar;
