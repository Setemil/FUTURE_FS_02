import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  const body = await req.json();
  try {
    const { name, email, address, items } = body;
    if (!name || !email || !address || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Missing Required Fields" },
        { status: 400 }
      );
    }
      const orderId = Date.now();
      
      return NextResponse.json({message: "Checkout Successful", orderId}, {status: 200})
  } catch (error) {
      console.error("Failed to process Checkout ", error);
      return NextResponse.json({message: "Failed to process checkout"}, {status: 500})
  }
}
