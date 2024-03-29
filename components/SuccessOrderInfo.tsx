// @ts-nocheck
"use client";

import { CartItem } from "@/app/addToCart";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SuccessOrderInfo = ({ orderInfo, products }: any) => {
  const cart = useCart();

  console.log("success order items: ", cart.orderItems);

  return (
    <div className="border w-full lg:w-1/2 rounded-md py-3 px-2 flex flex-col gap-2 ">
      <h2 className="text-center font-semibold">Order ID: {orderInfo.id}</h2>
      {cart.orderItems.products.map((product: CartItem) => (
        <div>
          <div className="flex items-center justify-between">
            <section className="flex items-center gap-3">
              <span>{product.quantity}x</span>
              <Image
                width={1000}
                height={1000}
                className="w-14 hidden lg:flex lg:w-20 border rounded-lg"
                src={product.image}
                alt={product.name + " Image"}
              />
              <h2 className="text-wrap">{product.name}</h2>
            </section>

            <span>${product.customerPrice.amount}</span>
          </div>
        </div>
      ))}
      <span className="self-end">Sales Tax: ${cart.orderItems.salesTax}</span>
      <span className="self-end">
        Shipping Fee: ${cart.orderItems.shippingFee}
      </span>
      <span className="self-end">Total: ${cart.orderItems.shippingFee}</span>
      <span className="self-end">
        Shipping Method: {cart.orderItems.shippingType.name}
      </span>
    </div>
  );
};

export default SuccessOrderInfo;
