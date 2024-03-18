import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/app/addToCart";

export async function POST(req: Request) {
  const { requestBody } = await req.json();

  const createOrder = await fetch("https://rest.spod.com/orders", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
    body: JSON.stringify(requestBody),
  });

  const created = await createOrder.json();

  return NextResponse.json(
    { orderInfo: created },
    {
      status: 200,
    }
  );
}
