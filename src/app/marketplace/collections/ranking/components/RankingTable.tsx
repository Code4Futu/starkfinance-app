"use client";

import Image from "next/image";
import { useState } from "react";
import { Popover } from "antd";

import { DropdownBoldIcon, DropdownLightIcon } from "@/app/components/icons";
import { ChainButton, ViewCollectionButton } from "@/app/components/buttons";
import { Divider } from "@/app/components/Divider";
import { DateFilter, dateFilters } from "@/app/models/dateFilter";
import { DateFilterItem } from "@/app/components/DateFilterItem";
import {
  CollectionCategory,
  CollectionChain,
  collectionCategories,
} from "@/app/models/collectionRanking";

const mockArray = [0, 1, 2, 3, 4];

export type CheckboxOnChange = (value: string) => void;

export const RankingTable = ({
  dateFilter,
  setDateFilter,
  collectionCategory,
  setCollectionCategory,
  chain,
  setChain,
}: {
  dateFilter: DateFilter;
  setDateFilter: React.Dispatch<React.SetStateAction<DateFilter>>;
  collectionCategory: CollectionCategory;
  setCollectionCategory: React.Dispatch<
    React.SetStateAction<CollectionCategory>
  >;
  chain: CollectionChain;
  setChain: React.Dispatch<React.SetStateAction<CollectionChain>>;
}) => {
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openSelectDate, setOpenSelectDate] = useState<boolean>(false);

  const handleOpenCategories = (newOpen: boolean) => {
    setOpenCategories(newOpen);
  };

  const handleOpenSelectDate = (newOpen: boolean) => {
    setOpenSelectDate(newOpen);
  };

  return (
    <div className="flex pb-6 flex-col items-start gap-6 w-full">
      <div className="flex items-start content-start gap-[10px] self-stretch flex-wrap md:flex-nowrap md:justify-between">
        {/* Categories filter */}
        <div className="flex w-full md:w-fit gap-3">
          <Popover
            content={
              <div className="flex p-3 flex-col items-center justify-center gap-[6px] rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
                {collectionCategories().map((item, idx) => (
                  <div
                    key={idx}
                    className="flex py-3 px-6 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all"
                    onClick={() => setCollectionCategory(item.value)}
                  >
                    <span className="text-base leading-[19px] text-[#f1f1f1]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            }
            trigger="click"
            open={openCategories}
            onOpenChange={handleOpenCategories}
            arrow={false}
            placement="bottom"
          >
            <div className="w-full flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#3C3D4D] transition-all cursor-pointer md:w-[200px]">
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                All categories
              </span>
              <DropdownBoldIcon />
            </div>
          </Popover>
          <ChainButton
            chain={chain}
            setChain={setChain}
            className="hidden md:flex"
          />
        </div>
        <div className="flex w-full md:w-fit gap-[10px]">
          <ChainButton
            chain={chain}
            setChain={setChain}
            className="md:hidden flex"
          />
          <Popover
            content={
              <div className="flex p-3 flex-col items-center justify-center gap-[6px] rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
                {dateFilters().map((item, idx) => (
                  <div
                    key={idx}
                    className="flex py-3 px-6 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all"
                    onClick={() => setDateFilter(item.value)}
                  >
                    <span className="text-base leading-[19px] text-[#f1f1f1]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            }
            trigger="click"
            open={openSelectDate}
            onOpenChange={handleOpenSelectDate}
            arrow={false}
            placement="bottom"
          >
            <div className="xl:hidden w-full flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#3C3D4D] transition-all cursor-pointer md:w-[120px]">
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                24h
              </span>
              <DropdownLightIcon />
            </div>
          </Popover>
          <div className="hidden xl:flex p-1 items-start gap-2 rounded-xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
            <DateFilterItem
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
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
            <div className="w-full" key={idx}>
              <TransactionMobile idx={idx} />
              <Divider />
            </div>
          ))}
          <div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
            <ViewCollectionButton
              title="Load more"
              isIconHidden
              className="max-w-[189px]"
              url="/"
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
            <div className="w-full" key={idx}>
              <TransactionDesktop idx={idx} />
              <Divider />
            </div>
          ))}
          <div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
            <ViewCollectionButton
              title="Load more"
              isIconHidden
              className="max-w-[189px]"
              url="/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionDesktop = ({ idx }: { idx: number }) => {
  return (
    <div className="flex py-3 justify-between items-center self-stretch">
      <span className="text-base font-normal leading-[19px] w-[40px] text-[#f1f1f1]">
        {idx + 1}
      </span>
      <div className="flex w-[200px] items-center gap-[10px]">
        <div className="relative w-9 h-9 rounded-lg">
          <Image src="/svg/cypher_avatar.svg" alt="" fill />
        </div>
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
        <div className="relative rounded-lg w-9 h-9">
          <Image src="/svg/cypher_avatar.svg" alt="" fill />
        </div>
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
