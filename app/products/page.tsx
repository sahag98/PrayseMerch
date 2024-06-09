import React from "react";
import OurProducts from "../our-products";
import { useSearchParams } from "next/navigation";

const ProductsPage = async () => {
  // console.log("params: ", searchParams?.filter);

  async function fetchAllProducts() {
    "use server";
    const res = await fetch("https://rest.spod.com/articles", {
      method: "GET",
      headers: {
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
      cache: "no-store",
    });

    const products = await res.json();

    return products;
  }
  const products = await fetchAllProducts();

  return (
    <main className="flex relative bg-background overflow-hidden items-center justify-center lg:px-28 md:px-20 mt-24 lg:mt-24 md:mt-24 px-4">
      <OurProducts products={products} />
    </main>
  );
};

export default ProductsPage;
