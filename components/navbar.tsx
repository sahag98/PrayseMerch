"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Cart from "./cart";
import { ModeToggle } from "@/app/mode-toggle";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex fixed  top-0 w-full  z-30 justify-between md:justify-normal  transition-all items-center py-2 lg:px-28 md:px-20 px-4 ${
        isScrolled
          ? "bg-opacity-25 backdrop-filter backdrop-blur-sm"
          : "bg-opacity-25 backdrop-filter backdrop-blur-sm"
      }`}
    >
      <Link className="flex items-center gap-3" href={"/"}>
        <Image
          className="w-14 dark:bg-white dark:rounded-full"
          src={"/newLogo3.png"}
          width={500}
          height={500}
          alt="Prayse Logo"
        />
        <span className="font-semibold text-lg">Prayse</span>
      </Link>
      <ul className="hidden lg:flex flex-1 justify-evenly md:hidden items-center">
        <Link
          href={"/"}
          className="cursor-pointer font-normal hover:scale-105 transition-all"
        >
          Home
        </Link>
        <Link
          href={"/products"}
          className="cursor-pointer font-normal  hover:scale-105 transition-all"
        >
          Products
        </Link>
        <Link
          href={"/#mission"}
          className="cursor-pointer font-normal  hover:scale-105 transition-all"
        >
          Mission
        </Link>
      </ul>
      <section className="flex items-center gap-4">
        <Cart />
      </section>
    </header>
  );
};

export default Navbar;
