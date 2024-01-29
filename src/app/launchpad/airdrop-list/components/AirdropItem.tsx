"use client";
import Image from "next/image";
import Link from "next/link";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";
import { IAirdrop } from "@/app/types";
import dayjs from "dayjs";
import clsx from "clsx";
import Status from "../../components/Status";
import { DividerVertical } from "@/app/components/HomepageCarousel";

export default function AirdropItem({ airdrop }: { airdrop: IAirdrop }) {
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
				airdrop.start * 1000,
				airdrop.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [airdrop.start, airdrop.end]);

	return (
		<Link
			href={`/launchpad/airdrop-list/${airdrop.address}`}
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
					<Status start={airdrop.start} end={airdrop.end} />
				</div>
			</div>

			<div className="p-6 flex flex-col gap-3 md:gap-6">
				<div className="flex justify-stretch gap-3">
					<div className="w-[60px] h-[60px] relative">
						<Image alt="image" src="/tokens/sfn.png" fill />
					</div>
					<div className="flex-1 flex flex-col justify-between gap-2">
						<div className="text-[20px] font-bold line-clamp-1">
							{airdrop.name}
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<div className="flex items-center bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<div className="w-[18px] h-[18px] relative">
									<Image
										src={`/wallets/${airdrop.chainKey}.png`}
										alt="starknet"
										fill
									/>
								</div>
								<div className="text-[12px] text-[#F1F1F1] capitalize">
									{airdrop.chainKey}
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
								{airdrop.type}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-[18px] md:p-6">
					<div className="flex flex-col gap-3">
						<div className="flex flex-1 justify-between gap-1 border-b border-b-[#2D313E] pb-3">
							<div className="text-xs font-normal leading-[14px] text-[#C6C6C6] md:text-sm md:leading-[16px]">
								Total airdrop
							</div>
							<div className="text-sm leading-[16px] md:text-base md:leading-[19px] font-bold">
								{numberWithCommas(
									ethers
										.formatUnits(
											airdrop.totalAirdropAmount,
											airdrop.tokenAirdrop.decimals
										)
										.toString()
								)}{" "}
								{airdrop.tokenAirdrop.symbol}
							</div>
						</div>
					</div>
					<div className="border-t border-t-[#2D313E] pt-3">
						<span className="text-xs font-normal leading-[14px] text-[#c6c6c6] md:text-sm md:leading-[16px]">
							Airdrop {statusToText(timeStartDiff.status)}
						</span>
						<div className="flex items-center justify-between">
							<div>
								<span className="countdown font-bold text-xs md:text-base">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
								</span>{" "}
								<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
									days
								</span>
							</div>
							<span className="text-sm md:text-base font-bold leading-[19px]">
								:
							</span>
							<div>
								<span className="countdown font-bold text-xs md:text-base">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
								</span>{" "}
								<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
									hrs
								</span>
							</div>
							<span className="text-sm md:text-base font-bold leading-[19px]">
								:
							</span>
							<div>
								<span className="countdown font-bold text-xs md:text-base">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
								</span>{" "}
								<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
									mins
								</span>
							</div>
							<span className="text-sm md:text-base font-bold leading-[19px]">
								:
							</span>
							<div>
								<span className="countdown font-bold text-xs md:text-base">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.s ?? 0 }}></span>
								</span>{" "}
								<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
									secs
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
