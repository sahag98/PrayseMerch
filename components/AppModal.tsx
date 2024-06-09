"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import clsx from "clsx";
import useCart from "@/hooks/use-cart";

const AppModal = () => {
  const [agent, setAgent] = useState("");
  const cart = useCart();
  // const [visible, setVisible] = useState(true);
  function getMobileOperatingSystem() {
    // @ts-ignore: Unreachable code error
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // @ts-ignore: Unreachable code error
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }

  // function handleAppStore() {
  //   if (agent === "iOS") {
  //   }
  // }

  useEffect(() => {
    const agent = getMobileOperatingSystem();
    setAgent(agent);
  }, []);

  console.log(agent);

  console.log(cart.isShowingAppModal);

  return (
    <div
      className={clsx(
        "lg:hidden fixed w-5/6 lg:w-fit bottom-4 gap-5 bg-background border rounded-md",
        cart.isShowingAppModal == false ? "hidden" : "flex"
      )}
    >
      <div
        onClick={() => cart.dismissModal()}
        className="absolute bg-secondary rounded-full p-[2px] z-10 -top-3 -right-2"
      >
        <X className="text-primary" />
      </div>
      <div className="relative w-full justify-between px-4 py-2 bg-background items-center flex rounded-md">
        <div className="flex gap-2 items-center">
          <Image
            className="w-10 h-10 dark:bg-white dark:rounded-full"
            src={"/newLogo3.png"}
            width={500}
            height={500}
            alt="Prayse Logo"
          />
          <div className="flex flex-col">
            <h3 className="font-bold">Prayse</h3>
            <p className="font-light">Download our app!</p>
          </div>
        </div>

        <Link
          href={
            agent === "iOS"
              ? "https://apps.apple.com/us/app/prayseapp/id6443480347"
              : "https://play.google.com/store/apps/details?id=com.sahag98.prayerListApp&hl=en_US&gl=US&pli=1"
          }
        >
          <Button className="text-base text-white" size={"sm"}>
            Get
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppModal;
