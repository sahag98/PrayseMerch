import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle, Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

export const revalidate = 3600;

const ShipmentPage = async ({ params: { orderId } }: any) => {
  if (!orderId) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3>Oops... You are not supposed to be here.</h3>
        <p>
          If you want to check the shipment updates make sure to put the correct
          URL.
        </p>
        <p>(For example: https://shop.prayse.app/shipments/id_number_here )</p>
        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const res = await fetch(`https://rest.spod.com/orders/${orderId}/shipments`, {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const shipments = await res.json();

  return (
    <div className="h-screen flex flex-col gap-5 items-center justify-center">
      {shipments.length == 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Loader className="animate-spin-slow text-primary  w-24 h-24" />
          <h1 className="font-bold text-xl">
            Your order is waiting for production.
          </h1>
          <p className="text-center">
            Please check back at a later time to to see if their are any
            updates. Thank you!
          </p>
          <p className="text-center">
            Refresh the page if it still says your order is waiting for
            prodution after a couple of days, or email us at
            <span className="font-bold"> prayse.app@gmail.com </span> and
            we&apos;ll provide the updates to you.
          </p>
        </div>
      ) : (
        <div className="border rounded-md p-2">
          <h2 className="font-bold text-xl">
            Your order is ready for production.
          </h2>
          <h3 className="underline underline-offset-2">
            Shipping Information:
          </h3>
          {shipments?.map((shipment: any) => (
            <div key={shipment.id} className="flex flex-col">
              <span>
                {shipment.shipping?.address.firstName}{" "}
                {shipment.shipping?.address.lastName}
              </span>
              <span>{shipment.shipping?.address.street}</span>
              <span>
                {shipment.shipping?.address.city}{" "}
                {shipment.shipping?.address.state
                  ? shipment.shipping?.address.state
                  : ""}{" "}
                {shipment.shipping?.address.zipCode
                  ? shipment.shipping?.address.zipCode
                  : ""}{" "}
                {shipment.shipping?.address.country}
              </span>
              <span>Tracking Number:</span>
              <Link
                target="_blank"
                href={shipment.tracking[0].url}
                className="cursor-pointer hover:underline transition-all text-primary"
              >
                {shipment?.tracking[0]?.code}
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3">
        <Button
          variant={"outline"}
          size={"sm"}
          className="gap-2 flex items-center"
        >
          <Link
            className="flex items-center gap-2"
            href={`/success/${orderId}`}
          >
            Back to Order Info <ArrowLeftCircle />
          </Link>
        </Button>
        <Button size={"sm"} className="gap-2">
          <Link className="flex items-center gap-2" href={`/`}>
            Back to Home <ArrowRightCircle />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ShipmentPage;
