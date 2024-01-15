import { Divider } from "../../../components/Divider";

export const SfnInformation = () => {
  return (
    <div className="flex w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 min-[1920px]:min-w-[342px]">
      <span className="self-stretch text-xl font-bold text-[#f1f1f1]">
        Pool statistics
      </span>
      <Divider />
      <div className="flex w-full flex-col items-start gap-6 self-stretch md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-[6px]">
          <span className="text-sm font-normal text-[#c6c6c6]">Price</span>
          <span className="text-base font-bold text-[#f1f1f1]">$1.00</span>
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <span className="text-sm font-normal text-[#c6c6c6]">
            Circulating supply
          </span>
          <span className="text-base font-bold text-[#f1f1f1]">68,680,000</span>
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <span className="text-sm font-normal text-[#c6c6c6]">Market cap</span>
          <span className="text-base font-bold text-[#f1f1f1]">
            $68,680,000
          </span>
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <span className="text-sm font-normal text-[#c6c6c6]">
            Volume (24h)
          </span>
          <span className="text-base font-bold text-[#f1f1f1]">$686.86k</span>
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <span className="text-sm font-normal text-[#c6c6c6]">
            Total supply
          </span>
          <span className="text-base font-bold text-[#f1f1f1]">
            100,000,000
          </span>
        </div>
      </div>
    </div>
  );
};
