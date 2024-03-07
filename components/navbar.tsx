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
import Cart from "./cart";

const Navbar = () => {
  return (
    <div className="flex fixed top-0 w-full bg-secondary z-10 border-b items-center py-1 justify-between  lg:px-28 px-4">
      <Link className="flex  items-center gap-3" href={"/"}>
        <Image
          className="w-16 "
          src={"/prayseLogo.png"}
          width={500}
          height={500}
          alt="Prayse Logo"
        />
        <span className="font-bold text-lg">Prayse</span>
      </Link>
      <Cart />
    </div>
  );
};

export default Navbar;
