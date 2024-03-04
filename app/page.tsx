import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import OurProducts from "./our-products";

export default async function Home() {
  const res = await fetch("https://rest.spod.com/articles", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const products = await res.json();
  console.log("products: ", products);
  return (
    <main className="flex flex-col bg-[#f2f7ff] min-h-screen items-center lg:px-28 px-4">
      <section className="flex justify-center">
        <div className="flex lg:flex-row flex-col lg:gap-0 gap-6 h-screen justify-center mt-10 lg:mt-0 relative items-center lg:justify-between">
          <section>
            <h1 className="lg:text-6xl text-5xl font-bold ">Prayse Merch</h1>
            <p>Our limited time merch!</p>
            <Button className="w-1/2 mt-3 bg-primary font-bold">
              Shop Now!
            </Button>
          </section>
          <section className="bg-secondary w-full lg:w-3/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-8 rounded-lg flex items-center">
            <Image
              src={"/prayse-white-shirt.png"}
              width={1000}
              height={1000}
              className="w-1/2"
              alt="prayse white shirt"
            />
            <Image
              src={"/prayse-black-shirt.png"}
              width={1000}
              height={1000}
              className="w-1/2"
              alt="prayse black shirt"
            />
          </section>
        </div>

        <ChevronDown className="absolute text-primary w-9 h-9 bottom-7 animate-pulse" />
      </section>
      <OurProducts products={products} />
    </main>
  );
}
