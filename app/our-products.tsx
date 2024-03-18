"use client";
import React, { useRef } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import Product from "@/components/Product";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export type Item = {
  id: number;
  title: string;
  description: string;
  variants: any[];
  images: any[];
};
const OurProducts = ({ products }: { products: any }) => {
  const scrollRef = useRef(null);

  useGSAP(() => {
    // @ts-ignore: Unreachable code error
    const boxes = gsap.utils.toArray(scrollRef.current?.children);

    boxes.forEach((box: any) => {
      gsap.to(box, {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: box,
          start: "bottom, bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div id="chip" className="pb-10 opacity-1">
      <h2 className="text-3xl font-semibold text-center mb-5">Our Products</h2>
      <section
        ref={scrollRef}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-10"
      >
        {products.items.map((item: Item) => (
          <Product key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default OurProducts;
