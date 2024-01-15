import { twMerge } from "tailwind-merge";
import { CopyIcon } from "../icons";

export const TransactionRow = ({ idx }) => {
  return (
    <div className="flex w-full flex-col items-start">
      <div
        className={twMerge(
          "flex w-full items-start justify-between px-3 py-4",
          idx % 2 === 0 && "bg-[#232631]"
        )}
      >
        <div className="flex w-[200px] items-start gap-[10px]">
          <span className="text-base font-normal text-[#3E73FC]">
            0xf059...7410
          </span>
          <CopyIcon />
        </div>
        <span className="w-[160px] text-base font-normal text-[#f1f1f1]">
          500 SFN
        </span>
        <span className="w-[160px] text-base font-normal text-[#f1f1f1]">
          0.27 ETH
        </span>
        <span className="w-[160px] text-base font-normal text-[#f1f1f1]">
          0xf059...7410
        </span>
        <span className="w-[160px] text-base font-normal text-[#f1f1f1]">
          4 mins ago
        </span>
      </div>
    </div>
  );
};
