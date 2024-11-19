"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function getTimeLeft() {
  const now = new Date();
  const targetDay = 4; // 0 = Sunday, 4 = Thursday
  let targetDate = new Date(now);

  targetDate.setDate(now.getDate() + ((targetDay + 7 - now.getDay()) % 7));
  targetDate.setHours(12, 0, 0, 0); // Set to 12 PM

  // Adjust for PST (UTC-8)
  targetDate.setHours(targetDate.getHours() + 8);

  if (now > targetDate) {
    // If it's past Thursday 12 PM, set for next week
    targetDate.setDate(targetDate.getDate() + 7);
  }

  const difference = targetDate.getTime() - now.getTime();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isLoaded) {
    return null; // Return null or a loading indicator
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-700 to-blue-400 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center bg-white bg-opacity-20 rounded-lg p-4"
            >
              <span key={value} className="text-4xl font-bold text-white">
                {value}
              </span>

              <span
                className="text-sm text-white capitalize mt-2"
                aria-label={`${key} remaining`}
              >
                {key}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
