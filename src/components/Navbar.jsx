import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart,
  FaHome,
  FaClipboardList,
} from "react-icons/fa";
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
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-shadow duration-300 shadow-sm hover:shadow-md rounded px-2 py-1"
        >
          MyStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavIconLink
            to="/"
            isActive={isActive("/")}
            icon={<FaHome />}
            label="Home"
            onClick={closeMenu}
          />
          <NavIconLink
            to="/wishlist"
            isActive={isActive("/wishlist")}
            icon={<FaHeart />}
            label="Wishlist"
            onClick={closeMenu}
          />
          <NavIconLink
            to="/orders"
            isActive={isActive("/orders")}
            icon={<FaClipboardList />}
            label="Orders"
            onClick={closeMenu}
          />

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600 transition flex items-center gap-1 group"
            aria-label="Shopping Cart"
            onClick={closeMenu}
          >
            <FaShoppingCart
              className="text-3xl group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-lg">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <img
                src={user.photo}
                alt="User profile"
                className="w-9 h-9 rounded-full border-2 border-blue-600 shadow-md"
              />
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <button
                onClick={logout}
                disabled={authLoading}
                className={`text-red-600 hover:underline font-semibold ${
                  authLoading ? "opacity-50 cursor-wait" : ""
                } transition`}
              >
                {authLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              disabled={authLoading}
              className={`text-blue-600 hover:underline font-semibold ${
                authLoading ? "opacity-50 cursor-wait" : ""
              } transition`}
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>
          )}
        </nav>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-gray-700 text-3xl p-2 rounded-full hover:bg-gray-100 transition"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav (Slide Down) */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        } px-6 bg-white border-t border-gray-200 shadow-md`}
      >
        <div className="flex flex-col gap-5 py-5">
          <NavIconLink
            to="/"
            isActive={isActive("/")}
            icon={<FaHome />}
            label="Home"
            onClick={closeMenu}
          />
          <NavIconLink
            to="/wishlist"
            isActive={isActive("/wishlist")}
            icon={<FaHeart />}
            label="Wishlist"
            onClick={closeMenu}
          />
          <NavIconLink
            to="/orders"
            isActive={isActive("/orders")}
            icon={<FaClipboardList />}
            label="Orders"
            onClick={closeMenu}
          />
          <Link
            to="/cart"
            onClick={closeMenu}
            className="text-gray-700 hover:text-blue-600 font-medium transition shadow-sm hover:shadow-md rounded px-2 py-1 flex items-center gap-2"
            aria-label="Cart"
          >
            <FaShoppingCart />
            <span>Cart ({cartItems.length})</span>
          </Link>

          {user ? (
            <div className="flex flex-col text-sm gap-2 border-t border-gray-300 pt-4">
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                disabled={authLoading}
                className="text-left text-red-600 hover:underline font-semibold transition"
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
              className="text-left text-blue-600 hover:underline font-semibold transition"
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

// NavLink with icon and accessible label + hover shadow
const NavIconLink = ({ to, icon, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`relative flex items-center gap-2 px-3 py-1 rounded-md transition
      ${
        isActive
          ? "text-blue-600 font-semibold shadow-md bg-blue-50"
          : "text-gray-700 hover:text-blue-600 hover:shadow-lg hover:bg-blue-50"
      }`}
    aria-label={label}
    title={label}
  >
    <span className="text-xl">{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </Link>
);

export default Navbar;
