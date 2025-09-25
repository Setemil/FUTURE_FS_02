
"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/interfaces";

const fetchProducts = async (): Promise<Products[]> => {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch Products");
  }
  return res.json();
};

const Page = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            productsData.map((product) => product.category).filter(Boolean)
          )
        );
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-indigo-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md mx-auto">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Products
            </h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products
          </p>
        </div>

        {/* Category Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                Filter by Category
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Products ({products.length})
              </button>

              {categories.map((category) => {
                const categoryCount = products.filter(
                  (p) => p.category === category
                ).length;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category} ({categoryCount})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Count & Selected Category */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Showing</span>
            <span className="text-sm font-semibold text-indigo-600">
              {filteredProducts.length}
            </span>
            <span className="text-sm text-gray-500">
              {filteredProducts.length === 1 ? "product" : "products"}
              {selectedCategory !== "all" && (
                <span className="capitalize"> in {selectedCategory}</span>
              )}
            </span>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => handleCategoryChange("all")}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1 transition-colors duration-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Clear filter</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: Products) => (
              <div
                key={product._id}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedCategory !== "all"
                ? `No products found in the "${selectedCategory}" category.`
                : "No products are currently available."}
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => handleCategoryChange("all")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;