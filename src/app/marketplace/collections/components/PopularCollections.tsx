import { CustomizeCarousel } from "./CustomizeCarousel";
import clsx from "clsx";
import { useDrawerStore } from "@/app/store";

export const PopularCollections = () => {
  const { open } = useDrawerStore();
  return (
    <div className="flex flex-col items-start gap-6">
      <span className="text-2xl font-bold text-[#f1f1f1]">
        Popular Collections
      </span>
      <div
        className={clsx(
          "max-w-[calc(100vw-48px)] min-[1400px]:max-w-[1080px] flex",
          !open && "lg:max-w-[calc(100vw-335px)]",
          open && "lg:max-w-[calc(100vw-151px)]"
        )}
      >
        <CustomizeCarousel />
      </div>
    </div>
  );
};
