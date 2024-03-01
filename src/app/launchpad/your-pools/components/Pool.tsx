"use client";
import Image from "next/image";
import { CommittedLaunchpad } from "../types";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useState, useEffect } from "react";
import { start } from "repl";
import RawCountDown from "./RawCountDown";
import { useWeb3 } from "@/app/hooks";
import SFLaunchpadAbi from "@/app/launchpad/abis/starknet/SFLaunchpad.json";
import { Contract } from "starknet";
import useSWR from "swr";
import { ethers } from "ethers";
import Link from "next/link";
import clsx from "clsx";

export default function Pool({
	index,
	launchpad,
}: {
	index: number;
	launchpad: CommittedLaunchpad;
}) {
	const { account, library } = useWeb3();

	const { data: accountStatistics, isLoading: accountStatisticsLoading } =
		useSWR<{
			committed: string | undefined;
			allocation: string | undefined;
			deducted: string | undefined;
			remaining: string | undefined;
			claimed: string | undefined;
			claimedCount: string | undefined;
			lastCommittedTime: string | undefined;
			claimable: string | undefined;
			stakedNft: boolean;
			nftId: string | undefined;
			claimedNft: boolean;
		}>([launchpad.launchpadAddress, account], async () => {
			try {
				if (!launchpad)
					return {
						tokenRaiseBalance: undefined,
						committed: undefined,
						allocation: undefined,
						deducted: undefined,
						remaining: undefined,
						claimed: undefined,
						claimedCount: undefined,
						lastCommittedTime: undefined,
						claimable: undefined,
						stakedNft: false,
						nftId: undefined,
						claimedNft: false,
					};

				const launchpadContract = new Contract(
					SFLaunchpadAbi,
					launchpad.launchpadAddress,
					library
				);

				const userStats = await launchpadContract.get_user_stats(account!, {
					parseResponse: true,
				});

				return {
					committed: userStats.committed.toString(),
					allocation: userStats.allocation.toString(),
					deducted: userStats.deducted.toString(),
					remaining: userStats.remaining.toString(),
					claimed: userStats.claimed.toString(),
					claimedCount: userStats.claimed_count.toString(),
					lastCommittedTime: userStats.last_committed_time.toString(),
					claimable: userStats.claimable.toString(),
					stakedNft: userStats.staked_nft,
					nftId: userStats.nft_id.toString(),
					claimedNft: userStats.claimed_nft,
				};
			} catch (error) {
				return {
					committed: undefined,
					allocation: undefined,
					deducted: undefined,
					remaining: undefined,
					claimed: undefined,
					claimedCount: undefined,
					lastCommittedTime: undefined,
					claimable: undefined,
					stakedNft: false,
					nftId: undefined,
					claimedNft: false,
				};
			}
		});

	const [timeStats, setTimeStats] = useState<{
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
			if (!launchpad.start || !launchpad.end) return;
			const time = timeDiff(
				Date.now(),
				launchpad.start * 1000,
				launchpad.end * 1000
			);
			setTimeStats(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [launchpad.start, launchpad.end]);

	return (
		<Link
			href={`/launchpad/launchpad-list/${launchpad.launchpadAddress}`}
			className={clsx(
				"grid grid-cols-1 md:grid-cols-7 place-items-center p-6 bg-[#1A1C24] rounded-3xl md:border border-[#2D313E]",
				index % 2 === 0 && "md:bg-[#232631]"
			)}
		>
			<div className="w-full h-full flex md:justify-center md:flex-col xl:flex-row items-center gap-2 md:gap-1 pb-3 md:py-0 md:px-1 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E]">
				<div className="w-[36px] h-[36px] relative">
					<Image src="/logo.png" alt="logo" fill sizes="any" />
				</div>

				<div className="flex-1 md:flex-none xl:flex-1 text-[16px] font-bold text-[#F1F1F1] line-clamp-1">
					{launchpad.name}
				</div>
			</div>

			<div className="w-full h-full flex md:justify-center justify-between py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">Status</div>
				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] capitalize">
						{timeStats.status}
					</div>
					<div className="flex flex-wrap justify-center italic text-[12px] gap-x-1">
						<RawCountDown
							d={timeStats.d}
							h={timeStats.h}
							m={timeStats.m}
							s={timeStats.s}
							split={false}
						/>
					</div>
				</div>
			</div>

			<div className="w-full h-full flex md:flex-col justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">NFT Stake</div>

				<div className="text-right md:text-center font-bold text-[14px] text-[#F1F1F1]">
					{accountStatistics?.stakedNft ? "True" : "False"}
				</div>
			</div>
			<div className="w-full h-full flex md:flex-col justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">Allocation</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1]">
						{numberWithCommas(
							ethers.formatUnits(
								accountStatistics?.allocation ?? 0,
								launchpad.tokenSaleDecimals
							)
						)}{" "}
						{launchpad.tokenSaleSymbol}
					</div>
					{/* TODO tracking pricing */}
					{/* <div className="italic text-[12px]">$ ~</div> */}
				</div>
			</div>
			<div className="w-full h-full flex md:flex-col justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">Total committed</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1]">
						{numberWithCommas(
							ethers.formatUnits(
								accountStatistics?.committed ?? 0,
								launchpad.tokenRaiseDecimals
							)
						)}{" "}
						{launchpad.tokenRaiseSymbol}
					</div>
					{/* TODO tracking pricing */}
					{/* <div className="italic text-[12px]">$ ~</div>  */}
				</div>
			</div>

			<div className="w-full h-full flex md:flex-col justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">Claimed</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1]">
						{numberWithCommas(
							ethers.formatUnits(
								accountStatistics?.allocation ?? 0,
								launchpad.tokenSaleDecimals
							)
						)}{" "}
						{launchpad.tokenSaleSymbol}
					</div>
				</div>
			</div>

			<div className="w-full h-full flex md:flex-col justify-between md:justify-center pt-3 md:py-0 md:px-1">
				<div className="text-[12px] md:hidden">Claimable</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1]">
						{numberWithCommas(
							ethers.formatUnits(
								accountStatistics?.allocation ?? 0,
								launchpad.tokenSaleDecimals
							)
						)}{" "}
						{launchpad.tokenSaleSymbol}
					</div>
				</div>
			</div>
		</Link>
	);
}
