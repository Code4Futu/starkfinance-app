"use client";
import { useState } from "react";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { ActivityHeader, BoardActivity } from "./components";
import { ModalActivityFilter } from "@/app/components/modals/ModalActivityFilter";
import {
  ActivityEvent,
  CollectionActivity,
} from "@/app/models/marketplaceActivity";
import { CollectionChain } from "@/app/models/collections";
import { CurrencyType } from "@/app/models/currency";
import clsx from "clsx";

export default function Activity() {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [eventType, setEventType] = useState<ActivityEvent[]>([]);
  const [collectionFilter, setCollectionFilter] = useState<
    CollectionActivity[]
  >([]);
  const [chainFilter, setChainFilter] = useState<CollectionChain[]>([]);
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyType[]>([]);

  // Event Filter
  const onChangeEventTypeFilter = (event: ActivityEvent) => {
    const filter = eventType.find((item) => item === event);
    if (!filter) {
      setEventType([...eventType, event]);
      return;
    }
    setEventType(eventType.filter((item) => item !== event));
  };

  // Collection Filter
  const onChangeCollectionFilter = (col: CollectionActivity) => {
    const filter = collectionFilter.find((item) => item === col);
    if (!filter) {
      setCollectionFilter([...collectionFilter, col]);
      return;
    }
    setCollectionFilter(collectionFilter.filter((item) => item !== col));
  };

  // Chain Filter
  const onChangeChainFilter = (col: CollectionChain) => {
    const filter = chainFilter.find((item) => item === col);
    if (!filter) {
      setChainFilter([...chainFilter, col]);
      return;
    }
    setChainFilter(chainFilter.filter((item) => item !== col));
  };

  // Currency Filter
  const onChangeCurrencyFilter = (col: CurrencyType) => {
    const filter = currencyFilter.find((item) => item === col);
    if (!filter) {
      setCurrencyFilter([...currencyFilter, col]);
      return;
    }
    setCurrencyFilter(currencyFilter.filter((item) => item !== col));
  };

  const handleClearAllFilter = () => {
    setEventType([]);
    setCollectionFilter([]);
    setChainFilter([]);
    setCurrencyFilter([]);
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
        <ActivityHeader
          eventType={eventType}
          collectionFilter={collectionFilter}
          chainFilter={chainFilter}
          currencyFilter={currencyFilter}
          openFilter={setIsOpenFilter}
        />
        <div className="hidden lg:flex items-start justify-start gap-3 flex-wrap max-w-[1088px]">
          {eventType.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
              onClick={() => onChangeEventTypeFilter(item)}
            >
              <span className="text-base font-bold leading-[19px]">{item}</span>
              <CloseIcon />
            </div>
          ))}
          {collectionFilter.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
              onClick={() => onChangeCollectionFilter(item)}
            >
              <span className="text-base font-bold leading-[19px]">{item}</span>
              <CloseIcon />
            </div>
          ))}
          {chainFilter.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
              onClick={() => onChangeChainFilter(item)}
            >
              <span className="text-base font-bold leading-[19px]">{item}</span>
              <CloseIcon />
            </div>
          ))}
          {currencyFilter.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
              onClick={() => onChangeCurrencyFilter(item)}
            >
              <span className="text-base font-bold leading-[19px]">{item}</span>
              <CloseIcon />
            </div>
          ))}
          <div
            onClick={() => handleClearAllFilter()}
            className={clsx(
              "flex justify-center items-center gap-1 py-3 px-6 rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer",
              Number(
                eventType.length +
                  collectionFilter.length +
                  chainFilter.length +
                  currencyFilter.length
              ) === 0 && "hidden"
            )}
          >
            <span className="text-base font-bold">Clear All</span>
          </div>
        </div>
        <BoardActivity />
      </div>
      {isOpenFilter && (
        <ModalActivityFilter
          isShowing={isOpenFilter}
          hide={() => setIsOpenFilter(false)}
          eventType={eventType}
          onChangeEventTypeFilter={onChangeEventTypeFilter}
          collectionFilter={collectionFilter}
          onChangeCollectionFilter={onChangeCollectionFilter}
          chainFilter={chainFilter}
          onChangeChainFilter={onChangeChainFilter}
          currencyFilter={currencyFilter}
          onChangeCurrencyFilter={onChangeCurrencyFilter}
          handleClearAllFilter={handleClearAllFilter}
        />
      )}
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="cursor-pointer"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0068 13.6232L16.048 17.6651C16.2624 17.8795 16.5533 18 16.8566 18C17.1598 18 17.4507 17.8795 17.6651 17.6651C17.8795 17.4507 18 17.1598 18 16.8566C18 16.5533 17.8795 16.2625 17.6651 16.048L13.6224 12.0068L17.6643 7.96567C17.7705 7.85949 17.8546 7.73345 17.9121 7.59474C17.9695 7.45603 17.999 7.30736 17.999 7.15724C17.9989 7.00712 17.9693 6.85847 17.9118 6.71979C17.8544 6.5811 17.7701 6.4551 17.6639 6.34897C17.5578 6.24284 17.4317 6.15867 17.293 6.10125C17.1543 6.04383 17.0056 6.0143 16.8555 6.01433C16.7054 6.01437 16.5567 6.04397 16.4181 6.10145C16.2794 6.15894 16.1534 6.24317 16.0472 6.34935L12.0068 10.3905L7.96566 6.34935C7.86026 6.24013 7.73417 6.15299 7.59474 6.09301C7.45531 6.03304 7.30533 6.00144 7.15355 6.00005C7.00177 5.99866 6.85124 6.02751 6.71073 6.08492C6.57023 6.14233 6.44256 6.22714 6.33518 6.33442C6.2278 6.4417 6.14287 6.56928 6.08533 6.70974C6.02778 6.85019 5.99879 7.00069 6.00004 7.15247C6.00129 7.30425 6.03275 7.45426 6.09259 7.59375C6.15243 7.73323 6.23945 7.85941 6.34858 7.96491L10.3913 12.0068L6.34934 16.048C6.1349 16.2625 6.01443 16.5533 6.01443 16.8566C6.01443 17.1598 6.1349 17.4507 6.34934 17.6651C6.56378 17.8795 6.85462 18 7.15788 18C7.46114 18 7.75198 17.8795 7.96642 17.6651L12.0068 13.6224V13.6232Z"
        fill="#F1F1F1"
      />
    </svg>
  );
};
