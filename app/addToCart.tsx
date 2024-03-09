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
import { ToastDemo } from "@/components/toast";
import { useToast } from "@/components/ui/use-toast";
export type CartItem = {
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
  size: z.enum(["S", "M", "L", "XL"], {
    required_error: "You need to select a size.",
  }),
});

const AddToCart = ({ singleProduct }: { singleProduct: Item }) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);
  const [stockAmount, setStockAmount] = useState();
  const cart = useCart();
  const { toast } = useToast();

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
      // toast({
      //   title: "Item Added to Cart",
      // });
      cart.addItem(CartItem);
      cart.openCart();

      setQuantity(0);
      // toast({
      //   title: "Item Added.",
      //   description:"Item Added.",
      // })}
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
    }
  }

  const onRadioChange = (value: any) => {
    singleProduct.variants.map((variant) => {
      if (variant.sizeName === value) {
        console.log("correct size: ", variant.sizeName + value);
        setStockAmount(variant.stock);
      }
    });
    console.log("variants: ", singleProduct.variants);
    // console.log("size: ", value);
  };

  return (
    <div>
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl font-bold">{singleProduct.title}</h1>

        <p className="w-full lg:w-2/3">{parse(singleProduct.description)}</p>
        <section className="flex items-center justify-between lg:justify-normal gap-2">
          <span className="text-2xl font-medium text-primary">
            ${singleProduct.variants[0].d2cPrice}
          </span>
          <span className="underline underline-offset-2">
            Available in Stock:{" "}
            {stockAmount ? stockAmount : singleProduct.variants[1].stock}
          </span>
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Choose A Size:
                  </FormLabel>
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

            <Button className="lg:w-44 md:w-52 w-full" type="submit">
              Add To Cart
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddToCart;
