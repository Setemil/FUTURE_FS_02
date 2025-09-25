/* eslint-disable @next/next/no-img-element */
import {
  Star,
  Truck,
  Shield,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const page = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Get your orders delivered within 24 hours",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure payment with SSL encryption",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round the clock customer support",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: "$49.99",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-start pt-0 relative overflow-hidden "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10 pt-10 lg:pt-50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left-10 duration-1000">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Shop Smart,
                <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Shop Quick
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover amazing products at unbeatable prices. Fast delivery,
                secure payments, and exceptional customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <button className="bg-gradient-to-r from-purple-800 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group">
                    Start Shopping
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-200">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop"
                  alt="Shopping"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      Premium Products
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-gray-700 font-semibold">
                        4.9
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Curated collection of the finest products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Quick Mart?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the best in online shopping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              This is a sample of the products and amazing prices we deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mb-4">
                    {product.price}
                  </p>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center group">
                    Add to Cart
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
