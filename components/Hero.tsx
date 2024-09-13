"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#stagger > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from("#image-section", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6, // Delay to make it the last animation
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      suppressHydrationWarning={true}
      className="relative flex w-full lg:px-28 md:px-20 px-4 lg:flex-row flex-col lg:gap-0 gap-6 h-screen  bg-cover bg-center justify-end md:justify-center lg:items-center items-start pt-16 lg:mt-0"
    >
      {/* Background Image */}
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')] bg-cover bg-center" /> */}
      {/* Dark Overlay for Contrast */}
      {/* <div className="absolute inset-0 bg-black opacity-60" /> */}
      {/* Adjust opacity here for darkness */}
      <section
        id="stagger"
        className="flex flex-col mb-10 relative w-full lg:w-1/2 z-10"
      >
        <h1 className="lg:text-7xl text-7xl text-primary font-bold">
          Pray for Everyone
        </h1>
        <p className="text-primary md:text-2xl text-lg lg:w-3/4 w-full relative">
          Reminding us to pray for our
          <span className="text-primary"> neighbors </span>,
          <span className="text-primary"> leaders </span> and
          <span className="text-primary"> everyone </span> in between.
        </p>

        <Button className="md:w-1/3 animate-buttonheartbeat w-full my-3 text-lg font-bold">
          Check it out
        </Button>
        <p className="text-primary-foreground/75">
          Christian t-shirts, crewnecks and more!
        </p>
      </section>
      <section
        id="image-section"
        className="flex overflow-hidden relative justify-between items-center rounded-lg md:w-1/2 w-full flex-col z-10"
      >
        {/* <BorderBeam /> */}
        {/* <Image
          src={"/newmerch.png"}
          priority={true}
          className="w-11/12 object-contain rounded-md"
          width={800}
          height={800}
          alt="Prayse T-Shirt"
        /> */}
        {/* <div className="flex flex-col w-full bg-background self-start border-t px-5 py-3">
          <h2 className="text-2xl font-bold">Pray for Everyone | UNISEX</h2>
          <div className="flex justify-between items-center">
            <span>
              <p className="text-accent-foreground/75">Price:</p>
              <p className="text-2xl text-primary font-semibold">$29.99</p>
            </span>
            <Button>
              <ShoppingCart className="text-white" />
            </Button>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Hero;
