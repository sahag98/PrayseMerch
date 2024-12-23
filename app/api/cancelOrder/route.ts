import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id } = await req.json();

  if (!order_id) {
    throw new Error("order id is required to cancel.");
  }
  try {
    await fetch(`https://rest.spod.com/orders/${order_id}/cancel`, {
      method: "POST",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    { cancelInfo: "canceled" },
    {
      status: 200,
    }
  );
}
