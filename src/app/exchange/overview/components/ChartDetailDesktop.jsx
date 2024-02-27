import { twMerge } from "tailwind-merge";
import { Divider } from "../../../components/Divider";
import { ChartBarDesktop } from "./ChartBarDesktop";
import moment from "moment";

export const ChartDetailDesktop = ({ className }) => {
  return (
    <div
      className={twMerge(
        "flex h-[387px] w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 min-[1920px]:max-w-[722px]",
        className
      )}
    >
      <span className="self-stretch text-xl font-bold text-[#f1f1f1]">
        Volume
      </span>
      <Divider />
      <div className="flex w-full justify-between justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xl font-bold text-[#f1f1f1]">$686.86k</span>
          <span className="text-xs font-medium text-[#c6c6c6]">
            {moment().format("lll")} (UTC)
          </span>
        </div>
        <div className="flex h-[26px] items-start gap-2 rounded-md border-[1px] border-[#2D313E] bg-[#0D0E12]">
          <div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px]">
            <span className="text-xs font-medium text-[#f1f1f1]">1D</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#f1f1f1]">1W</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#f1f1f1]">1M</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#f1f1f1]">1Y</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#f1f1f1]">ALL</span>
          </div>
        </div>
      </div>
      <ChartBarDesktop />
    </div>
  );
};
