"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getTokenIcon } from "@/app/configs/networks";
import { ILockingPool } from "@/app/types";
import { numberWithCommas } from "@/app/utils";
import { ethers } from "ethers";
import Image from "next/image";
import { useMemo } from "react";
import LockRecord from "./LockRecord";

export default function LocksOfToken({ locks }: { locks: ILockingPool[] }) {
	const latestLock = locks[0];

	const lockedAmount = useMemo(
		() =>
			locks.reduce(
				(acc, prev) =>
					acc + +ethers.formatUnits(prev.amount, prev.token.decimals),
				0
			),
		[locks]
	);

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Locking",
						icon: "/svg/locking.svg",
						url: "/launchpad/locking",
					},
					{ text: "Token", url: "/launchpad/locking/token" },
					{
						text: `${latestLock.tokenAddress.slice(
							0,
							6
						)}...${latestLock.tokenAddress.slice(-4)}`,
					},
				]}
			/>

			<div className="flex flex-col justify-stretch gap-[24px]">
				{/* lock logo */}
				<div className="flex items-center gap-1">
					<div className="w-[60px] h-[60px] relative">
						<Image
							src={getTokenIcon(latestLock.tokenAddress)}
							alt="token"
							fill
							sizes="any"
						/>
					</div>
					<div className="flex flex-col">
						<div className="font-bold translate-y-[2px] text-[32px]">
							{latestLock.token.symbol}
						</div>
						<div className="font-bold text-[20px] text-[#C6C6C6] translate-y-[-2px]">
							{latestLock.token.name}
						</div>
					</div>
				</div>

				{/* lock info */}
				<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-4">
					<div className="border-b border-b-[#2D313E] pb-3">
						<div className="text-[20px] font-bold text-[#F1F1F1]">
							Lock Info
						</div>
					</div>

					<div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Current Locked Amount
							</div>
							<div className="text-[14px] font-bold">
								{numberWithCommas(lockedAmount)} {latestLock.token.decimals}
							</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Current Values Locked
							</div>
							<div className="text-[14px] font-bold">~ $</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token Address
							</div>
							<div className="text-[14px] font-bold">{`${latestLock.tokenAddress.slice(
								0,
								6
							)}...${latestLock.tokenAddress.slice(-4)}`}</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token Name
							</div>
							<div className="text-[14px] font-bold">
								{latestLock.token.name}
							</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token Symbol
							</div>
							<div className="text-[14px] font-bold">
								{latestLock.token.symbol}
							</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token Decimals
							</div>
							<div className="text-[14px] font-bold">
								{latestLock.token.decimals}
							</div>
						</div>
					</div>
				</div>

				{/* lock records */}
				<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-4">
					<div className="border-b border-b-[#2D313E] pb-3">
						<div className="text-[20px] font-bold text-[#F1F1F1]">
							Lock Records
						</div>
					</div>

					<div className="grid grid-cols-5 border-b border-b-[#2D313E] pb-3 text-[12px] text-[#C6C6C6] font-[500]">
						<div>Wallet</div>
						<div>Amount</div>
						<div>TGE (%)</div>
						<div>Unlock time (UTC)</div>
						<div className="text-right">Details</div>
					</div>
					{locks.map((lock, idx) => (
						<LockRecord key={idx} lock={lock} />
					))}
				</div>
			</div>
		</div>
	);
}
