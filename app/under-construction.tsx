import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
// import CountdownTimer from "@/components/countdown-timer";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className=" gap-0">
            <div className="relative flex md:flex-row flex-col items-center w-full md:h-full">
              <Image
                src={"/pbr-hoodie.png"}
                width={700}
                height={700}
                alt="Stylish hoodies coming soon"
                objectFit="cover"
                className="rounded-t-2xl md:w-1/2 md:rounded-l-2xl md:rounded-tr-none"
              />

              <Image
                src={"/pbr-crewneck.png"}
                width={700}
                height={700}
                alt="Stylish hoodies coming soon"
                objectFit="cover"
                className="rounded-t-2xl md:w-1/2 md:rounded-l-2xl md:rounded-tr-none"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <section>
                  <h1
                    id="stagger"
                    className="lg:text-7xl flex flex-col text-primary text-6xl font-bold "
                  >
                    <span>PRAY</span>
                    <span>BELIEVE</span>
                    <span>RECEIVE</span>
                  </h1>
                  <p className="text-gray-600 italic mb-6">Mark 11:24</p>
                </section>
                <Image
                  className="w-14 dark:bg-white dark:rounded-full"
                  src={"/newLogo3.png"}
                  width={500}
                  height={500}
                  alt="Prayse Logo"
                />
              </div>
              <h2 className="font-bold text-center text-xl">
                The website is under maintenance. Will be back soon.
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
