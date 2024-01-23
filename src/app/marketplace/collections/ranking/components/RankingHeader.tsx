import { ViewCollectionButton } from "@/app/components/buttons";

export const RankingHeader = () => {
  return (
    <div className="flex flex-col w-full md:flex-row md:justify-between">
      <span className="text-[32px] font-bold text-[#f1f1f1]">Collections</span>
      <div className="flex justify-end items-start gap-3 self-stretch">
        <ViewCollectionButton
          title="Volume"
          className="py-3 px-6 w-full"
          isIconHidden
          url="/"
        />
        <ViewCollectionButton
          title="Trending"
          className="py-3 px-6 w-full !bg-transparent border-[1px] border-[#2D313E]"
          textStyle="text-[#f1f1f1]"
          isIconHidden
          url="/"
        />
      </div>
    </div>
  );
};
