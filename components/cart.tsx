import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ShoppingCart,
  TrashIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/app/addToCart";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import ShippingForm from "./shippingForm";
import CheckoutForm from "./checkoutForm";
import CancelDialog from "./CancelDialog";
const Cart = () => {
  const cart = useCart();
  const isCartOpen = useCart((state) => state.isCartOpen);
  const [shippingTypes, setShippingTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("cart");
  const cartProducts = useCart((state) => state.items);

  const cancelOrder = async () => {
    const res = await axios.post("/api/cancelOrder", {
      order_id: cart.order_id,
    });

    cart.removeAll();
    cart.closeCart();
    setActiveTab("cart");
  };
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={cart.closeCart}>
      <SheetTrigger asChild>
        <Button className="px-0 py-0" variant={"ghost"}>
          <div className="relative p-2">
            <div className="absolute bg-primary p-1 w-5 h-5 flex items-center justify-center rounded-full text-background right-0 top-0">
              <span className="text-center mt-[2px]">{cart.items.length}</span>
            </div>
            <ShoppingCart />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="px-3 flex flex-col overflow-auto justify-between min-h-[100dvh] md:w-2/3 lg:w-2/6">
        {activeTab == "cart" && (
          <>
            <SheetClose className="absolute right-5 top-5">
              <X className="h-6 w-6" />
            </SheetClose>
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col gap-8 items-center justify-center">
                <Image
                  className="lg:w-40 w-1/2"
                  src={"/empty-cart.svg"}
                  width={896}
                  height={748}
                  alt="empty shopping cart"
                />
                <p className="text-xl">Your cart is Empty.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-bold">
                      Shopping Cart
                    </SheetTitle>
                    <SheetDescription className="text-lg">
                      Your cart items:
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    <div className="grid  overflow-hidden gap-4 py-4">
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
                                <p className="">{item.name}</p>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center w-fit text-secondary-foreground rounded-md px-2 py-1 bg-secondary gap-3">
                                    <span className="text-sm">
                                      Size: {item.size}
                                    </span>
                                    <p className="text-sm">x{item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium">
                                    ${item.customerPrice.amount * item.quantity}
                                  </p>
                                </div>
                              </section>
                            </div>
                            <div className="p-2 bg-destructive/10 rounded-full">
                              <TrashIcon
                                className="text-destructive cursor-pointer w-5"
                                onClick={() => cart.removeItem(item.sku)}
                              />
                            </div>
                          </div>
                          <Separator className="mt-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <section className="flex gap-2 border-t p-2 flex-col">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="flex gap-5">
                      <span className="">Subtotal:</span>
                      <span className="font-bold">
                        ${cart.calculateTotal().subTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-5 ">
                      <span className="text-left">Sales Tax:</span>
                      <span className="text-right font-bold">
                        ${cart.calculateTotal().salesTaxNum.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex gap-2 items-end">
                      <span className="text-lg ">Total:</span>
                      <span className="text-2xl font-bold">
                        ${cart.calculateTotal().total.toFixed(2)}
                      </span>
                    </div>
                    <span>+ plus Shipping</span>
                  </div>

                  <Button
                    onClick={() => setActiveTab("shipping")}
                    className="w-full text-base gap-3"
                    type="submit"
                  >
                    Proceed to Shipping <ArrowRightCircle />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => cart.closeCart()}
                    className="w-full gap-3 text-base"
                    type="button"
                  >
                    Back to Shopping <ArrowLeftCircle />
                  </Button>
                </section>
              </>
            )}
          </>
        )}
        {activeTab == "shipping" && (
          <>
            <SheetClose className="absolute right-5 top-5">
              <X className="h-6 w-6" />
            </SheetClose>
            <ShippingForm
              shippingTypes={shippingTypes}
              setShippingTypes={setShippingTypes}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        )}
        {activeTab == "checkout" && (
          <>
            <CancelDialog
              cancelOrder={cancelOrder}
              showCancelAlert={showCancelAlert}
              setShowCancelAlert={setShowCancelAlert}
            />
            <Button
              variant={"ghost"}
              onClick={() => {
                setShowCancelAlert(true);
              }}
              className="absolute right-5 top-5"
            >
              <X className="h-6 w-6" />
            </Button>
            <CheckoutForm
              shippingTypes={shippingTypes}
              setShippingTypes={setShippingTypes}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
