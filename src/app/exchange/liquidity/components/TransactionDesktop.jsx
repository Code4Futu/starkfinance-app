import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../../assets/icons";
import { Divider } from "../../../components/Divider";
import { ArrangeIcon } from "../icons";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
import {
  RpcProvider,
  Provider,
  Contract,
  Account,
  ec,
  json,
  uint256,
  number,
} from "starknet";
import { pairabi, erc20abi } from "../abi";

const Transaction = () => {
  const navigation = useNavigate();
  return (
    <div
      className="flex flex-col gap-3"
      onClick={() => navigation("/liquidity/details")}
    >
      <div className="flex w-full items-center justify-between self-stretch">
        <div className="flex w-[250px] items-center gap-3">
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
        <span className="w-[160px] text-sm font-bold text-[#f1f1f1]">
          $68,680,000
        </span>
        <span className="w-[160px] text-sm font-bold text-[#f1f1f1]">
          $68,680,000
        </span>
        <span className="w-[100px] text-sm font-bold text-[#f1f1f1]">
          $68,680
        </span>
      </div>
      <Divider />
    </div>
  );
};

export const TransactionDesktop = ({ allPairs, loading }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between self-stretch">
        <span className="w-[250px] text-xs font-medium text-[#c6c6c6]">
          Name
        </span>
        <div className="flex w-[160px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">Liquidity</span>
          <ArrangeIcon />
        </div>
        <div className="flex w-[160px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">
            Volume (24h)
          </span>
          <ArrangeIcon />
        </div>
        <div className="flex w-[100px] items-center gap-1">
          <span className="text-xs font-medium text-[#c6c6c6]">Fee (24h)</span>
          <ArrangeIcon />
        </div>
      </div>
      <Divider />
    </div>
  );
};
