"use client";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Item } from "@/app/popular-products";
import { ShoppingCart } from "lucide-react";
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "@/app/addToCart";
import { Link } from "next-view-transitions";

const AddToCart = ({ item }: { item: Item }) => {
  const cart = useCart();
  const router = useRouter();
  const handleClick = (event: any) => {
    addToCart(); // Calls the addToCart function
  };

  async function addToCart() {
    const customerPrice = {
      amount: item.variants[0].d2cPrice,
    };

    // 2862612;

    const CartItem: CartItem = {
      id: uuidv4(),
      articleId: item.id,
      name: item.title,
      size:
        item.id === 3041663 ||
        item.id === 3041661 ||
        item.id === 3025621 ||
        item.id === 3046955 ||
        item.id === 2862612 ||
        item.id === 2862594 ||
        item.id === 2862654 ||
        item.id === 2862646 ||
        item.id === 2862748 ||
        item.id === 2862752 ||
        item.id === 2862757
          ? item.variants[0].sizeName
          : item.variants[1].sizeName,
      image: item.images[0].imageUrl,
      sku:
        item.id === 3041663 ||
        item.id === 3041661 ||
        item.id === 3025621 ||
        item.id === 3046955 ||
        item.id === 2862612 ||
        item.id === 2862594 ||
        item.id === 2862654 ||
        item.id === 2862646 ||
        item.id === 2862748 ||
        item.id === 2862752 ||
        item.id === 2862757
          ? item.variants[0].deprecatedSku
          : item.variants[1].deprecatedSku,
      quantity: 1,
      customerPrice,
    };

    cart.addItem(CartItem);
    cart.openCart();
  }
  return (
    <section className="flex items-center gap-3">
      {item.id === 2862594 ? (
        <Link href={`/product/cap/${item.id}`}>
          <Button
            className="font-bold w-13 h-11 text-base sm:flex flex"
            variant={"secondary"}
          >
            View
          </Button>
        </Link>
      ) : item.id === 2862646 || item.id === 2862654 || item.id === 2862748 ? (
        <Link href={`/product/bag/${item.id}`}>
          <Button
            className=" font-bold w-13 h-11 text-base sm:flex flex"
            variant={"secondary"}
          >
            View
          </Button>
        </Link>
      ) : item.id === 2862752 || item.id === 2862757 ? (
        <Link href={`/product/more/${item.id}`}>
          <Button
            className=" font-bold w-13 h-11 text-base sm:flex flex"
            variant={"secondary"}
          >
            View
          </Button>
        </Link>
      ) : (
        <Link href={`/product/${item.id}`}>
          <Button
            className=" font-bold w-13 h-11 text-base sm:flex flex"
            variant={"secondary"}
          >
            View
          </Button>
        </Link>
      )}
      <Button size={"icon"} className="w-11 h-11" onClick={handleClick}>
        <ShoppingCart className="text-white" />
      </Button>
    </section>
  );
};

export default AddToCart;
