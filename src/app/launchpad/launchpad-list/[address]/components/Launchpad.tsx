"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Button from "@/app/components/Button";
import {
	BASE_API,
	LAUNCHPAD_STATUS,
	StarknetRpcProvider,
} from "@/app/constants";
import { useWeb3 } from "@/app/hooks";
import ERC20Abi from "@/app/launchpad/abis/starknet/ERC20.json";
import SFLaunchpadAbi from "@/app/launchpad/abis/starknet/SFLaunchpad.json";
import Status from "@/app/launchpad/components/Status";
import { useWeb3Store } from "@/app/store";
import { ILaunchpad } from "@/app/types";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import { ethers } from "ethers";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CallData, Contract, cairo, num } from "starknet";
import useSWR from "swr";
import utc from "dayjs/plugin/utc";
import { getTokenIcon } from "@/app/configs/networks";
import CountDown from "@/app/components/CountDown";
import CountDownEnd from "@/app/components/CountDownEnd";

dayjs.extend(utc);

export default function Launchpad({ launchpad }: { launchpad: ILaunchpad }) {
	const { account, library, isConnected } = useWeb3();

	const txHash = useWeb3Store((s) => s.txHash);

	const { data: launchpadStatistics, isLoading: launchpadStatisticsLoading } =
		useSWR<{
			participants: string | undefined;
			committed: string | undefined;
		}>([launchpad.address, txHash], async () => {
			try {
				const launchpadStatistics = await StarknetRpcProvider.callContract({
					contractAddress: launchpad.address,
					entrypoint: "get_stats",
				});

				return {
					participants: num.hexToDecimalString(launchpadStatistics.result[0]),
					committed: num.hexToDecimalString(launchpadStatistics.result[4]),
				};
			} catch (error) {
				return {
					participants: undefined,
					committed: undefined,
				};
			}
		});

	const { data: accountStatistics, isLoading: accountStatisticsLoading } =
		useSWR<{
			tokenRaiseBalance: string | undefined;
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
		}>(
			[launchpad.address, launchpad.tokenRaise.address, account, txHash],
			async () => {
				try {
					const tokenRaiseContract = new Contract(
						ERC20Abi,
						launchpad.tokenRaise.address,
						StarknetRpcProvider
					);
					const launchpadContract = new Contract(
						SFLaunchpadAbi,
						launchpad.address,
						StarknetRpcProvider
					);

					const [balanceOf, userStats] = await Promise.all([
						tokenRaiseContract.balanceOf(account!, {
							parseResponse: true,
						}),
						launchpadContract.get_user_stats(account!, {
							parseResponse: true,
						}),
					]);

					return {
						tokenRaiseBalance: balanceOf.toString(),
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
				}
			}
		);

	const { data: nfts, isLoading: nftsLoading } = useSWR<any[]>(
		[account],
		() => fetch(`${BASE_API}/nfts?address=${account}`).then((r) => r.json()),
		{ refreshInterval: 300 }
	);

	const [commitAmount, setCommitAmount] = useState<string>("");
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [claiming, setClaiming] = useState<boolean>(false);
	const [claimingRemaining, setClaimingRemaining] = useState<boolean>(false);
	const [stakingNft, setStakingNft] = useState<boolean>(false);

	const [searchNft, setSearchNft] = useState<string>("");

	const modalRef = useRef<HTMLButtonElement>(null);

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

	const claimableTime = useMemo<number>(() => {
		if (
			!accountStatistics?.lastCommittedTime ||
			!accountStatistics?.claimedCount
		)
			return launchpad.end;

		return Math.max(
			+accountStatistics.lastCommittedTime +
				launchpad.vestingTime[+accountStatistics.claimedCount],
			launchpad.end
		);
	}, [
		accountStatistics?.lastCommittedTime,
		accountStatistics?.claimedCount,
		launchpad.vestingTime,
		launchpad.end,
	]);

	const [claimable, claimableRemaining] = useMemo<[boolean, boolean]>(() => {
		if (!account) return [false, false];

		let claimable: boolean = false,
			claimableRemaining: boolean = false;
		if (
			typeof accountStatistics?.allocation !== "undefined" &&
			typeof accountStatistics?.claimed !== "undefined" &&
			BigInt(accountStatistics.allocation) >
				BigInt(accountStatistics.claimed) &&
			claimableTime < Math.floor(Date.now() / 1000)
		)
			claimable = true;

		if (
			timeStartDiff.status === LAUNCHPAD_STATUS.END &&
			typeof accountStatistics?.remaining !== "undefined" &&
			BigInt(accountStatistics.remaining) > 0
		)
			claimableRemaining = true;

		return [claimable, claimableRemaining];
	}, [
		accountStatistics?.lastCommittedTime,
		account,
		accountStatistics?.allocation,
		accountStatistics?.claimed,
		timeStartDiff.status,
		accountStatistics?.remaining,
		claimableTime,
		timeStartDiff.s,
	]);

	const handleCommit = useCallback(async () => {
		if (!isConnected) return toast.error("Connect wallet first");
		try {
			if (!commitAmount || isNaN(+commitAmount))
				return toast.error("Invalid commit amount");
			const amount = ethers.parseUnits(
				commitAmount,
				launchpad.tokenRaise.decimals
			);
			if (amount < BigInt(launchpad.minCommit)) {
				return toast.error("Not enough MIN commit");
			}

			if (
				amount > BigInt(launchpad.maxCommit) ||
				amount >
					BigInt(launchpad.maxCommit) -
						BigInt(accountStatistics?.committed ?? 0)
			)
				return toast.error("Only can commit less than MAX commit");

			setSubmitting(true);
			const calls = [
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
			];

			const tx = await library.execute(calls);
			await StarknetRpcProvider.waitForTransaction(tx.transaction_hash);
			useWeb3Store.setState({ txHash: tx.transaction_hash });
			setCommitAmount("");
			setSubmitting(false);
			toast.success(`Commit success. TxHash is ${tx.transaction_hash}`);
		} catch (error: any) {
			setSubmitting(false);
			toast.error(error.message);
		}
	}, [
		isConnected,
		library,
		launchpad.address,
		launchpad.tokenRaise.address,
		launchpad.tokenRaise.decimals,
		commitAmount,
		launchpad.minCommit,
		launchpad.maxCommit,
		accountStatistics?.committed,
	]);

	const handleClaim = useCallback(async () => {
		if (!library) return toast.error("Connect wallet first");
		try {
			if (!claimable) return toast.error("Nothing to claim");

			if (!launchpad.address) return;

			setClaiming(true);
			const calls = [
				{
					contractAddress: launchpad.address,
					entrypoint: "claim",
					calldata: [],
				},
			];
			const tx = await library.execute(calls);
			await StarknetRpcProvider.waitForTransaction(tx.transaction_hash);
			useWeb3Store.setState({ txHash: tx.transaction_hash });
			setClaiming(false);
			toast.success(`Claim success. TxHash is ${tx.transaction_hash}`);
		} catch (error: any) {
			setClaiming(false);
			toast.error(error.message);
		}
	}, [library, launchpad.address, claimable]);

	const handleClaimRemaining = useCallback(async () => {
		if (!library) return toast.error("Connect wallet first");
		try {
			if (!claimableRemaining) return toast.error("Nothing to claim");

			if (!launchpad.address) return;

			setClaimingRemaining(true);
			const calls = [
				{
					contractAddress: launchpad.address,
					entrypoint: "claim_remaining",
					calldata: [],
				},
			];
			const tx = await library.execute(calls);
			await StarknetRpcProvider.waitForTransaction(tx.transaction_hash);
			useWeb3Store.setState({ txHash: tx.transaction_hash });
			setClaimingRemaining(false);
			toast.success(
				`Claim remaining success. TxHash is ${tx.transaction_hash}`
			);
		} catch (error: any) {
			setClaimingRemaining(false);
			toast.error(error.message);
		}
	}, [library, launchpad.address, claimableRemaining]);

	const handleStakeNft = useCallback(
		async (nftId: string) => {
			if (!library) return toast.error("Connect wallet first");
			try {
				if (!launchpad.address || !modalRef.current) return;
				setStakingNft(true);
				const calls = [
					{
						contractAddress: launchpad.nft,
						entrypoint: "approve",
						calldata: CallData.compile({
							to: launchpad.address,
							token_id: cairo.uint256(nftId),
						}),
					},
					{
						contractAddress: launchpad.address,
						entrypoint: "stake_nft",
						calldata: CallData.compile({
							nft_id: cairo.uint256(nftId),
						}),
					},
				];
				const tx = await library.execute(calls);
				await StarknetRpcProvider.waitForTransaction(tx.transaction_hash);
				modalRef.current.click();
				useWeb3Store.setState({ txHash: tx.transaction_hash });
				setStakingNft(false);
				toast.success(`Stake NFT success. TxHash is ${tx.transaction_hash}`);
			} catch (error: any) {
				setStakingNft(false);
				toast.error(error.message);
			}
		},
		[library, launchpad.address, claimableRemaining, modalRef]
	);

	const handleOpenStakeNftModal = useCallback(() => {
		// @ts-expect-error
		document.getElementById("nft_modal").showModal();
	}, []);

	return (
		<div>
			<dialog id="nft_modal" className="modal">
				<div className="modal-box bg-[#1A1C24] p-6 md:max-w-[560px] xl:max-w-[1200px]">
					<div className="flex justify-between items-center py-3 border-b border-b-[#2D313E]">
						<div className="">Your StarkFinance NFT</div>

						<div>
							<input
								type="text"
								value={searchNft}
								placeholder="Search"
								onChange={(e) => setSearchNft(e.target.value)}
								className="input placeholder:opacity-50 w-full bg-[#0D0E12] border-[#2D313E] rounded-2xl outline-0 focus:outline-0 focus:border-solid focus:border-[#2D313E]"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-8">
						{nfts?.filter((nft) => nft.nftId.toString().includes(searchNft))
							.length ? (
							nfts
								.filter((nft) => nft.nftId.toString().includes(searchNft))
								.map((nft) => (
									<div
										key={nft.nftId}
										className="flex flex-col gap-6 border border-[#2D313E] bg-[#232631] rounded-3xl pb-6"
									>
										<div className="w-full pt-[100%] relative">
											<Image src="/nft/stark_nft.png" alt="nft" fill />
										</div>

										<div className="text-center text-[20px] text-[#F1F1F1]">
											<div>StarkFinance NFT</div>
											<div>#{nft.nftId}</div>
										</div>

										<div className="w-full flex justify-center">
											<div>
												<Button
													handler={() => handleStakeNft(nft.nftId)}
													claimable={true}
													text="Stake NFT"
													loading={stakingNft}
													loadingText=""
												/>
											</div>
										</div>
									</div>
								))
						) : (
							<div className="col-span-1 md:col-span-2 xl:col-span-4 text-center">
								You don't have StarkFinance NFT
							</div>
						)}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button ref={modalRef}>close</button>
				</form>
			</dialog>

			<Breadcrumbs
				items={[
					{ text: "Launchpad", icon: "/svg/launchpad.svg", url: "/" },
					{ text: "Launchpad List", url: "/launchpad/launchpad-list" },
					{ text: launchpad.name },
				]}
			/>

			<div className="flex flex-col gap-8">
				{/* <div className="w-full h-[113px] md:h-[239px] xl:h-[363px] relative">
					<Image alt="image" src="/mocks/banner.png" fill />
				</div> */}

				<div className="flex justify-stretch gap-3 items-center">
					<div className="w-[59px] h-[59px] md:w-[66px] md:h-[66px] xl:w-[76px] xl:h-[76px] relative">
						<Image alt="image" src="/tokens/sfn.png" fill />
					</div>
					<div className="flex-1 flex flex-col justify-between">
						<div className="text-[20px] md:text-[24px] xl:text-[32px] font-bold line-clamp-1">
							{launchpad.name}
						</div>
						<div className="flex flex-wrap items-center gap-1.5 md:gap-3">
							<Status status={timeStartDiff.status} />
							<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
								<div className="w-[18px] h-[18px] relative">
									<Image
										src={`/wallets/${launchpad.chainKey}.png`}
										alt="starknet"
										fill
										sizes="any"
									/>
								</div>
								<div className="text-[12px] text-[#F1F1F1] capitalize font-medium">
									{launchpad.chainKey}
								</div>
							</div>
							{/* <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
									<Image src="/logo.png" alt="token" width={8} height={8} />
									<div className="text-[12px] text-[#F1F1F1]">
										SFN
									</div>
								</div> */}
							<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] capitalize font-medium">
								{launchpad.type}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					<div className="col-span-1 flex flex-col gap-6 w-full xl:w-[368px]">
						{/* countdown */}
						<div className="grid grid-cols-1 gap-3 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="font-bold text-[16px] md:text-[20px] xl:text-[24px] text-[#F1F1F1] pb-3 border-b border-b-[#2D313E]">
								Launchpad {statusToText(timeStartDiff.status)}
							</div>

							<div className="flex justify-between md:justify-start xl:justify-between gap-0 md:gap-6 xl:gap-0">
								<CountDown start={launchpad.start} end={launchpad.end} />
							</div>
						</div>

						{/* project info (mobile + tablet) */}
						<div className="flex xl:hidden flex-col gap-3 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="flex flex-col md:flex-row items-start justify-start md:items-center md:justify-between gap-3 border-b border-b-[#2D313E] pb-3">
								<div className="font-bold text-[16px] md:text-[20px] xl:text-[24px] text-[#F1F1F1]">
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

							<div className="w-full pt-[50%] rounded-2xl relative overflow-hidden">
								<Image alt="image" src="/mocks/banner2.png" fill />
							</div>

							<div
								className="text-[#F1F1F1] text-[14px] md:text-[16px]"
								dangerouslySetInnerHTML={{ __html: launchpad.desc }}
							/>
						</div>

						{/* launchpad info */}
						<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="text-[16px] md:text-[20px] xl:text-[24px] pb-3 border-b border-b-[#2D313E] font-bold text-[#F1F1F1]">
								Launchpad information
							</div>
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Start time
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
									{dayjs
										.utc(launchpad.start * 1000)
										.format("MMM DD YYYY HH:mm")}{" "}
									UTC
								</div>
							</div>
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									End time
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
									{dayjs.utc(launchpad.end * 1000).format("MMM DD YYYY HH:mm")}{" "}
									UTC
								</div>
							</div>

							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Total raise
								</div>
								<div className="flex items-center gap-1">
									<div className="w-[19px] h-[19px] relative">
										<Image
											src={getTokenIcon(launchpad.tokenRaise.address)}
											alt="tokenRaise"
											fill
											sizes="any"
										/>
									</div>
									<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimals
											)
										)}{" "}
										{/* {launchpad.tokenRaise.symbol} */}
									</div>

									<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
										{launchpad.tokenRaise.symbol}
									</div>
								</div>
							</div>

							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Total sale
								</div>
								<div className="flex items-center gap-1">
									<div className="w-[19px] h-[19px] relative">
										<Image
											src={getTokenIcon(launchpad.tokenSale.address)}
											alt="tokenSale"
											fill
											sizes="any"
										/>
									</div>
									<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpad.totalSale,
												launchpad.tokenSale.decimals
											)
										)}{" "}
										{/* {launchpad.tokenSale.symbol} */}
									</div>

									<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
										{launchpad.tokenSale.symbol}
									</div>
								</div>
							</div>

							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Rate
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
									1 {launchpad.tokenRaise.symbol} ={" "}
									{numberWithCommas(
										launchpad.totalRaiseUSD /
											+ethers.formatUnits(
												launchpad.totalRaise,
												launchpad.tokenRaise.decimals
											)
									)}{" "}
									USDT
								</div>
							</div>

							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Vesting
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
									{launchpad.vestingPercent[0] / 1000}% on TGE
								</div>
							</div>
							<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Min / Max commit
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
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
								<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
									Total participants
								</div>
								<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
									{numberWithCommas(launchpadStatistics?.participants ?? 0)}
								</div>
							</div>
							<div className="mt-3">
								<div className="flex justify-between">
									<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
										Total committed
									</div>
									<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
										{numberWithCommas(
											ethers.formatUnits(
												launchpadStatistics?.committed ?? "0",
												launchpad.tokenRaise.decimals
											)
										)}{" "}
										{launchpad.tokenRaise.symbol}
									</div>
								</div>

								<div className="flex flex-col gap-1">
									<progress
										className="progress progress-accent h-[16px] mt-3"
										value={
											(+(launchpadStatistics?.committed ?? "0") /
												+launchpad.totalRaise) *
											100
										}
										max="100"
									></progress>
									<div className="flex justify-between">
										<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
											Process
										</div>
										<div className="text-[12px] md:text-[14px] text-[#F1F1F1]">
											{numberWithCommas(
												(+(launchpadStatistics?.committed ?? "0") /
													+launchpad.totalRaise) *
													100
											)}
											%
										</div>
									</div>
								</div>
							</div>

							{timeStartDiff.status !== LAUNCHPAD_STATUS.END && (
								<div className="py-3 mt-3 border-t border-t-[#2D313E]">
									<div className="flex justify-between mb-1">
										<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
											{launchpad.tokenRaise.symbol} balance:
										</div>
										<div className="text-[14px] md:text-[16px] font-medium text-[#C6C6C6]">
											{numberWithCommas(
												ethers.formatUnits(
													accountStatistics?.tokenRaiseBalance ?? "0",
													launchpad.tokenRaise.decimals
												)
											)}
										</div>
									</div>

									<input
										type="text"
										value={commitAmount}
										onChange={(e) => setCommitAmount(e.target.value)}
										className="input w-full bg-[#0D0E12] border-[#2D313E] rounded-2xl outline-0 focus:outline-0 focus:border-solid focus:border-[#2D313E]"
									/>

									<div className="flex justify-between gap-5 mt-6">
										<Button
											handler={handleCommit}
											claimable={
												!!library &&
												!!accountStatistics?.committed &&
												timeStartDiff.status === LAUNCHPAD_STATUS.INPROGRESS &&
												+commitAmount <
													BigInt(launchpad.maxCommit) -
														BigInt(accountStatistics?.committed ?? 0)
											}
											text="Commit"
											loading={submitting}
											loadingText=""
										/>

										<Button
											handler={handleOpenStakeNftModal}
											claimable={
												!!library &&
												!nftsLoading &&
												!!launchpadStatistics?.committed &&
												+launchpadStatistics.committed >
													+launchpad.totalRaise &&
												typeof accountStatistics?.stakedNft !== undefined &&
												!accountStatistics?.stakedNft
											}
											text="Stake NFT"
											loading={false}
											loadingText=""
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="xl:col-span-2 flex flex-col gap-6">
						{/* project info (pc) */}
						<div className="hidden xl:flex flex-col gap-3 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="flex flex-col md:flex-row items-start justify-start md:items-center md:justify-between gap-3 border-b border-b-[#2D313E] pb-3">
								<div className="text-[16px] md:text-[20px] xl:text-[24px] font-bold text-[#F1F1F1]">
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

							<div className="w-full pt-[50%] rounded-2xl relative overflow-hidden">
								<Image alt="image" src="/mocks/banner2.png" fill />
							</div>

							<div
								className="text-[#F1F1F1]"
								dangerouslySetInnerHTML={{ __html: launchpad.desc }}
							/>
						</div>

						{/* user allocation */}
						{timeStartDiff.status !== LAUNCHPAD_STATUS.UPCOMING ? (
							<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
								<div className="text-[16px] md:text-[20px] xl:text-[24px]  font-bold text-[#F1F1F1] border-b border-b-[#2D313E] pb-3">
									Your Allocation{" "}
									{accountStatistics?.stakedNft ? (
										<span className="text-[14px] md:text-[16px] xl:text-[20px] font-[500]">
											(Starksport NFT #{accountStatistics?.nftId})
										</span>
									) : null}
								</div>

								{!account ? (
									<div className="text-[14px] md:text-[16px] text-[#C6C6C6] pt-3 text-center">
										Connect wallet first
									</div>
								) : (
									<>
										<div className="grid grid-cols-2 md:grid-cols-5 gap-y-3 border-b border-b-[#2D313E] py-3">
											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Committed
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenRaise.address)}
															alt="tokenRaise"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.committed ?? "0",
																launchpad.tokenRaise.decimals
															)
														)}{" "}
														{!!accountStatistics?.stakedNft
															? `( +${numberWithCommas(
																	+ethers.formatUnits(
																		accountStatistics?.committed ?? "0",
																		launchpad.tokenSale.decimals
																	) / 10
															  )} )`
															: null}{" "}
														{/* {launchpad.tokenRaise.symbol} */}
													</div>
												</div>
											</div>

											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Allocation
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenSale.address)}
															alt="tokenSale"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.allocation ?? "0",
																launchpad.tokenSale.decimals
															)
														)}{" "}
														{/* {launchpad.tokenSale.symbol} */}
													</div>
												</div>
											</div>

											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Claimed
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenSale.address)}
															alt="tokenSale"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.claimed ?? "0",
																launchpad.tokenSale.decimals
															)
														)}{" "}
														{/* {launchpad.tokenSale.symbol} */}
													</div>
												</div>
											</div>

											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Claimable
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenSale.address)}
															alt="tokenSale"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.claimable ?? "0",
																launchpad.tokenSale.decimals
															)
														)}{" "}
														{/* {launchpad.tokenSale.symbol} */}
													</div>
												</div>
											</div>

											{!isNaN(claimableTime) ? (
												<div className="col-span-2 md:col-span-1 flex justify-end">
													<div className="flex-1 md:flex-none flex">
														<Button
															handler={handleClaim}
															claimable={claimable}
															text="Claim"
															loading={claiming}
															loadingText=""
														/>
													</div>
												</div>
											) : null}
										</div>

										<div className="grid grid-cols-2 md:grid-cols-5 pt-3 gap-y-3">
											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Deducted
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenRaise.address)}
															alt="tokenRaise"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.deducted ?? "0",
																launchpad.tokenRaise.decimals
															)
														)}{" "}
														{/* {launchpad.tokenRaise.symbol} */}
													</div>
												</div>
											</div>

											<div className="flex flex-col gap-1 md:gap-2">
												<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
													Remaining
												</div>
												<div className="flex items-center gap-1">
													<div className="w-[19px] h-[19px] relative">
														<Image
															src={getTokenIcon(launchpad.tokenRaise.address)}
															alt="tokenRaise"
															fill
															sizes="any"
														/>
													</div>

													<div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
														{numberWithCommas(
															ethers.formatUnits(
																accountStatistics?.remaining ?? "0",
																launchpad.tokenRaise.decimals
															)
														)}{" "}
														{/* {launchpad.tokenRaise.symbol} */}
													</div>
												</div>
											</div>
											<div className="col-span-2 flex flex-col gap-1 md:gap-2">
												<>
													<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
														Time to unlock
													</div>
													<div className="flex justify-between md:justify-start xl:justify-between gap-0 md:gap-3 xl:gap-0">
														{!!accountStatistics?.lastCommittedTime ? (
															<CountDownEnd
																start={
																	+accountStatistics.lastCommittedTime + 259200
																}
															/>
														) : null}
													</div>
												</>
											</div>

											<div className="col-span-2 md:col-span-1 flex justify-end">
												<div className="flex-1 md:flex-none flex">
													<Button
														handler={handleClaimRemaining}
														claimable={
															claimableRemaining &&
															typeof accountStatistics?.lastCommittedTime !==
																"undefined" &&
															+accountStatistics.lastCommittedTime + 259200 <
																Math.floor(Date.now() / 1000)
														}
														text="Claim"
														loading={claimingRemaining}
														loadingText=""
													/>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						) : null}

						{/*  vesting schedule */}
						<div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
							<div className="font-bold text-[16px] md:text-[20px] xl:text-[24px] text-[#F1F1F1] mb-3 border-b border-b-[#2D313E] pb-3">
								Vesting Schedule
							</div>

							<ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{launchpad.vestingTime.map((time: number, idx: number) => (
									<div key={idx} className="flex flex-col gap-2">
										<div className="flex gap-3 items-center">
											<div className="py-1 px-3 bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] text-[12px] text-[#0D0E12] rounded-xl text-center">
												{launchpad.vestingPercent[idx] / 1000}%
											</div>
											<div className="flex items-center gap-1">
												<div className="w-[19px] h-[19px] relative">
													<Image
														src={getTokenIcon(launchpad.tokenSale.address)}
														alt="tokenSale"
														fill
														sizes="any"
													/>
												</div>

												<div className="text-[14px] md:text-[16px] font-medium text-[#24C3BC]">
													{numberWithCommas(
														(+ethers.formatUnits(
															launchpad.totalSale,
															launchpad.tokenSale.decimals
														) *
															launchpad.vestingPercent[idx]) /
															1000
													)}
													{/* {launchpad.tokenSale.symbol} */}
												</div>
											</div>
										</div>
										<div>
											<div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
												{dayjs
													.utc((launchpad.end + time) * 1000)
													.format("MMM DD YYYY HH:mm")}{" "}
												UTC
											</div>
										</div>
									</div>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
