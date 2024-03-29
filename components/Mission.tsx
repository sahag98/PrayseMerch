"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

const Mission = () => {
  const scrollRef = useRef(null);
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
        Our Mission
      </h2>
      <div className="flex items-center justify-between lg:flex-row flex-col gap-5">
        <div className="space-y-3">
          <p id="stagger" className="lg:w-3/4 opacity-0 w-full dark:font-light">
            Prayse&apos;s main mission has always been to elevate the importance
            of prayer in a Christian&apos;s walk with God. One of our favorite
            chapter from the Bible is in the book of Philippians where we are
            told to always be in prayer and how through prayer, God will always
            provide peace both to our heart and mind.
          </p>
          <p id="stagger" className="lg:w-3/4 opacity-0 font-semibold w-full">
            Philippians 4:6-7: &quot;Be careful for nothing; but in every thing
            by prayer and supplication with thanksgiving let your requests be
            made known unto God. And the peace of God, which passeth all
            understanding, shall keep your hearts and minds through Christ
            Jesus.&quot;
          </p>
          <p id="stagger" className="lg:w-3/4 opacity-0 dark:font-light w-full">
            Our prayer is that wearing our merch can create faith-based and
            fruitful conversations surrounding the topic of prayer and that
            people who don&apos;t know Christ would come to know Him through
            your conversations. God bless you and we&apos;re praying for every
            single one of you!
          </p>
        </div>
        <div
          id="stagger"
          className="w-full opacity-0  dark:bg-white rounded-lg border flex items-center justify-center"
        >
          <Image
            src={"/prayseLogo.png"}
            width={500}
            height={500}
            alt="Prayse Logo"
            className="lg:w-1/2 w-full  lg:h-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default Mission;
