"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import useCart from "@/hooks/use-cart";
import { Menu, X } from "lucide-react";
import { Link } from "next-view-transitions";

const MobileNav = () => {
  const cart = useCart();
  const isNavOpen = useCart((state) => state.isNavOpen);
  return (
    <Sheet open={isNavOpen} onOpenChange={cart.closeNav}>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>

      <SheetContent className="w-4/5 flex items-center flex-col">
        {/* <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader> */}
        <SheetClose className="absolute right-5 top-5">
          <X className="h-8 w-8" />
        </SheetClose>
        <ul className="flex flex-col flex-1 items-center justify-center gap-32">
          <Link
            onClick={cart.closeNav}
            className="text-xl text-primary font-bold"
            href={"/"}
          >
            Home
          </Link>

          <Link
            onClick={cart.closeNav}
            className="text-xl text-primary font-bold"
            href={"/products"}
          >
            Products
          </Link>

          <Link
            onClick={cart.closeNav}
            className="text-xl text-primary font-bold"
            href={"/#mission"}
          >
            Mission
          </Link>
          {/* <Link className="text-xl font-bold" href={"/products"}>
            All Products
          </Link> */}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
