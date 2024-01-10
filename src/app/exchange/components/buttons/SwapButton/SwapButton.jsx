import { Button } from "antd";

export const SwapButton = ({ handleSwap, submitting, warningPriceImpact }) => {
  return (
    <Button
      className="button-linear-1 flex items-center justify-center gap-1 self-stretch rounded-2xl px-6 py-3 h-[43px] border-none"
      onClick={() => {
        handleSwap();
      }}
      loading={submitting}
    >
      <span className="text-base font-bold leading-[19px] text-[#1A1C24]">
        {warningPriceImpact ? "Swap anyway" : "Swap"}
      </span>
    </Button>
  );
};
