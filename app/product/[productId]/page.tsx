import { Item } from "@/app/our-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
const SingleProductPage = async ({ params: { productId } }: any) => {
  const res = await fetch(`https://rest.spod.com/articles/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const singleProduct: Item = await res.json();

  return (
    <div className="lg:px-28 mt-28 lg:mt-36 md:mt-24 flex lg:flex-col md:flex-row flex-col lg:justify-start lg:items-start md:justify-start justify-start md:items-start lg:gap-10 gap-5 items-start px-4 ">
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

      <div className="flex lg:flex-row flex-col gap-5">
        <Image
          alt="image"
          className="lg:w-1/3 bg-background z-20 md:w-1/2 w-full hover:scale-110 transition-all border rounded-lg"
          src={singleProduct.images[0].imageUrl}
          width={1000}
          height={1000}
        />
        <section className="flex flex-col gap-0">
          <AddToCart singleProduct={singleProduct} />

          <SizeChart variants={singleProduct.variants} />
        </section>
      </div>
    </div>
  );
};

export default SingleProductPage;
