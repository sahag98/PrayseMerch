"use client";
import Image from "next/image";
import React from "react";
import { Masonry } from "react-plock";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
const ShopByCategory = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const items = [
    {
      id: 1,
      title: "Tees",
      img: "/tee.png",
      height: 500, // height in pixels
    },
    {
      id: 2,
      title: "TankTops",
      img: "/tanktop.png",
      height: 700,
    },
    {
      id: 3,
      title: "Sweatshirts",
      img: "/sweatshirt.png",
      height: 950,
    },
    {
      id: 4,
      title: "Accessories",
      img: "/hat.png",
      height: 420,
    },
  ];
  return (
    <div className="">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Shop By Category
      </h2>
      <Masonry
        items={items}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 30],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => (
          <div
            className="border overflow-hidden relative rounded-md flex items-center justify-center"
            // style={{ height: item.height }}
            key={idx}
          >
            <div
              className={
                theme == "light"
                  ? "absolute inset-0 bg-black opacity-50"
                  : "absolute inset-0 bg-black opacity-30"
              }
            ></div>
            <Button
              onClick={() =>
                router.push(`/products/?filter=${item.title.toLowerCase()}`)
              }
              size={"lg"}
              className="absolute z-10 text-white text-lg"
            >
              {item.title}
            </Button>

            <Image
              src={item.img}
              width={1000}
              height={1000}
              className="w-full  h-auto"
              alt={`${item.title} image`}
            />
          </div>
          // <img key={idx} src={item} style={{ width: "100%", height: "auto" }} />
        )}
      />
    </div>
  );
};

export default ShopByCategory;
