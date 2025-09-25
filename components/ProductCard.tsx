import React from "react";
import Image from "next/image";
import { Products } from "@/interfaces";
import { Star } from "lucide-react";
import AddToCart from "./AddToCart";
import Link from "next/link";


const ProductCard = ({ product }: { product: Products }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-50">
        <Link href={`/products/${product._id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={256}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        </Link>
        {product.discountedPrice && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
            {Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )}
            % OFF
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating.rate)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.rating.rate})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.discountedPrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">
                ${product.discountedPrice}
              </span>
              <s className="text-lg text-gray-400 line-through">
                ${product.price}
              </s>
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          )}
        </div>

        {/* Stock Status & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.stock > 0 ? (
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
