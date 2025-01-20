import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

const Hero = () => {
  return (
    <div className="flex w-full md:flex-row flex-col lg:px-28 py-20 md:px-20 px-4 md:gap-5 gap-6 md:h-screen min-h-screen lg:items-center items-start mt-0 lg:mt-0 relative lg:justify-between">
      <div className="relative rounded-xl overflow-hidden h-full p-4 items-center flex md:flex-[0.8] w-full">
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
            Hoodies available now.
          </p>
          <Link className="mt-3 w-fit" href="/products?filter=hoodies">
            <Button
              id="stagger"
              className=" w-full uppercase animate-buttonheartbeat  text-base text-white bg-primary font-bold"
            >
              Shop Now
            </Button>
          </Link>
        </section>
      </div>
      <div className="flex-[0.5] w-full  h-full flex flex-col gap-5 justify-between items-start ">
        <div className="flex md:flex-row w-full flex-col  gap-5">
          <div className="bg-[#E6E4E2] aspect-square rounded-2xl">
            <div className="flex relative flex-col dark:bg-accent justify-center overflow-hidden duration-500 transition-all">
              <div className="relative flex items-center justify-center">
                <Image
                  src={"/pbr-hoodie.png"}
                  width={300}
                  height={300}
                  alt="pbr hoodie"
                />
              </div>
            </div>
            <div className="flex-col flex border-t gap-2 px-4 py-2">
              <h3 className="font-semibold text-center text-foreground text-lg">
                PRAY BELIEVE RECEIVE
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="bg-background">
                  HOODIE
                </Badge>
                <Badge variant={"secondary"} className="bg-background">
                  UNISEX
                </Badge>
              </div>
              {/* <div className="flex items-center mt-2 mb-1 justify-between">
                <section>
                  <span className="text-xl text-primary font-semibold">
                    $40.99
                  </span>
                </section>
                <Button size={"icon"} className="w-11 h-11">
                  <ShoppingCart className="text-white" />
                </Button>
              </div> */}
            </div>
          </div>
          <div className="bg-[#E6E4E2] aspect-square rounded-2xl">
            <div className="flex relative flex-col dark:bg-accent justify-center overflow-hidden duration-500 transition-all">
              <div className="relative flex items-center justify-center">
                <Image
                  src={"/pbr-crewneck.png"}
                  width={300}
                  height={300}
                  alt="pbr hoodie"
                />
              </div>
            </div>
            <div className="flex-col flex border-t gap-2 px-4 py-2">
              <h3 className="font-semibold text-center text-foreground text-lg">
                PRAY BELIEVE RECEIVE
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="bg-background">
                  CREWNECK
                </Badge>
                <Badge variant={"secondary"} className="bg-background">
                  UNISEX
                </Badge>
              </div>
              {/* <div className="flex items-center mt-2 mb-1 justify-between">
                <section>
                  <span className="text-xl text-primary font-semibold">
                    $40.99
                  </span>
                </section>
                <Button size={"icon"} className="w-11 h-11">
                  <ShoppingCart className="text-white" />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center bg-[#E6E4E2] justify-center flex-1 rounded-2xl bg-[] w-full">
          Hoodies
        </div>
      </div>
    </div>
  );
};

export default Hero;
