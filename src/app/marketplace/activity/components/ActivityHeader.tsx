import { CollectionChain } from "@/app/models/collectionRanking";
import { CurrencyType } from "@/app/models/currency";
import {
  ActivityEvent,
  CollectionActivity,
} from "@/app/models/marketplaceActivity";
import Image from "next/image";

export const ActivityHeader = ({
  openFilter,
  eventType,
  collectionFilter,
  chainFilter,
  currencyFilter,
}: {
  openFilter: React.Dispatch<React.SetStateAction<boolean>>;
  eventType: ActivityEvent[];
  collectionFilter: CollectionActivity[];
  chainFilter: CollectionChain[];
  currencyFilter: CurrencyType[];
}) => {
  return (
    <div className="flex w-full justify-between items-center py-3">
      <span className="text-[32px] font-bold text-[#f1f1f1]">Activity</span>
      <div
        className="relative flex flex-col justify-center items-center p-3 rounded-2xl border-[1px] border-[#2D313E] w-[48px] h-[48px] cursor-pointer hover:bg-[#3C3D4D] transition-all lg:w-[147px] lg:px-6 lg:flex-row lg:gap-1"
        onClick={() => openFilter(true)}
      >
        <span className="hidden lg:flex text-base font-bold leading-[19px]">
          All Filters
        </span>
        <div className="relative flex justify-center items-center w-6 h-6">
          <Image src="/svg/filter.svg" alt="" fill />
        </div>
        <div className="lg:hidden absolute right-[-5px] top-[-6px] flex justify-center items-center rounded-xl bg-[#24C3BC]">
          <span className="flex justify-center items-center w-6 h-6 text-sm text-center text-[#f1f1f1]">
            {eventType.length +
              collectionFilter.length +
              chainFilter.length +
              currencyFilter.length}
          </span>
        </div>
      </div>
    </div>
  );
};
