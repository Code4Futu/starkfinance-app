export const AddLiquidityButton = ({ handleAddLiquidity }) => {
  return (
    <div
      className="button-linear-1 flex items-center justify-center gap-1 self-stretch rounded-2xl px-6 py-3 cursor-pointer"
      onClick={() => handleAddLiquidity()}
    >
      <span className="text-base font-bold text-[#1A1C24] leading-[19px]">
        Add Liquidity
      </span>
    </div>
  );
};
