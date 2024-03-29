import { Item } from "@/app/our-products";
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
import AccordionBox from "@/components/Accordion";
import ProductImages from "@/components/productImages";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { productId: any };
};

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
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

  return {
    title: singleProduct.title,
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
  });

  const singleProduct: Item = await res.json();

  return (
    <div className="lg:px-28 mt-28 lg:mt-36 md:mt-24 flex lg:flex-col md:flex-row flex-col lg:justify-start lg:items-start md:justify-start justify-start md:items-start lg:gap-5 gap-5 items-start px-4">
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
      <div className="flex lg:flex-row flex-col m:gap-5 gap-1 lg:gap-5">
        <div className="flex flex-col md:gap-3 gap-0 lg:gap-3 w-full">
          <ProductImages singleProduct={singleProduct} />
        </div>
        <section>
          <AddToCart singleProduct={singleProduct} />
          <SizeChart variants={singleProduct.variants} />
        </section>
      </div>
      <AccordionBox />
    </div>
  );
};

export default SingleProductPage;
