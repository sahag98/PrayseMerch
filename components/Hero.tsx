import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Hero = () => {
  return (
    <div
      suppressHydrationWarning={true}
      className="flex w-full lg:flex-row lg:px-28 md:px-20 px-4 flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background lg:gap-0 gap-6 h-screen justify-center lg:items-center items-start mt-20 lg:mt-0 relative lg:justify-between"
    >
      <section className="flex flex-col">
        <h1 id="stagger" className="lg:text-7xl  text-5xl font-bold ">
          Prayse Merch
        </h1>
        <p className=" text-foreground/75 text-lg lg:w-3/4 w-full" id="stagger">
          Reminding us of the power of{" "}
          <span className="text-primary"> prayer </span> and
          <span className="text-primary"> praise </span> in our walk with God.
        </p>
        <Link className="lg:w-1/3 md:w-1/2 w-full mb-2" href="/products">
          <Button
            id="stagger"
            className="lg:w-2/3 w-full mt-3 animate-buttonheartbeat  text-base text-white bg-primary font-bold"
          >
            Shop Now
          </Button>
        </Link>
        <p className="text-foreground/75">
          Christian t-shirts, crewnecks and more!
        </p>
      </section>
      <section
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
      </section>
    </div>
  );
};

export default Hero;
