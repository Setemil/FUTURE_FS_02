"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/app/useStore";
import { Products } from "@/interfaces";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  const { addToCart, cart } = useCartStore();

  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image,
        category: product.category,
      };

      addToCart(cartItem);
    }
  };

  const isInCart = cart.some((item) => item._id === product?._id);
  const discountPercentage = product
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 bg-gray-300 rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product not found
            </h2>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => router.push("/products")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <nav className="text-sm text-gray-500">
              <span
                className="hover:text-indigo-600 cursor-pointer"
                onClick={() => router.push("/products")}
              >
                Products
              </span>
              <span className="mx-2">/</span>
              <span className="hover:text-indigo-600 cursor-pointer">
                {product.category}
              </span>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 object-cover"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  -{discountPercentage}%
                </div>
              )}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating.rate)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-indigo-600">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                {product.price !== product.discountedPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save $
                  {(product.price - product.discountedPrice).toFixed(2)} (
                  {discountPercentage}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {showFullDescription
                  ? product.description
                  : `${product.description.substring(0, 200)}...`}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2"
              >
                {showFullDescription ? "Show less" : "Read more"}
              </button>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
                    product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isInCart
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() => router.push("/cart")}
                  className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-gray-600">
                    2-year warranty included
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-gray-600">
                    Free shipping on orders over $50
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-gray-600">
                    30-day return policy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Specifications
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Category</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {product.category}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Product ID</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {product._id}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Created</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Last Updated</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Customer Reviews Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {product.rating.rate}/5
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Based on {product.rating.count} reviews
                </span>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-3">{stars}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${Math.random() * 80 + 10}%`, // Mock data
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {Math.floor(Math.random() * 50)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
