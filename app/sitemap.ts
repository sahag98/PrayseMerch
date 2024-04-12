import { Item } from "./our-products";

export default async function sitemap() {
  const baseUrl = "https://shop.prayse.app";
  const response = await fetch("https://rest.spod.com/articles", {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const AllProducts = await response.json();
  const products = AllProducts.items.map((product: Item) => {
    return {
      url: `${baseUrl}/product/${product.id}`,
      lastModified: "2024-04-04T15:02:24.021Z",
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...products,
  ];
}
