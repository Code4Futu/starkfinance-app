import { Divider } from "@/app/components/Divider";
import { Transaction } from "./Transaction";
import { boardDataMockup } from "@/app/models/marketplaceActivity";

export const BoardActivity = () => {
  return (
    <div className="w-full flex flex-col items-start gap-6 pb-6">
      <div className="w-full flex flex-col justify-center items-center p-6 gap-3 rounded-3xl bg-[#1A1C24] lg:max-w-[1088px]">
        <div className="hidden lg:flex justify-between items-center py-3 self-stretch">
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px] w-[140px]">
            Action
          </span>
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px] min-w-[200px] max-w-[400px] flex-1">
            Item
          </span>
          <div className="flex justify-between items-center min-w-[472px] flex-1">
            <span className="text-base font-bold text-[#f1f1f1] text-right leading-[19px] w-[100px]">
              Price
            </span>
            <span className="text-base font-bold text-[#f1f1f1] text-right leading-[19px] w-[100px]">
              From
            </span>
            <span className="text-base font-bold text-[#f1f1f1] text-right leading-[19px] w-[100px]">
              To
            </span>
            <span className="text-base font-bold text-[#f1f1f1] text-right leading-[19px] w-[100px]">
              Time
            </span>
          </div>
        </div>
        <Divider className="hidden lg:flex" />
        {boardDataMockup().map((item, idx) => (
          <Transaction key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};
