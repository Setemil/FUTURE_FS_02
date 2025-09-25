'use client'
import React from 'react'
import { Products } from '@/interfaces';
import { Plus } from 'lucide-react';
import {useCartStore} from '@/app/useStore'

const AddToCart = ({ product }: { product: Products }) => {
    const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      className={`w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
        product.stock === 0
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-95"
      }`}
      disabled={product.stock === 0}
      onClick={() => addToCart(product)}
    >
      <Plus className="w-5 h-5" />
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCart
