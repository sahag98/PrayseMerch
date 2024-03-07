import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/app/addToCart";

export async function POST(req: Request) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Products are required", { status: 400 });
  }

  console.log("items to checkout: ", products[0].customerPrice.amount);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product: CartItem) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.customerPrice.amount * 100,
      },
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json(
    { url: session.url },
    {
      status: 200,
    }
  );
}
