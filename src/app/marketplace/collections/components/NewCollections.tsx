import { CustomizeCarousel } from "./CustomizeCarousel";

export const NewCollections = () => {
  return (
    <div className="flex flex-col items-start gap-6">
      <span className="text-2xl font-bold text-[#f1f1f1]">New Collections</span>
      <CustomizeCarousel />
    </div>
  );
};
