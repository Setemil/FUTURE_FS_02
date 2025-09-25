// app/order-success/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md w-full">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We&apos;ll send you an email confirmation
          soon.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
