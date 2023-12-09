"use client";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { launchpadMocks } from "@/app/mock";
import { numberWithCommas, timeDiff } from "@/app/utils";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CallData, cairo } from "starknet";
import { useAccount } from "@starknet-react/core";

const LaunchpadPage = () => {
	const params = useParams();
	const { account } = useAccount();
	const launchpad = launchpadMocks[0];

	const [timeStartDiff, setTimeStartDiff] = useState<{
		d: number;
		h: number;
		m: number;
		s: number;
		status: LAUNCHPAD_STATUS | undefined;
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
		handleCommit();

		return () => clearInterval(interval);
	}, [launchpad.start, launchpad.end]);

	const handleCommit = useCallback(async () => {
		if (!account) return;
		try {
			let amount = launchpad.minCommit;

			const calls = [
				{
					contractAddress: launchpad.tokenRaise.address,
					entrypoint: "mint",
					calldata: CallData.compile({
						amount: cairo.uint256(amount),
					}),
				},
				{
					contractAddress: launchpad.tokenRaise.address,
					entrypoint: "approve",
					calldata: CallData.compile({
						spender: launchpad.address,
						amount: cairo.uint256(amount),
					}),
				},
				{
					contractAddress: launchpad.address,
					entrypoint: "commit",
					calldata: CallData.compile({
						commit_token_raise: cairo.uint256(amount),
					}),
				},
				// {
				// 	contractAddress: launchpad.address,
				// 	entrypoint: "stake_nft",
				// 	calldata: CallData.compile({
				// 		nft_id: cairo.uint256(0),
				// 	}),
				// },
			];

			const res = await account.execute(calls);
			console.log(res);
		} catch (error) {
			console.log(error);
		}

		// const nft = await launchpadContract.commit();
	}, [account]);

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
							href="/launchpad-list"
							rel="noreferrer"
						>
							Launchpad List
						</Link>
					</li>
					<li className="font-bold">{launchpad.name.slice(0, 10)}...</li>
				</ul>
			</div>

			<div className="flex justify-center">
				<div className="flex flex-col gap-8 flex-1 max-w-[1080px]">
					<div className="w-full h-[363px] relative">
						<Image alt="image" src="/mocks/banner.png" fill />
					</div>

					<div className="flex-1 flex flex-col justify-between">
						<div className="text-3xl font-bold line-clamp-2">
							{launchpad.name}
						</div>
						<div className="flex flex-wrap items-center gap-3">
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

					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex flex-col gap-6 w-full lg:w-[368px]">
							{timeStartDiff.status !== LAUNCHPAD_STATUS.END && (
								<div className="border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
									<div className="mb-2.5 font-bold">Sale Start in:</div>
									{/* TODO */}
									<div className="flex gap-4">
										<div className="flex">
											<span className="countdown font-mono text-xl">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.d ?? 0 }}
												></span>
											</span>
											days
										</div>
										<div className="flex">
											<span className="countdown font-mono text-xl">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.h ?? 0 }}
												></span>
											</span>
											hrs
										</div>
										<div className="flex">
											<span className="countdown font-mono text-xl">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.m ?? 0 }}
												></span>
											</span>
											mins
										</div>
										<div className="flex">
											<span className="countdown font-mono text-xl">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.s ?? 0 }}
												></span>
											</span>
											secs
										</div>
									</div>
								</div>
							)}
							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="font-bold">Sale information</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Start time</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{new Date(launchpad.start * 1000).toUTCString()}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">End time</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{new Date(launchpad.end * 1000).toUTCString()}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Total raise</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimal
											)
										)}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Total sales</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalSale,
												launchpad.tokenSale.decimal
											)
										)}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Min/Max commit
									</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.minCommit,
												launchpad.tokenRaise.decimal
											)
										)}{" "}
										/{" "}
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.maxCommit,
												launchpad.tokenRaise.decimal
											)
										)}{" "}
										{launchpad.tokenRaise.symbol}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Total participles
									</div>
									<div className="text-[14px] text-[#F1F1F1]">
										{numberWithCommas(9999)}
									</div>
								</div>
								<div className="py-3 border-b border-b-[#2D313E]">
									<div className="flex justify-between">
										<div className="text-[12px] text-[#C6C6C6]">
											Total Commited SFN
										</div>
										<div className="text-[14px] text-[#F1F1F1]">
											{numberWithCommas(5000)} {launchpad.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<progress
											className="progress progress-accent"
											value="40"
											max="100"
										></progress>
										<div className="flex justify-between">
											<div className="text-[12px] text-[#C6C6C6]">Process</div>
											<div className="text-[12px] text-[#C6C6C6]">50%</div>
										</div>
									</div>
								</div>

								<div className="py-3 border-b border-b-[#2D313E]">
									<div className="flex justify-between">
										<div className="text-[12px] text-[#C6C6C6]">
											SFN balance:
										</div>
										<div className="text-[14px] text-[#F1F1F1]">0</div>
									</div>

									<input
										type="text"
										// value="0.0"
										className="input w-full focus:outline-none bg-[#0D0E12] border-[#2D313E]"
									/>

									<div className="flex justify-between gap-5">
										<button
											className="flex-1 btn btn-primary"
											onClick={handleCommit}
										>
											Commit
										</button>
										<button className="flex-1 btn">Stark NFT</button>
									</div>
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

								<div>{launchpad.desc}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LaunchpadPage;
