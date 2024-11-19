import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CountdownTimer from "@/components/countdown-timer";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 bg-gray-300 md:h-full">
              <Image
                src={
                  "https://utfs.io/f/aZ7NTMjk7uDevTIzwqH8hCDjkHqOMPcr1ogNJ2Ksyl5zxXfb"
                }
                // width={2000}
                // height={2000}
                alt="Stylish hoodies coming soon"
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <section>
                  <h1
                    id="stagger"
                    className="lg:text-7xl flex flex-col text-primary text-6xl font-bold "
                  >
                    <span>Rejoice</span>
                    <span>Pray</span>
                    <span>Praise</span>
                  </h1>
                  <p className="text-gray-600 italic mb-6">
                    1 Thessalonians 5:16-18
                  </p>
                </section>
                <Image
                  className="w-14 dark:bg-white dark:rounded-full"
                  src={"/newLogo3.png"}
                  width={500}
                  height={500}
                  alt="Prayse Logo"
                />
              </div>
              <div className="space-y-6">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
