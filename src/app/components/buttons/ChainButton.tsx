"use client";
import { Popover } from "antd";
import { useState } from "react";
import clsx from "clsx";

import { CollectionChain } from "@/app/models/collectionRanking";
import { DropdownBoldIcon } from "../icons";

export const ChainButton = ({
  chain,
  setChain,
  className,
}: {
  chain: CollectionChain;
  setChain: React.Dispatch<React.SetStateAction<CollectionChain>>;
  className?: string;
}) => {
  const [openChains, setOpenChains] = useState<boolean>(false);

  const handleOpenChains = (newOpen: boolean) => {
    setOpenChains(newOpen);
  };

  return (
    <Popover
      content={
        <div className="flex p-3 flex-col items-center justify-center gap-[6px] rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
          {collectionChains().map((item, idx) => (
            <div
              key={idx}
              className="flex py-3 px-6 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all"
              onClick={() => setChain(item.value)}
            >
              <span className="text-base leading-[19px] text-[#f1f1f1]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      }
      trigger="click"
      open={openChains}
      onOpenChange={handleOpenChains}
      arrow={false}
      placement="bottom"
    >
      <div
        className={clsx(
          "w-full h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#3C3D4D] transition-all cursor-pointer md:w-[160px]",
          className
        )}
      >
        <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
          All chains
        </span>
        <DropdownBoldIcon />
      </div>
    </Popover>
  );
};

interface Chain {
  label: string;
  value: CollectionChain;
}

const collectionChains = (): Chain[] => [
  {
    label: "Starknet",
    value: "starknet",
  },
  {
    label: "Ethereum",
    value: "starknet",
  },
];
