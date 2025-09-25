import ProductCard from "@/components/ProductCard";
import { Products } from "@/interfaces";

const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "no-store",
  });
  if (!res) {
    throw new Error("Failed to fetch Products");
  }
  return res.json();
};

const page = async () => {
  const products = await fetchProducts();

  return (
    <div className="px-6 py-8">
      <h1>Products page</h1>
      <p>These are the products we have</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {products.map((product: Products) => (
          
            <ProductCard product={product} key={product.id} />
          
        ))}
      </div>
    </div>
  );
};

export default page;
