import { Item } from "@/app/our-products";
import Image from "next/image";
import Link from "next/link";

import React from "react";

type Variant = {
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
  console.log("item: ", item);
  const itemImage = item.images[0];

  const variants = item.variants;
  return (
    <Link href={`/product/${item.id}`}>
      <div
        className="flex flex-col gap-3 items-center rounded-lg bg-secondary justify-center border hover:scale-105 cursor-pointer duration-500 transition-all"
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
          $18
        </span>
        {/* <ul>
        {variants.map((variant: Variant) => (
          <div>
            <span>{variant.d2cPrice}</span>
          </div>
        ))}
      </ul> */}
        {/* <p>{parse(item.description)}</p> */}
      </div>
    </Link>
  );
};

export default Product;
