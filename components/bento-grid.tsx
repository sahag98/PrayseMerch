import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  date,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  date?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-background dark:border-white/[0.2]  border border-foreground/10  justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 flex flex-col justify-between transition duration-200">
        {icon}
        <section className="flex items-center mb-3 justify-between">
          <div className="text-lg font-bold">{title}</div>
          <span className="flex  gap-2">
            <Star stroke="#C4AB72" fill="#C4AB72" />
            <Star stroke="#C4AB72" fill="#C4AB72" />
            <Star stroke="#C4AB72" fill="#C4AB72" />
            <Star stroke="#C4AB72" fill="#C4AB72" />
            <Star stroke="#C4AB72" fill="#C4AB72" />
          </span>
        </section>
        <div className=" font-normal mt-2 text-foreground/75 ">
          {description}
        </div>
      </div>
      <div className=" italic text-sm font-normal">{date}</div>
    </div>
  );
};
