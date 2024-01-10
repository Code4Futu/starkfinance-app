import { Divider } from "../../../components/Divider";
import { ArrangeIcon } from "../icons";
import { Transaction } from "./Transaction";

export const TransactionMobile = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex w-[90px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">Liquidity</span>
          <ArrangeIcon />
        </div>
        <div className="flex w-[90px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">
            Volume (24h)
          </span>
          <ArrangeIcon />
        </div>
        <div className="flex w-[70px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">Fee (24h)</span>
          <ArrangeIcon />
        </div>
      </div>
      <Divider />
      <div className="flex w-full flex-col gap-3">
        <Transaction />
        <Transaction />
        <Transaction />
      </div>
    </div>
  );
};
