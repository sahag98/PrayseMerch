import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Success from "./success";
import { ArrowRightCircle, CheckCircle } from "lucide-react";

const SuccessPage = async ({ params: { orderId } }: any) => {
  if (!orderId) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3>Oops... You are not supposed to be here.</h3>
        <p>
          If you want to check the shipment updates make sure to put the correct
          URL.
        </p>
        <p>(For example: https://shop.prayse.app/success/id_number_here )</p>
        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  await fetch(`https://rest.spod.com/orders/${orderId}/confirm`, {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const res = await fetch(`https://rest.spod.com/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const orderInfo = await res.json();

  return (
    <div className="h-screen lg:px-36 px-4 flex flex-col items-center justify-center">
      <CheckCircle className="text-green-600 w-24 h-24 mb-2" />
      <h3>Your order has been placed!</h3>
      <h1 className="text-2xl underline font-bold">Order ID: {orderInfo.id}</h1>
      <h2 className="">Order Reference: {orderInfo.externalOrderReference}</h2>
      <h3 className="mb-1 mt-3 font-semibold">What to do next:</h3>
      <Success />
      <p className="mt-5 mb-2">
        If you have any questions please email us at
        <span className="font-bold"> prayse.app@gmail.com</span>, and we&apos;ll
        get back to you shortly :)
      </p>

      <Button size={"lg"} className="gap-2 mt-3">
        <Link
          className="flex items-center text-base font-bold gap-2"
          href={`/shipments/${orderId}`}
        >
          Check Shipment Updates <ArrowRightCircle />
        </Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
