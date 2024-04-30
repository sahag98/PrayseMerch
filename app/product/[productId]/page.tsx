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
      <div className="flex lg:flex-row flex-col md:gap-5 gap-3 lg:gap-5">
        <h1 className="text-2xl lg:hidden w-fit font-bold">
          {singleProduct.title}
        </h1>
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
    </div>
  );
};

export default SingleProductPage;
