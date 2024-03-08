import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import Product from "@/components/Product";

export type Item = {
  id: number;
  title: string;
  description: string;
  variants: any[];
  images: any[];
};
const OurProducts = ({ products }: { products: any }) => {
  return (
    <div className="pb-10">
      <h2 className="text-3xl font-semibold text-center mb-5">Our Products</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        {products.items.map((item: Item) => (
          <Product key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default OurProducts;
