"use client";

import Image from "next/image";
import Link from "next/link";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { BASE_API, LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";
import { ILaunchpad } from "@/app/types";
import dayjs from "dayjs";
import clsx from "clsx";
import { DividerVertical } from "@/app/components/HomepageCarousel";
import Status from "../../components/Status";
import CountDown from "@/app/components/CountDown";

export default function LatestLaunchpad({
	launchpad,
}: {
	launchpad: ILaunchpad | undefined;
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
			if (!launchpad) return;
			const time = timeDiff(
				Date.now(),
				launchpad.start * 1000,
				launchpad.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [launchpad?.start, launchpad?.end]);

	if (!launchpad) return <div className="skeleton h-32"></div>;

	return (
		<div className="rounded-3xl bg-[#1A1C24] overflow-hidden border-2 border-[#24C3BC]">
			<div
				className={clsx(
					"xl:hidden w-[calc(100% + 10px)] pt-[33.33%] relative rounded-2xl "
				)}
			>
				<Image alt="image" src="/mocks/banner.jpeg" fill />
			</div>

			<div className="p-6 flex flex-col gap-3 md:gap-6">
				<div className="flex justify-between items-end self-stretch">
					<div className="flex justify-stretch gap-3">
						<div className="w-[59px] h-[59px] md:w-[66px] md:h-[66px] xl:w-[76px] xl:h-[76px] relative">
							<Image alt="image" src="/tokens/sfn.png" fill />
						</div>
						<div className="flex-1 flex flex-col justify-between">
							<div className="text-[16px] md:text-[20px] xl:text-[24px] font-bold line-clamp-1">
								{launchpad.name}
							</div>
							<div className="flex flex-wrap items-center gap-1.5 md:gap-3">
								<Status status={timeStartDiff.status} />
								<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<div className="w-[18px] h-[18px] relative">
										<Image
											src={`/wallets/${launchpad.chainKey}.png`}
											alt="starknet"
											fill
											sizes="any"
										/>
									</div>
									<div className="text-[12px] text-[#F1F1F1] capitalize font-medium">
										{launchpad.chainKey}
									</div>
								</div>
								{/* <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<Image src="/logo.png" alt="token" width={8} height={8} />
									<div className="text-[12px] text-[#F1F1F1]">
										SFN
									</div>
								</div> */}
								<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] capitalize font-medium">
									{launchpad.type}
								</div>
							</div>
						</div>
					</div>
					<Link
						href={`/launchpad/launchpad-list/${launchpad.address}`}
						className={clsx(
							"hidden w-full md:flex md:max-w-[206px] text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
						)}
					>
						Go to Launchpad now
					</Link>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-11 gap-6">
					<div className="col-span-1 xl:col-span-5 hidden xl:flex ">
						<div className="w-full  pt-[33.33%] relative">
							<Image alt="image" src="/mocks/banner.png" fill />
						</div>
					</div>

					<div className="col-span-1 xl:col-span-6 flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-[18px] md:p-6">
						<div className="flex flex-col md:flex-row justify-between gap-4">
							<div className="flex flex-1 flex-row md:flex-col justify-between md:justify-start md:border-none border-b border-b-[#2D313E] pb-3">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Total raise
								</div>
								<div className="text-[14px] md:text-[16px] font-medium">
									{numberWithCommas(
										ethers
											.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimals
											)
											.toString()
									)}{" "}
									{launchpad.tokenRaise.symbol}
								</div>
							</div>
							<DividerVertical className="hidden md:block" />
							<div className="flex flex-1 flex-row md:flex-col justify-between md:justify-start md:border-none border-b border-b-[#2D313E] pb-3">
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
							<DividerVertical className="hidden md:block" />
							<div className="flex flex-1 flex-row md:flex-col justify-between md:justify-start pb-3">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Rate
								</div>
								<div className="text-[14px] md:text-[16px] font-medium">
									1 {launchpad.tokenRaise.symbol} ={" "}
									{numberWithCommas(
										launchpad.totalRaiseUSD /
											+ethers.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimals
											)
									)}{" "}
									USDT
								</div>
							</div>
						</div>
						<div className="border-t border-t-[#2D313E] pt-3">
							<span className="text-[12px] md:text-[14px] text-[#c6c6c6]">
								Launchpad {statusToText(timeStartDiff.status)}
							</span>
							<div className="flex items-center justify-between md:justify-start gap-1.5 md:gap-6 xl:gap-4">
								<CountDown start={launchpad.start} end={launchpad.end} />
							</div>
						</div>
					</div>
				</div>
				<Link
					href={`/launchpad/launchpad-list/${launchpad.address}`}
					className={clsx(
						"block md:hidden w-full text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
					)}
				>
					Go to Launchpad now
				</Link>
			</div>
		</div>
	);
}
