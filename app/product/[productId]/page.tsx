import { Item } from "@/app/our-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
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

  console.log("single: ", singleProduct.description);
  return (
    <div className="lg:px-28 flex justify-start gap-14 items-center min-h-screen  px-4">
      <Image
        alt="image"
        className="w-1/3 border rounded-lg"
        src={singleProduct.images[0].imageUrl}
        width={1000}
        height={1000}
      />
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{singleProduct.title}</h1>
          <p>{parse(singleProduct.description)}</p>
          <span className="text-2xl text-primary">
            ${singleProduct.variants[0].d2cPrice}
          </span>

          <h2>Choose A Size:</h2>
          <div className="flex items-center gap-3">
            {singleProduct.variants.map((variant) => (
              <div
                key={variant.id}
                className="border cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all rounded-full flex items-center justify-center w-11 h-11"
              >
                <span>{variant.sizeName}</span>
              </div>
            ))}
          </div>
        </div>
        <Button>Add To Cart</Button>
      </section>
    </div>
  );
};

export default SingleProductPage;
