"use client";
import Image from "next/image";
import Link from "next/link";
import { airdropMocks } from "@/app/mock";
import { numberWithCommas, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "@/app/constants";

const LatestAirdrop = () => {
	const launchpad = airdropMocks[0];

	const [timeStartDiff, setTimeStartDiff] = useState<{
		d: number;
		h: number;
		m: number;
		s: number;
	}>();
	const [status, setStatus] = useState<LAUNCHPAD_STATUS>();

	useEffect(() => {
		const interval = setInterval(() => {
			const now = Date.now();
			const time = timeDiff(Date.now(), launchpad.start * 1000);
			const status = timeStatus(
				now,
				launchpad.start * 1000,
				launchpad.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [launchpad.start, launchpad.end]);

	return (
		<div className="flex flex-col gap-6 p-3 md:p-6 border rounded-3xl border-[#24C3BC] bg-[#1A1C24]">
			<div className="flex justify-stretch gap-3">
				<div className="w-[80px] h-[80px] relative">
					<Image alt="image" src="/logo80x80.png" fill />
				</div>
				<div className="flex-1 flex flex-col justify-between">
					<div className="text-3xl font-bold line-clamp-2">
						{launchpad.name}
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="flex items-center gap-1 bg-[#61b3ff26] py-1.5 px-3 rounded-2xl">
							<Image
								src={`/svg/${launchpad.status}.svg`}
								alt={`${launchpad.status}`}
								width={8}
								height={8}
							/>
							<div className="font-bold text-[14px] text-[#61B3FF] capitalize">
								{launchpad.status}
							</div>
						</div>
						<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<Image
								src={`/wallets/${launchpad.chain}.png`}
								alt="starknet"
								width={18}
								height={18}
							/>
							<div className="font-bold text-[14px] text-[#F1F1F1] capitalize">
								{launchpad.chain}
							</div>
						</div>
						<div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<Image src="/logo.png" alt="token" width={8} height={8} />
							<div className="font-bold text-[14px] text-[#F1F1F1]">SFN</div>
						</div>
						<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl font-bold text-[14px] text-[#F1F1F1] uppercase">
							{launchpad.type}
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-6 flex-col lg:flex-row">
				<div className="w-full lg:w-[400px] h-[200px] relative">
					<Image alt="image" src="/mocks/banner.png" fill />

					<div className="absolute top-3 left-3 p-3 rounded-xl bg-[#0D0E12] text-[#F1F1F1]">
						<div className="text-[36px]">22</div>
						<div>Nov</div>
					</div>
				</div>

				<div className="flex-1 flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
					<div className="flex flex-row md:flex-col justify-between">
						<div className="mb-2.5 text-[14px]">Airdrop</div>
						<div className="text-[20px] font-bold">
							{numberWithCommas(launchpad.totalAirdrop)}{" "}
							{launchpad.tokenAirdrop.symbol}
						</div>
					</div>
					<div className="divider my-0"></div>

					<div>
						<div className="mb-2.5">Airdrop open in</div>
						{/* TODO */}
						<div className="flex gap-10">
							<div>
								<span className="countdown font-mono text-xl">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
								</span>
								days
							</div>
							<div>
								<span className="countdown font-mono text-xl">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
								</span>
								hrs
							</div>
							<div>
								<span className="countdown font-mono text-xl">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
								</span>
								mins
							</div>
							<div>
								<span className="countdown font-mono text-xl">
									{/* @ts-expect-error */}
									<span style={{ "--value": timeStartDiff?.s ?? 0 }}></span>
								</span>
								secs
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<Link
					href={`/airdrops/${launchpad.airdropAddress}`}
					className="py-3 px-6 text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold rounded-2xl"
				>
					Go to Airdrop Now
				</Link>
			</div>
		</div>
	);
};

export default LatestAirdrop;
