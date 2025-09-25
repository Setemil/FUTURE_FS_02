import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
