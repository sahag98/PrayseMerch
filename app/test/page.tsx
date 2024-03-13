import React from "react";

const TestPage = async () => {
  const res = await fetch(
    "https://rest.spod.com/orders/1797249/shippingTypes",
    {
      method: "GET",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    }
  );

  const singleOrder = await res.json();
  console.log("order: ", singleOrder);
  return <div>TestPage</div>;
};

export default TestPage;
