import icons from "../../../../../assets/icons";
import { Divider } from "../../../../../components/Divider";
import { SwapIcon } from "../icons";
import { ExampleChart } from "./ExampleChart";

export const ChartDesktop = () => {
  return (
    <>
      <div className="flex items-end justify-between self-stretch">
        <div className="flex items-center gap-[6px]">
          <img
            src={icons.v2.logo_noname}
            alt="Starknet Logo"
            className="h-6 w-6"
          />
          <img
            src={icons.v2.eth_logo}
            alt="Starknet Logo"
            className="h-6 w-6"
          />
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-[#F1F1F1]">SFN/ETH</span>
            <SwapIcon />
          </div>
        </div>
        <span className="text-2xl font-bold text-[#F1F1F1]">Price</span>
      </div>
      <Divider />
      <div className="flex flex-col items-start gap-3 self-stretch md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-[#F1F1F1]">0.00055</span>
            <span className="text-base font-bold text-[#F1F1F1]">SFN/ETH</span>
            <span className="text-base font-bold text-[#6CFF7B]">+6.86%</span>
          </div>
          <span className="text-sm font-normal text-[#C6C6C6]">
            Nov 05, 2023, 17:00 (UTC)
          </span>
        </div>
        <div className="flex items-start gap-2 rounded-md	border-[1px] border-[#2D313E] bg-[#0D0E12]">
          <div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px]">
            <span className="text-xs font-medium text-[#F1F1F1]">24h</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#F1F1F1]">1W</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#F1F1F1]">1M</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#F1F1F1]">1Y</span>
          </div>
          <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
            <span className="text-xs font-medium text-[#F1F1F1]">ALL</span>
          </div>
        </div>
      </div>
      {/* <Chart /> */}
      <ExampleChart />
    </>
  );
};
