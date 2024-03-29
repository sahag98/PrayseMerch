import { Button } from "@/components/ui/button";
import { Ban, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const CancelPage = async ({ params: { orderId } }: any) => {
  if (!orderId) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3>Oops... You are not supposed to be here.</h3>
        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }
  await fetch(`https://rest.spod.com/orders/${orderId}/cancel`, {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  return (
    <div className="h-screen flex items-center flex-col justify-center">
      <Ban className="text-red-600 w-24 h-24 mb-2" />
      <h1>Your order was canceled successfully.</h1>
      <p className="text-center">
        Please let us know if you ran into any issues by emailing us at
        <span className="font-bold">prayse.app@gmail.com</span>.
      </p>
      <Button size={"sm"} className="mt-3">
        <Link className="gap-2 flex items-center text-base" href={"/"}>
          Back to Home <Home />
        </Link>
      </Button>
    </div>
  );
};

export default CancelPage;
