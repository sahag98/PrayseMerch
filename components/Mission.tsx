"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

const Mission = () => {
  const scrollRef = useRef(null);
  const missionRef = useRef(null);
  useGSAP(() => {
    // @ts-ignore: Unreachable code error
    const boxes = gsap.utils.toArray(missionRef.current?.children);

    boxes.forEach((box: any) => {
      gsap.to(box, {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: box,
          start: "bottom, bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    });
  });

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
      id="mission"
      className="w-full my-10 lg:px-28 md:px-20 px-4 flex-1 rounded-md flex flex-col  justify-center items-center"
    >
      <h2 className="font-bold text-3xl mb-5 text-center">Our Mission</h2>
      <div className="flex items-center justify-between lg:flex-row flex-col gap-5">
        <div ref={missionRef} className="space-y-3">
          <p className="lg:w-3/4 w-full dark:font-light">
            Prayse&apos;s main mission has always been to elevate the importance
            of prayer in a Christian&apos;s walk with God. One of our favorite
            chapters from the Bible is in the book of Philippians, where we are
            told to always be in prayer and thanksgiving, and how through
            prayer, God will always provide peace both to our heart and mind.
          </p>
          <p className="lg:w-3/4 font-semibold italic w-full">
            Philippians 4:6-7: &quot;Be careful for nothing; but in every thing
            by prayer and supplication with thanksgiving let your requests be
            made known unto God. And the peace of God, which passeth all
            understanding, shall keep your hearts and minds through Christ
            Jesus.&quot;
          </p>
          <p className="lg:w-3/4 dark:font-light w-full">
            Our prayer is that wearing our merch can create faith-based and
            fruitful conversations surrounding the topic of prayer, and that
            people who don&apos;t know Christ would come to know Him through
            your conversations. God bless you and we&apos;re praying for you!
          </p>
        </div>
        <div className="w-full  dark:bg-white rounded-lg border flex items-center justify-center">
          <Image
            src={"/newLogo3.png"}
            width={500}
            height={500}
            alt="Prayse Logo"
            className="lg:w-1/2 w-full hidden lg:flex sm:flex md:flex  lg:h-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default Mission;
