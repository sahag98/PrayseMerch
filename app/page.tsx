import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-background h-screen items-center justify-between p-28">
      <section>
        <h1 className="text-6xl font-bold ">Prayse Merch</h1>
        <p>Our limited time merch!</p>
        <Button className="w-1/2 mt-3 font-bold">Shop Now!</Button>
      </section>
      <section className="bg-secondary w-3/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-8 rounded-lg flex items-center">
        <Image
          src={"/prayse-white-shirt.png"}
          width={1000}
          height={1000}
          className="w-1/2"
          alt="prayse white shirt"
        />
        <Image
          src={"/prayse-black-shirt.png"}
          width={1000}
          height={1000}
          className="w-1/2"
          alt="prayse black shirt"
        />
      </section>
    </main>
  );
}
