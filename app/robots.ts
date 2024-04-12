import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://shop.prayse.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/product"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
