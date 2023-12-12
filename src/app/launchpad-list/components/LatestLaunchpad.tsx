"use client";
import Image from "next/image";
import Link from "next/link";
import { launchpadMocks } from "@/app/mock";
import { numberWithCommas, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";

const LatestLaunchpad = () => {
	const launchpad = launchpadMocks[0];

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
		<div className="flex flex-col gap-6 p-3 md:p-6 border rounded-3xl border-[#24C3BC] bg-[#1A1C24]">
			<div className="block lg:hidden w-full h-[160px] md:h-[336px] relative">
				<Image alt="image" src="/mocks/banner.png" fill />
				<div className="absolute top-3 left-3 p-3 rounded-xl bg-[#0D0E12] ">
					<div className="text-2xl text-[#F1F1F1] font-bold">22</div>
					<div className="text-sm text-[#C6C6C6]">Nov</div>
				</div>
			</div>
			<div className="flex justify-stretch gap-3">
				<div className="w-[60px] h-[60px] md:w-[66px] md:h-[66px] relative">
					<Image alt="image" src="/logo80x80.png" fill />
				</div>
				<div className="flex-1 flex flex-col justify-between gap-2">
					<div className="text-2xl font-bold line-clamp-1">
						{launchpad.name}
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex items-center gap-1 bg-[#61b3ff26] py-1.5 px-3 rounded-2xl">
							<Image
								src={`/svg/${timeStartDiff.status}.svg`}
								alt={`${timeStartDiff.status}`}
								width={8}
								height={8}
							/>
							<div className="font-bold text-[14px] text-[#61B3FF] capitalize">
								{timeStartDiff.status}
							</div>
						</div>
						<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<div className="w-[18px] h-[18px] relative">
								<Image
									src={`/wallets/${launchpad.chain}.png`}
									alt="starknet"
									fill
								/>
							</div>
							<div className="font-[500] text-[12px] text-[#F1F1F1] capitalize">
								{launchpad.chain}
							</div>
						</div>
						<div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<Image src="/logo.png" alt="token" width={8} height={8} />
							<div className="font-bold text-[14px] text-[#F1F1F1]">SFN</div>
						</div>
						<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl font-bold text-[14px] text-[#F1F1F1] capitalize">
							{launchpad.type}
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-6 flex-col lg:flex-row">
				<div className="hidden lg:block w-[400px] h-[200px] relative">
					<Image alt="image" src="/mocks/banner.png" fill />
					<div className="absolute top-3 left-3 p-3 rounded-2xl bg-[#0D0E12] text-[#F1F1F1]">
						<div className="text-[36px]">22</div>
						<div>Nov</div>
					</div>
				</div>

				<div className="flex-1 flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
					<div className="flex flex-col md:flex-row justify-between gap-4">
						<div className="flex flex-col md:border-none border-b border-b-[#2D313E] pb-3">
							<div className="text-[12px] text-[#C6C6C6]">Total raise</div>
							<div className="text-[20px] font-bold">
								{numberWithCommas(
									ethers
										.formatUnits(
											launchpad.totalRaise,
											launchpad.tokenRaise.decimal
										)
										.toString()
								)}{" "}
								{launchpad.tokenRaise.symbol}
							</div>
						</div>
						<div className="flex flex-col md:border-none border-b border-b-[#2D313E] pb-3">
							<div className="text-[12px] text-[#C6C6C6]">Total sale</div>
							<div className="text-[20px] font-bold">
								{numberWithCommas(
									ethers
										.formatUnits(
											launchpad.totalSale,
											launchpad.tokenSale.decimal
										)
										.toString()
								)}{" "}
								{launchpad.tokenSale.symbol}
							</div>
						</div>

						<div className="flex flex-col">
							<div className="text-[12px] text-[#C6C6C6]">Rate</div>
							<div className="text-[20px] font-bold">
								1 {launchpad.tokenRaise.symbol} ={" "}
								{+ethers.formatUnits(
									launchpad.totalSale,
									launchpad.tokenSale.decimal
								) /
									+ethers.formatUnits(
										launchpad.totalRaise,
										launchpad.tokenRaise.decimal
									)}
								{launchpad.tokenSale.symbol}
							</div>
						</div>
					</div>

					{timeStartDiff.status !== LAUNCHPAD_STATUS.END && (
						<>
							<div className="divider my-0"></div>
							<div>
								<div className="mb-2.5">Launchpad open in</div>
								{/* TODO */}
								<div className="flex gap-10">
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
						</>
					)}
				</div>
			</div>
			<Link
				href={`/launchpads/${launchpad.address}`}
				className="w-full md:max-w-[240px] text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
			>
				Go to Launchpad Now
			</Link>
		</div>
	);
};

export default LatestLaunchpad;
