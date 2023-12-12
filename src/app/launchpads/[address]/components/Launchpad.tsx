"use client";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { numberWithCommas, timeDiff } from "@/app/utils";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CallData, cairo } from "starknet";
import { useAccount } from "@starknet-react/core";
import dayjs from "dayjs";
import useSWR from "swr";

export default function Launchpad({ launchpad }: any) {
	const { account, address } = useAccount();

	const { data: launchpadStatistics } = useSWR<{
		participants: string;
		committed: string;
	}>(
		`https://launchpad-api.starkfinance.co/launchpads/${launchpad.address}/statistics`,
		(url: string) => fetch(url).then((r) => r.json())
	);

	const { data: accountStatistics } = useSWR<{
		committed: string;
		claimed: string;
	}>(
		`https://launchpad-api.starkfinance.co/launchpads/${launchpad.address}/${address}/statistics`,
		(url: string) => fetch(url).then((r) => r.json())
	);

	const [tokenRaiseBalance, setTokenRaiseBalance] = useState<number>(0);
	const [commitAmount, setCommitAmount] = useState<number>(0);

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

	// useEffect(() => {
	// 	if (account) {

	// 	}

	//   const getBalance = async () {
	//     const balance = await account.callContract({
	// 			contractAddress: launchpad.tokenRaise.address,
	// 			entrypoint: "balanceOf",
	// 		});
	// 		console.log(balance);
	//   }

	// 	return;
	// }, [account, launchpad.tokenRaise]);

	const handleCommit = useCallback(async () => {
		if (!account) return alert("Connect wallet first");
		try {
			if (!commitAmount || isNaN(commitAmount))
				return alert("Invalid commit amount");
			const amount = ethers.formatUnits(
				commitAmount,
				launchpad.tokenRaise.decimal
			);

			if (+amount < +launchpad.minCommit)
				return alert("Must greater MIN commit");

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
			alert("Commit success");
		} catch (error) {
			console.log(error);
		}

		// const nft = await launchpadContract.commit();
	}, [account]);

	return (
		<div>
			<div className="z-[999] breadcrumbs fixed right-0 lg:right-[360px] bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul className="overflow-hidden">
					<li>
						<div className="flex items-center ">
							<div className="w-[24px] h-[24px] relative">
								<Image src="/svg/launchpad.svg" alt="launchpad" fill />
							</div>
							<div className="hidden font-bold ml-1.5">Launchpad</div>
						</div>
					</li>
					<li>
						<Link
							className="hover:no-underline text-[#C6C6C6] font-[400]"
							href="/launchpad-list"
							rel="noreferrer"
						>
							Launchpad List
						</Link>
					</li>
					<li className="font-bold text-[14px]">{launchpad.name}</li>
				</ul>
			</div>

			<div className="pt-9 flex justify-center">
				<div className="flex flex-col gap-8 flex-1 max-w-[1080px]">
					<div className="w-full h-[113px] md:h-[239px] lg:h-[363px] relative">
						<Image alt="image" src="/mocks/banner.png" fill />
					</div>

					<div className="flex justify-stretch gap-3">
						<div className="w-[60px] h-[60px] md:w-[74px] md:h-[74px]  lg:w-[80px] lg:h-[80px] relative">
							<Image alt="image" src="/logo80x80.png" fill />
						</div>
						<div className="flex-1">
							<div className="text-xl md:text-[32px] lg:text-[36px] font-bold line-clamp-1 mb-1.5 md:mb-3">
								{launchpad.name}
							</div>
							<div className="flex flex-wrap items-center gap-1.5 md:gap-3">
								<div className="flex items-center gap-1 bg-[#61b3ff26] py-1.5 px-3 rounded-2xl">
									<div className="w-[8px] h-[8px] relative">
										<Image
											src={`/svg/${timeStartDiff.status}.svg`}
											alt={`${timeStartDiff.status}`}
											fill
										/>
									</div>

									<div className="font-bold text-[14px] text-[#61B3FF] capitalize">
										{timeStartDiff.status}
									</div>
								</div>
								<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<div className="w-[18px] h-[18px] relative">
										<Image
											src={`/wallets/${launchpad.chainKey}.png`}
											alt="starknet"
											fill
										/>
									</div>
									<div className="font-[500] text-[12px] text-[#F1F1F1] capitalize">
										{launchpad.chainKey}
									</div>
								</div>
								{/* <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<Image src="/logo.png" alt="token" width={8} height={8} />
									<div className="font-bold text-[14px] text-[#F1F1F1]">
										SFN
									</div>
								</div> */}
								<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl font-bold text-[14px] text-[#F1F1F1] capitalize">
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
										Sale Start in:
									</div>
									{/* TODO */}
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
												launchpad.tokenRaise.decimal
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
												launchpad.tokenSale.decimal
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
													launchpad.tokenRaise.decimal
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
												SFN balance:
											</div>
											<div className="text-[14px] text-[#C6C6C6]">0</div>
										</div>

										<input
											type="text"
											value={commitAmount}
											onChange={(e) => setCommitAmount(+e.target.value)}
											className="input w-full focus:outline-none bg-[#0D0E12] border-[#2D313E] rounded-2xl focus-within:border-[#2D313E] focus:border-[#2D313E]"
										/>

										<div className="flex justify-between gap-5 mt-6">
											<div
												onClick={handleCommit}
												className="cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl"
											>
												Commit
											</div>
											<div className="cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-[#F1F1F1] rounded-2xl">
												Stark NFT
											</div>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* TODO */}

						<div className="flex-1 flex flex-col gap-6">
							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-xl font-bold text-[#F1F1F1] mb-3 border-b border-b-[#2D313E] pb-3">
									Your Allocation
								</div>

								<div className="grid grid-cols-2">
									<div>
										<div className="text-[12px] text-[#C6C6C6]">
											Committed SFN
										</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(
												ethers.formatUnits(
													launchpadStatistics?.committed ?? "0",
													launchpad.tokenRaise.decimal
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
													launchpad.tokenRaise.decimal
												)
											)}{" "}
											{launchpad.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<div className="text-[12px] text-[#C6C6C6]">Claimed</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(
												ethers.formatUnits(
													accountStatistics?.claimed ?? "0",
													launchpad.tokenRaise.decimal
												)
											)}{" "}
											{launchpad.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<div className="text-[12px] text-[#C6C6C6]">Claimable</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(0)} {launchpad.tokenRaise.symbol}
										</div>
									</div>

									{/* <span className=" cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl">
										Claim
									</span> */}
								</div>

								<div className="grid grid-cols-2">
									<div>
										<div className="text-[12px] text-[#C6C6C6]">
											Your deducted SFN
										</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(2000)} {launchpad.tokenRaise.symbol}
										</div>
									</div>

									<div>
										<div className="text-[12px] text-[#C6C6C6]">
											Your remaining SFN
										</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(8000)} {launchpad.tokenRaise.symbol}
										</div>
									</div>

									{/* <div>
										<div className="text-[12px] text-[#C6C6C6]">Time to unlock</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(10000)} {launchpad.tokenRaise.symbol}
										</div>
									</div> */}

									{/* <div>
										<div className="text-[12px] text-[#C6C6C6]">Claimable</div>
										<div className="text-[14px] text-[#F1F1F1] font-bold">
											{numberWithCommas(0)} {launchpad.tokenRaise.symbol}
										</div>
									</div> */}

									{/* <span className=" cursor-pointer flex-1 text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl">
										Claim
									</span> */}
								</div>
							</div>

							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-xl font-bold text-[#F1F1F1] mb-3 border-b border-b-[#2D313E] pb-3">
									Vesting Schedule
								</div>

								<div></div>
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

								<div className="text-[#C6C6C6] font-[400]">
									{launchpad.desc}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
