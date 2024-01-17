import { CustomizeCarousel } from "./CustomizeCarousel";

export const PopularCollections = () => {
  return (
    <div className="flex flex-col items-start gap-6">
      <span className="text-2xl font-bold text-[#f1f1f1]">
        Popular Collections
      </span>
      <div className="max-w-[calc(100vw-48px)] lg:max-w-[calc(100vw-335px)] xl:max-w-[1080px] flex">
        <CustomizeCarousel />
      </div>
    </div>
  );
};
