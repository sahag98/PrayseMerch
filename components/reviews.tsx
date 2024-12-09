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
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Reviews = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const router = useRouter();
  const reviewsArray = [
    {
      id: 1,
      name: "Jonathan",
      content:
        "This prayse shirt isn't just a piece of clothing; it's a heartfelt expression of faith and worship...",
    },
    {
      id: 2,
      name: "Elisabeth",
      content:
        "Love the shirt and crewneck! Perfect fit and soft material. Absolutely love the message behind them.",
    },
    {
      id: 3,
      name: "David",
      content:
        "Great attention grabber and conversation starter which is perfect for sharing its message!",
    },
    {
      id: 4,
      name: "Sarona",
      content:
        "Comfortable to wear and a great conversation starter to tell others about Jesus!",
    },

    {
      id: 5,
      name: "Richard",
      content:
        "I love my prayse shirt! Good quality, fits just right, great message, prayer and praise Amen!",
    },
    {
      id: 6,
      name: "Maral",
      content:
        "The shirt was of good quality and true to size. A good reminder to praise God!",
      date: "4/18/2024",
    },
  ];

  return (
    <div className="flex flex-col lg:px-28 md:px-20 px-4 mb-0 mt-5 justify-center items-center w-full">
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
      <Button
        onClick={() => router.push("/reviews")}
        className="font-bold text-base"
        variant={"link"}
      >
        View All Reviews
      </Button>
    </div>
  );
};

export default Reviews;
