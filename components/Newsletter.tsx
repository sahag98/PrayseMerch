"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Newsletter = () => {
  const scrollNewsRef = useRef(null);
  useGSAP(
    () => {
      gsap.to("#trigger", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "trigger",
          start: "bottom, bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    },
    { scope: scrollNewsRef }
  );
  return (
    <section
      ref={scrollNewsRef}
      id="trigger"
      className="bg-secondary opacity-1 mt-5 border border-primary rounded-md p-5 w-full flex flex-col items-center justify-center"
    >
      <h3 id="trigger" className="text-lg opacity-0">
        Subscribe to our Newsletter
      </h3>
      <p className="font-light mb-3">
        Join our Newsletter And stay up-to-date with our most recent updates &
        news!
      </p>

      <Button size={"sm"} className="lg:w-1/4 w-full">
        <Link href={"https://newsletter.prayse.app/"} target="_blank">
          Subscribe Now
        </Link>
      </Button>
    </section>
  );
};

export default Newsletter;
