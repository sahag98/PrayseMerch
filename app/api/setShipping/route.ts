import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/app/addToCart";

export async function POST(req: Request) {
  const { shippingBody, orderId } = await req.json();

  console.log("shipping body in POST: ", shippingBody, orderId);
  const setType = await fetch(
    `https://rest.spod.com/orders/${orderId}/shippingType`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
      body: JSON.stringify(shippingBody),
    }
  );

  const shippingType = await setType.json();

  return NextResponse.json(
    { shippingType: shippingType },
    {
      status: 200,
    }
  );
}
