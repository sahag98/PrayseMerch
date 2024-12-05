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
import PairWith from "@/components/pair-with";

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

  const productPairings: any = {
    3045844: 3025621,
    2995762: 3041661,
    2995765: 3041663,
    2995767: 3025621,
    3041663: 2995765,
    3025621: 3045844,
    3041661: 2995762,
    3046955: 2995765,
  };

  const pairedProductId = productPairings[singleProduct.id];

  return (
    <div className="lg:px-28 mt-24 lg:mt-24 md:mt-24 flex lg:flex-col md:flex-row flex-col lg:justify-start lg:items-start md:justify-start justify-start md:items-start lg:gap-5 gap-3 items-start px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {singleProduct.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex relative lg:flex-row flex-col md:gap-5 lg:gap-5">
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
            href="/reviews"
            className="text-sm cursor-pointer hover:underline transition-all"
          >
            6 Reviews
          </Link>
        </div>
        <div className="flex  flex-1 flex-col  md:gap-3 gap-0 lg:gap-3 w-full">
          <ProductImages singleProduct={singleProduct} />
        </div>
        <section className="flex flex-1 flex-col gap-5">
          <AddToCart singleProduct={singleProduct} />
          <PairWith productId={pairedProductId} />
          <div className="w-full border-b pb-5 dark:text-gray-400">
            <h2 className="text-foreground font-bold text-lg">DETAILS</h2>
            {singleProduct.description}
          </div>
          <SizeChart variants={singleProduct.variants} />
        </section>
      </div>
      {/* <AccordionBox /> */}
      {/* <h3 id="reviews" className="text-lg font-bold">
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
      </div> */}
    </div>
  );
};

export default SingleProductPage;
