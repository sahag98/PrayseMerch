"use client";
import React, { useRef, useState } from "react";
import Product from "@/components/Product";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Button } from "@/components/ui/button";

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

  const list = productsToShow.items.filter((item: Item) =>
    selectedCategory !== ""
      ? item.title.toLowerCase().includes(selectedCategory.toLowerCase())
      : true
  );

  return (
    <div id="products" className="pb-10 w-full overflow-x-hidden opacity-1">
      <h2 className="text-3xl font-semibold text-center mb-2">Our Products</h2>

      <div className="flex lg:items-center lg:justify-center md:items-center md:justify-center no-scrollbar overflow-x-scroll gap-3 mb-5">
        <Button
          onClick={() => setSelectedCategory("")}
          className="font-medium dark:text-white"
          variant={selectedCategory == "" ? "default" : "outline"}
          size={"sm"}
        >
          All
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => setSelectedCategory("T-Shirt")}
          variant={selectedCategory == "T-Shirt" ? "default" : "outline"}
          size={"sm"}
        >
          T-shirts
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => setSelectedCategory("Crewneck")}
          variant={selectedCategory == "Crewneck" ? "default" : "outline"}
          size={"sm"}
        >
          Crewnecks
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => setSelectedCategory("Tank")}
          variant={selectedCategory == "Tank" ? "default" : "outline"}
          size={"sm"}
        >
          Tank tops
        </Button>
        <Button
          className="font-medium relative dark:text-white"
          onClick={() => setSelectedCategory("Cap")}
          variant={selectedCategory == "Cap" ? "default" : "outline"}
          size={"sm"}
        >
          <p>Hats</p>
          {/* <p className="absolute top-0 right-0 text-destructive">New</p> */}
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => setSelectedCategory("Bag")}
          variant={selectedCategory == "Bag" ? "default" : "outline"}
          size={"sm"}
        >
          Bags
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => setSelectedCategory("Mug")}
          variant={selectedCategory == "Mug" ? "default" : "outline"}
          size={"sm"}
        >
          More
        </Button>
      </div>
      <section
        ref={scrollRef}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-10"
      >
        {list.map((item: Item) => (
          <Product key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default OurProducts;
