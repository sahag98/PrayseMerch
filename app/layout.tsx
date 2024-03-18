import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayse Merch",
  description: "Limited time prayse merch",
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
        <Navbar />
        {children}

        {/* <Footer />
        <Toaster /> */}
      </body>
    </html>
  );
}
