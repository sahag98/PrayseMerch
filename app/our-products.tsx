"use client";
import React, { useCallback, useRef, useState } from "react";
import Product from "@/components/Product";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search = searchParams.get("filter");
  // console.log("params: ", search);
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
  const [selectedCategory, setSelectedCategory] = useState(
    search == "tees"
      ? "T-Shirt"
      : search === "hoodies"
      ? "Hoodie"
      : search === "beanies"
      ? "Beanie"
      : search === "tanktops"
      ? "Tank"
      : search === "crewnecks"
      ? "Crewneck"
      : search === "accessories"
      ? "Cap"
      : ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const list = productsToShow.items.filter((item: Item) =>
    selectedCategory !== ""
      ? item.title.toLowerCase().includes(selectedCategory.toLowerCase())
      : true
  );

  return (
    <div id="products" className="pb-10 w-full overflow-x-hidden opacity-1">
      <h2 className="text-3xl font-semibold text-center mb-2">All Products</h2>

      <div className="flex lg:items-center lg:justify-center md:items-center md:justify-center no-scrollbar overflow-x-scroll gap-3 mb-5">
        <Button
          onClick={() => {
            setSelectedCategory("");
            router.push(pathname + "?" + createQueryString("filter", "none"));
          }}
          className="font-medium dark:text-white"
          variant={selectedCategory == "" ? "default" : "outline"}
          size={"sm"}
        >
          All
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => {
            setSelectedCategory("T-Shirt");
            router.push(pathname + "?" + createQueryString("filter", "tees"));
          }}
          variant={selectedCategory == "T-Shirt" ? "default" : "outline"}
          size={"sm"}
        >
          T-shirts
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => {
            setSelectedCategory("Hoodie");
            router.push(
              pathname + "?" + createQueryString("filter", "hoodies")
            );
          }}
          variant={selectedCategory == "Hoodie" ? "default" : "outline"}
          size={"sm"}
        >
          Hoodies
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => {
            setSelectedCategory("Crewneck");
            router.push(
              pathname + "?" + createQueryString("filter", "crewnecks")
            );
          }}
          variant={selectedCategory == "Crewneck" ? "default" : "outline"}
          size={"sm"}
        >
          Crewnecks
        </Button>
        <Button
          className="font-medium dark:text-white"
          onClick={() => {
            setSelectedCategory("Tank");
            router.push(
              pathname + "?" + createQueryString("filter", "tanktops")
            );
          }}
          variant={selectedCategory == "Tank" ? "default" : "outline"}
          size={"sm"}
        >
          Tank tops
        </Button>
        <Button
          className="font-medium relative dark:text-white"
          onClick={() => {
            setSelectedCategory("Cap");
            router.push(
              pathname + "?" + createQueryString("filter", "accessories")
            );
          }}
          variant={selectedCategory == "Cap" ? "default" : "outline"}
          size={"sm"}
        >
          <p>Hats</p>
          {/* <p className="absolute top-0 right-0 text-destructive">New</p> */}
        </Button>
        <Button
          className="font-medium relative dark:text-white"
          onClick={() => {
            setSelectedCategory("Beanie");
            router.push(pathname + "?" + createQueryString("filter", "Beanie"));
          }}
          variant={selectedCategory == "Beanie" ? "default" : "outline"}
          size={"sm"}
        >
          <p>Beanies</p>
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
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-5"
      >
        {list.map((item: Item) => (
          <div
            key={item.id}
            className="flex [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] rounded-lg overflow-hidden relative"
          >
            <Product key={item.id} item={item} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurProducts;
