"use client";
import Image from "next/image";
import Link from "next/link";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";
import { ILaunchpad } from "@/app/types";
import dayjs from "dayjs";
import clsx from "clsx";
import Status from "../../components/Status";
import { DividerVertical } from "@/app/components/HomepageCarousel";
import CountDown from "@/app/components/CountDown";

export default function LaunchpadItem({
	launchpad,
}: {
	launchpad: ILaunchpad;
}) {
	const [timeStartDiff, setTimeStartDiff] = useState<{
		d: number;
		h: number;
		m: number;
		s: number;
		status: undefined | LAUNCHPAD_STATUS;
	}>({
		d: 0,
		h: 0,
		m: 0,
		s: 0,
		status: undefined,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const time = timeDiff(
				Date.now(),
				launchpad.start * 1000,
				launchpad.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [launchpad.start, launchpad.end]);

	return (
		<Link
			href={`/launchpad/launchpad-list/${launchpad.address}`}
			className="rounded-3xl bg-[#1A1C24] border border-[#2D313E] overflow-hidden"
		>
			<div className="w-full pt-[50%] relative rounded-2xl rounded-b-none">
				<Image alt="image" src="/mocks/banner2.png" fill />
				{/* <div className="absolute top-3 left-3 p-3 rounded-xl bg-[#0D0E12] ">
					<div className="text-2xl text-[#F1F1F1] font-bold">
						{dayjs(launchpad.start * 1000).format("DD")}
					</div>
					<div className="text-sm text-[#C6C6C6]">
						{dayjs(launchpad.start).format("MMM")}
					</div>
				</div> */}

				<div className="absolute  top-[6px] left-[6px] rounded-2xl flex flex-wrap items-center gap-2 bg-gradient-to-r bg-dark">
					<Status start={launchpad.start} end={launchpad.end} />
				</div>
			</div>

			<div className="p-6 flex flex-col gap-3 md:gap-6">
				<div className="flex justify-stretch items-center gap-3">
					<div className="w-[51px] h-[51px] md:w-[55px] md:h-[55px] xl:w-[60px] xl:h-[60px] relative">
						<Image alt="image" src="/tokens/sfn.png" fill />
					</div>
					<div className="flex-1 flex flex-col justify-between">
						<div className="text-[20px] font-bold line-clamp-1">
							{launchpad.name}
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<div className="flex items-center bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<div className="w-[18px] h-[18px] relative">
									<Image
										src={`/wallets/${launchpad.chainKey}.png`}
										alt="starknet"
										fill
									/>
								</div>
								<div className="text-[12px] text-[#F1F1F1] capitalize">
									{launchpad.chainKey}
								</div>
							</div>
							{/* <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<div className="w-[18px] h-[18px] relative">
									<Image src="/logo.png" alt="token" fill />
								</div>
								<div className="text-[12px] text-[#F1F1F1]">
									{launchpad.tokenRaise.symbol}
								</div>
							</div> */}
							<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] uppercase">
								{launchpad.type}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-[18px] md:p-6">
					<div className="flex flex-col gap-3">
						<div className="flex flex-1 justify-between gap-1 border-b border-b-[#2D313E] pb-3">
							<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
								Total raise
							</div>
							<div className="text-[14px] md:text-[16px] font-medium">
								{numberWithCommas(launchpad.totalRaiseUSD)} USDT
							</div>
						</div>
						<div className="flex flex-1 justify-between gap-1 border-b border-b-[#2D313E] pb-3">
							<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
								Total sale
							</div>
							<div className="text-[14px] md:text-[16px] font-medium">
								{numberWithCommas(
									ethers
										.formatUnits(
											launchpad.totalSale,
											launchpad.tokenSale.decimals
										)
										.toString()
								)}{" "}
								{launchpad.tokenSale.symbol}
							</div>
						</div>
						<div className="flex flex-1 justify-between gap-1 pb-3">
							<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
								Rate
							</div>
							<div className="text-[14px] md:text-[16px] font-medium">
								1 {launchpad.tokenSale.symbol} ={" "}
								{numberWithCommas(
									+ethers.formatUnits(
										launchpad.totalRaise,
										launchpad.tokenRaise.decimals
									) /
										+ethers.formatUnits(
											launchpad.totalSale,
											launchpad.tokenSale.decimals
										)
								)}{" "}
								{launchpad.tokenRaise.symbol}
							</div>
						</div>
					</div>
					<div className="border-t border-t-[#2D313E] pt-3">
						<span className="text-[12px] md:text-[14px] text-[#c6c6c6]">
							Launchpad {statusToText(timeStartDiff.status)}
						</span>
						<div className="flex items-center justify-between">
							<CountDown start={launchpad.start} end={launchpad.end} />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
