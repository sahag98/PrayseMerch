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
    default: "PRAY BELIEVE RECEIVE",
    template: `%s | PRAY BELIEVE RECEIVE`,
  },
  description:
    "This hoodie is a reminder of asking prayerfully, believing in God's promises and receiving the best God has for us according to His perfect will. We hope this hoodie is an encouraging piece of clothing to wear, not only to you but to those who see it and ask questions about it.",
  openGraph: {
    type: "website",
    url: "https://shop.prayse.app/",
    title: "PRAY BELIEVE RECEIVE",
    description:
      "This hoodie is a reminder of asking prayerfully, believing in God's promises and receiving the best God has for us according to His perfect will. We hope this hoodie is an encouraging piece of clothing to wear, not only to you but to those who see it and ask questions about it.",
    siteName: "PRAY BELIEVE RECEIVE",
    images: [
      "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDerzzuOTeSM3iqWkay8fmupEwKOGQBzP6nvrCs",
      "https://5mwuqb1r2k.ufs.sh/f/aZ7NTMjk7uDepzQSKFGLdQU6DWeytEBnoMG5SxJHlCPgmjA2",
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
    "christian apparel",
    "christian hoodies",
    "christian tanktops",
    "christian crewneck",
    "tshirt",
    "tanktops",
    "hoodies",
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
