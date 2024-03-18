import useCart from "@/hooks/use-cart";
import React from "react";

const TestPage = async () => {
  // const cart = useCart();
  // console.log("order id: ", cart.order_id);
  const res = await fetch("https://rest.spod.com/orders/1801199", {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const resp = await res.json();
  console.log("test:  ", resp);

  const result = await fetch(`https://rest.spod.com/orders/1801199/confirm`, {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const confirm = await result.json();

  console.log("confirmed: ", confirm);

  return <div>TestPage</div>;
};

export default TestPage;
