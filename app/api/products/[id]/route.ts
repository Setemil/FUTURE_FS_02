import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectDB from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error Fetching Product: ", error);
    return NextResponse.json(
      { error: "Failed to Fetch Product" },
      { status: 500 }
    );
  }
}
