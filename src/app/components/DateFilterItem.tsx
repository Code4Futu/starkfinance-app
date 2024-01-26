import clsx from "clsx";
import { DateFilter } from "../models/dateFilter";

export const DateFilterItem = ({
  dateFilter,
  setDateFilter,
}: {
  dateFilter: DateFilter;
  setDateFilter: React.Dispatch<React.SetStateAction<DateFilter>>;
}) => {
  return (
    <>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "1h" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("1h")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          1h
        </span>
      </div>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "6h" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("6h")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          6h
        </span>
      </div>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "24h" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("24h")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          24h
        </span>
      </div>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "7d" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("7d")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          7d
        </span>
      </div>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "30d" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("30d")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          30d
        </span>
      </div>
      <div
        className={clsx(
          "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all cursor-pointer",
          dateFilter === "All" && "bg-[#2D313E]"
        )}
        onClick={() => setDateFilter("All")}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          All
        </span>
      </div>
    </>
  );
};
