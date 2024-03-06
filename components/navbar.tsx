"use client";

import { ShoppingBasket, ShoppingCart, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import useCart from "@/hooks/use-cart";
import { CartItem } from "@/app/addToCart";
import Image from "next/image";

const Navbar = () => {
  const cart = useCart();
  return (
    <div className="flex fixed top-0 w-full bg-secondary z-10 border-b items-center py-5 justify-between  lg:px-28 px-4">
      <Link href={"/"}>Prayse</Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="px-0 py-0" variant={"ghost"}>
            <div className="relative p-2 ">
              <div className="absolute bg-primary p-1 w-5 h-5 flex items-center justify-center rounded-full text-background right-0 top-0">
                <span className="">{cart.items.length}</span>
              </div>
              <ShoppingCart />
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-xl">Cart</SheetTitle>
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
                  <div
                    className="flex relative items-center gap-2 justify-between"
                    key={index}
                  >
                    <Image
                      src={item.image}
                      width={1000}
                      height={1000}
                      className="w-14 lg:w-36 border rounded-lg"
                      alt={item.image}
                    />
                    <section>
                      <p className="text-sm">{item.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">Size: {item.size}</span>
                        <p className="text-sm">x {item.quantity}</p>
                      </div>
                    </section>
                    <TrashIcon
                      className="text-destructive w-5"
                      onClick={() => cart.removeItem(item.sku)}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Proceed to Checkout</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
