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
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Variant } from "@/components/Product";

import useCart from "@/hooks/use-cart";

import { useToast } from "@/components/ui/use-toast";
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
  size: z.enum(["S", "M", "L", "XL", "2XL"], {
    required_error: "You need to select a size.",
  }),
});

const AddToCart = ({ singleProduct }: { singleProduct: Item }) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);
  const [stockAmount, setStockAmount] = useState(
    singleProduct.variants[1].stock
  );
  const cart = useCart();
  const { toast } = useToast();
  console.log("stock amount: ", stockAmount);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "M",
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

      setQuantity(0);
    }
  }

  const onRadioChange = (value: any) => {
    singleProduct.variants.map((variant) => {
      if (variant.sizeName === value) {
        setStockAmount(variant.stock);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl  font-bold">{singleProduct.title}</h1>

        <p className="w-full lg:w-2/3 dark:text-gray-400">
          {parse(singleProduct.description)}
        </p>
        <section className="flex items-center justify-between lg:justify-normal gap-2">
          <span className="text-2xl font-medium text-primary">
            ${singleProduct.variants[0].d2cPrice}
          </span>
          {stockAmount == 0 ? (
            <span className="underline underline-offset-2">
              Out of Stock. Check back later
            </span>
          ) : (
            <span className="underline underline-offset-2">
              Available in Stock: {stockAmount}
            </span>
          )}
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Size:</FormLabel>
                  <div className="flex items-center gap-5">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center  gap-3"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl onClick={() => onRadioChange("S")}>
                            <RadioGroupItem value="S" />
                          </FormControl>
                          <FormLabel className="font-normal">S</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl onClick={() => onRadioChange("M")}>
                            <RadioGroupItem value="M" />
                          </FormControl>
                          <FormLabel className="font-normal">M</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl onClick={() => onRadioChange("L")}>
                            <RadioGroupItem value="L" />
                          </FormControl>
                          <FormLabel className="font-normal">L</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl onClick={() => onRadioChange("XL")}>
                            <RadioGroupItem value="XL" />
                          </FormControl>
                          <FormLabel className="font-normal">XL</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl onClick={() => onRadioChange("2XL")}>
                            <RadioGroupItem value="2XL" />
                          </FormControl>
                          <FormLabel className="font-normal">2XL</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-1">
              <p className="font-semibold">Quantity:</p>
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

            <Button
              disabled={stockAmount == 0 ? true : false}
              className="lg:w-44 gap-3 text-base font-bold md:w-52 w-full"
              type="submit"
            >
              Add To Cart
              <ShoppingCart />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddToCart;
