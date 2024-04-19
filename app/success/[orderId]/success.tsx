"use client";

import { runFireworks } from "@/lib/confetti";
import { Camera, CopyIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
const Success = () => {
  const pathname = usePathname();

  useEffect(() => {
    runFireworks();
  }, []);

  const copyToClipboard = () => {
    const url = `https://shop.prayse.app${pathname}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => console.log("Copied to clipboard"))
        .catch((error) => console.error("Failed to copy:", error));
    } else {
      // Fallback for browsers that don't support navigator.clipboard
      // You may prompt the user to copy the URL manually here
      alert(`Please copy the URL (link) manually.`);
    }
  };

  return (
    <div className="border rounded-md space-y-3 p-2">
      <p className="font-medium text-sm flex items-center justify-between gap-5">
        1- Take a screenshot to save the order information in case something
        goes wrong with your order.
        <Camera />
      </p>
      <Separator />
      <p className="font-medium text-sm flex items-center justify-between gap-5">
        2- Ch .
        <Camera />
      </p>
    </div>
  );
};

export default Success;
