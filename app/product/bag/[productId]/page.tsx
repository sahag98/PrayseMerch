import { Item } from "@/app/our-products";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import AddToCart from "@/app/addToCart";
import SizeChart from "@/components/sizeChart";
import AccordionBox from "@/components/Accordion";
import ProductImages from "@/components/productImages";
import { Metadata } from "next";
import { Star } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { productId: any };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(
    `https://rest.spod.com/articles/${params.productId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    }
  );

  const singleProduct: Item = await res.json();

  if (!singleProduct) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }

  return {
    title: singleProduct.title,
    description: singleProduct.description,
    openGraph: {
      title: singleProduct.title,
      description: singleProduct.description,
      images: singleProduct.images[0].imageUrl,
    },
  };
}

const SingleProductPage = async ({ params: { productId } }: any) => {
  const res = await fetch(`https://rest.spod.com/articles/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
    cache: "no-store",
  });

  const singleProduct: Item = await res.json();

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
    <div className="lg:px-28 mt-24 lg:mt-24 md:mt-24 flex lg:flex-col md:flex-row flex-col lg:justify-start lg:items-start md:justify-start justify-start md:items-start lg:gap-5 gap-3 items-start px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{singleProduct.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex lg:flex-row flex-col md:gap-5 lg:gap-5">
        <h1 className="text-2xl lg:hidden w-fit font-bold">
          {singleProduct.title}
        </h1>
        <div className="flex lg:hidden items-center gap-2">
          <span className="flex mb-1 gap-2">
            <Star size={15} stroke="#daa520" fill="#daa520" />
            <Star size={15} stroke="#daa520" fill="#daa520" />
            <Star size={15} stroke="#daa520" fill="#daa520" />
            <Star size={15} stroke="#daa520" fill="#daa520" />
            <Star size={15} stroke="#daa520" fill="#daa520" />
          </span>
          <Link
            href="#reviews"
            className="text-sm cursor-pointer hover:underline transition-all"
          >
            6 Reviews
          </Link>
        </div>
        <div className="flex flex-col md:gap-3 gap-0 lg:gap-3 w-full">
          <ProductImages singleProduct={singleProduct} />
        </div>
        <section className="flex flex-col gap-5">
          <AddToCart singleProduct={singleProduct} />
          <p className="w-full lg:w-2/3 dark:text-gray-400">
            <h2 className="text-foreground font-semibold text-lg">Details:</h2>
            {singleProduct.description}
          </p>
          <SizeChart variants={singleProduct.variants} />
        </section>
      </div>
      <AccordionBox />
      <h3 id="reviews" className="text-lg font-bold">
        Reviews (6)
      </h3>
      <p>
        Send a review on your items to our email <b>prayse.app@gmail.com</b> and
        we will add it to this list of amazing people!
      </p>
      <div className="flex flex-col gap-3">
        {reviewsArray.map((review) => (
          <div
            className="flex flex-col border rounded-md p-5 gap-3"
            key={review.id}
          >
            <section className="flex justify-between">
              <h4 className="font-medium">{review.name}</h4>
              <span className="flex  gap-2">
                <Star stroke="#C4AB72" fill="#C4AB72" />
                <Star stroke="#C4AB72" fill="#C4AB72" />
                <Star stroke="#C4AB72" fill="#C4AB72" />
                <Star stroke="#C4AB72" fill="#C4AB72" />
                <Star stroke="#C4AB72" fill="#C4AB72" />
              </span>
            </section>
            <p className="text-foreground/60">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProductPage;
