"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Hero = () => {
  useGSAP(() => {
    gsap.to("#hero-img", { opacity: 1, x: 0, duration: 0.5 });
    gsap.to("#stagger", { opacity: 1, duration: 0.5, stagger: 0.2 });
  }, []);
  return (
    <div
      suppressHydrationWarning={true}
      className="flex w-full lg:flex-row flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background lg:gap-0 gap-6 h-screen justify-center lg:items-center items-start mt-20 lg:mt-0 relative lg:justify-center"
    >
      <section className="flex flex-col">
        <h1 id="stagger" className="lg:text-7xl opacity-0 text-5xl font-bold ">
          Prayse Merch
        </h1>

        <p
          className="opacity-0 text-foreground/55 lg:w-2/3 w-full"
          id="stagger"
        >
          Perfect for everyday wear, reminding us of the power of prayer and
          praise in our walk with God.
        </p>
        <Link className="lg:w-1/3 md:w-1/2 w-full" href="#chip">
          <Button
            id="stagger"
            className="w-full mt-3 opacity-0 text-base bg-primary font-bold"
          >
            Shop Now
          </Button>
        </Link>
      </section>
      <section
        id="hero-img"
        className="w-full opacity-0 translate-x-[1000px] overflow-hidden grid grid-cols-2 place-items-center h-fit lg:w-fit gap-3 place-content-center rounded-lg"
      >
        <Image
          src={"/hero-shirt.png"}
          priority={true}
          className="w-96 object-cover rounded-md"
          width={800}
          height={800}
          alt="Prayse T-Shirt"
        />
        <Image
          src={"/hero-shirt-2.png"}
          className="w-96 rounded-md"
          width={800}
          height={800}
          alt="Prayse T-Shirt"
        />
        <Image
          src={"/hero-shirt-3.png"}
          className="w-96 rounded-md"
          width={800}
          height={800}
          alt="Prayse T-Shirt"
        />
        <Image
          src={"/hero-shirt.png"}
          className="w-96 rounded-md"
          width={800}
          height={800}
          alt="Prayse T-Shirt"
        />
      </section>
    </div>
  );
};

export default Hero;
