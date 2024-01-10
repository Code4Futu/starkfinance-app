import { twMerge } from "tailwind-merge";

export const Divider = ({ className }: { className?: string }) => {
	return (
		<div className={twMerge("h-[1px] w-full bg-[#2D313E]", className)}></div>
	);
};
