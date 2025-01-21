import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Item } from "@/app/popular-products";
import HeroGrid from "./hero-grid";

const Hero = ({ products }: { products: { items: [] } }) => {
  const pbrHoodie = products.items.find(
    (product: Item) => product.id === 3073661
  );
  const pbrCrewneck = products.items.find(
    (product: Item) => product.id === 3092580
  );
  return (
    <div className="flex w-full md:flex-row flex-col lg:px-28 py-20 md:px-20 px-4 md:gap-5 gap-6 md:h-screen min-h-screen lg:items-center items-start mt-0 lg:mt-0 relative lg:justify-between">
      <div className="relative rounded-xl overflow-hidden h-full p-4 items-center flex md:flex-[0.7] w-full">
        <div className="absolute inset-0 w-full h-full bg-black/15 z-10" />
        <Image
          alt="Hero banner"
          className="absolute sm:flex hidden inset-0 object-top w-full h-full object-cover"
          src={
            "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDeuMnBuftC7FyLrK1gWdXOTJzBlUVosYu6cxb4"
          }
          fill
        />
        <Image
          alt="Hero banner"
          className="absolute sm:hidden flex inset-0 object-top w-full h-full object-cover"
          src={
            "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDeuMnBuftC7FyLrK1gWdXOTJzBlUVosYu6cxb4"
          }
          width={600}
          height={600}
        />
        <section className="flex z-20 md:self-center md:mb-0 mb-0 self-end flex-col">
          <h1
            id="stagger"
            className="lg:text-7xl z-10 flex flex-col text-background text-6xl font-bold "
          >
            <span>Pray</span>
            <span>Believe</span>
            <span>Receive</span>
          </h1>
          <p className=" text-background text-xl" id="stagger">
            Hoodie and crewneck available now.
          </p>
          {/* <Link className="mt-3 w-fit" href="/products?filter=hoodies">
            <Button
              id="stagger"
              className=" w-full uppercase animate-buttonheartbeat  text-lg text-white bg-primary font-bold"
            >
              Shop Now
            </Button>
          </Link> */}
        </section>
      </div>
      <HeroGrid pbrHoodie={pbrHoodie!} pbrCrewNeck={pbrCrewneck!} />
    </div>
  );
};

export default Hero;
