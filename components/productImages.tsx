"use client";

import { Item } from "@/app/our-products";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Circle } from "lucide-react";

const ProductImages = ({ singleProduct }: { singleProduct: Item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const singleProductImg = singleProduct.images[0].imageUrl;

  const [selectedImg, setSelectedImg] = useState(singleProductImg);
  const [isViewingMoreImgs, setIsViewingMoreImgs] = useState(false);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="flex flex-col items-center">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {singleProduct.images.map((images, index) => (
            <CarouselItem
              className="relative flex items-center justify-center"
              key={index}
            >
              <Image
                alt="image"
                loading="eager"
                className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/35 via-background to-background"
                src={images.imageUrl}
                width={1000}
                height={1000}
              />
              {/* {singleProduct.images.map((images, index) => (
                <Circle key={index} fill="red" className="bg-red-300" />
              ))} */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="pt-2 text-center text-muted-foreground">
        Image {current} of {count}
      </div>
      {/* <Image
        alt="image"
        className="lg:w-full object-contain bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/35 via-background to-background p-5 lg:mb-0 mb-2 z-20 md:w-1/2 w-full"
        src={selectedImg}
        width={1000}
        height={1000}
      /> */}
      {/* <p
        onClick={() => setIsViewingMoreImgs(!isViewingMoreImgs)}
        className="lg:hidden text-primary self-end underline underline-offset-4 text-sm  md:hidden flex items-center justify-center mt-1"
      >
        {isViewingMoreImgs ? "Less" : "More"} Images
      </p>
      <Button
        onClick={() => setIsViewingMoreImgs(!isViewingMoreImgs)}
        variant={"link"}
        className="lg:hidden bg-red-300 m-0 p-0 md:hidden flex"
      ></Button> */}
      {/* {singleProduct.id === 2803251 && isViewingMoreImgs && (
        <section className="flex lg:hidden md:hidden items-center gap-3">
          <Image
            onClick={() => {
              if (selectedImg == img1) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img2) {
                setSelectedImg(img1);
              } else {
                setSelectedImg(img1);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img2
                ? singleProductImg
                : img1
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
          <Image
            onClick={() => {
              if (selectedImg == img2) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img1) {
                setSelectedImg(img2);
              } else {
                setSelectedImg(img2);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img1
                ? singleProductImg
                : img2
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
        </section>
      )}
      {singleProduct.id === 2803251 && (
        <section className="lg:flex md:flex hidden items-center gap-3">
          <Image
            onClick={() => {
              if (selectedImg == img1) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img2) {
                setSelectedImg(img1);
              } else {
                setSelectedImg(img1);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img2
                ? singleProductImg
                : img1
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
          <Image
            onClick={() => {
              if (selectedImg == img2) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img1) {
                setSelectedImg(img2);
              } else {
                setSelectedImg(img2);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img1
                ? singleProductImg
                : img2
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
        </section>
      )} */}
    </div>
  );
};

export default ProductImages;
