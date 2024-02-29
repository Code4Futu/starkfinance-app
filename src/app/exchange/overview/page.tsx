"use client";

import { Divider } from "@/app/exchange/components/Divider";
// import { DefaultButton } from "../liquidity/components/DefaultButton";
import {
	ChartDetail,
	ChartDetailDesktop,
	LineChart,
	SfnInformation,
	TopPairs,
	TopToken,
} from "./components";
import ComingSoonPage from "@/app/components/ComingSoon";

export default function Overview() {
	function formatTimestamp(timestamp?: any) {
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

		const formattedDate = new Intl.DateTimeFormat(
			"en-US",
			options as any
		).format(date);
		return formattedDate;
	}

	return <ComingSoonPage />;

	// return (
	// 	<div className="flex w-full flex-col gap-6 px-6 py-9 pb-[116px] text-white md:items-center min-[1600px]:py-[72px] min-[1600px]:pb-0">
	// 		<div className="flex w-full max-w-[1088px] flex-col items-start gap-3">
	// 			<div className="hidden gap-6 min-[1600px]:flex">
	// 				<ChartDetailDesktop className="h-[387px] w-[532px]" />
	// 				<div className="flex !h-[387px] w-[532px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
	// 					<div className="flex items-end">
	// 						<span className="text-xl font-bold text-[#f1f1f1]">TVL</span>
	// 					</div>
	// 					<Divider />
	// 					<div className="flex flex-col items-start gap-1">
	// 						<span className="text-xl font-bold text-[#f1f1f1]">$686.86k</span>
	// 						<span className="text-xs font-medium text-[#c6c6c6]">
	// 							{formatTimestamp()} (UTC)
	// 						</span>
	// 					</div>
	// 					<LineChart />
	// 				</div>
	// 			</div>
	// 			<div className="flex w-full min-[1600px]:hidden">
	// 				<ChartDetail className="" />
	// 			</div>
	// 		</div>
	// 		<div className="flex h-[375px] w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 min-[1600px]:hidden">
	// 			<div className="flex items-end">
	// 				<span className="text-xl font-bold text-[#f1f1f1]">TVL</span>
	// 			</div>
	// 			<Divider />
	// 			<div className="flex flex-col items-start gap-1">
	// 				<span className="text-xl font-bold text-[#f1f1f1]">$686.86k</span>
	// 				<span className="text-xs font-medium text-[#c6c6c6]">
	// 					{formatTimestamp()} (UTC)
	// 				</span>
	// 			</div>
	// 			<LineChart />
	// 		</div>
	// 		<SfnInformation />
	// 		<div className="flex w-full flex-col items-center gap-9 self-stretch md:justify-center">
	// 			<div className="flex w-full max-w-[1088px] items-start gap-3">
	// 				<DefaultButton
	// 					title="Trade SFN Token"
	// 					className="button-linear-1 md:max-w-[178px]"
	// 					textStyle="text-[#1A1C24] text-base font-bold max-[480px]:text-sm"
	// 					onClick={() => {}}
	// 				/>
	// 				<DefaultButton
	// 					title="Add Liquidity"
	// 					className="md:w-[151px]"
	// 					textStyle="text-[#0D0E12] text-base font-bold max-[480px]:text-sm"
	// 					onClick={() => {}}
	// 				/>
	// 			</div>
	// 			<span className="self-stretch text-2xl font-bold text-[#f1f1f1] md:hidden">
	// 				Top Tokens
	// 			</span>
	// 			<div className="hidden w-[1088px] items-start md:flex">
	// 				<span className="self-stretch text-2xl font-bold text-[#f1f1f1]">
	// 					Top Tokens
	// 				</span>
	// 			</div>
	// 			<TopToken />
	// 			<span className="self-stretch text-2xl font-bold text-[#f1f1f1] md:hidden">
	// 				Top Pairs
	// 			</span>
	// 			<div className="hidden w-[1088px] items-start md:flex">
	// 				<span className="self-stretch text-2xl font-bold text-[#f1f1f1]">
	// 					Top Pairs
	// 				</span>
	// 			</div>
	// 			<TopPairs />
	// 		</div>
	// 	</div>
	// );
}
