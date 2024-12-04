import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Hero = () => {
  return (
    <div className="flex w-full lg:flex-row lg:px-28 md:px-20 px-4 lg:gap-0 gap-6 h-screen lg:items-center items-start mt-0 lg:mt-0 relative lg:justify-between">
      <div className="absolute inset-0 w-full h-full bg-black/25 z-10" />
      <Image
        alt="Hero banner"
        className="absolute inset-0 object-top w-full h-full object-cover"
        src={
          "https://utfs.io/f/aZ7NTMjk7uDevTIzwqH8hCDjkHqOMPcr1ogNJ2Ksyl5zxXfb"
        }
        priority
        width={2000}
        height={2000}
      />
      <section className="flex z-20 md:self-auto md:mb-0 mb-10 self-end flex-col">
        <h1
          id="stagger"
          className="lg:text-7xl flex flex-col text-background text-6xl font-bold "
        >
          <span>Rejoice</span>
          <span>Pray</span>
          <span>Praise</span>
        </h1>
        <p className=" text-background/75 text-xl" id="stagger">
          Hoodies available now.
        </p>
        <Link className="mt-3 w-full" href="/products?filter=hoodies">
          <Button
            id="stagger"
            className=" w-full uppercase animate-buttonheartbeat  text-base text-white bg-primary font-bold"
          >
            Shop Now
          </Button>
        </Link>
        {/* <p className="text-foreground/75">
          Christian t-shirts, crewnecks and more!
        </p> */}
      </section>
      {/* <section
        id="hero-img"
        className="w-full grid grid-cols-2 place-items-center h-fit lg:w-fit gap-3 place-content-center rounded-lg"
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
      </section> */}
    </div>
  );
};

export default Hero;
