import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Reviews from "@/components/reviews";
import AppModal from "@/components/AppModal";
import PopularProducts from "./popular-products";
import ShopByCategory from "@/components/ShopByCategory";

export default async function Home() {
  const res = await fetch("https://rest.spod.com/articles", {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const products = await res.json();

  return (
    <main className="flex flex-col relative bg-background overflow-hidden min-h-screen items-center  justify-center">
      <Hero />
      {/* <WhatsNew /> */}
      <Reviews />
      <PopularProducts products={products} />
      {/* <BentoDemo /> */}
      <ShopByCategory />

      <Mission />
      {/* <Newsletter /> */}
      <AppModal />
    </main>
  );
}
