import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import UnderConstruction from "./under-construction";
import { cn } from "@/lib/utils";
const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://shop.prayse.app"),
  title: {
    default: "Prayse Merch",
    template: `%s | Prayse Merch`,
  },
  description:
    "Check out our first release of merchandise with a message of elavating the importance of prayer and praise in our walk with God.",
  openGraph: {
    type: "website",
    url: "https://shop.prayse.app/",
    title: "Prayse Merch",
    description:
      "Check out our first release of merchandise with a message of elavating the importance of prayer in a Christian's walk with God.",
    siteName: "Prayse Merch",
    images: [
      "https://cdn.glitch.global/1948cbef-f54d-41c2-acf7-6548a208aa97/hoer-shirt-2.png?v=1711145774428",
      "https://cdn.glitch.global/1948cbef-f54d-41c2-acf7-6548a208aa97/hoer-shirt-3.png?v=1711145776403",
      "https://cdn.glitch.global/1948cbef-f54d-41c2-acf7-6548a208aa97/hero-shirt.png?v=1711145778059",
    ],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  authors: [{ name: "Prayse", url: "https://www.prayse.app" }],
  generator: "Prayse",
  keywords: [
    "jesus is jesus",
    "prayse merch",
    "christian",
    "christian tshirts",
    "christian tanktops",
    "christian crewneck",
    "tshirt",
    "tanktops",
    "tee",
    "crewneck",
    "apparel",
    "christianmerch",
    "merch",
    "jesuslovesyou",
    "God",
    "Jesus",
  ],
  publisher: "Vercel",
  creator: "Prayse Team",
  icons: [
    "https://cdn.glitch.global/1948cbef-f54d-41c2-acf7-6548a208aa97/prayse-logo.png?v=1711146134082",
  ],
  category: "Apparel",
};

export const viewport: Viewport = {
  maximumScale: 1, //disables autozoom on ios
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning={true} lang="en">
        <body
          suppressHydrationWarning={true}
          className={cn(josefin.className, "antialiased")}
        >
          {/* <UnderConstruction /> */}
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <NextTopLoader color="#3D72ED" />
          <Navbar />
          {children}

          <Footer />
          <Toaster />
          <Analytics />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
