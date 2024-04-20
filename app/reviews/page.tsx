import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const ReviewsPage = () => {
  const reviewsArray = [
    {
      id: 1,
      name: "Elisabeth",
      content:
        "Love the shirt and crewneck! Perfect fit and soft material. Absolutely love the message behind them and can't wait to wear them!",
      date: "4/11/2024",
    },
    {
      id: 2,
      name: "David",
      content:
        "Great attention grabber and conversation starter which is perfect for sharing its message!",
      date: "4/17/2024",
    },
    {
      id: 3,
      name: "Sarona",
      content:
        "I got the white shirt from Prayse and I absolutely love it! It's very soft and light. It feels comfortable to wear and has a great design on it! A great conversation starter to tell others about Jesus! I will be buying more apparel from Prayse!",
      date: "4/17/2024",
    },
    {
      id: 4,
      name: "Jonathan",
      content:
        "This praye shirt isn't just a piece of clothing; it's a heartfelt expression of faith and worship. Knowing the person behind it adds even more depth and meaning to the message. I'm proud to wear it, and it's a testament to their talent and spirit. A true 5 star creation!",
      date: "4/19/2024",
    },
    {
      id: 5,
      name: "Richard",
      content:
        "I love my prayse shirt! Good quality, fits just right, great message, prayer and praise Amen!",
      date: "4/18/2024",
    },
    {
      id: 6,
      name: "Maral",
      content:
        "The shirt was of good quality and true to size. A good reminder to praise God!",
      date: "4/19/2024",
    },
  ];

  return (
    <div className="lg:px-28 lg:mt-36 mt-28 md:mt-24 min-h-screen flex lg:flex-col md:flex-row flex-col lg:justify-center lg:items-center md:justify-start justify-start md:items-start lg:gap-10 gap-5 items-center px-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-center font-bold text-xl">
          Would You Like to Leave a Review?
        </h1>
        <span className="text-foreground/75">
          Send a review on your items to our email <b>prayse.app@gmail.com</b>{" "}
          and we will add it to this list of amazing people!
        </span>
      </div>
      <BentoGrid className="max-w-4xl mx-auto">
        {reviewsArray.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.content}
            date={item.date}
            // header={item.header}
            // icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ReviewsPage;
