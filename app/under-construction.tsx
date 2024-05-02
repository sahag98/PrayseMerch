import Image from "next/image";
import React from "react";

const UnderConstruction = () => {
  return (
    <div className="h-[100dvh] lg:px-28 md:px-20 px-4 flex flex-col justify-center items-center">
      <Image
        alt="under construction"
        src="/under-construction.gif"
        className="lg:w-96 w-48"
        width={1000}
        height={1000}
      />
      <h1 className="lg:text-5xl text-3xl text-center mb-2 text-foreground font-bold">
        Prayse Merch is <span className="text-primary">Under Construction</span>
      </h1>
      <p className="underline w-4/5 text-center underline-offset-2">
        Stay tuned for our accessories release tomorrow!
      </p>
    </div>
  );
};

export default UnderConstruction;
