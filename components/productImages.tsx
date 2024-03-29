"use client";

import { Item } from "@/app/our-products";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ singleProduct }: { singleProduct: Item }) => {
  console.log(singleProduct.id);
  const img1 = "/black-1.jpg";
  const img2 = "/black-2.jpg";
  const singleProductImg = singleProduct.images[0].imageUrl;

  const [selectedImg, setSelectedImg] = useState(singleProductImg);
  const [isViewingMoreImgs, setIsViewingMoreImgs] = useState(false);
  return (
    <>
      <Image
        alt="image"
        className="lg:w-full object-contain lg:mb-0 mb-2 bg-accent z-20 md:w-1/2 w-full lg:hover:scale-105 lg:transition-all border rounded-lg"
        src={selectedImg}
        width={1000}
        height={1000}
      />
      {/* <p
        onClick={() => setIsViewingMoreImgs(!isViewingMoreImgs)}
        className="lg:hidden text-primary self-end underline underline-offset-4 text-sm  md:hidden flex items-center justify-center mt-1"
      >
        {isViewingMoreImgs ? "Less" : "More"} Images
      </p> */}
      {/* <Button
        onClick={() => setIsViewingMoreImgs(!isViewingMoreImgs)}
        variant={"link"}
        className="lg:hidden bg-red-300 m-0 p-0 md:hidden flex"
      >
       
      </Button> */}
      {/* {singleProduct.id === 2803251 && isViewingMoreImgs && (
        <section className="flex lg:hidden md:hidden items-center gap-3">
          <Image
            onClick={() => {
              if (selectedImg == img1) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img2) {
                setSelectedImg(img1);
              } else {
                setSelectedImg(img1);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img2
                ? singleProductImg
                : img1
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
          <Image
            onClick={() => {
              if (selectedImg == img2) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img1) {
                setSelectedImg(img2);
              } else {
                setSelectedImg(img2);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img1
                ? singleProductImg
                : img2
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
        </section>
      )}
      {singleProduct.id === 2803251 && (
        <section className="lg:flex md:flex hidden items-center gap-3">
          <Image
            onClick={() => {
              if (selectedImg == img1) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img2) {
                setSelectedImg(img1);
              } else {
                setSelectedImg(img1);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img2
                ? singleProductImg
                : img1
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
          <Image
            onClick={() => {
              if (selectedImg == img2) {
                setSelectedImg(singleProductImg);
              } else if (selectedImg == img1) {
                setSelectedImg(img2);
              } else {
                setSelectedImg(img2);
              }
            }}
            src={
              selectedImg != singleProductImg && selectedImg != img1
                ? singleProductImg
                : img2
            }
            width={1125}
            height={1125}
            className="w-1/4 rounded-md hover:scale-105 transition-all cursor-pointer"
            alt="black shirt"
          />
        </section>
      )} */}
    </>
  );
};

export default ProductImages;
