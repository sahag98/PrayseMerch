import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import parse from "html-react-parser";

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
  console.log(products);
  return (
    <main className="flex flex-col bg-[#f2f7ff] min-h-screen items-center px-28">
      <section className="flex justify-center">
        <div className="flex relative h-screen items-center justify-between">
          <section>
            <h1 className="text-6xl font-bold ">Prayse Merch</h1>
            <p>Our limited time merch!</p>
            <Button className="w-1/2 mt-3 bg-[#4C5270] font-bold">
              Shop Now!
            </Button>
          </section>
          <section className="bg-secondary w-3/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-8 rounded-lg flex items-center">
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
        <ChevronDown
          color="#4C5270"
          className="absolute w-9 h-9 bottom-7 animate-pulse"
        />
      </section>
      <section>
        <h2 className="text-3xl font-semibold">Our Products</h2>

        {products.items.map((item: any) => (
          <div className="border" key={item.id}>
            <h3>{item.title}</h3>
            <p>{parse(item.description)}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
