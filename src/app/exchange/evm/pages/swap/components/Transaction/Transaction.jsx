import { Divider } from "../../../../../components/Divider";
import { CopyIcon } from "../icons";

export const Transaction = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col items-start gap-3 self-stretch py-[6px]">
        <div className="flex items-center gap-[10px]">
          <span className="text-sm font-normal text-[#3E73FC]">
            0xf059...7410
          </span>
          <CopyIcon />
        </div>
        <div className="flex items-start justify-between self-stretch">
          <span className="text-sm font-bold text-[#F1F1F1]">500 SFN</span>
          <span className="text-sm font-bold text-[#F1F1F1]">→</span>
          <span className="text-sm font-bold text-[#F1F1F1]">0.27 ETH</span>
        </div>
        <div className="flex items-start justify-between self-stretch">
          <span className="text-base font-normal text-[#C6C6C6]">
            0xf059...7410
          </span>
          <span className="text-base font-normal text-[#C6C6C6]">
            4 mins ago
          </span>
        </div>
      </div>
      <Divider />
    </div>
  );
};
