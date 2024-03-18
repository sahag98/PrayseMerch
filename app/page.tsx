import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Canvas from "../canvas";
import OurProducts from "./our-products";

import Hero from "@/components/Hero";

export default async function Home() {
  const res = await fetch("https://rest.spod.com/articles", {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const products = await res.json();

  return (
    <main className="flex flex-col bg-background overflow-hidden min-h-screen items-center justify-center lg:px-36 px-4">
      <section className="flex w-full  justify-center">
        <Hero />
        {/* <ChevronDown className="absolute text-primary w-8 h-8 bottom-2 animate-pulse" /> */}
      </section>
      {/* <OurProducts products={products} /> */}
    </main>
  );
}
