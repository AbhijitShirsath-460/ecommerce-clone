import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
            alt="Empty Wishlist"
            className="w-40 mx-auto mb-4 opacity-60"
          />
          <p>No items in your wishlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
