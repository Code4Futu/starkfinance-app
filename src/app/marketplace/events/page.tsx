"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { FilterEventSwiper, LatestEvent } from "./components";
import { IEvent, EventStatus } from "@/app/models/events";
import { useState } from "react";
import { Divider } from "@/app/components/Divider";
import { Event } from "./components/Event";
import { mock } from "node:test";

export default function Events() {
  const [eventFilter, setEventFilter] = useState<string>("All");

  const handleOnchangeEventFilter = (event: EventStatus) => {
    setEventFilter(event);
  };

  const handleFilterAll = () => {
    setEventFilter("All");
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { text: "Marketplace", icon: "/svg/market.svg", url: "/" },
          { text: "Activity" },
        ]}
      />
      <div className="flex pt-6 flex-col gap-3 md:gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
        <div className="flex w-full justify-between items-center py-3">
          <span className="text-[32px] font-bold text-[#f1f1f1]">
            Event Minting
          </span>
        </div>

        {/* Lastest Event */}
        <LatestEvent event={mocktEvent()[0]} />

        <FilterEventSwiper
          eventFilter={eventFilter}
          handleOnchangeEventFilter={handleOnchangeEventFilter}
          handleFilterAll={handleFilterAll}
        />

        <Divider />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-col items-start gap-6 pb-6">
          {mocktEvent().map((item, idx) => (
            <Event key={idx} event={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const mocktEvent = (): IEvent[] => [
  {
    chainKey: "starknet",

    name: "Starksport NFT",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "10,000",

    floor: 0.0001,

    volume: 40.55,

    logo: "/svg/event_avatar.svg",

    banner: "/svg/event_promote.svg",

    minted: 1622,

    price: 0.0013,
  },
  {
    chainKey: "starknet",

    name: "Premier League 2023 - 2024",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "No limit",

    floor: 0.0001,

    volume: 40.55,

    logo: "/svg/manchesterUnited.svg",

    banner: "/svg/manchesterCity.svg",

    minted: 1622,

    price: 0.0013,
  },
  {
    chainKey: "starknet",

    name: "Premier League 2023 - 2024",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "No limit",

    floor: 0.0001,

    volume: 40.55,

    logo: "/svg/manchesterUnited.svg",

    banner: "/svg/manchesterCity.svg",

    minted: 1622,

    price: 0.0013,
  },
  {
    chainKey: "starknet",

    name: "Premier League 2023 - 2024",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "No limit",

    floor: 0.0001,

    volume: 40.55,

    logo: "/svg/manchesterUnited.svg",

    banner: "/svg/manchesterCity.svg",

    minted: 1622,

    price: 0.0013,
  },
];
