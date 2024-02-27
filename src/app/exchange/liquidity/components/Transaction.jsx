import { useNavigate } from "react-router-dom";
import icons from "../../../assets/icons";
import { Divider } from "../../../components/Divider";

export const Transaction = () => {
  const navigation = useNavigate();
  return (
    <div
      className="flex w-full flex-col gap-3"
      onClick={() => navigation("/liquidity/details")}
    >
      <div className="flex w-full flex-col items-start gap-3 self-stretch">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
            <img
              src={icons.v2.logo_noname}
              alt="starknet logo"
              className="h-6 w-6"
            />
            <span className="text-sm font-bold text-[#f1f1f1]">SFN</span>
          </div>
          <div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
            <img src={icons.v2.eth_logo} alt="eth logo" className="h-6 w-6" />
            <span className="text-sm font-bold text-[#f1f1f1]">ETH</span>
          </div>
        </div>
        <div className="flex w-full items-start justify-between">
          <span className="text-sm font-bold text-[#f1f1f1]">$68,680,000</span>
          <span className="text-sm font-bold text-[#f1f1f1]">$68,680,000</span>
          <span className="text-sm font-bold text-[#f1f1f1]">$68,680</span>
        </div>
      </div>
      <Divider />
    </div>
  );
};
