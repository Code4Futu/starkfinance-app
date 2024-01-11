import clsx from "clsx";

export const Divider = ({ className }: { className?: string }) => {
  return <div className={clsx("h-[1px] w-full bg-[#2D313E]", className)}></div>;
};
