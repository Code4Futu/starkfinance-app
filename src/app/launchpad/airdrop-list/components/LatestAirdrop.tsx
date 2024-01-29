"use client";

import Image from "next/image";
import Link from "next/link";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { BASE_API, LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";
import { IAirdrop } from "@/app/types";
import dayjs from "dayjs";
import clsx from "clsx";
import { DividerVertical } from "@/app/components/HomepageCarousel";
import Status from "../../components/Status";

export default function LatestAirdrop({
	airdrop,
}: {
	airdrop: IAirdrop | undefined;
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
			if (!airdrop) return;
			const time = timeDiff(
				Date.now(),
				airdrop.start * 1000,
				airdrop.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [airdrop?.start, airdrop?.end]);

	if (!airdrop) return <div className="skeleton h-32"></div>;

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
						<div className="w-[55px] h-[55px] md:w-[66px] md:h-[66px] relative">
							<Image alt="image" src="/tokens/sfn.png" fill />
						</div>
						<div className="flex-1 flex flex-col justify-between gap-2">
							<div className="text-base md:text-2xl leading-[19px] font-bold line-clamp-1">
								{airdrop.name}
							</div>
							<div className="flex flex-wrap items-center gap-2">
								<Status start={airdrop.start} end={airdrop.end} />
								<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
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
								<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] uppercase">
									{airdrop.type}
								</div>
							</div>
						</div>
					</div>
					<Link
						href={`/launchpad/airdrop-list/${airdrop.address}`}
						className={clsx(
							"hidden md:block text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
						)}
					>
						Go to Airdrop now
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
							<div className="flex flex-1 flex-row md:flex-col justify-between md:justify-start  gap-1 md:border-none border-b border-b-[#2D313E] pb-3">
								<div className="text-xs font-normal leading-[14px] text-[#C6C6C6] md:text-sm md:leading-[16px]">
									Total airdrop
								</div>
								<div className="text-sm leading-[16px] md:text-base md:leading-[19px] font-medium">
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
							<div className="flex items-center justify-between md:justify-start gap-1.5 md:gap-6">
								<div>
									<span className="countdown font-medium text-xs md:text-base">
										{/* @ts-expect-error */}
										<span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										days
									</span>
								</div>
								<span className="text-sm md:text-base font-medium leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-medium text-xs md:text-base">
										{/* @ts-expect-error */}
										<span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										hrs
									</span>
								</div>
								<span className="text-sm md:text-base font-medium leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-medium text-xs md:text-base">
										{/* @ts-expect-error */}
										<span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										mins
									</span>
								</div>
								<span className="text-sm md:text-base font-medium leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-medium text-xs md:text-base">
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
				<Link
					href={`/launchpad/airdrop-list/${airdrop.address}`}
					className={clsx(
						"block md:hidden w-full text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
					)}
				>
					Go to Airdrop now
				</Link>
			</div>
		</div>
	);
}
