import { Item } from "@/app/our-products";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export type Variant = {
  id: number;
  productTypeId: number;
  productTypeName: string;
  productId: number;
  appearanceId: number;
  appearanceName: string;
  appearanceColorValue: string;
  sizeId: number;
  sizeName: string;
  sku: string;
  deprecatedSku: string;
  d2cPrice: number;
  imageIds: any[];
  stock: number;
};

const Product = ({ item }: { item: Item }) => {
  const itemImage = item.images[0];

  const variants = item.variants;
  return (
    <Link className="opacity-0" href={`/product/${item.id}`}>
      <div
        className="flex flex-col gap-3 items-center bg-accent rounded-lg justify-center border hover:scale-105 cursor-pointer duration-500 transition-all"
        key={item.id}
      >
        <Image
          src={itemImage.imageUrl}
          className=""
          width={1000}
          height={1000}
          alt={`Prayse ${itemImage.appearanceName} Shirt`}
        />
        <h3 className="font-semibold">{item.title}</h3>
        <span className="text-2xl text-secondary-foreground font-semibold">
          ${item.variants[0].d2cPrice}
        </span>
      </div>
    </Link>
  );
};

export default Product;
