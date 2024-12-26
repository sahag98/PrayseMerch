import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import React from "react";

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
      <h3 className="font-bold text-xl mb-3">
        Thank you for placing an order!
      </h3>
      <h1 className="text-2xl underline font-bold">Order ID: {orderInfo.id}</h1>
      <h2 className="">Order Reference: {orderInfo.externalOrderReference}</h2>
      <h3 className="font-bold"></h3>
      <p className="mt-5 mb-2 md:w-1/2 text-lg w-full text-center">
        If you have any questions please email us at
        <span className="font-bold"> prayse.app@gmail.com</span>, and we&apos;ll
        get back to you shortly. In the mean time, check out our free prayer
        list template!
      </p>

      <Link
        className="bg-secondary my-2 font-semibold text-base rounded-lg p-3"
        href={
          "https://www.canva.com/design/DAGRcSB6DCs/QN5T89e5Jops_-PQ_B1f4g/view?utm_content=DAGRcSB6DCs&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
        }
        target="_blank"
      >
        FREE PRAYER LIST TEMPLATE
      </Link>

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
