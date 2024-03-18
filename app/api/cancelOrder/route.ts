import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id } = await req.json();
  console.log("order id from cancel route: ", order_id);
  await fetch(`https://rest.spod.com/orders/${order_id}/cancel`, {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  // console.log("order info: ", created);
  return NextResponse.json(
    { cancelInfo: "canceled" },
    {
      status: 200,
    }
  );
}
