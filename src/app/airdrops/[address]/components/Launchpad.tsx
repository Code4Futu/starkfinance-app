"use client";
import {
	BASE_API,
	LAUNCHPAD_STATUS,
	StarknetRpcProvider,
} from "@/app/constants";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CallData, cairo, num } from "starknet";
import { useAccount } from "@starknet-react/core";
import dayjs from "dayjs";
import useSWR from "swr";
import clsx from "clsx";
import { ILaunchpad } from "@/app/types";

export default function Launchpad({ launchpad }: { launchpad: ILaunchpad }) {
	const { account, address } = useAccount();

	const { data: launchpadStatistics } = useSWR<{
		participants: string;
		committed: string;
	}>(
		`${BASE_API}/launchpads/${launchpad.address}/statistics`,
		(url: string) => fetch(url).then((r) => r.json()),
		{ refreshInterval: 300 }
	);

	const { data: accountStatistics } = useSWR<{
		committed: string;
		claimed: string;
	}>(
		`${BASE_API}/launchpads/${launchpad.address}/${address}/statistics`,
		(url: string) => fetch(url).then((r) => r.json()),
		{ refreshInterval: 300 }
	);

	const [tokenRaiseBalance, setTokenRaiseBalance] = useState<string>();
	const [commitAmount, setCommitAmount] = useState<string>("");
	const [refresh, setRefresh] = useState<boolean>(false);
	const [committing, setCommitting] = useState<boolean>(false);
	const [allocation, setAllocation] = useState<{
		allocation: string | undefined;
		deducted: string | undefined;
		remaining: string | undefined;
	}>({
		allocation: undefined,
		deducted: undefined,
		remaining: undefined,
	});

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

		return () => clearInterval(interval);
	}, [launchpad.start, launchpad.end]);

	const getBalance = useCallback(async () => {
		try {
			if (!account || !address || !launchpad.tokenRaise || !launchpad.address)
				return;
			const [resBalance, resAllocation] = await Promise.all([
				StarknetRpcProvider.callContract({
					contractAddress: launchpad.tokenRaise.address,
					entrypoint: "balanceOf",
					calldata: [address],
				}),
				StarknetRpcProvider.callContract({
					contractAddress: launchpad.address,
					entrypoint: "get_allocation",
					calldata: [address],
				}),
			]);
			setAllocation({
				allocation: num.hexToDecimalString(resAllocation.result[0]),
				deducted: num.hexToDecimalString(resAllocation.result[2]),
				remaining: num.hexToDecimalString(resAllocation.result[4]),
			});
			setTokenRaiseBalance(num.hexToDecimalString(resBalance.result[0]));
		} catch (error) {
			console.log(error);
		}
	}, [account, launchpad.tokenRaise, refresh, launchpad.address]);

	useEffect(() => {
		getBalance();
	}, [account, launchpad.tokenRaise, refresh]);

	const handleCommit = useCallback(async () => {
		if (!account) return alert("Connect wallet first");
		try {
			if (!commitAmount || isNaN(+commitAmount))
				return alert("Invalid commit amount");
			const amount = ethers.parseUnits(
				commitAmount,
				launchpad.tokenRaise.decimals
			);

			if (
				amount < BigInt(launchpad.minCommit) ||
				amount > BigInt(launchpad.maxCommit)
			)
				return alert("Must in range MIN/MAX commit");
			setCommitting(true);
			const calls = [
				// {
				// 	contractAddress: launchpad.tokenRaise.address,
				// 	entrypoint: "mint",
				// 	calldata: CallData.compile({
				// 		amount: cairo.uint256(amount),
				// 	}),
				// },
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

			const tx = await account.execute(calls);

			await StarknetRpcProvider.waitForTransaction(tx.transaction_hash);

			alert(`Commit success. TxHash is ${tx.transaction_hash}`);

			setCommitAmount("");
			setCommitting(false);
			setRefresh((pre) => !pre);
		} catch (error) {
			setCommitting(false);
			console.log(error);
		}

		// const nft = await launchpadContract.commit();
	}, [account, commitAmount]);

	return (
		<div>
			<div className="z-[999] breadcrumbs fixed right-0 lg:right-[360px] bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul className="overflow-hidden">
					<li>
						<div className="flex items-center ">
							<div className="w-[24px] h-[24px] relative">
								<Image src="/svg/launchpad.svg" alt="launchpad" fill />
							</div>
							<div className="hidden ml-1.5  text-[14px]">Launchpad</div>
						</div>
					</li>
					<li>
						<Link
							className="hover:no-underline text-[#C6C6C6] text-[14px]"
							href="/launchpads"
							rel="noreferrer"
						>
							Launchpad
						</Link>
					</li>
					<li className="font-bold text-[14px]">{launchpad.name}</li>
				</ul>
			</div>

			<div className="flex justify-center">
				<div className="flex flex-col gap-8 flex-1 max-w-[1080px]">
					<div className="w-full h-[113px] md:h-[239px] lg:h-[363px] relative">
						<Image alt="image" src="/mocks/banner.png" fill />
					</div>

					<div className="flex justify-stretch gap-3">
						<div className="w-[59px] h-[59px] md:w-[74px] md:h-[74px]  lg:w-[80px] lg:h-[80px] relative">
							<Image alt="image" src="/logo80x80.png" fill />
						</div>
						<div className="flex-1">
							<div className="text-xl md:text-[32px] lg:text-[36px] font-bold line-clamp-1 mb-1.5 md:mb-3">
								{launchpad.name}
							</div>
							<div className="flex flex-wrap items-center gap-1.5 md:gap-3">
								{timeStartDiff.status && (
									<div
										className={clsx(
											"flex items-center gap-1 py-1.5 px-3 rounded-2xl",
											{
												"bg-[#61b3ff26]": LAUNCHPAD_STATUS.UPCOMING,
												"bg-[#6cff7b26]": LAUNCHPAD_STATUS.INPROGRESS,
												"bg-[#FFE86C26]": LAUNCHPAD_STATUS.END,
											}
										)}
									>
										<Image
											src={`/svg/${timeStartDiff.status}.svg`}
											alt={`${timeStartDiff.status}`}
											width={8}
											height={8}
										/>
										<div
											className={clsx("text-[12px] capitalize", {
												"text-[#61B3FF]":
													timeStartDiff.status == LAUNCHPAD_STATUS.UPCOMING,
												"text-[#6CFF7B]":
													timeStartDiff.status == LAUNCHPAD_STATUS.INPROGRESS,
												"text-[#FFE86C]":
													timeStartDiff.status == LAUNCHPAD_STATUS.END,
											})}
										>
											{timeStartDiff.status}
										</div>
									</div>
								)}
								<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
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
								{/* <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<Image src="/logo.png" alt="token" width={8} height={8} />
									<div className="text-[12px] text-[#F1F1F1]">
										SFN
									</div>
								</div> */}
								<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] capitalize">
									{launchpad.type}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex flex-col gap-6 w-full lg:w-[368px]">
							{timeStartDiff.status !== LAUNCHPAD_STATUS.END && (
								<div className="border border-[#2D313E] bg-[#0D0E12] rounded-3xl py-9 px-6">
									<div className="mb-2.5 font-bold text-xl text-[#F1F1F1]">
										Launchpad {statusToText(timeStartDiff.status)}
									</div>

									<div className="flex justify-between">
										<div className="flex items-center gap-[2px]">
											<span className="countdown font-bold text-[16px] text-[#F1F1F1]">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.d ?? 0 }}
												></span>
											</span>
											<div className="font-[400] text-[14px] text-[#F1F1F1]">
												days
											</div>
										</div>
										<div className="flex items-center gap-[2px]">
											<span className="countdown font-bold text-[16px] text-[#F1F1F1]">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.h ?? 0 }}
												></span>
											</span>
											<div className="font-[400] text-[14px] text-[#F1F1F1]">
												hrs
											</div>
										</div>
										<div className="flex items-center gap-[2px]">
											<span className="countdown font-bold text-[16px] text-[#F1F1F1]">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.m ?? 0 }}
												></span>
											</span>
											<div className="font-[400] text-[14px] text-[#F1F1F1]">
												mins
											</div>
										</div>
										<div className="flex items-center gap-[2px]">
											<span className="countdown font-bold text-[16px] text-[#F1F1F1]">
												<span
													// @ts-expect-error
													style={{ "--value": timeStartDiff?.s ?? 0 }}
												></span>
											</span>
											<div className="font-[400] text-[14px] text-[#F1F1F1]">
												secs
											</div>
										</div>
									</div>
								</div>
							)}

							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-xl font-bold text-[#F1F1F1]">
									Sale information
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Start time</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{dayjs(launchpad.start * 1000).format("HH:mm DD MMM YYYY")}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">End time</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{dayjs(launchpad.end * 1000).format("HH:mm DD MMM YYYY")}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Total raise</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimals
											)
										)}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Total sales</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalSale,
												launchpad.tokenSale.decimals
											)
										)}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Min/Max commit
									</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.minCommit,
												launchpad.tokenRaise.decimals
											)
										)}{" "}
										/{" "}
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.maxCommit,
												launchpad.tokenRaise.decimals
											)
										)}{" "}
										{launchpad.tokenRaise.symbol}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Total participles
									</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(launchpadStatistics?.participants ?? 0)}
									</div>
								</div>
								<div className="py-3 border-b border-b-[#2D313E]">
									<div className="flex justify-between">
										<div className="text-[12px] text-[#C6C6C6]">
											Total Commited SFN
										</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(
												ethers.formatUnits(
													launchpadStatistics?.committed ?? "0",
													launchpad.tokenRaise.decimals
												)
											)}{" "}
											{launchpad.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<progress
											className="progress progress-accent"
											value={
												+(launchpadStatistics?.committed ?? "0") /
												+launchpad.totalRaise
											}
											max="100"
										></progress>
										<div className="flex justify-between">
											<div className="text-[12px] text-[#C6C6C6]">Process</div>
											<div className="text-[12px] text-[#C6C6C6]">
												{+(launchpadStatistics?.committed ?? "0") /
													+launchpad.totalRaise}
												%
											</div>
										</div>
									</div>
								</div>

								{timeStartDiff.status !== LAUNCHPAD_STATUS.END && (
									<div className="py-3">
										<div className="flex justify-between">
											<div className="text-[12px] text-[#C6C6C6]">
												{launchpad.tokenRaise.symbol} balance:
											</div>
											<div className="text-[14px] text-[#C6C6C6]">
												{numberWithCommas(
													ethers.formatUnits(
														tokenRaiseBalance ?? "0",
														launchpad.tokenRaise.decimals
													)
												)}
											</div>
										</div>

										<input
											type="text"
											value={commitAmount}
											onChange={(e) => setCommitAmount(e.target.value)}
											className="input w-full focus:outline-none bg-[#0D0E12] border-[#2D313E] rounded-2xl focus-within:border-[#2D313E] focus:border-[#2D313E]"
										/>

										<div className="flex justify-between gap-5 mt-6">
											<div
												onClick={handleCommit}
												className="flex gap-1.5 justify-center cursor-pointer flex-1 px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
											>
												{committing && (
													<span className="loading loading-spinner loading-xl"></span>
												)}
												<span>Commit</span>
											</div>
											<div className="flex gap-1.5 justify-center cursor-pointer flex-1 px-6 py-3 font-xl font-bold text-[#1A1C24] bg-[#F1F1F1] rounded-2xl">
												{/* {committing && (
													<span className="loading loading-spinner loading-xl"></span>
												)} */}
												<span>Stark NFT</span>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="flex-1 flex flex-col gap-6">
							{timeStartDiff.status !== LAUNCHPAD_STATUS.UPCOMING && (
								<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
									<div className="text-xl font-bold text-[#F1F1F1] border-b border-b-[#2D313E] pb-2">
										Your Allocation
									</div>

									<div className="grid grid-cols-2 gap-y-6 border-b border-b-[#2D313E] py-6">
										<div>
											<div className="text-[12px] text-[#C6C6C6]">
												Committed SFN
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														launchpadStatistics?.committed ?? "0",
														launchpad.tokenRaise.decimals
													)
												)}{" "}
												{launchpad.tokenRaise.symbol}
											</div>
										</div>

										<div>
											<div className="text-[12px] text-[#C6C6C6]">
												Your Allocation
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														accountStatistics?.committed ?? "0",
														launchpad.tokenSale.decimals
													)
												)}{" "}
												{launchpad.tokenSale.symbol}
											</div>
										</div>

										<div>
											<div className="text-[12px] text-[#C6C6C6]">Claimed</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														accountStatistics?.claimed ?? "0",
														launchpad.tokenRaise.decimals
													)
												)}{" "}
												{launchpad.tokenRaise.symbol}
											</div>
										</div>

										<div>
											<div className="text-[12px] text-[#C6C6C6]">
												Claimable
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(0)} {launchpad.tokenRaise.symbol}
											</div>
										</div>

										<div>
											<span
												className={clsx(
													"cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold  rounded-2xl",
													{
														"bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB]":
															false,
														"text-[#1A1C24]": false,
														"bg-[#2D313E]": true,
														"text-[#C6C6C6]": true,
													}
												)}
											>
												Claim
											</span>
										</div>
									</div>

									<div className="grid grid-cols-2 pt-6 gap-y-6">
										<div>
											<div className="text-[12px] text-[#C6C6C6]">
												Your deducted SFN
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														allocation?.deducted ?? "0",
														launchpad.tokenRaise.decimals
													)
												)}{" "}
												{launchpad.tokenRaise.symbol}
											</div>
										</div>

										<div>
											<div className="text-[12px] text-[#C6C6C6]">
												Your remaining SFN
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														allocation?.remaining ?? "0",
														launchpad.tokenRaise.decimals
													)
												)}{" "}
												{launchpad.tokenRaise.symbol}
											</div>
										</div>

										<div className="col-span-2">
											<div className="text-[12px] text-[#C6C6C6]">
												Time to unlock
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{dayjs(launchpad.end * 1000).format(
													"HH:mm DD MMM YYYY"
												)}
											</div>
										</div>

										<div>
											<span
												className={clsx(
													"cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold  rounded-2xl",
													{
														"bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB]":
															false,
														"text-[#1A1C24]": false,
														"bg-[#2D313E]": true,
														"text-[#C6C6C6]": true,
													}
												)}
											>
												Claim
											</span>
										</div>
									</div>
								</div>
							)}

							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-xl font-bold text-[#F1F1F1] mb-3 border-b border-b-[#2D313E] pb-3">
									Vesting Schedule
								</div>

								<ul className="steps steps-vertical">
									{launchpad.vestingTime.map((time: number, idx: number) => (
										<li key={idx} data-content="" className="step">
											<div>
												<div className="flex gap-3 items-center">
													<div className="py-1 px-3 bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] text-[12px] text-[#0D0E12] rounded-xl text-center">
														{launchpad.vestingPercent[idx] / 1000}%
													</div>
													<div className="text-[12px] text-[#C6C6C6]">
														{dayjs((launchpad.end + time) * 1000).format(
															"HH:mm DD MMM YYYY"
														)}
													</div>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>

							<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="border-b border-b-[#2D313E] pb-3">
									<div className="text-xl font-bold text-[#F1F1F1] mb-3">
										Project information
									</div>
									<div className="flex gap-3">
										<div className="p-1 bg-[#ffffff26] rounded-lg">
											<div className="w-[24px] h-[24px] relative">
												<Image alt="image" src="/svg/x.svg" fill />
											</div>
										</div>
										<div className="p-1 bg-[#ffffff26] rounded-lg">
											<div className="w-[24px] h-[24px] relative">
												<Image alt="image" src="/svg/telegram.svg" fill />
											</div>
										</div>
										<div className="p-1 bg-[#ffffff26] rounded-lg">
											<div className="w-[24px] h-[24px] relative">
												<Image alt="image" src="/svg/discord.svg" fill />
											</div>
										</div>
										<div className="p-1 bg-[#ffffff26] rounded-lg">
											<div className="w-[24px] h-[24px] relative">
												<Image alt="image" src="/svg/medium.svg" fill />
											</div>
										</div>
										<div className="p-1 bg-[#ffffff26] rounded-lg">
											<div className="w-[24px] h-[24px] relative">
												<Image alt="image" src="/svg/github.svg" fill />
											</div>
										</div>
									</div>
								</div>

								<div className="w-full h-[113px] md:h-[378px] lg:h-[300px] relative">
									<Image alt="image" src="/mocks/banner.png" fill />
								</div>

								<div
									className="text-[#C6C6C6]"
									dangerouslySetInnerHTML={{ __html: launchpad.desc }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
