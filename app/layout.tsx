import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayse Merch",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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
  authors: [{ name: "Prayse", url: "https://www.prayse.app/" }],
  generator: "Prayse",
  keywords: [
    "tshirt, tanktops, tee, apparel, christian, christianmerch, merch, jesuslovesyou, God, Jesus",
  ],
  publisher: "Vercel",
  creator: "Prayse Team",
  icons: [
    "https://cdn.glitch.global/1948cbef-f54d-41c2-acf7-6548a208aa97/prayse-logo.png?v=1711146134082",
  ],
  category: "Apparel",
};

export const revalidate = 3600;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={josefin.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <Navbar />
          {children}

          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
