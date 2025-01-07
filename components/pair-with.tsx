import Image from "next/image";
import { Item } from "@/app/popular-products";
import AddPair from "./add-pair";

export default async function PairWith({
  productId,
}: {
  productId: number | undefined;
}) {
  if (!productId) {
    return;
  }
  const res = await fetch(`https://rest.spod.com/articles/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
    // cache: "no-store",
  });

  const item: Item = await res.json();

  const mugRes = await fetch(`https://rest.spod.com/articles/2862757`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
    // cache: "no-store",
  });

  const mug: Item = await mugRes.json();

  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-bold">Pair it With</h2>
      <div className="space-y-2">
        {/* Product 1 */}
        <div className="flex items-center mt-2 gap-6">
          <div className="w-32 h-32 bg-secondary relative">
            <Image
              src={item.images[0].imageUrl}
              alt="Heart of God Socks"
              fill
              className="object-cover p-2 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-lg text-primary">{item.variants[0].d2cPrice}</p>
          </div>
          <AddPair item={item} />
          {/* <Button className="text-base rounded-none font-bold">ADD</Button> */}
        </div>
        <div className="flex items-center mt-2 gap-6">
          <div className="w-32 h-32 bg-secondary relative">
            <Image
              src={mug.images[0].imageUrl}
              alt="Heart of God Socks"
              fill
              className="object-cover p-2 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{mug.title}</h3>
            <p className="text-lg text-primary">{mug.variants[0].d2cPrice}</p>
          </div>
          <AddPair item={mug} />
          {/* <Button className="text-base rounded-none font-bold">ADD</Button> */}
        </div>
      </div>
    </div>
  );
}
