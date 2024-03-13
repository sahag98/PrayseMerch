import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/app/addToCart";

export async function POST(req: Request) {
  const { order_id } = await req.json();

  const getShipping = await fetch(
    `https://rest.spod.com/orders/${order_id}/shippingTypes`,
    {
      method: "GET",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    }
  );
  const types = await getShipping.json();

  // console.log("order info: ", created);
  return NextResponse.json(
    { shippingTypes: types },
    {
      status: 200,
    }
  );
}
