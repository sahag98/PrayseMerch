"use client";

import useCart from "@/hooks/use-cart";
import axios from "axios";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

import {
  CanadianProvinces,
  CountryData,
  USstates,
  unShippableCountries,
} from "@/lib/countryData";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Loading from "./Loading";
import { createShipping } from "@/app/actions";

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
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
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
    try {
      setIsCheckingOut(true);
      const { cartOrderId, types } = await createShipping({ requestBody });
      // const res = await axios.post("/api/shipping", {
      //   requestBody,
      // });

      // const resp = await axios.post("/api/shippingTypes", {
      //   order_id: res.data.orderInfo.id,
      // });
      cart.setOrderId(cartOrderId);

      setShippingTypes(types);
    } catch (error) {
      console.log(error);
    }

    setIsCheckingOut(false);
    setActiveTab("checkout");
  };

  if (isCheckingOut) {
    return <Loading text="Please wait" />;
  }

  return (
    <div className="w-full h-full flex flex-col ">
      <h2 className="mb-10 font-bold text-lg">Shipping Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-grow"
        >
          <div className="flex flex-col gap-2 ">
            <section className="flex items-center mb-2  lg:flex-row flex-col w-full gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="First Name"
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
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section className="flex items-center mb-2 lg:flex-row flex-col w-full gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Phone Number"
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
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Email"
                        {...field}
                      />
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
                <FormItem className="w-full mb-2">
                  {/* <FormLabel>Street Address*</FormLabel> */}
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Street Address"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Apartment/Floor Number (If Applicable)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex lg:flex-row mt-1 flex-col w-full gap-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-0 mb-0 gap-1 w-full">
                    <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            onClick={() => setPopoverOpen(true)}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between text-base h-12 mt-1",
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
                                  className="text-base"
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
                    <FormItem className="flex flex-col pt-0 mb-2 gap-1 w-full">
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
                                "justify-between text-base h-12 mt-1",
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
                                    className="text-base"
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
                    <FormItem className="flex flex-col pt-0 mb-2 gap-1 w-full">
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
                              placeholder="Search Province..."
                              className="h-9"
                            />
                            <CommandEmpty>No Province found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-72 w-48 rounded-md border">
                                {CanadianProvinces.map((province) => (
                                  <CommandItem
                                    className="text-base"
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
            <section className="flex items-center mt-2 lg:flex-row flex-col w-full gap-4 mb-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="City"
                        {...field}
                      />
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
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Zip Code (If Applicable)"
                        {...field}
                      />
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

          <div className="lg:mt-auto lg:my-0 my-4 space-y-2">
            <Button
              disabled={isCheckingOut}
              onClick={() => console.log("click")}
              className="w-full text-base font-bold text-white"
              type="submit"
            >
              Proceed to Checkout
            </Button>
            <Button
              disabled={isCheckingOut}
              type="button"
              onClick={() => setActiveTab("cart")}
              variant={"outline"}
              className="w-full text-base"
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
