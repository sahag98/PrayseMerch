"use server";

import { Item } from "./our-products";

export async function setShipping({ shippingBody, orderId }: any) {
  console.log("shipping body in ACTION: ", shippingBody, orderId);
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
  console.log("type is set in ACTION!");
  return shippingType;
}

export async function createShipping({ requestBody }: any) {
  console.log("creating order: ");
  console.log("request body: ", requestBody);
  try {
    const createOrder = await fetch("https://rest.spod.com/orders", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
      body: JSON.stringify(requestBody),
    });

    const created = await createOrder.json();

    console.log("CREATED ACTION: ", created);
    const types = await getShippingTypes({
      order_id: created.id,
    });

    return {
      cartOrderId: created.id,
      types: types,
    };
  } catch (error: any) {
    throw new Error("Something went wrong while creating order...");
  }
}

export async function getShippingTypes({ order_id }: any) {
  const getShipping = await fetch(
    `https://rest.spod.com/orders/${order_id}/shippingTypes`,
    {
      method: "GET",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    }
  );
  const types = await getShipping.json();
  return types;
}

export async function fetchSingleProduct(id: number) {
  try {
    const res = await fetch(`https://rest.spod.com/articles/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    });

    const singleProduct: Item = await res.json();

    return singleProduct;
  } catch (error) {
    throw new Error("Something went wrong while fetching single product...");
  }
}
