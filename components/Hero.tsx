"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import CountdownTimer from "./Countdown";

const Hero = () => {
  const releaseDate = "2024-03-29T00:00:00Z";

  useGSAP(() => {
    gsap.to("#hero-img", { opacity: 1, x: 0, duration: 1 });
    gsap.to("#stagger", { opacity: 1, duration: 1, stagger: 0.2 });
  }, []);
  return (
    <div className="flex w-full lg:flex-row flex-col lg:gap-0 gap-6 h-screen justify-center lg:items-center items-start  mt-20 lg:mt-0 relative lg:justify-between">
      <section className="flex w-full flex-col">
        <h1 id="stagger" className="lg:text-7xl opacity-0 text-5xl font-bold ">
          Prayse Merch
        </h1>
        <p className="opacity-0" id="stagger">
          Check out our limited time merch!
        </p>
        {/* <Button
          id="stagger"
          className="w-1/2 mt-3 opacity-0 bg-primary font-bold"
        >
          Shop Now!
        </Button> */}
        <CountdownTimer releaseDate={releaseDate} />
      </section>
      <section
        id="hero-img"
        className="w-full opacity-0 translate-x-[1000px] overflow-hidden grid grid-cols-2  place-items-center h-fit lg:w-fit gap-3 place-content-center rounded-lg"
      >
        <Image
          src={"/hero-shirt.png"}
          className="w-96  object-cover rounded-md"
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
