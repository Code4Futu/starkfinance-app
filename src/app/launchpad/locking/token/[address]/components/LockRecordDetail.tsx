"use client";

import Button from "@/app/components/Button";
import { ILockingPool } from "@/app/types";
import { numberWithCommas } from "@/app/utils";
import { useAccount } from "@starknet-react/core";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { Contract, validateAndParseAddress } from "starknet";
import { LOCKING_ADDRESS } from "@/app/launchpad/locking/constants";
import LockingAbi from "@/app/launchpad/abis/starknet/SFLocking.json";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function LockRecordDetail({ lock }: { lock: ILockingPool }) {
	const { account, address } = useAccount();

	const [unlocking, setUnlocking] = useState<boolean>(false);

	const handleUnlock = useCallback(async () => {
		if (!lock.owner || !address || !account || !lock.tokenAddress)
			return alert("Connect wallet first");
		if (validateAndParseAddress(lock.owner) != validateAndParseAddress(address))
			return alert("Only owner can unlock");
		try {
			const lockingContract = new Contract(
				LockingAbi,
				LOCKING_ADDRESS,
				account
			);

			const unlockCallData = lockingContract.populate("unlock", {
				token: lock.tokenAddress,
				lock_id: lock.lockId,
			});

			setUnlocking(true);
			const tx = await account.execute(unlockCallData);
			await account.waitForTransaction(tx.transaction_hash);

			alert(`Unlock success. TxHash is ${tx.transaction_hash}`);

			setUnlocking(false);
		} catch (error) {
			setUnlocking(false);
			console.log(error);
		}
	}, [account, address, lock.owner, lock.tokenAddress, lock.lockId]);

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
						text: `${lock.tokenAddress.slice(0, 6)}...${lock.tokenAddress.slice(
							-4
						)}`,

						url: `/launchpad/locking/token/${lock.tokenAddress}`,
					},
					{ text: lock.lockId },
				]}
			/>

			<div className="grid gap-6">
				{/* unlock time */}
				<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-4">
					<div className="border-b border-b-[#2D313E] pb-3">
						<div className="text-[20px] font-bold text-[#F1F1F1]">
							Unlock in
						</div>
					</div>
					<div>{dayjs(+lock.tge * 1000).format("YY-MM-DD hh:mm")}</div>
				</div>

				{/* token info */}
				<div className="flex flex-col gap-6 border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-4">
					<div className="border-b border-b-[#2D313E] pb-3">
						<div className="text-[20px] font-bold text-[#F1F1F1]">
							Token Info
						</div>
					</div>

					<div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token address
							</div>
							<div className="text-[14px] font-bold">{lock.tokenAddress}</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token name
							</div>
							<div className="text-[14px] font-bold">{lock.token.name}</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token symbol
							</div>
							<div className="text-[14px] font-bold">{lock.token.symbol}</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Token decimals
							</div>
							<div className="text-[14px] font-bold">{lock.token.decimals}</div>
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
								Total Amount Locked
							</div>
							<div className="text-[14px] font-bold">
								{numberWithCommas(
									ethers.formatUnits(lock.amount, lock.token.decimals)
								)}
							</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Total Values Locked
							</div>
							<div className="text-[14px] font-bold">$ ~</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">Owner</div>
							<div className="text-[14px] font-bold">{lock.owner}</div>
						</div>
						<div className="flex justify-between border-b border-b-[#2D313E] py-2">
							<div className="font-[500] text-[#C6C6C6] text-[12px]">
								Unlock Date
							</div>
							<div className="text-[14px] font-bold">
								{dayjs(+lock.tge * 1000).format("YY-MM-DD hh:mm")}
							</div>
						</div>

						<div className="flex mt-6 justify-center gap-[10px]">
							<div className="min-w-[240px] text-center border border-[#2D313E] rounded-2xl py-3 px-6 font-bold cursor-pointer">
								Renounce Lock Ownership
							</div>

							<div className="min-w-[240px] flex">
								<Button
									handler={handleUnlock}
									claimable={true}
									text="Unlock"
									loading={unlocking}
									loadingText="Unlocking"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
