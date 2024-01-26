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
			className="flex flex-col gap-6 p-3 border rounded-3xl border-[#24C3BC] bg-[#1A1C24]"
		>
			<div className="w-full pt-[50%] relative rounded-2xl overflow-hidden">
				<Image alt="image" src="/mocks/banner.png" fill />
				<div className="absolute top-3 left-3 p-3 rounded-xl bg-[#0D0E12] ">
					<div className="text-2xl text-[#F1F1F1] font-bold">
						{dayjs(launchpad.start * 1000).format("DD")}
					</div>
					<div className="text-sm text-[#C6C6C6]">
						{dayjs(launchpad.start).format("MMM")}
					</div>
				</div>

				<div className="absolute top-3 right-3 rounded-2xl flex flex-wrap items-center gap-2 bg-gradient-to-r bg-dark">
					<Status status={timeStartDiff.status} />
				</div>
			</div>

			<div className="flex justify-stretch gap-3">
				<div className="w-[60px] h-[60px] relative">
					<Image alt="image" src="/logo80x80.png" fill />
				</div>
				<div className="flex-1 flex flex-col justify-between gap-2">
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
						<div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<div className="w-[18px] h-[18px] relative">
								<Image src="/logo.png" alt="token" fill />
							</div>
							<div className="text-[12px] text-[#F1F1F1]">
								{launchpad.tokenRaise.symbol}
							</div>
						</div>
						<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] uppercase">
							{launchpad.type}
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
				<div className="flex flex-col justify-between gap-4">
					<div className="flex justify-between items-center border-b border-b-[#2D313E] pb-3">
						<div className="text-[12px] text-[#C6C6C6]">Total raise</div>
						<div className="text-[14px] font-bold">
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
					<div className="flex justify-between items-center border-b border-b-[#2D313E] pb-3">
						<div className="text-[12px] text-[#C6C6C6]">Total sale</div>
						<div className="text-[14px] font-bold">
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

					<div className="flex justify-between items-center pb-3">
						<div className="text-[12px] text-[#C6C6C6]">Rate</div>
						<div className="text-[14px] font-bold">
							1 {launchpad.tokenRaise.symbol} ={" "}
							{numberWithCommas(
								+ethers.formatUnits(
									launchpad.totalSale,
									launchpad.tokenSale.decimals
								) /
									+ethers.formatUnits(
										launchpad.totalRaise,
										launchpad.tokenRaise.decimals
									)
							)}{" "}
							{launchpad.tokenSale.symbol}
						</div>
					</div>
				</div>

				<div className="border-t border-b-[#2D313E] pt-3">
					<div className="mb-2.5">
						Launchpad {statusToText(timeStartDiff.status)}
					</div>
					<div className="flex justify-between">
						<div>
							<span className="countdown font-bold text-md">
								{/* @ts-expect-error */}
								<span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
							</span>
							days
						</div>
						<div>
							<span className="countdown font-bold text-md">
								{/* @ts-expect-error */}
								<span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
							</span>
							hrs
						</div>
						<div>
							<span className="countdown font-bold text-md">
								{/* @ts-expect-error */}
								<span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
							</span>
							mins
						</div>
						<div>
							<span className="countdown font-bold text-md">
								{/* @ts-expect-error */}
								<span style={{ "--value": timeStartDiff?.s ?? 0 }}></span>
							</span>
							secs
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
