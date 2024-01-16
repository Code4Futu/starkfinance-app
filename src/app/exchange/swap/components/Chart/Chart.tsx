"use client";

import { useState } from "react";
import icons from "@/app/exchange/assets/icons";
import { Divider } from "@/app/exchange/components/Divider";
import { SwapParallel } from "../icons/SwapParallel";
import { ExampleChart } from "./ExampleChart";
import { twMerge } from "tailwind-merge";
// import { ChartBar } from "../../../../components/modals/chart-bar-modal/components/Chart";

export const ChartDesktop = () => {
	const [time, setTime] = useState("24h");

	const checkIcon = (name: string) => {
		switch (name) {
			case "ETH":
				return icons.v2.eth_logo.src;
			case "WBTC":
				return icons.v2.btc.src;
			case "DAI":
				return icons.v2.dai.src;
			case "USDC":
				return icons.v2.usdc.src;
			case "USDT":
				return icons.v2.usdt.src;
			case "ADA":
				return icons.v2.ada.src;
			case "SFN":
				return icons.v2.logo_noname.src;
			default:
				return;
		}
	};
	return (
		<>
			<div className="flex items-end justify-between self-stretch">
				<div className="flex items-center gap-[6px]">
					<img
						// src={checkIcon(token0.name)}
						alt="Starknet Logo"
						className="h-6 w-6"
					/>
					<img
						// src={checkIcon(token1.name)}
						alt="Starknet Logo"
						className="h-6 w-6"
					/>
					<div className="flex items-center gap-1">
						<span className="text-xl font-bold text-[#F1F1F1]">
							{/* {token0.name} / {token1.name} */}
						</span>
						{/* <SwapParallel handleChangeToken={handleChangeToken} /> */}
					</div>
				</div>
				<span className="text-xl font-bold leading-[28px] text-[#F1F1F1]">
					Price
				</span>
			</div>
			<Divider />
			<div className="flex flex-col items-start gap-3 self-stretch md:flex-row md:justify-between md:flex-wrap">
				<div className="flex flex-col items-start gap-1">
					<div className="flex items-end gap-1">
						<span className="text-2xl font-bold text-[#F1F1F1] leading-[28px]">
							{/* {vol} */}0
						</span>
						<span className="text-base font-bold text-[#F1F1F1] leading-[19px]">
							{/* {token0.name}/{token1.name} */}
						</span>
						<span className="text-base font-bold text-[#6CFF7B] leading-[19px]">
							+6.86%
						</span>
					</div>
					<span className="text-sm font-normal text-[#C6C6C6] leading-[16px]">
						{/* {dateCurrent} (UTC) */}
					</span>
				</div>
				<div className="flex items-start gap-2 rounded-md	border-[1px] border-[#2D313E] bg-[#0D0E12]">
					<div
						className={twMerge(
							"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
							time === "24h" && "bg-[#2D313E]"
						)}
						onClick={() => setTime("24h")}
					>
						<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
							24h
						</span>
					</div>
					<div
						className={twMerge(
							"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
							time === "1W" && "bg-[#2D313E]"
						)}
						onClick={() => setTime("1W")}
					>
						<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
							1W
						</span>
					</div>
					<div
						className={twMerge(
							"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
							time === "1M" && "bg-[#2D313E]"
						)}
						onClick={() => setTime("1M")}
					>
						<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
							1M
						</span>
					</div>
					<div
						className={twMerge(
							"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
							time === "1Y" && "bg-[#2D313E]"
						)}
						onClick={() => setTime("1Y")}
					>
						<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
							1Y
						</span>
					</div>
					<div
						className={twMerge(
							"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
							time === "ALL" && "bg-[#2D313E]"
						)}
						onClick={() => setTime("ALL")}
					>
						<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
							ALL
						</span>
					</div>
				</div>
			</div>
			{/* <Chart /> */}
			<ExampleChart />
			{/* <ChartBar /> */}
		</>
	);
};
