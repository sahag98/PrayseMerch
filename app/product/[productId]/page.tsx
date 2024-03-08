import { Item } from "@/app/our-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
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
    <div className="lg:px-28 mt-20 lg:mt-0 md:mt-10 flex lg:flex-row md:flex-row flex-col lg:justify-start lg:items-center md:justify-start justify-center md:items-center lg:gap-10 gap-5 items-start min-h-screen  px-4">
      <Image
        alt="image"
        className="lg:w-1/3 md:w-1/2 w-full border rounded-lg"
        src={singleProduct.images[0].imageUrl}
        width={1000}
        height={1000}
      />
      <section className="flex flex-col">
        <AddToCart singleProduct={singleProduct} />

        <SizeChart variants={singleProduct.variants} />
      </section>
    </div>
  );
};

export default SingleProductPage;
