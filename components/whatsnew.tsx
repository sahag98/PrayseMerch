"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Import the carousel component
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
const WhatsNew = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const images = [
    "/new/pfy-blue-black.png",
    "/new/pfy-blue-front.png",
    "/new/pfy-black-back.png",
    "/new/pfy-black-front.png",
  ]; // Add your image paths

  return (
    <div className="lg:px-28 md:px-20 px-4 w-full py-10">
      <div className="bg-secondary [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] p-5 rounded-lg flex md:flex-row flex-col-reverse items-center md:justify-between justify-center">
        <section className="md:w-1/2">
          <h2 className="font-bold mb-4 text-primary md:text-5xl text-4xl">
            What&apos;s new
          </h2>
          <p className="text-lg">
            This t-shirt brings an opportunity to pray for those we often forget
            in our busy lives. Our coworkers, neighbors, leaders, and everyone
            in between.
          </p>
          <p className="italic mt-4 text-sm md:text-base">
            &ldquo;Confess your faults one to another, and pray one for another,
            that ye may be healed. The effectual fervent prayer of a righteous
            man availeth much.&rdquo;
          </p>
          <p className="italic">- James 5:16</p>
          <button className="text-base  bg-primary flex items-center justify-between rounded-lg overflow-hidden font-bold mt-4">
            <section className="bg-background p-3 flex items-center justify-center">
              <ShoppingCart />
            </section>
            <section className="p-3 w-3/4 text-primary-foreground font-bold">
              $ 25.99
            </section>
          </button>
        </section>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
          }}
          className="md:w-2/5 w-full"
        >
          <CarouselContent className="border-none">
            {images.map((image, index) => (
              <CarouselItem key={index} className="border-none">
                <Card className="bg-secondary border-none">
                  <CardContent className="flex flex-col p-5 gap-2">
                    <Image
                      src={image}
                      alt={image}
                      width={800}
                      height={800}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default WhatsNew;
