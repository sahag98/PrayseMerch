"use client";

import { Item } from "@/app/popular-products";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

const HeroGrid = ({
  pbrHoodie,
  pbrCrewNeck,
}: {
  pbrHoodie: Item;
  pbrCrewNeck: Item;
}) => {
  return (
    <div className="flex-[0.6] w-full  h-full flex flex-col gap-5 justify-between items-start ">
      <div className="flex md:flex-row w-full flex-col  gap-5">
        <Link
          href={`/product/${pbrHoodie.id}`}
          className="bg-primary flex flex-col justify-between aspect-square rounded-2xl"
        >
          <section className="flex relative flex-col dark:bg-accent justify-center overflow-hidden duration-500 transition-all">
            <div className="relative flex items-center justify-center">
              <Image
                src={
                  "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDerzzuOTeSM3iqWkay8fmupEwKOGQBzP6nvrCs"
                }
                width={300}
                height={300}
                className="w-full"
                alt="pbr hoodie"
              />
            </div>
          </section>
          <section className="flex-col flex  gap-2 px-4 py-2">
            <h2 className="font-semibold text-background text-center text-lg">
              PRAY BELIEVE RECEIVE HOODIE | UNISEX
            </h2>
            {/* <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="bg-background">
                  HOODIE
                </Badge>
                <Badge variant={"secondary"} className="bg-background">
                  UNISEX
                </Badge>
              </div> */}
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
          </section>
        </Link>
        <Link
          href={`/product/${pbrCrewNeck.id}`}
          className="bg-primary flex flex-col justify-between aspect-square rounded-2xl"
        >
          <section className="flex relative flex-col dark:bg-accent justify-center overflow-hidden duration-500 transition-all">
            <div className="relative flex items-center justify-center">
              <Image
                src={
                  "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDepzQSKFGLdQU6DWeytEBnoMG5SxJHlCPgmjA2"
                }
                width={300}
                height={300}
                alt="pbr hoodie"
                className="w-full"
              />
            </div>
          </section>
          <section className="flex-col flex  gap-2 px-4 py-2">
            <h2 className="font-semibold text-center text-background text-lg">
              PRAY BELIEVE RECEIVE CREWNECK | UNISEX
            </h2>
            {/* <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="bg-background">
                  CREWNECK
                </Badge>
                <Badge variant={"secondary"} className="bg-background">
                  UNISEX
                </Badge>
              </div> */}
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
          </section>
        </Link>
      </div>
      <Link
        href={"/products"}
        className="flex relative overflow-hidden items-center bg-[#E6E4E2] justify-center md:aspect-auto aspect-square flex-1 rounded-2xl w-full"
      >
        <div className="absolute inset-0 w-full h-full bg-black/15 z-10" />
        <Image
          alt="Hero banner"
          className="absolute sm:flex inset-0 object-top w-full h-full object-cover"
          src={
            "https://utfs.io/f/aZ7NTMjk7uDevTIzwqH8hCDjkHqOMPcr1ogNJ2Ksyl5zxXfb"
          }
          fill
        />
        <h3 className="font-bold z-20 self-end text-background md:text-4xl text-3xl p-3">
          Browse All Products
        </h3>
      </Link>
    </div>
  );
};

export default HeroGrid;
