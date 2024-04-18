"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Cart from "./cart";
import { ModeToggle } from "@/app/mode-toggle";

const Navbar = () => {
  return (
    <header className="flex fixed top-0 w-full  bg-opacity-25 z-30 border-b backdrop-filter backdrop-blur-sm items-center py-3 justify-between  lg:px-36 px-4">
      <Link className="flex  items-center gap-3" href={"/"}>
        <Image
          className="w-12 dark:bg-white dark:rounded-full"
          src={"/prayseLogo.png"}
          width={500}
          height={500}
          alt="Prayse Logo"
        />
        <span className="font-bold text-lg">Prayse</span>
      </Link>
      <section className="flex items-center gap-4">
        <ModeToggle />
        <Cart />
      </section>
    </header>
  );
};

export default Navbar;
