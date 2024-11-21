import { Item } from "@/app/popular-products";
import React from "react";
import Product from "./Product";

const NewArrivals = ({ products }: { products: { items: [] } }) => {
  const newHoodies = products.items.filter(
    (product: Item) => product.title === "Rejoice Pray Praise Hoodie | UNISEX"
  );

  const newBeanies = products.items.filter(
    (product: Item) => product.title === "Rejoice Pray Praise Beanie"
  );

  return (
    <div className="w-full bg-gray-50 py-10 lg:px-28 md:px-20 px-4">
      <h2 className="text-3xl text-center mb-6 font-bold">New Arrivals</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 gap-6">
        {newHoodies.map((hoodie: Item) => (
          <div
            key={hoodie.id}
            className="flex [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] rounded-lg overflow-hidden relative"
          >
            <Product key={hoodie.id} item={hoodie} />
          </div>
        ))}
        {newBeanies.map((beanie: Item) => (
          <div
            key={beanie.id}
            className="flex [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] rounded-lg overflow-hidden relative"
          >
            <Product key={beanie.id} item={beanie} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default NewArrivals;
