"use client";

import useCart from "@/hooks/use-cart";
import axios from "axios";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { CartItem } from "../addToCart";
import { TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().min(2, { message: "first name is required." }).max(50),
  last_name: z.string().min(2, { message: "last name is required." }).max(50),
  phone_number: z.string().min(2).max(20),
  email: z.string(),
  street: z.string().min(2).max(70),
  city: z.string().min(2).max(30),
  state: z.string().optional(),
  country: z.string().min(1).max(20),
  zipCode: z.string().min(2).max(8).optional(),
  preferredType: z.enum(["STANDARD", "PREMIUM", "EXPRESS"]),
  customerTaxType: z.enum(["SALESTAX", "VAT", "NOT_TAXABLE"]),
});

const ShippingPage = () => {
  const cart = useCart();
  const cartProducts = useCart((state) => state.items);
  const testTypes = [
    {
      id: 38,
      description: "Tracking provided. Saturday delivery.",
      name: "Standard",
      price: {
        amount: 4.77,
      },
    },
    {
      id: 16,
      description: "Tracking provided. Saturday delivery.",
      name: "Premium",
      price: {
        amount: 5.62,
      },
    },

    {
      id: 23,
      description:
        "Tracking provided. Delivery not available for AK, HI, PO Box and APO.",
      name: "Express",
      price: {
        amount: 4.77,
      },
    },
  ];
  const [shippingTypes, setShippingTypes] = useState(testTypes);
  const [selectedType, setSelectedType] = useState<any>({});
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      preferredType: "STANDARD",
      customerTaxType: "SALESTAX",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    console.log("trying to submit");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    checkout(values);
    console.log(values);
  }

  const checkout = async (values: z.infer<typeof formSchema>) => {
    console.log("trying to checkout");
    const id = uuidv4();
    const stringId = id.toString();
    const cartTotal = cart.calculateTotal();

    const orderItems = cartProducts.map((product) => ({
      sku: product.sku,
      quantity: product.quantity,
      customerPrice: {
        amount: product.customerPrice.amount,
        currency: "USD",
      }, // You can add more properties or modify the structure as needed
    }));
    const requestBody = {
      orderItems,
      shipping: {
        address: {
          firstName: values.first_name,
          lastName: values.last_name,
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
          zipCode: values.zipCode,
        },
        customerPrice: {
          amount: cartTotal.total,
          currency: "USD",
        },
      },
      phone: values.phone_number,
      email: values.email,
      externalOrderReference: stringId,
      customerTaxType: "SALESTAX",
    };

    const res = await axios.post("/api/shipping", {
      requestBody,
    });

    console.log("res id: ", res.data.orderInfo);

    //   const resp = await fetch("https://rest.spod.com/articles", {
    //   method: "GET",
    //   headers: {
    //     "Accept-encoding": "gzip, deflate",
    //     "Content-Type": "application/json",
    //     "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    //   },
    //   body:{
    //     id: res.data.orderInfo,
    //   }
    // });

    const resp = await axios.post("/api/shippingTypes", {
      order_id: res.data.orderInfo.id,
    });
    console.log("shipping types: ", JSON.stringify(resp.data.shippingTypes));
    setShippingTypes(resp.data.shippingTypes);
    // const response = await axios.post("/api/checkout", {
    //   products: cartProducts,
    // });
    // console.log("response from checkout: ", response);
    // cart.removeAll();

    // window.location = response.data.url;
  };

  console.log(selectedType.price?.amount);

  return (
    <div className="lg:px-24 px-4 mt-28 lg:mt-36 md:mt-24">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Cart Items ({cartProducts.length})
          </AccordionTrigger>
          <AccordionContent>
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
                <div className="grid gap-4  py-4">
                  {cartProducts.map((item: CartItem, index: number) => (
                    <div key={item.id}>
                      <div className="flex relative items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image}
                            width={1000}
                            height={1000}
                            className="w-14 lg:w-20 border rounded-lg"
                            alt={item.image}
                          />
                          <section className="space-y-1">
                            <p className="text-sm">{item.name}</p>
                            <div className="flex items-center w-fit text-secondary-foreground rounded-md px-2 py-1 bg-secondary gap-3">
                              <span className="text-sm">Size: {item.size}</span>
                              <p className="text-sm">x {item.quantity}</p>
                            </div>
                          </section>
                        </div>
                        <TrashIcon
                          className="text-destructive cursor-pointer w-5"
                          onClick={() => cart.removeItem(item.sku)}
                        />
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
                <section className="flex items-end gap-0 mb-5 flex-col">
                  <div className="flex flex-col items-center justify-end">
                    <div className="flex gap-5">
                      <span className="">Subtotal:</span>
                      <span className="font-bold">
                        ${cart.calculateTotal().subTotal}
                      </span>
                    </div>
                    <div className="flex gap-5 ">
                      <span className="text-left">Sales Tax:</span>
                      <span className="text-right font-bold">
                        ${cart.calculateTotal().salesTaxNum}
                      </span>
                    </div>
                    <div className="flex items-end gap-5">
                      <span className="text-lg">Total:</span>
                      <span className="text-2xl font-bold">
                        ${cart.calculateTotal().total}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium">+ plus Shipping</span>
                </section>
                {/* <Button
              onClick={() => {
                cart.closeCart();
              }}
              variant={"secondary"}
              className="w-full mb-5"
              type="submit"
            >
              Continue Shopping
            </Button> */}
              </>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-destructive">
            Shipping Information (Required)
          </AccordionTrigger>
          <AccordionContent>
            {shippingTypes.length > 0 ? (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Shipping Types:</h2>
                <div className="flex lg:flex-row flex-col gap-5">
                  {shippingTypes.map((type: any) => (
                    <div
                      onClick={() => setSelectedType(type)}
                      className="border hover:cursor-pointer hover:bg-gray-100 transition-colors px-3 py-2 flex flex-col gap-1 rounded-md"
                      key={type.id}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{type.name}</span>
                        <span>{type.description}</span>
                      </div>
                      <span className="text-primary text-lg">
                        ${type.price.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 lg:w-1/2 w-full"
                >
                  <section className="flex items-center w-full gap-5">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                  <section className="flex items-center w-full gap-5">
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter street address"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <section className="flex items-center w-full gap-5">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                  <section className="flex items-center w-full gap-5">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ZipCode</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter zip code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                  <Button disabled className="w-full" type="submit">
                    Check Available Shipping Types
                  </Button>
                </form>
              </Form>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Total</AccordionTrigger>
          <AccordionContent>
            <section className="flex items-end gap-0 mb-5 flex-col">
              <div className="flex flex-col items-center justify-end">
                <div className="flex gap-5">
                  <span className="">Subtotal:</span>
                  <span className="font-bold">
                    ${cart.calculateTotal().subTotal}
                  </span>
                </div>
                <div className="flex gap-5 ">
                  <span className="text-left">Sales Tax:</span>
                  <span className="text-right font-bold">
                    ${cart.calculateTotal().salesTaxNum}
                  </span>
                </div>
                {selectedType && (
                  <div className="flex gap-5 ">
                    <span className="text-left">
                      Shipping Type: {selectedType.name}
                    </span>
                    <span className="text-left">
                      ${selectedType.price?.amount}
                    </span>
                    <span className="text-right font-bold"></span>
                  </div>
                )}

                <div className="flex items-end gap-5">
                  <span className="text-lg">Total:</span>
                  <span className="text-2xl font-bold">
                    ${cart.calculateTotal().total}
                  </span>
                </div>
              </div>
              <span className="font-medium">+ plus Shipping</span>
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZipCode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter zip code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
    </div>
  );
};

export default ShippingPage;
