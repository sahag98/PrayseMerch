import { Facebook, Globe, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <div className="w-full h-fit bg-secondary mt-20 py-5 lg:px-24  md:px-10 px-4 justify-center lg:justify-normal md:justify-normal border-t gap-5 lg:gap-10 flex flex-wrap lg:flex-row items-start">
      <section>
        <h4 className="font-bold mb-2 ">Social Media Links</h4>
        <ul className="space-y-2">
          <Link
            className="flex gap-2 items-center"
            href={"https://www.instagram.com/prayse.app/"}
          >
            <Instagram color="#fa7e1e" />
            <span className="text-[13px]">prayse.app</span>
          </Link>
          <Link
            className="flex gap-2 items-center"
            href={"https://www.facebook.com/profile.php?id=100095148414909"}
          >
            <Facebook color="#316FF6" />
            <span className="text-[13px]">prayse.app</span>
          </Link>
          <Link
            className="flex gap-2 items-center"
            href={"https://www.youtube.com/channel/UCYLN9KvdXTuTnLFuWlrQGhw"}
          >
            <Youtube color="#FF0000" />
            <span className="text-[13px]">prayse.app</span>
          </Link>
          <Link
            className="flex gap-2 items-center"
            href={"https://www.tiktok.com/@prayse.app"}
          >
            <Image
              className="w-[22px]"
              alt="tiktok icon"
              src={"/tiktok-icon.png"}
              width={512}
              height={512}
            />
            <span className="text-[13px]">prayse.app</span>
          </Link>
        </ul>
      </section>
      <Separator
        className="hidden bg-gray-300 lg:flex h-full"
        orientation="vertical"
      />
      <Separator className="lg:hidden bg-gray-300" />

      <section>
        <h4 className="font-bold mb-2">App Download Links</h4>
        <ul className="space-y-2">
          <Link
            className="flex gap-2 items-center"
            href={"https://apps.apple.com/us/app/prayseapp/id6443480347"}
          >
            <Image
              className="w-6"
              alt="tiktok icon"
              src={"/apple-icon.png"}
              width={400}
              height={400}
            />
            <span className="text-[13px]">PrayseApp</span>
          </Link>
          <Link
            className="flex gap-2 items-center"
            href={
              "https://play.google.com/store/apps/details?id=com.sahag98.prayerListApp&hl=en_US&gl=US&pli=1"
            }
          >
            <Image
              className="w-6"
              alt="tiktok icon"
              src={"/android-icon.png"}
              width={512}
              height={512}
            />
            <span className="text-[13px]">Prayse</span>
          </Link>
        </ul>
      </section>
      <Separator
        className="hidden bg-gray-300 lg:flex h-full"
        orientation="vertical"
      />
      <Separator className="lg:hidden bg-gray-300 " />
      <section className="flex flex-col items-center lg:items-start justify-center">
        <h4 className="font-bold mb-2">App Website</h4>
        <ul>
          <Link
            className="flex gap-2 items-center"
            href={"https://www.prayse.app/"}
          >
            <Globe />
            <span className="text-[13px]">www.prayse.app</span>
          </Link>
        </ul>
        <p className="lg:hidden self-end text-center mt-5 text-[13px]">
          @2024 PRAYSE ALL RIGHTS RESERVED.
        </p>
      </section>
      <p className="self-end hidden lg:flex text-center text-[13px]">
        @2024 PRAYSE ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Footer;
