import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({ params: { orderId } }: any) => {
  if (!orderId) {
    return (
      <div>
        <h3>Oops... You are not supposed to be here.</h3>
        <Link href={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  // const orderToConfirm = await fetch(
  //   `https://rest.spod.com/orders/${orderId}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //       "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
  //     },
  //   }
  // );

  // const check = await orderToConfirm.json();
  // console.log("TO confirm: ", check);

  const res = await fetch(`https://rest.spod.com/orders/${orderId}/confirm`, {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  // const confirm = await res.json();

  // console.log("confirmed: ", confirm);

  return (
    <div className="h-screen flex items-center justify-center">
      SuccessPage: {orderId}
    </div>
  );
};

export default SuccessPage;
