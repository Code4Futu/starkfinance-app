"use client";
import { useState } from "react";
import clsx from "clsx";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { RankingTable } from "./components";
import { Divider } from "@/app/components/Divider";
import { ViewCollectionButton } from "@/app/components/buttons";
import {
  CollectionOrder,
  CollectionCategory,
  CollectionChain,
} from "@/app/models/collectionRanking";
import { DateFilter } from "@/app/models/dateFilter";

const defaultTab: CollectionOrder = "volume";

export default function CollectionRanking() {
  const [selectedTab, setSelectedTab] = useState<CollectionOrder>(defaultTab);
  const [dateFilter, setDateFilter] = useState<DateFilter>("24h");
  const [collectionCategory, setCollectionCategory] =
    useState<CollectionCategory>("all");
  const [chain, setChain] = useState<CollectionChain>("starknet");

  return (
    <div>
      <Breadcrumbs
        items={[
          { text: "Marketplace", icon: "/svg/market.svg", url: "/" },
          { text: "Collections" },
          { text: "All" },
        ]}
      />
      <div className="flex flex-col gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
        <div className="flex flex-col items-start gap-3 w-full">
          <div className="flex flex-col w-full md:flex-row md:justify-between">
            <span className="text-[32px] font-bold text-[#f1f1f1]">
              Collections
            </span>
            <div className="flex justify-end items-start gap-3 self-stretch">
              <ViewCollectionButton
                title="Volume"
                className={clsx("py-3 px-6 w-full", {
                  "!bg-transparent border-[1px] border-[#2D313E]":
                    selectedTab === "trending",
                })}
                textStyle={clsx({
                  "text-[#f1f1f1]": selectedTab === "trending",
                })}
                onClick={() => setSelectedTab("volume")}
                isIconHidden
              />
              <ViewCollectionButton
                title="Trending"
                className={clsx("py-3 px-6 w-full", {
                  "!bg-transparent border-[1px] border-[#2D313E]":
                    selectedTab === "volume",
                })}
                textStyle={clsx({
                  "text-[#f1f1f1]": selectedTab === "volume",
                })}
                onClick={() => setSelectedTab("trending")}
                isIconHidden
              />
            </div>
          </div>
          <Divider />
          <RankingTable
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            collectionCategory={collectionCategory}
            setCollectionCategory={setCollectionCategory}
            chain={chain}
            setChain={setChain}
          />
        </div>
      </div>
    </div>
  );
}
