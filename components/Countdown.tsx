"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ releaseDate }: any) => {
  useGSAP(() => {
    gsap.to("#countdown", { opacity: 1, x: 0, duration: 1 });
  }, []);
  const calculateTimeLeft = () => {
    // @ts-ignore: Unreachable code error
    const difference: any = new Date(releaseDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted or countdown is finished
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds }: any = timeLeft;

  return (
    <div
      id="countdown"
      className="bg-secondary lg:w-fit w-full translate-x-[-1000px] mt-2 rounded-md px-4 py-3"
    >
      <h1 className="text-2xl lg:text-3xl  mb-2 font-bold text-primary">
        Release Countdown:
      </h1>
      <div className=" grid grid-cols-4 gap-5">
        {days > 0 && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="lg:w-24 lg:h-24 w-16 h-16 border border-primary rounded-md flex items-center justify-center p-4">
              <span className="text-primary font-semibold text-2xl">
                {days}
              </span>
            </div>
            <span>Days</span>
          </div>
        )}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="lg:w-24 lg:h-24 w-16 h-16  border border-primary rounded-md flex items-center justify-center p-4">
            <span className="text-primary font-semibold text-2xl">{hours}</span>
          </div>
          <span>Hours</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="lg:w-24 lg:h-24 w-16 h-16  border border-primary rounded-md flex items-center justify-center p-4">
            <span className="text-primary font-semibold text-2xl">
              {minutes}
            </span>
          </div>
          <span>Minutes</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="lg:w-24 lg:h-24 w-16 h-16  border border-primary rounded-md flex items-center justify-center p-4">
            <span className="text-primary font-semibold text-2xl">
              {seconds}
            </span>
          </div>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
