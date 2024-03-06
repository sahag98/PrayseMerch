"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import parse from "html-react-parser";
import { Item } from "./our-products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { Variant } from "@/components/Product";
// import { useCart } from "@/components/cart-provider";
import useCart from "@/hooks/use-cart";
export type CartItem = {
  name: string;
  size: string;
  sku: number;
  image: string;
  quantity: number;
  customerPrice: {};
};

const formSchema = z.object({
  size: z.enum(["S", "M", "L", "XL"], {
    required_error: "You need to select a size.",
  }),
});

const AddToCart = ({ singleProduct }: { singleProduct: Item }) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);
  const cart = useCart();
  // const { addToCart } = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "M",

      // sku: "",
    },
  });

  async function checkSkuMatch(formValues: z.infer<typeof formSchema>) {
    let sku;
    singleProduct.variants.map((variant: Variant) => {
      // console.log(variant.sizeName, formValues.size);
      if (variant.sizeName == formValues.size) {
        console.log(variant.sizeName, formValues.size, variant.deprecatedSku);
        sku = variant.deprecatedSku;
      }
    });

    return sku;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        amount: singleProduct.variants[0].d2cPrice * quantity,
      };

      const CartItem: CartItem = {
        name: singleProduct.title,
        size: values.size,
        image: singleProduct.images[0].imageUrl,
        sku: correctSku,
        quantity,
        customerPrice,
      };

      cart.addItem(CartItem);
      form.resetField("size");
      setQuantity(0);

      // Do something with the form values.
      // ✅ This will be type-safe and validated.
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-bold">{singleProduct.title}</h1>

        <p>{parse(singleProduct.description)}</p>
        <span className="text-2xl text-primary">
          ${singleProduct.variants[0].d2cPrice}
        </span>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose A Size:</FormLabel>
                  <div className="flex items-center gap-5">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center  gap-3"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="S" />
                          </FormControl>
                          <FormLabel className="font-normal">S</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="M" />
                          </FormControl>
                          <FormLabel className="font-normal">M</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="L" />
                          </FormControl>
                          <FormLabel className="font-normal">L</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="XL" />
                          </FormControl>
                          <FormLabel className="font-normal">XL</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <p>Quantity</p>
              <section className="flex items-center gap-3">
                <FormControl
                  onClick={() => {
                    if (quantity == 0) {
                      return;
                    }

                    setQuantity(quantity - 1);
                  }}
                  className="cursor-pointer rounded-full"
                >
                  <Minus />
                </FormControl>
                <div className="border flex items-center justify-center w-10 h-10">
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
                  <Plus />
                </FormControl>
              </section>
              {quantityErrorMsg && (
                <span className="text-sm text-red-600">
                  Quantity must be more than zero.
                </span>
              )}
            </div>

            <Button className="w-44" type="submit">
              Add To Cart
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddToCart;
