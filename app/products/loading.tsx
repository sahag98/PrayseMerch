import { Loader } from "lucide-react";

export default function Productsloading() {
  return (
    <div className="h-screen w-full flex flex-col gap-3 items-center justify-center">
      <Loader className="animate-spin text-primary" />
    </div>
  );
}
