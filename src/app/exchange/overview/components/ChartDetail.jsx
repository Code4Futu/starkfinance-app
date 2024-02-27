import { twMerge } from "tailwind-merge";
import { Divider } from "../../../components/Divider";
import { ChartBar } from "./Chart";

export const ChartDetail = ({ className }) => {
	function formatTimestamp(timestamp) {
		const date = new Date();
		const options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: "Africa/Abidjan",
		};

		const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
			date
		);
		return formattedDate;
	}

	return (
		<div
			className={twMerge(
				"flex h-[593px] w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 md:h-[573px] min-[1920px]:max-w-[722px]",
				className
			)}
		>
			<span className="self-stretch text-xl font-bold text-[#f1f1f1]">
				Volume
			</span>
			<Divider />
			<div className="flex w-full flex-col gap-3 md:hidden">
				<div className="flex flex-col items-start gap-1">
					<span className="text-xl font-bold text-[#f1f1f1]">$686.86k</span>
					<span className="text-xs font-medium text-[#c6c6c6]">
						{formatTimestamp()} (UTC)
					</span>
				</div>
				<div className="flex items-start gap-2 rounded-md border-[1px] border-[#2D313E] bg-[#0D0E12] max-w-[240px]">
					<div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px] max-[320px]:px-2">
						<span className="text-xs font-medium text-[#f1f1f1]">1D</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] max-[320px]:px-2">
						<span className="text-xs font-medium text-[#f1f1f1]">1W</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] max-[320px]:px-2">
						<span className="text-xs font-medium text-[#f1f1f1]">1M</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] max-[320px]:px-2">
						<span className="text-xs font-medium text-[#f1f1f1]">1Y</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] max-[320px]:px-2">
						<span className="text-xs font-medium text-[#f1f1f1]">ALL</span>
					</div>
				</div>
				<ChartBar />
			</div>
			<div className="hidden w-full justify-between justify-between gap-3 md:flex">
				<div className="flex flex-col items-start gap-1">
					<span className="text-xl font-bold text-[#f1f1f1]">$686.86k</span>
					<span className="text-xs font-medium text-[#c6c6c6]">
						{formatTimestamp()} (UTC)
					</span>
				</div>
				<div className="flex h-[26px] items-start gap-2 rounded-md border-[1px] border-[#2D313E] bg-[#0D0E12]">
					<div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px]">
						<span className="text-xs font-medium text-[#f1f1f1]">1D</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
						<span className="text-xs font-medium text-[#f1f1f1]">1W</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
						<span className="text-xs font-medium text-[#f1f1f1]">1M</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
						<span className="text-xs font-medium text-[#f1f1f1]">1Y</span>
					</div>
					<div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
						<span className="text-xs font-medium text-[#f1f1f1]">ALL</span>
					</div>
				</div>
			</div>
			<ChartBar />
		</div>
	);
};
