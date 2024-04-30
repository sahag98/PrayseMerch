import { ChevronDown } from "lucide-react";
import OurProducts from "./our-products";

import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Newsletter from "@/components/Newsletter";
import Connect from "@/components/Connect";
import Reviews from "@/components/reviews";

export default async function Home() {
  async function fetchAllProducts() {
    "use server";
    const res = await fetch("https://rest.spod.com/articles", {
      method: "GET",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
      cache: "no-store",
    });

    const products = await res.json();

    return products;
  }
  const products = await fetchAllProducts();

  return (
    <main className="flex flex-col bg-background overflow-hidden min-h-screen items-center justify-center lg:px-28 md:px-20 px-4">
      <Hero />

      <Reviews />
      <OurProducts products={products} />
      <Mission />
      <Connect />
      <Newsletter />
    </main>
  );
}
