"use client";

import { Item } from "@/app/our-products";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ProductImages = ({ singleProduct }: { singleProduct?: Item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };
  let images;

  const forestGreenHoodieImgs = [
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeZSpNx545Xz68YDiI1FM29KOHcV7ZLUpa3BRh",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDehBcQDfJmYIBdriuMobJcWAEj7LhUQy4DN5SH",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDe3yK19CsqNU9ZTXHEtR382QP4uYdownvr1cIe",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDepIYlSQGLdQU6DWeytEBnoMG5SxJHlCPgmjA2",
    },
  ];
  const DeepBlueHoodieImgs = [
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeBZS5Sz3U2XYlhDSzH9NAG13Tjx4F7be65PEZ",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeX6knhRAnD3PuKU7WZf8wgxCA5hMmBN4yLsa0",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeYL5rSaXvaW9nhskc2D5yMTEZQL7Gopr0HISB",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeRNdcnppliKNaOhgqlJFHpotnykUxvI4csZD3",
    },
  ];

  const OffWhiteHoodieImgs = [
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeTzswRSb70K6dCrwVQvBFnJ4bWPGzoTMeIf3D",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDe206T2xZtHXa9jznNi07QC3ZLYycRAgOIFvT8",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeb7JAMGBkFUg9GY4nZAwBdmL62lHR5KP3XpoT",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDe5SPpuYcU3wHCxiXVtpk4eBNbPZ1vQ9ynch0m",
    },
  ];
  const NavyGreyHoodieImgs = [
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDe75yo2emrYPlv4i6F0joh3dLR1xy2ZnSp58fU",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeC4YbUghQa7WpeJZEjBwXM9ugTvnol2H6KDkf",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDeCxaCjo1hQa7WpeJZEjBwXM9ugTvnol2H6KDk",
    },
    {
      imageUrl:
        "https://utfs.io/f/aZ7NTMjk7uDej21k1S4urw4kIgUDBWXYbzMQuEqSm87eAVJl",
    },
  ];

  switch (singleProduct?.id) {
    case 2995762:
      images = forestGreenHoodieImgs.concat(singleProduct.images);
      break;
    case 3045844:
      images = DeepBlueHoodieImgs.concat(singleProduct.images);
      break;
    case 2995765:
      images = OffWhiteHoodieImgs.concat(singleProduct.images);
      break;
    case 2995767:
      images = NavyGreyHoodieImgs.concat(singleProduct.images);
      break;
    default:
      images = singleProduct?.images;
      break;
  }

  // Check if singleProduct and images exist
  if (
    !singleProduct ||
    !singleProduct.images ||
    singleProduct.images.length === 0
  ) {
    return <div>No product images available</div>;
  }

  return (
    <div className="flex gap-4 flex-col-reverse md:flex-row overflow-x-hidden sticky top-0">
      {/* Thumbnails column */}
      <div className="sm:flex sm:flex-col hidden no-scrollbar overflow-x-scroll flex-row gap-2 md:w-24 w-full">
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image.imageUrl}
            alt={`Thumbnail ${index + 1}`}
            width={96}
            height={96}
            className={`cursor-pointer bg-[#E3E0DF] object-cover sm:w-full w-1/4 h-24 rounded ${
              index === current ? "border-2 border-primary" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      {/* Main carousel */}
      <div className="flex-1">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images?.map((image, index) => (
              <CarouselItem
                key={index}
                className="relative flex  rounded-lg items-start justify-start"
              >
                <Image
                  alt={`Product image ${index + 1}`}
                  loading="eager"
                  className="bg-[#E3E0DF] h-full aspect-auto object-cover rounded-lg"
                  src={image.imageUrl}
                  width={1000}
                  height={1000}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute flex items-center gap-2 justify-center bottom-5 w-full">
          {images?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-gray-300 cursor-pointer ${
                index === current ? "bg-white" : "bg-opacity-50"
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
