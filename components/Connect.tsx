"use client";

import { useGSAP } from "@gsap/react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import gsap from "gsap";
import { Dot, YoutubeIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useRef } from "react";

const Connect = () => {
  const scrollRef = useRef(null);

  const { theme } = useTheme();

  console.log("theme in connect: ", theme);

  useGSAP(
    () => {
      gsap.to("#stagger", {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#stagger",
          start: "bottom, bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });

      gsap.to("#cstagger", {
        opacity: theme == "light" ? 0.5 : 0.75,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#cstagger",
          start: "bottom, bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    },
    { scope: scrollRef }
  );
  return (
    <section
      ref={scrollRef}
      className="w-full mb-10 flex-1 rounded-md flex flex-col  justify-center items-center"
    >
      <h2
        id="stagger"
        className="font-bold text-3xl mb-5 opacity-0 text-center"
      >
        Connect With Us
      </h2>
      <div className="relative">
        <Image
          id="cstagger"
          src={theme == "light" || theme == undefined ? "/2.png" : "/5.png"}
          width={2000}
          className="opacity-0"
          height={1000}
          alt="globe"
        />

        <div
          id="stagger"
          className="absolute opacity-0 flex items-center gap-3 border-primary border rounded-md lg:left-1/4  lg:top-1/4 left-5 top-5 lg:px-4 lg:py-2 px-2 py-1 shadow-[0_8px_30px_rgb(58,114,237,0.30)]  z-10"
        >
          <InstagramLogoIcon className="w-5 h-5" color="#fa7e1e" />
          <span className="text-secondary-foreground font-medium">
            @prayse.app
          </span>
        </div>
        <div
          id="stagger"
          className="absolute opacity-0 flex items-center gap-3 border-primary border rounded-md  lg:px-4 lg:py-2 px-2 py-1 shadow-[0_8px_30px_rgb(58,114,237,0.30)] lg:top-1/3 lg:right-1/3 right-5 top-5 z-10"
        >
          <Image
            className="w-6 h-6"
            alt="android icon"
            src={"/android-icon.png"}
            width={512}
            height={512}
          />
          <span className="text-secondary-foreground font-medium">Prayse</span>
        </div>
        <div></div>
        <div
          id="stagger"
          className="absolute opacity-0 flex items-center gap-3 border-primary border rounded-md lg:left-1/2 lg:px-4 lg:py-2 px-2 py-1 left-1/2 top-1/3 shadow-[0_8px_30px_rgb(58,114,237,0.30)] lg:top-1/2 z-10"
        >
          <Image
            className={
              theme == "light"
                ? "w-5 borde h-5"
                : "w-5 bg-white rounded-full p-[2px] h-5"
            }
            alt="tiktok icon"
            src={"/apple-icon.png"}
            width={512}
            height={512}
          />
          <span className="text-secondary-foreground font-medium">
            PrayseApp
          </span>
        </div>
        <div
          id="stagger"
          className="absolute opacity-0 flex items-center gap-3 border-primary border rounded-md lg:left-1/4 px-2 py-1 left-1/5 top-1/2 lg:px-4 lg:py-2 shadow-[0_8px_30px_rgb(58,114,237,0.30)] lg:top-1/2 z-10"
        >
          <YoutubeIcon className="w-7 h-7" color="#FF0000" />
          <span className="text-secondary-foreground font-medium">
            @prayse.app
          </span>
        </div>
      </div>
    </section>
  );
};

export default Connect;
