"use client";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const Reviews = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const reviewsArray = [
    {
      id: 1,
      name: "Elisabeth",
      content:
        "Love the shirt and crewneck! Perfect fit and soft material. Absolutely love the message behind them.",
    },
    {
      id: 2,
      name: "David",
      content:
        "Great attention grabber and conversation starter which is perfect for sharing its message!",
    },
    {
      id: 3,
      name: "Sarona",
      content:
        "Comfortable to wear and a great conversation starter to tell others about Jesus!",
    },
    {
      id: 4,
      name: "Richard",
      content:
        "I love my prayse shirt! Good quality, fits just right, great message, prayer and praise Amen!",
    },
  ];

  return (
    <div className="flex mb-10 mt-5 justify-center items-center w-full">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {reviewsArray.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2  lg:basis-1/3">
              <div className="p-1">
                <Card className={cn("bg-background")}>
                  <CardContent className="flex flex-col p-5 gap-2">
                    <div className="flex mb-2 justify-between">
                      <span className="font-semibold text-lg">
                        {review.name}
                      </span>
                      <span className="flex  gap-2">
                        <Star stroke="#C4AB72" fill="#C4AB72" />
                        <Star stroke="#C4AB72" fill="#C4AB72" />
                        <Star stroke="#C4AB72" fill="#C4AB72" />
                        <Star stroke="#C4AB72" fill="#C4AB72" />
                        <Star stroke="#C4AB72" fill="#C4AB72" />
                      </span>
                    </div>
                    <span className="font-normal text-foreground/60">
                      {review.content}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default Reviews;
