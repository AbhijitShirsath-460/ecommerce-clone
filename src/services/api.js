const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getProductsByCategory = async (categoryId) => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
  if (!res.ok) throw new Error("Failed to fetch category products");
  return res.json();
};


export const getProductById = async (id) => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};