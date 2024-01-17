"use client";
import Image from "next/image";
import cypherAvatar from "/public/svg/cypher_avatar.svg";
import { DropdownBoldIcon, DropdownLightIcon } from "@/app/components/icons";
import { ViewCollectionButton } from "@/app/components/buttons";
import { Divider } from "@/app/components/Divider";
import { useState } from "react";
import clsx from "clsx";
import { Popover } from "antd";

const TransactionDesktop = ({ idx }: { idx: number }) => {
  return (
    <div className="flex py-3 justify-between items-center self-stretch">
      <span className="text-base font-normal leading-[19px] w-[40px] text-[#f1f1f1]">
        {idx + 1}
      </span>
      <div className="flex w-[200px] items-center gap-[10px]">
        <Image
          src={cypherAvatar}
          alt=""
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="text-[#f1f1f1] text-sm font-normal leading-[32px] flex-1">
          Vietnam Cypher
        </span>
      </div>
      <span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
        0.01 ETH
      </span>
      <span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#6CFF7B]">
        50%
      </span>
      <span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
        10,000
      </span>
      <span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
        6,868 ETH
      </span>
    </div>
  );
};

const TransactionMobile = ({ idx }: { idx: number }) => {
  return (
    <div className="flex py-3 justify-between items-center self-stretch">
      <span className="text-base font-normal leading-[19px] w-[40px] text-[#f1f1f1]">
        {idx + 1}
      </span>
      <div className="flex min-[320px]:w-[160px] items-center gap-1">
        <Image
          src={cypherAvatar}
          alt=""
          width={36}
          height={36}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="self-stretch text-sm font-normal text-[#f1f1f1]">
            Vietnam Cypher...
          </span>
          <div className="flex justify-center items-end gap-1">
            <span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
              Floor
            </span>
            <span className="text-sm text-[#f1f1f1] font-normal leading-[16px] whitespace-nowrap">
              0.01 ETH
            </span>
            <span className="text-sm text-[#6CFF7B] font-normal leading-[16px] text-right">
              50%
            </span>
          </div>
          <div className="flex justify-center items-end gap-1">
            <span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
              Item
            </span>
            <span className="text-sm text-[#f1f1f1] font-normal leading-[16px]">
              10,000
            </span>
          </div>
        </div>
      </div>
      <span className="text-sm text-right w-[90px] font-normal leading-[16px] text-[#f1f1f1]">
        6,868 ETH
      </span>
    </div>
  );
};

const mockArray = [0, 1, 2, 3, 4];

export const RankingTable = () => {
  const [dateFilter, setDateFilter] = useState("24h");
  const [openCategories, setOpenCategories] = useState(false);
  const [openChains, setOpenChains] = useState(false);

  const hideCategories = () => {
    setOpenCategories(false);
  };

  const handleOpenCategories = (newOpen: boolean) => {
    setOpenCategories(newOpen);
  };

  const hideChains = () => {
    setOpenChains(false);
  };

  const handleOpenChains = (newOpen: boolean) => {
    setOpenChains(newOpen);
  };

  return (
    <div className="flex pb-6 flex-col items-start gap-6 w-full">
      <div className="flex items-start content-start gap-[10px] self-stretch flex-wrap md:flex-nowrap md:justify-between">
        {/* Categories filter */}
        <div className="flex w-full md:w-fit gap-3">
          <Popover
            content={<a onClick={hideCategories}>Close</a>}
            title="Title"
            trigger="click"
            open={openCategories}
            onOpenChange={handleOpenCategories}
            arrow={false}
            placement="bottom"
          >
            <div className="w-full flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] md:w-[200px]">
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                All categories
              </span>
              <DropdownBoldIcon />
            </div>
          </Popover>

          <div className="hidden w-full md:flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] md:w-[160px]">
            <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
              All chains
            </span>
            <DropdownBoldIcon />
          </div>
        </div>
        <div className="flex w-full md:w-fit gap-[10px]">
          <div className="md:hidden w-full flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E]">
            <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
              All chains
            </span>
            <DropdownBoldIcon />
          </div>
          <div className="xl:hidden w-full flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] md:w-[120px]">
            <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
              24h
            </span>
            <DropdownLightIcon />
          </div>
          <div className="hidden xl:flex p-1 items-start gap-2 rounded-xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "1h" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("1h")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                1h
              </span>
            </div>
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "6h" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("6h")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                6h
              </span>
            </div>
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "24h" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("24h")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                24h
              </span>
            </div>
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "7d" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("7d")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                7d
              </span>
            </div>
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "30d" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("30d")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                30d
              </span>
            </div>
            <div
              className={clsx(
                "flex py-2 px-3 justify-center items-center gap-[10px] rounded-xl transition-all",
                dateFilter === "All" && "bg-[#2D313E]"
              )}
              onClick={() => setDateFilter("All")}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                All
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Table Mobile */}
      <div className="md:hidden w-full">
        <div className="flex w-full p-6 flex-col justify-center items-center gap-3 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
          <div className="flex py-3 justify-between items-center self-stretch">
            <span className="min-[320px]:w-[40px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
              #
            </span>
            <span className="min-[320px]:w-[160px] text-left text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Collection
            </span>
            <span className="min-[320px]:w-[90px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Volume
            </span>
          </div>
          <Divider />
          {mockArray.map((item, idx) => (
            <>
              <TransactionMobile idx={idx} />
              <Divider />
            </>
          ))}
          <div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
            <ViewCollectionButton
              title="Load more"
              isIconHidden
              className="max-w-[189px]"
            />
          </div>
        </div>
      </div>
      {/* Table Desktop */}
      <div className="hidden md:flex w-full">
        <div className="flex w-full p-6 flex-col justify-center items-center gap-3 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
          <div className="flex py-3 justify-between items-center self-stretch">
            <span className="w-[40px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Rank
            </span>
            <span className="w-[200px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Collection
            </span>
            <span className="w-[70px] text-left text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Floor Price
            </span>
            <span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
              % Change
            </span>
            <span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Items
            </span>
            <span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
              Volume
            </span>
          </div>
          <Divider />
          {mockArray.map((item, idx) => (
            <>
              <TransactionDesktop idx={idx} />
              <Divider />
            </>
          ))}
          <div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
            <ViewCollectionButton
              title="Load more"
              isIconHidden
              className="max-w-[189px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
