/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import connectDB from "@/lib/db";



export async function POST(req:Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newProduct = await Product.create(body);
        return NextResponse.json(newProduct, {status: 201})
    } catch (error) {
        console.error("Error Creating Product: ", error);
        return NextResponse.json({error: "Failed To Create Product"}, {status: 500})
    }
}

export async function GET(req: Request) {
try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive
    }
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}