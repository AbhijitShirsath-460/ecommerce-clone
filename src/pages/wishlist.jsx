import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-16 space-y-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
            alt="Empty Wishlist"
            className="w-40 sm:w-48 opacity-60"
          />
          <p className="text-lg font-medium">No items in your wishlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
