import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id } = await req.json();

  if (!order_id) {
    throw new Error("order id is required to cancel.");
  }
  console.log("order id from cancel route: ", order_id);
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

  // console.log("order info: ", created);
  return NextResponse.json(
    { cancelInfo: "canceled" },
    {
      status: 200,
    }
  );
}
