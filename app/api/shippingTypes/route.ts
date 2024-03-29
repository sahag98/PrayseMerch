import { NextResponse } from "next/server";

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

  return NextResponse.json(
    { shippingTypes: types },
    {
      status: 200,
    }
  );
}
