"use client";
import { Item } from "@/app/our-products";
import Image from "next/image";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from "uuid";
import useCart from "@/hooks/use-cart";
import { CartItem } from "@/app/addToCart";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export type Variant = {
  id: number;
  productTypeId: number;
  productTypeName: string;
  productId: number;
  appearanceId: number;
  appearanceName: string;
  appearanceColorValue: string;
  sizeId: number;
  sizeName: string;
  sku: string;
  deprecatedSku: string;
  d2cPrice: number;
  imageIds: any[];
  stock: number;
};

const Product = ({ item }: { item: Item }) => {
  const itemImage =
    item.id === 2862748 ? item.images[0] : item.images[1] ?? item.images[0];
  const cart = useCart();
  const viewProductRef = useRef(null);
  const [isMouseHovering, setIsMouseHovering] = useState("");
  const variants = item.variants;
  const router = useRouter();
  const handleClick = (event: any) => {
    addToCart(); // Calls the addToCart function
  };

  const handleMouseEnter = () => {
    gsap.to(viewProductRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(viewProductRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  async function addToCart() {
    const id = uuidv4();
    console.log("item to add: ", item);
    // const correctSku = await checkSkuMatch(values);

    // if (!correctSku) {
    //   return;
    // }

    const customerPrice = {
      amount: item.variants[0].d2cPrice,
    };

    const CartItem: CartItem = {
      id: uuidv4(),
      articleId: item.id,
      name: item.title,
      size:
        item.id === 2862612 ||
        item.id === 2862594 ||
        item.id === 2862654 ||
        item.id === 2862646 ||
        item.id === 2862748 ||
        item.id === 2862752
          ? item.variants[0].sizeName
          : item.variants[1].sizeName,
      image: item.images[0].imageUrl,
      sku:
        item.id === 2862612 ||
        item.id === 2862594 ||
        item.id === 2862654 ||
        item.id === 2862646 ||
        item.id === 2862748 ||
        item.id === 2862752
          ? item.variants[0].deprecatedSku
          : item.variants[1].deprecatedSku,
      quantity: 1,
      customerPrice,
    };

    cart.addItem(CartItem);
    cart.openCart();
  }
  return (
    <div className="">
      <div
        className="flex relative flex-col bg-[#EBEBEB] dark:bg-accent rounded-lg justify-center overflow-hidden duration-500 transition-all"
        key={item.id}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center justify-center"
        >
          <Image
            src={itemImage.imageUrl}
            className=""
            width={500}
            height={500}
            alt={`Prayse ${itemImage.appearanceName} Shirt`}
          />
          <div
            ref={viewProductRef}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0"
          >
            {item.id === 2862594 ? (
              <Button
                variant={"outline"}
                className="font-bold text-accent-foreground"
                onClick={() => router.push(`/product/cap/${item.id}`)}
              >
                View
              </Button>
            ) : item.id === 2862646 ||
              item.id === 2862654 ||
              item.id === 2862748 ? (
              <Button
                variant={"outline"}
                className="font-bold text-accent-foreground"
                onClick={() => router.push(`/product/bag/${item.id}`)}
              >
                View
              </Button>
            ) : item.id === 2862752 || item.id === 2862757 ? (
              <Button
                variant={"outline"}
                className="font-bold text-accent-foreground"
                onClick={() => router.push(`/product/more/${item.id}`)}
              >
                View
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className="font-bold text-accent-foreground"
                onClick={() => router.push(`/product/${item.id}`)}
              >
                View
              </Button>
            )}
            {/* <Button
              variant={"outline"}
              className="font-bold text-accent-foreground"
              onClick={() => router.push(`/product/${item.id}`)}
            >
              View
            </Button> */}
          </div>
        </div>
        <div className="bg-background flex-col flex border-t gap-1 px-4 py-2">
          <h3 className="font-semibold text-foreground text-lg">
            {item.title}
          </h3>
          <div className="flex justify-between">
            <section>
              <p className="font-normal text-accent-foreground/75">Price:</p>
              <span className="text-2xl text-primary font-semibold">
                ${item.variants[0].d2cPrice}
              </span>
            </section>
            <section className="flex items-center gap-3">
              {item.id === 2862594 ? (
                <Button
                  className="lg:hidden md:hidden font-bold text-base sm:flex flex"
                  variant={"outline"}
                  onClick={() => router.push(`/product/cap/${item.id}`)}
                >
                  View
                </Button>
              ) : item.id === 2862646 ||
                item.id === 2862654 ||
                item.id === 2862748 ? (
                <Button
                  className="lg:hidden md:hidden font-bold text-base sm:flex flex"
                  variant={"outline"}
                  onClick={() => router.push(`/product/bag/${item.id}`)}
                >
                  View
                </Button>
              ) : item.id === 2862752 || item.id === 2862757 ? (
                <Button
                  className="lg:hidden md:hidden font-bold text-base sm:flex flex"
                  variant={"outline"}
                  onClick={() => router.push(`/product/more/${item.id}`)}
                >
                  View
                </Button>
              ) : (
                <Button
                  className="lg:hidden md:hidden font-bold text-base sm:flex flex"
                  variant={"outline"}
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  View
                </Button>
              )}
              {/* <Button
                className="lg:hidden md:hidden font-bold text-base sm:flex flex"
                variant={"outline"}
                onClick={() => router.push(`/product/${item.id}`)}
              >
                View
              </Button> */}
              <Button onClick={handleClick}>
                <ShoppingCart className="text-white" />
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
