import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { shippingBody, orderId } = await req.json();

  console.log("shipping body in POST: ", shippingBody, orderId);
  let shippingType;
  try {
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
    shippingType = await setType.json();
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    { shippingType: shippingType },
    {
      status: 200,
    }
  );
}
