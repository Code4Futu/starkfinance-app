"use client";
import {
	BASE_API,
	LAUNCHPAD_STATUS,
	StarknetRpcProvider,
} from "@/app/constants";
import {
	numberWithCommas,
	airdropStatusToText,
	timeDiffAirdrop,
} from "@/app/utils";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CallData, Contract, TransactionStatus, cairo, num } from "starknet";
import { useAccount } from "@starknet-react/core";
import dayjs from "dayjs";
import useSWR from "swr";
import clsx from "clsx";
import { IAirdrop } from "@/app/types";
import { useWeb3Store } from "@/app/store";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import axios from "axios";
import Button from "@/app/components/Button";
import AirdropAbi from "@/app/launchpad/abis/starknet/SFAirdrop.json";

export default function Airdrop({ airdrop }: { airdrop: IAirdrop }) {
	const { account, address } = useAccount();
	const txHash = useWeb3Store((s) => s.txHash);

	const { data: airdropStatistics, isLoading: airdropStatisticsLoading } =
		useSWR<{
			claimed: string | undefined;
		}>([airdrop.address, txHash], async () => {
			try {
				const airdropStatistics = await StarknetRpcProvider.callContract({
					contractAddress: airdrop.address,
					entrypoint: "get_stats",
				});

				return {
					claimed: num.hexToDecimalString(airdropStatistics.result[0]),
				};
			} catch (error) {
				return {
					claimed: undefined,
				};
			}
		});

	const { data: accountStatistics, isLoading: accountStatisticsLoading } =
		useSWR<{
			allocation: string | undefined;
			claimed: string | undefined;
			claimedCount: string | undefined;
			signature:
				| {
						r: string;
						s: string;
				  }
				| undefined;
		}>([airdrop.address, address, txHash], async () => {
			try {
				const userStats = await StarknetRpcProvider.callContract({
					contractAddress: airdrop.address,
					entrypoint: "get_user_stats",
					calldata: [address!],
				});

				let signature;

				try {
					if (address) {
						let {
							data: { r, s },
						} = await axios.post<{ r: string; s: string }>(
							`${BASE_API}/airdrops/${airdrop.address}/verify`,
							{
								spender: address,
							}
						);

						signature = {
							r,
							s,
						};
					}
				} catch (error) {}

				return {
					allocation: num.hexToDecimalString(userStats.result[1]),
					claimed: num.hexToDecimalString(userStats.result[5]),
					claimedCount: num.hexToDecimalString(userStats.result[3]),
					signature,
				};
			} catch (error) {
				return {
					allocation: undefined,
					claimed: undefined,
					claimedCount: undefined,
					signature: undefined,
				};
			}
		});

	const [commitAmount, setCommitAmount] = useState<string>("");
	const [submitting, setSubmitting] = useState<boolean>(false);
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
			const time = timeDiffAirdrop(Date.now(), airdrop.start * 1000);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [airdrop.start, airdrop.end]);

	// const getBalance = useCallback(async () => {
	// 	try {
	// 		if (!account || !address || !airdrop.tokenRaise || !airdrop.address)
	// 			return;
	// 		const [resBalance, resAllocation] = await Promise.all([
	// 			StarknetRpcProvider.callContract({
	// 				contractAddress: airdrop.tokenRaise.address,
	// 				entrypoint: "balanceOf",
	// 				calldata: [address],
	// 			}),
	// 			StarknetRpcProvider.callContract({
	// 				contractAddress: airdrop.address,
	// 				entrypoint: "get_allocation",
	// 				calldata: [address],
	// 			}),
	// 		]);
	// 		setAllocation({
	// 			allocation: num.hexToDecimalString(resAllocation.result[0]),
	// 			deducted: num.hexToDecimalString(resAllocation.result[2]),
	// 			remaining: num.hexToDecimalString(resAllocation.result[4]),
	// 		});
	// 		setTokenRaiseBalance(num.hexToDecimalString(resBalance.result[0]));
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, [account, airdrop.tokenRaise, refresh, airdrop.address]);

	// useEffect(() => {
	// 	getBalance();
	// }, [account, airdrop.tokenRaise, refresh]);

	const handleClaim = useCallback(async () => {
		if (!account) return alert("Connect wallet first");
		if (!accountStatistics?.signature) return alert("Account are not eligible");
		try {
			setSubmitting(true);

			const airdropContract = new Contract(
				AirdropAbi,
				airdrop.address,
				account
			);

			const claimCalldata = airdropContract.populate("claim", {
				signature: [
					accountStatistics.signature.r,
					accountStatistics.signature.s,
				],
			});

			const tx = await account.execute(claimCalldata);
			const txRes = await account.waitForTransaction(tx.transaction_hash);
			if (TransactionStatus.RECEIVED != txRes.status) return alert("Tx failed");
			else alert(`Claim success. TxHash is ${tx.transaction_hash}`);

			setCommitAmount("");
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
			console.log(error);
		}
	}, [account, commitAmount, accountStatistics?.signature]);

	return (
		<div>
			<Breadcrumbs
				items={[
					{ text: "Launchpad", icon: "/svg/launchpad.svg", url: "/" },
					{ text: "Airdrop List", url: "/launchpad/airdrop-list" },
					{ text: airdrop.name },
				]}
			/>

			<div className="flex flex-col gap-8">
				<div className="w-full h-[113px] md:h-[239px] lg:h-[363px] relative">
					<Image alt="image" src="/mocks/banner.png" fill />
				</div>

				<div className="flex justify-stretch gap-3">
					<div className="w-[59px] h-[59px] md:w-[74px] md:h-[74px]  lg:w-[80px] lg:h-[80px] relative">
						<Image alt="image" src="/logo80x80.png" fill sizes="any" />
					</div>
					<div className="flex-1">
						<div className="text-xl md:text-[32px] lg:text-[36px] font-bold line-clamp-1 mb-1.5 md:mb-3">
							{airdrop.name}
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
									<Image src="/logo.png" alt="token" width={8} height={8} />
									<div className="text-[12px] text-[#F1F1F1]">
										SFN
									</div>
								</div> */}
							<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] capitalize">
								{airdrop.type}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="flex flex-col gap-6 w-full lg:w-[368px]">
						<div className="border border-[#2D313E] bg-[#0D0E12] rounded-3xl py-9 px-6">
							<div className="mb-2.5 font-bold text-xl text-[#F1F1F1]">
								Airdrop {airdropStatusToText(timeStartDiff.status)}
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

						<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="text-xl font-bold text-[#F1F1F1]">
								Airdrop information
							</div>
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] text-[#C6C6C6]">Start time</div>
								<div className="text-[14px] text-[#F1F1F1] font-bold">
									{dayjs(airdrop.start * 1000).format("HH:mm DD MMM YYYY")}
								</div>
							</div>
							{/* <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">End time</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{dayjs(airdrop.end * 1000).format("HH:mm DD MMM YYYY")}
									</div>
								</div> */}
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] text-[#C6C6C6]">Total airdrop</div>
								<div className="text-[14px] text-[#F1F1F1] font-bold">
									{numberWithCommas(
										ethers.formatUnits(
											airdrop.totalAirdropAmount,
											airdrop.tokenAirdrop.decimals
										)
									)}
								</div>
							</div>
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] text-[#C6C6C6]">
									Total Eligible Users
								</div>
								<div className="text-[14px] text-[#F1F1F1] font-bold">
									{numberWithCommas(airdrop.eligibles?.length ?? 0)}
								</div>
							</div>
							{/* <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">Total sales</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(
											ethers.formatUnits(
												airdrop.totalSale,
												airdrop.tokenSale.decimals
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
												airdrop.minCommit,
												airdrop.tokenRaise.decimals
											)
										)}{" "}
										/{" "}
										{numberWithCommas(
											ethers.formatUnits(
												airdrop.maxCommit,
												airdrop.tokenRaise.decimals
											)
										)}{" "}
										{airdrop.tokenRaise.symbol}
									</div>
								</div>
								<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
									<div className="text-[12px] text-[#C6C6C6]">
										Total participial
									</div>
									<div className="text-[14px] text-[#F1F1F1] font-bold">
										{numberWithCommas(airdropStatistics?.participants ?? 0)}
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
													airdropStatistics?.committed ?? "0",
													airdrop.tokenRaise.decimals
												)
											)}{" "}
											{airdrop.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<progress
											className="progress progress-accent"
											value={
												+(airdropStatistics?.committed ?? "0") /
												+airdrop.totalRaise
											}
											max="100"
										></progress>
										<div className="flex justify-between">
											<div className="text-[12px] text-[#C6C6C6]">Process</div>
											<div className="text-[12px] text-[#C6C6C6]">
												{+(airdropStatistics?.committed ?? "0") /
													+airdrop.totalRaise}
												%
											</div>
										</div>
									</div>
								</div> */}
						</div>
					</div>

					<div className="flex-1 flex flex-col gap-6">
						{timeStartDiff.status !== LAUNCHPAD_STATUS.UPCOMING && (
							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-xl font-bold text-[#F1F1F1] border-b border-b-[#2D313E] pb-2">
									Your Allocation
								</div>

								{!accountStatistics?.signature ? (
									<div className="font-normal text-[#C6C6C6] text-center pt-6">
										You are not eligible
									</div>
								) : (
									<div className="grid grid-cols-4 gap-y-6 border-b border-b-[#2D313E] py-6">
										<div className="flex flex-col justify-center">
											<div className="text-[12px] text-[#C6C6C6]">
												Your airdrop
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													+ethers.formatUnits(
														airdrop.totalAirdropAmount ?? "0",
														airdrop.tokenAirdrop.decimals
													) / +airdrop.totalAirdrop
												)}{" "}
												{airdrop.tokenAirdrop.symbol}
											</div>
										</div>

										<div className="flex flex-col justify-center">
											<div className="text-[12px] text-[#C6C6C6]">Claimed</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													ethers.formatUnits(
														accountStatistics?.claimed ?? "0",
														airdrop.tokenAirdrop.decimals
													)
												)}{" "}
												{airdrop.tokenAirdrop.symbol}
											</div>
										</div>

										<div className="flex flex-col justify-center">
											<div className="text-[12px] text-[#C6C6C6]">
												Claimable
											</div>
											<div className="text-[14px] text-[#F1F1F1] font-bold">
												{numberWithCommas(
													+ethers.formatUnits(
														airdrop.totalAirdropAmount ?? "0",
														airdrop.tokenAirdrop.decimals
													) /
														+airdrop.totalAirdrop -
														Number(
															ethers.formatUnits(
																accountStatistics?.claimed ?? "0",
																airdrop.tokenAirdrop.decimals
															)
														)
												)}{" "}
												{airdrop.tokenAirdrop.symbol}
											</div>
										</div>

										<div className="flex justify-end">
											{/* <span
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
												onClick={handleClaim}
											>
												Claim
											</span> */}

											<div>
												<Button
													handler={handleClaim}
													claimable={true}
													text="Claim"
													loading={false}
													loadingText="Claiming"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						)}

						<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="text-xl font-bold text-[#F1F1F1] mb-3 border-b border-b-[#2D313E] pb-3">
								Vesting Schedule
							</div>

							<ul className="steps steps-vertical">
								{airdrop.vestingTime.map((time: number, idx: number) => (
									<li key={idx} data-content="" className="step">
										<div>
											<div className="flex gap-3 items-center">
												<div className="py-1 px-3 bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] text-[12px] text-[#0D0E12] rounded-xl text-center">
													{airdrop.vestingPercent[idx] / 1000}%
												</div>
												<div className="text-[12px] text-[#C6C6C6]">
													{dayjs((airdrop.start + time) * 1000).format(
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
								dangerouslySetInnerHTML={{ __html: airdrop.desc }}
							/>
						</div>

						<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="border-b border-b-[#2D313E] pb-3 flex justify-between">
								<div className="text-xl font-bold text-[#F1F1F1] mb-3">
									Eligible Users
								</div>
								<div className="flex gap-3">
									<input
										className={clsx(
											"focus:border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight",
											{
												"border-[#2D313E]": true,
											},
											"focus:border-[#2D313E]"
										)}
										type="text"
										placeholder="Search"
									/>
								</div>
							</div>

							{airdrop.eligibles.map((e, idx) => (
								<div
									key={idx}
									className="text-center max-w-[200px] overflow-hidden"
								>
									{e.spender}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
