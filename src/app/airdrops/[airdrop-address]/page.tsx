"use client";
import { airdropMocks } from "@/app/mock";
import { numberWithCommas, timeDiff } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LaunchpadPage = () => {
	const airdrop = airdropMocks[0];

	const [timeStartDiff, setTimeStartDiff] = useState<{
		d: number;
		h: number;
		m: number;
		s: number;
	}>();

	useEffect(() => {
		const interval = setInterval(() => {
			const time = timeDiff(Date.now(), airdrop.start * 1000);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [airdrop.start, airdrop.end]);

	return (
		<div>
			<div className="z-[999] breadcrumbs fixed bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[240px] top-[96px] lg:top-[25px] right-0 px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul>
					<li>
						<div className="flex items-center">
							<Image
								width={30}
								height={30}
								src="/svg/launchpad.svg"
								alt="launchpad"
							/>
							<div className="font-bold ml-1.5">Launchpad</div>
						</div>
					</li>
					<li>
						<Link
							className="font-bold hover:no-underline"
							href="/airdrop-list"
							rel="noreferrer"
						>
							Airdrop List
						</Link>
					</li>
					<li className="font-bold">{airdrop.name.slice(0, 10)}...</li>
				</ul>
			</div>

			<div className="flex justify-center">
				<div className="flex flex-col gap-8 flex-1 max-w-[1080px]">
					<div className="w-full h-[363px] relative">
						<Image alt="image" src="/mocks/banner.png" fill />
					</div>

					<div className="flex-1 flex flex-col justify-between">
						<div className="text-3xl font-bold line-clamp-2">
							{airdrop.name}
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<div className="flex items-center gap-1 bg-[#61b3ff26] py-1.5 px-3 rounded-2xl">
								<Image
									src={`/svg/${airdrop.status}.svg`}
									alt={`${airdrop.status}`}
									width={8}
									height={8}
								/>
								<div className="font-bold text-[14px] text-[#61B3FF] capitalize">
									{airdrop.status}
								</div>
							</div>
							<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<Image
									src={`/wallets/${airdrop.chain}.png`}
									alt="starknet"
									width={18}
									height={18}
								/>
								<div className="font-bold text-[14px] text-[#F1F1F1] capitalize">
									{airdrop.chain}
								</div>
							</div>
							<div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<Image src="/logo.png" alt="token" width={8} height={8} />
								<div className="font-bold text-[14px] text-[#F1F1F1]">SFN</div>
							</div>
							<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl font-bold text-[14px] text-[#F1F1F1] uppercase">
								{airdrop.type}
							</div>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex flex-col gap-6 w-full lg:w-[368px]">
							<div className="border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="mb-2.5 font-bold">Sale Start in:</div>
								{/* TODO */}
								<div className="flex gap-4">
									<div className="flex">
										<span className="countdown font-mono text-xl">
											{/* @ts-expect-error */}
											<span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
										</span>
										days
									</div>
									<div className="flex">
										<span className="countdown font-mono text-xl">
											{/* @ts-expect-error */}
											<span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
										</span>
										hrs
									</div>
									<div className="flex">
										<span className="countdown font-mono text-xl">
											{/* @ts-expect-error */}
											<span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
										</span>
										mins
									</div>
									<div className="flex">
										<span className="countdown font-mono text-xl">
											{/* @ts-expect-error */}
											<span style={{ "--value": timeStartDiff?.s ?? 0 }}></span>
										</span>
										secs
									</div>
								</div>
							</div>
							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="font-bold">Sale information</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Start time</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{new Date(airdrop.start * 1000).toUTCString()}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">End time</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{new Date(airdrop.end * 1000).toUTCString()}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Total airdrop
									</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{numberWithCommas(airdrop.totalAirdrop)}
									</div>
								</div>

								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Vesting</div>
									<div className="text-[14px] text-[#F1F1F1]">100% on TGE</div>
								</div>

								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Total Total Eligible Users
									</div>
									<div className="text-[14px] text-[#F1F1F1]">100</div>
								</div>
							</div>
						</div>
						<div className="flex-1 flex flex-col gap-6">
							<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="font-bold  border-b border-b-[#2D313E]">
									Project information
								</div>

								<div className="w-full h-[378px] relative">
									<Image alt="image" src="/mocks/banner.png" fill />
								</div>

								<div>{airdrop.desc}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LaunchpadPage;
