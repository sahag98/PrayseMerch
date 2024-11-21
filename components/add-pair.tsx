"use client";
import { CartItem } from "@/app/addToCart";
import { Item } from "@/app/popular-products";
import useCart from "@/hooks/use-cart";
import React from "react";
//@ts-expect-error
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";

const AddPair = ({ item }: { item: Item }) => {
  const cart = useCart();

  async function addToCart() {
    console.log("item to add: ", item);
    // const correctSku = await checkSkuMatch(values);

    // if (!correctSku) {
    //   return;
    // }

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
    <Button className="text-base font-bold" onClick={addToCart}>
      ADD
    </Button>
  );
};

export default AddPair;
