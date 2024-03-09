import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

import { ShoppingCart, TrashIcon } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/app/addToCart";
import useCart from "@/hooks/use-cart";
import axios from "axios";
const Cart = () => {
  const cart = useCart();
  const isCartOpen = useCart((state) => state.isCartOpen);

  const cartProducts = useCart((state) => state.items);

  const checkout = async () => {
    const response = await axios.post("/api/checkout", {
      products: cartProducts,
    });
    cart.removeAll();
    window.location = response.data.url;
  };
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
      <SheetContent className="lg:w-[400px] w-[350px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
          <SheetDescription className="text-lg">
            Your cart items:
          </SheetDescription>
        </SheetHeader>

        {cart.items.length == 0 ? (
          <div className="h-full flex flex-col gap-8 items-center justify-center">
            <Image
              className="lg:w-40 w-3/4"
              src={"/empty-cart.svg"}
              width={896}
              height={748}
              alt="empty shopping cart"
            />
            <p className="text-xl">Your cart is Empty.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              {cart.items.map((item: CartItem, index: number) => (
                <>
                  <div
                    className="flex relative items-center justify-between"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        width={1000}
                        height={1000}
                        className="w-14 lg:w-20 border rounded-lg"
                        alt={item.image}
                      />
                      <section className="space-y-1">
                        <p className="text-sm">{item.name}</p>
                        <div className="flex items-center w-fit text-secondary-foreground rounded-md px-2 py-1 bg-secondary gap-3">
                          <span className="text-sm">Size: {item.size}</span>
                          <p className="text-sm">x {item.quantity}</p>
                        </div>
                      </section>
                    </div>
                    <TrashIcon
                      className="text-destructive cursor-pointer w-5"
                      onClick={() => cart.removeItem(item.sku)}
                    />
                  </div>
                  <Separator />
                </>
              ))}
            </div>
            <Button
              onClick={() => {
                cart.closeCart();
              }}
              variant={"secondary"}
              className="w-full mb-5"
              type="submit"
            >
              Continue Shopping
            </Button>
            <SheetFooter className="mb-20">
              <Button
                onClick={() => {
                  cart.removeAll();
                  cart.closeCart();
                }}
                variant={"outline"}
                className="border-destructive"
                type="submit"
              >
                Empty Cart
              </Button>

              <SheetClose asChild>
                <Button onClick={() => console.log("checkout")} type="submit">
                  Proceed to Checkout
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
