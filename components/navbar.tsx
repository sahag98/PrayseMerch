"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Cart from "./cart";
import { ModeToggle } from "@/app/mode-toggle";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <header className="flex fixed top-0 w-full  bg-opacity-25 z-30 border-b backdrop-filter backdrop-blur-sm items-center py-2 justify-between  lg:px-28 md:px-20 px-4">
      <Link className="flex items-center gap-3" href={"/"}>
        <Image
          className="w-14 dark:bg-white dark:rounded-full"
          src={"/newLogo3.png"}
          width={500}
          height={500}
          alt="Prayse Logo"
        />
        <span className="font-bold text-lg">Prayse</span>
      </Link>
      <ul className="hidden lg:flex   flex-1 justify-evenly md:hidden items-center">
        <Link
          href={"/"}
          className="cursor-pointer text-sm font-medium hover:scale-105 transition-all"
        >
          HOME
        </Link>
        <Link
          href={"/products"}
          className="cursor-pointer text-sm font-medium  hover:scale-105 transition-all"
        >
          ALL PRODUCTS
        </Link>
        <Link
          href={"/#mission"}
          className="cursor-pointer text-sm font-medium  hover:scale-105 transition-all"
        >
          MISSION
        </Link>
      </ul>
      <section className="flex items-center gap-4">
        <ModeToggle />
        <Cart />
        <div className="flex lg:hidden">
          <MobileNav />
        </div>
      </section>
    </header>
  );
};

export default Navbar;
