"use client";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useCartStore } from "@/app/useStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-xl sm:text-2xl font-bold bg-indigo-600 cursor-pointer hover:bg-indigo-700 transition-colors">
              <Image alt="logo" src={logo} width={140} height={40} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-indigo-600 cursor-pointer font-medium transition-colors"
            >
              Products
            </Link>

            {/* Shopping Cart */}
            <div className="relative cursor-pointer group">
              <Link href="/cart">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                </div>
              </Link>
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </div>
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <div className="relative cursor-pointer group">
              <Link href="/cart">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                </div>
              </Link>
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <Link href="/products">
                <div className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 cursor-pointer font-medium transition-colors rounded-md">
                  Products
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
