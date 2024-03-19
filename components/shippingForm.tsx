"use client";

import useCart from "@/hooks/use-cart";
import axios from "axios";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { CartItem } from "@/app/addToCart";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import {
  CanadianProvinces,
  CountryData,
  USstates,
  unShippableCountries,
} from "@/lib/countryData";
import { CaretSortIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required." }).max(50),
  last_name: z.string().min(2, { message: "Last name is required." }).max(50),
  phone_number: z.string().min(2, { message: "Phone number is required." }),
  email: z.string().min(3, { message: "Email is required." }).max(50),
  street: z.string().min(2, { message: "Street is required." }).max(70),
  streetAnnex: z.string().optional(),
  city: z.string().min(2, { message: "City/Provice is required." }).max(30),
  state: z.string().max(2).optional(),
  country: z.string().min(1, { message: "Country is required." }).max(20),
  zipCode: z.string().optional(),
  preferredType: z.enum(["STANDARD", "PREMIUM", "EXPRESS"]),
  customerTaxType: z.enum(["SALESTAX", "VAT", "NOT_TAXABLE"]),
});

const ShippingForm = ({
  activeTab,
  setActiveTab,
  shippingTypes,
  setShippingTypes,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  shippingTypes: any[];
  setShippingTypes: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const [selectedProvice, setSelectedProvince] = useState("");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [statePopoverOpen, setStatePopoverOpen] = useState(false);
  const [provincePopoverOpen, setProvincePopoverOpen] = useState(false);
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
      streetAnnex: "",
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
    console.log(values + "");
  }

  const checkout = async (values: z.infer<typeof formSchema>) => {
    console.log("trying to checkout: ", values);
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
          streetAnnex: values.streetAnnex,
          city: values.city,
          state: values.state,
          country: selectedCountryCode,
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
    console.log("shipping info: ", requestBody);
    const res = await axios.post("/api/shipping", {
      requestBody,
    });

    const resp = await axios.post("/api/shippingTypes", {
      order_id: res.data.orderInfo.id,
    });

    cart.setOrderId(res.data.orderInfo.id);

    setShippingTypes(resp.data.shippingTypes);
    setActiveTab("checkout");
    // const response = await axios.post("/api/checkout", {
    //   products: cartProducts,
    // });
    // console.log("response from checkout: ", response);
    // cart.removeAll();

    // window.location = response.data.url;

    // setActiveTab("checkout");
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <h2 className="mb-10 font-bold ">Shipping Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-grow"
        >
          <div className="flex flex-col gap-2 ">
            <section className="flex items-center w-full gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name*</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel>Last Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section className="flex items-center w-full gap-2">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number*</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel>Email*</FormLabel>
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
                <FormItem className="w-full">
                  <FormLabel>Street Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetAnnex"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Apartment no., floor, etc. (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter apartment or floor number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex items-center w-full gap-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2 gap-1 w-full">
                    <FormLabel>Country*</FormLabel>
                    <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            onClick={() => setPopoverOpen(true)}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between h-10 mt-1",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? CountryData.find(
                                  (country) => country.name === field.value
                                )?.name
                              : "Select Country"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full  p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Country..."
                            className="h-9"
                          />
                          <CommandEmpty>No Country found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-72 w-48 rounded-md border">
                              {CountryData.map((country) => (
                                <CommandItem
                                  value={country.name}
                                  key={country.id}
                                  onSelect={() => {
                                    form.setValue("country", country.name);
                                    setSelectedCountry(country.name);
                                    setSelectedCountryCode(country.code);
                                    setPopoverOpen(false);
                                  }}
                                >
                                  {country.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      country.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedCountry === "United States" && (
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2 gap-1 w-full">
                      <FormLabel>State*</FormLabel>
                      <Popover
                        onOpenChange={setStatePopoverOpen}
                        open={statePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              onClick={() => setStatePopoverOpen(true)}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between h-10 mt-1",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? USstates.find(
                                    (state) => state.code === field.value
                                  )?.name
                                : "Select State"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search State..."
                              className="h-9"
                            />
                            <CommandEmpty>No State found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-72 w-48 rounded-md border">
                                {USstates.map((state) => (
                                  <CommandItem
                                    value={state.name}
                                    key={state.code}
                                    onSelect={() => {
                                      form.setValue("state", state.code);
                                      setSelectedState(state.name);
                                      setSelectedStateCode(state.code);
                                      setStatePopoverOpen(false);
                                    }}
                                  >
                                    {state.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        state.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {selectedCountry === "Canada" && (
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2 gap-1 w-full">
                      <FormLabel>Province*</FormLabel>
                      <Popover
                        onOpenChange={setProvincePopoverOpen}
                        open={provincePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              onClick={() => setProvincePopoverOpen(true)}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between h-10 mt-1",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? CanadianProvinces.find(
                                    (province) => province.code === field.value
                                  )?.name
                                : "Select Province"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search State..."
                              className="h-9"
                            />
                            <CommandEmpty>No Province found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-72 w-48 rounded-md border">
                                {CanadianProvinces.map((province) => (
                                  <CommandItem
                                    value={province.name}
                                    key={province.code}
                                    onSelect={() => {
                                      form.setValue("state", province.code);
                                      setSelectedProvince(province.name);
                                      setSelectedProvinceCode(province.code);
                                      setProvincePopoverOpen(false);
                                    }}
                                  >
                                    {province.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        province.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </section>
            <section className="flex items-center w-full gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City/Provice*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
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
          </div>
          {unShippableCountries.find(
            (country) => country == selectedCountry
          ) && (
            <div className="border-destructive flex items-center justify-betweeng gap-5 mt-5 bg-destructive/10 border p-3 rounded-md">
              <AlertTriangleIcon className="text-destructive" />
              <span className="text-destructive text-sm">
                Our shipping provider doesn&apos;t ship to this country.
              </span>
            </div>
          )}

          <div className="mt-auto space-y-2">
            <Button
              disabled={true}
              onClick={() => console.log("click")}
              className="w-full"
              type="submit"
            >
              Proceed to checkout
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("cart")}
              variant={"outline"}
              className="w-full"
            >
              Go Back to Cart
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
