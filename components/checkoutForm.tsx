"use client";

import useCart from "@/hooks/use-cart";
import axios from "axios";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "@/app/addToCart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CancelDialog from "./CancelDialog";

const CheckoutForm = ({
  activeTab,
  setActiveTab,
  shippingTypes,
  setShippingTypes,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  shippingTypes: any[];
  setShippingTypes: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  const cart = useCart();
  const cartProducts = useCart((state) => state.items);
  const subtotal = cart.calculateTotal().subTotal.toFixed(2);
  const salesTax = cart.calculateTotal().salesTaxNum;
  const testTypes = [
    {
      id: 38,
      description: "Tracking provided. Saturday delivery.",
      name: "Standard",
      price: {
        amount: 4.77,
      },
    },
    {
      id: 16,
      description: "Tracking provided. Saturday delivery.",
      name: "Premium",
      price: {
        amount: 5.62,
      },
    },

    {
      id: 23,
      description:
        "Tracking provided. Delivery not available for AK, HI, PO Box and APO.",
      name: "Express",
      price: {
        amount: 4.77,
      },
    },
  ];

  const [selectedType, setSelectedType] = useState<any>(shippingTypes[0]);
  console.log("shipping type: ", selectedType.id);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const router = useRouter();

  const cancelOrder = async () => {
    const res = await axios.post("/api/cancelOrder", {
      order_id: cart.order_id,
    });

    cart.removeAll();
    setActiveTab("cart");
  };

  const handleShipping = async () => {
    const shippingBody = {
      id: selectedType.id,
    };

    await axios.post("/api/setShipping", {
      shippingBody,
      orderId: cart.order_id,
    });

    console.log("shipping type is set!");
  };

  const handlePayment = async () => {
    // const shippingBody = {
    //   id: selectedType.id,
    // };

    // const setShipping = await axios.post("/api/setShipping", {
    //   shippingBody,
    //   orderId: cart.order_id,
    // });

    // console.log("confirm type:", cart.order_id);

    const response = await axios.post("/api/checkout", {
      products: cartProducts,
      orderId: cart.order_id,
      shippingFee: selectedType.price?.amount,
      salesTax: salesTax,
    });

    console.log("response from checkout: ", response);
    cart.removeAll();

    window.location = response.data.url;
  };

  return (
    <div className="h-full">
      <h2 className=" font-bold">Checkout</h2>
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto">
          <div className="grid overflow-hidden gap-4 py-4">
            {cartProducts.map((item: CartItem, index: number) => (
              <div key={item.id}>
                <div className="flex relative items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      width={1000}
                      height={1000}
                      className="w-14 lg:w-20 border rounded-lg"
                      alt={item.image}
                    />
                    <section className="space-y-1 flex flex-col">
                      <p className="text-sm">{item.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center w-fit text-secondary-foreground rounded-md px-2 py-1 bg-secondary gap-3">
                          <span className="text-sm">Size: {item.size}</span>
                          <p className="text-sm">x {item.quantity}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                  <p className="text-xl font-medium">
                    ${item.customerPrice.amount * item.quantity}
                  </p>
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </div>

          {shippingTypes.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-xl">
                Shipping Types: (Select One)
              </h2>
              <div className="flex flex-col gap-5">
                {shippingTypes.map((type: any) => (
                  <div
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "border hover:cursor-pointer hover:bg-secondary px-3 py-2 text-secondary-foreground flex flex-col gap-1 rounded-md",
                      selectedType === type &&
                        "bg-primary hover:bg-primary text-white"
                    )}
                    key={type.id}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{type.name}</span>
                      <span className="text-sm">{type.description}</span>
                    </div>
                    <span className="text-lg">${type.price.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-destructive flex items-center justify-betweeng gap-5 mt-5 bg-destructive/10 border p-3 rounded-md">
              <AlertTriangleIcon className="text-destructive" />
              <span className="text-destructive text-sm">
                Our shipping provider doesn&apos;t ship to this country.
              </span>
            </div>
          )}
        </div>
        <section className="flex gap-2 border-t p-2 flex-col">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex gap-5">
              <span className="">Subtotal:</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex gap-5 ">
              <span className="text-left">Sales Tax:</span>
              <span className="text-right font-bold">${salesTax}</span>
            </div>
            <div className="flex gap-5 ">
              <span className="text-left">Shipping Fee:</span>
              <span className="text-right font-bold">
                ${selectedType.price?.amount}
              </span>
            </div>
            <div className="flex gap-2 items-end">
              <span className="text-lg ">Total:</span>
              {selectedType.price?.amount ? (
                <span className="text-2xl font-bold">
                  $
                  {(
                    cart.calculateTotal().total + selectedType.price?.amount
                  ).toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl font-bold">
                  ${cart.calculateTotal().total}
                </span>
              )}
            </div>
          </div>

          <Button onClick={handleShipping} className="w-full" type="button">
            Confirm Shipping
          </Button>

          <Button onClick={handlePayment} className="w-full" type="submit">
            Pay with Stripe
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setShowCancelAlert(true)}
            className="w-full border-red-200"
            type="button"
          >
            Cancel Checkout
          </Button>
        </section>
      </div>
      <CancelDialog
        cancelOrder={cancelOrder}
        showCancelAlert={showCancelAlert}
        setShowCancelAlert={setShowCancelAlert}
      />
    </div>
  );
};

export default CheckoutForm;
