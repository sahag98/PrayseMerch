"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import parse from "html-react-parser";
import { Item } from "./our-products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Variant } from "@/components/Product";

import useCart from "@/hooks/use-cart";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
export type CartItem = {
  id: number;
  articleId: number;
  name: string;
  size: string;
  sku: number;
  image: string;
  quantity: number;
  customerPrice: {
    amount: number;
  };
};

const formSchema = z.object({
  size: z.enum(
    ["S", "M", "L", "XL", "2XL", "S/M Cap", "L/XL Cap", "One Size"],
    {
      required_error: "You need to select a size.",
    }
  ),
});

const AddToCart = ({ singleProduct }: { singleProduct: Item }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);

  console.log("single product id: ", singleProduct.id);
  const [selectedSize, setSelectedSize] = useState(
    singleProduct.id === 2862594
      ? "S/M Cap"
      : singleProduct.id === 2862612 ||
        singleProduct.id === 2862646 ||
        singleProduct.id === 2862654 ||
        singleProduct.id === 2862748 ||
        singleProduct.id === 2862752 ||
        singleProduct.id === 2862757 ||
        singleProduct.id === 3041663 ||
        singleProduct.id === 3041661 ||
        singleProduct.id === 3025621 ||
        singleProduct.id === 3046955
      ? "One Size"
      : "M"
  );

  const [stockAmount, setStockAmount] = useState(
    singleProduct.id === 2862612 ||
      singleProduct.id === 2862594 ||
      singleProduct.id === 2862646 ||
      singleProduct.id === 2862654 ||
      singleProduct.id === 2862748 ||
      singleProduct.id === 2862752 ||
      singleProduct.id === 2862757 ||
      singleProduct.id === 3041663 ||
      singleProduct.id === 3041661 ||
      singleProduct.id === 3025621 ||
      singleProduct.id === 3046955
      ? singleProduct?.variants[0]?.stock
      : singleProduct?.variants[1]?.stock
  );

  console.log("stock amount: ", singleProduct);
  const cart = useCart();
  const { toast } = useToast();
  console.log("stock amount: ", stockAmount);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size:
        singleProduct.id === 2862594
          ? "S/M Cap"
          : singleProduct.id === 2862612 ||
            singleProduct.id === 2862646 ||
            singleProduct.id === 2862654 ||
            singleProduct.id === 2862748 ||
            singleProduct.id === 2862752 ||
            singleProduct.id === 2862757 ||
            singleProduct.id === 3041663 ||
            singleProduct.id === 3041661 ||
            singleProduct.id === 3025621 ||
            singleProduct.id === 3046955
          ? "One Size"
          : "M",
    },
  });

  async function checkSkuMatch(formValues: z.infer<typeof formSchema>) {
    let sku;
    singleProduct.variants.map((variant: Variant) => {
      // console.log(variant.sizeName, formValues.size);
      if (variant.sizeName == formValues.size) {
        sku = variant.deprecatedSku;
      }
    });

    return sku;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const id = uuidv4();
    console.log("id: ", id);
    if (quantity == 0) {
      setQuantityErrorMsg(true);
      return;
    } else {
      setQuantityErrorMsg(false);

      const correctSku = await checkSkuMatch(values);

      if (!correctSku) {
        return;
      }

      const customerPrice = {
        amount: singleProduct.variants[0].d2cPrice,
      };

      const CartItem: CartItem = {
        id: uuidv4(),
        articleId: singleProduct.id,
        name: singleProduct.title,
        size: values.size,
        image: singleProduct.images[0].imageUrl,
        sku: correctSku,
        quantity,
        customerPrice,
      };
      cart.addItem(CartItem);
      cart.openCart();

      setQuantity(1);
    }
  }

  const onRadioChange = (value: any) => {
    singleProduct.variants.map((variant) => {
      if (variant.sizeName === value) {
        setStockAmount(variant.stock);
      }
    });
  };

  console.log("single product: ", singleProduct.id);
  console.log("variants: ", singleProduct.variants);

  const hoodieIds = [2995762, 3045844, 2995765, 2995767];
  return (
    <div>
      <div className="flex flex-col gap-5">
        <section>
          <h1 className="text-2xl md:px-0 px-4 sm:hidden lg:flex hidden font-bold">
            {singleProduct.title}
          </h1>
          <div className="lg:flex sm:hidden hidden items-center gap-2">
            <span className="flex mb-1 gap-2">
              <Star size={15} stroke="#daa520" fill="#daa520" />
              <Star size={15} stroke="#daa520" fill="#daa520" />
              <Star size={15} stroke="#daa520" fill="#daa520" />
              <Star size={15} stroke="#daa520" fill="#daa520" />
              <Star size={15} stroke="#daa520" fill="#daa520" />
            </span>
            <Link
              href="/reviews"
              className="text-sm cursor-pointer hover:underline transition-all"
            >
              6 Reviews
            </Link>
          </div>
        </section>
        <section className="flex md:px-0 px-4 items-center border-b pb-3 justify-between lg:justify-normal gap-2">
          <span className="text-xl font-medium text-primary">
            ${singleProduct.variants[0].d2cPrice}
          </span>

          <div className="flex flex-col">
            {stockAmount == 0 ? (
              <span className="underline text-destructive underline-offset-2">
                Out of Stock. Check back later
              </span>
            ) : (
              <span className="underline underline-offset-2 text-sm text-foreground/75">
                Available in Stock: {stockAmount}
              </span>
            )}
          </div>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border-b pb-6"
          >
            {singleProduct.variants.length > 0 && (
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="md:px-0 px-4">
                    <FormLabel className="font-bold text-lg">SIZE</FormLabel>
                    <div className="flex items-center gap-5">
                      {singleProduct.id === 2862594 && (
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center  gap-3"
                          >
                            <FormItem className="flex items-center space-x-1 space-y-0">
                              <FormControl
                                className=" w-36"
                                onClick={() => {
                                  setSelectedSize("S/M Cap");
                                  onRadioChange("S/M Cap");
                                }}
                              >
                                <RadioGroupItem
                                  className={
                                    selectedSize == "S/M Cap"
                                      ? "bg-primary text-white"
                                      : ""
                                  }
                                  value="S/M Cap"
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                              <FormControl
                                className="w-36"
                                onClick={() => {
                                  setSelectedSize("L/XL Cap");
                                  onRadioChange("L/XL Cap");
                                }}
                              >
                                <RadioGroupItem
                                  className={
                                    selectedSize == "L/XL Cap"
                                      ? "bg-primary text-white"
                                      : ""
                                  }
                                  value="L/XL Cap"
                                />
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      )}
                      {(singleProduct.id === 2862612 ||
                        singleProduct.id === 2862646 ||
                        singleProduct.id === 2862654 ||
                        singleProduct.id === 2862748 ||
                        singleProduct.id === 2862752 ||
                        singleProduct.id === 2862757 ||
                        singleProduct.id === 3041663 ||
                        singleProduct.id === 3041661 ||
                        singleProduct.id === 3025621 ||
                        singleProduct.id === 3046955) && (
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center  gap-3"
                          >
                            <FormItem className="flex items-center space-x-1 space-y-0">
                              <FormControl
                                className=" w-36"
                                onClick={() => {
                                  setSelectedSize("One Size");
                                  onRadioChange("One Size");
                                }}
                              >
                                <RadioGroupItem
                                  className={
                                    selectedSize == "One Size"
                                      ? "bg-primary text-white"
                                      : ""
                                  }
                                  value="One Size"
                                />
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      )}
                      {singleProduct.id !== 2862594 &&
                        singleProduct.id !== 2862612 &&
                        singleProduct.id !== 2862654 &&
                        singleProduct.id !== 2862646 &&
                        singleProduct.id !== 2862748 &&
                        singleProduct.id !== 2862752 &&
                        singleProduct.id !== 2862757 &&
                        singleProduct.id !== 3041663 &&
                        singleProduct.id !== 3041661 &&
                        singleProduct.id !== 3025621 &&
                        singleProduct.id !== 3046955 && (
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex items-center  gap-3"
                            >
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl
                                  onClick={() => {
                                    setSelectedSize("S");
                                    onRadioChange("S");
                                  }}
                                >
                                  <RadioGroupItem
                                    className={
                                      selectedSize == "S"
                                        ? "bg-primary text-white"
                                        : ""
                                    }
                                    value="S"
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl
                                  onClick={() => {
                                    setSelectedSize("M");
                                    onRadioChange("M");
                                  }}
                                >
                                  <RadioGroupItem
                                    className={
                                      selectedSize == "M"
                                        ? "bg-primary text-white"
                                        : ""
                                    }
                                    value="M"
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl
                                  onClick={() => {
                                    setSelectedSize("L");
                                    onRadioChange("L");
                                  }}
                                >
                                  <RadioGroupItem
                                    className={
                                      selectedSize == "L"
                                        ? "bg-primary text-white"
                                        : ""
                                    }
                                    value="L"
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl
                                  onClick={() => {
                                    setSelectedSize("XL");
                                    onRadioChange("XL");
                                  }}
                                >
                                  <RadioGroupItem
                                    className={
                                      selectedSize == "XL"
                                        ? "bg-primary text-white"
                                        : ""
                                    }
                                    value="XL"
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl
                                  onClick={() => {
                                    setSelectedSize("2XL");
                                    onRadioChange("2XL");
                                  }}
                                >
                                  <RadioGroupItem
                                    className={
                                      selectedSize == "2XL"
                                        ? "bg-primary text-white"
                                        : ""
                                    }
                                    value="2XL"
                                  />
                                </FormControl>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex flex-col md:px-0 px-4 gap-1">
              <p className="font-bold text-lg">QUANTITY</p>
              <section className="flex items-center gap-2">
                <FormControl
                  onClick={() => {
                    if (quantity == 0) {
                      return;
                    }

                    setQuantity(quantity - 1);
                  }}
                  className="cursor-pointer rounded-full"
                >
                  <Minus
                    className={cn(
                      "text-primary",
                      quantity === 0 && "text-secondary"
                    )}
                  />
                </FormControl>
                <div className="border flex items-center justify-center w-12 h-12">
                  <span className="font-semibold text-lg">{quantity}</span>
                </div>

                <FormControl
                  onClick={() => {
                    if (quantity == 5) {
                      return;
                    }

                    setQuantity(quantity + 1);
                  }}
                  className="cursor-pointer rounded-full"
                >
                  <Plus className="text-primary" />
                </FormControl>
              </section>
              {quantityErrorMsg && (
                <span className="text-sm text-red-600">
                  Quantity must be more than zero.
                </span>
              )}
            </div>

            <Button
              disabled={stockAmount == 0 ? true : false}
              className="lg:w-44 fixed h-14 sm:relative bottom-0 z-10 flex items-center rounded-none justify-center gap-3 text-base text-white font-bold md:w-52 w-full"
              type="submit"
            >
              <span>ADD TO CART</span>
              <ShoppingCart className="pb-1" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddToCart;
