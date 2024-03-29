import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ text }: { text: string }) => {
  return (
    <div className="h-screen w-full flex flex-col gap-3 items-center justify-center">
      <Loader className="animate-spin text-primary" />
      <p className="text-primary">{text}...</p>
    </div>
  );
};

export default Loading;
