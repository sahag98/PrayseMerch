"use client";
import React, { useRef, useState } from "react";
import Product from "@/components/Product";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export type Item = {
  id: number;
  title: string;
  description: string;
  variants: any[];
  images: any[];
};
const PopularProducts = ({ products }: { products: any }) => {
  const scrollRef = useRef(null);

  // useGSAP(() => {
  //   // @ts-ignore: Unreachable code error
  //   const boxes = gsap.utils.toArray(scrollRef.current?.children);

  //   boxes.forEach((box: any) => {
  //     gsap.to(box, {
  //       opacity: 1,
  //       stagger: 1,
  //       scrollTrigger: {
  //         trigger: box,
  //         start: "bottom, bottom",
  //         end: "top 20%",
  //         scrub: true,
  //       },
  //       ease: "power1.inOut",
  //     });
  //   });
  // }, []);

  const [productsToShow, setPoductsToShow] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("");

  const list = productsToShow?.items?.filter((item: Item) =>
    selectedCategory !== ""
      ? item.title.toLowerCase().includes(selectedCategory.toLowerCase())
      : true
  );

  return (
    <div
      id="products"
      className="pb-10 w-full lg:px-28 md:px-20 px-4 overflow-x-hidden opacity-1"
    >
      <h2 className="text-3xl font-semibold text-center mb-4">Best Sellers</h2>
      <section
        ref={scrollRef}
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-10"
      >
        {list?.map((item: Item, idx: number) => (
          <React.Fragment key={idx}>
            {item.id === 2803251 ||
            item.id === 2809325 ||
            item.id === 2809328 ? (
              <div
                key={item.id}
                className="flex [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] rounded-lg overflow-hidden relative"
              >
                <span className="flex absolute z-10 p-2 bg-background rounded-br-lg items-center mb-1 gap-2">
                  <Star size={15} stroke="#daa520" fill="#daa520" />
                  <Star size={15} stroke="#daa520" fill="#daa520" />
                  <Star size={15} stroke="#daa520" fill="#daa520" />
                  <Star size={15} stroke="#daa520" fill="#daa520" />
                  <Star size={15} stroke="#daa520" fill="#daa520" />
                </span>
                <Product key={item.id} item={item} />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};

export default PopularProducts;
