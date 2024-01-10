import { twMerge } from "tailwind-merge";

export const DefaultButton = ({ className, textStyle, title, onClick }) => {
  return (
    <div
      className={twMerge(
        "flex h-12 w-full items-center justify-center gap-1 rounded-2xl bg-[#f1f1f1] px-6 py-3 text-[#0D0E12] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <span className={twMerge("text-base font-bold", textStyle)}>{title}</span>
    </div>
  );
};
