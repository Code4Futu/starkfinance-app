"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BASE_API } from "@/app/constants";
import { getTokenIcon } from "@/app/configs/networks";
import { ILocking } from "@/app/types";
import { numberWithCommas } from "@/app/utils";
import { useAccount } from "@starknet-react/core";
import axios from "axios";
import clsx from "clsx";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function TokenLocking() {
	const { address } = useAccount();
	const [isOwn, setIsOwn] = useState<boolean>(false);

	const { data, isLoading } = useSWR<ILocking[]>(
		["locking-token", address, isOwn],
		async () => {
			try {
				if (isOwn && !address) return [];

				let { data } = await axios.get<ILocking[]>(
					`${BASE_API}/locking${isOwn ? `?owner=${address}` : ""}`
				);

				return data;
			} catch (error) {
				return [];
			}
		}
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
					{ text: "Token" },
				]}
			/>

			{/* filters */}
			<div className="flex justify-end items-center mb-6 xl:mb-9">
				<div className="flex gap-3">
					<div
						className={clsx(
							"block border border-[#2D313E] rounded-2xl py-3 px-6 font-bold cursor-pointer",
							{
								"bg-[#F1F1F1] text-[#0D0E12]": !isOwn,
							}
						)}
						onClick={() => setIsOwn(false)}
					>
						All
					</div>

					<div
						className={clsx(
							"block border border-[#2D313E] rounded-2xl py-3 px-6 font-bold cursor-pointer",
							{
								"bg-[#F1F1F1] text-[#0D0E12]": isOwn,
							}
						)}
						onClick={() => setIsOwn(true)}
					>
						My Lock
					</div>
				</div>
			</div>

			<div className="rounded-3xl bg-[#1A1C24] p-6 ">
				<div className="grid grid-cols-7 border-b border-b-[#2D313E] pb-[12px]">
					<div className="col-span-3">Name</div>
					<div className="col-span-3">Amount</div>
					<div className="text-end px-[24px]">Details</div>
				</div>

				{data?.map((e, idex) => (
					<div className="grid grid-cols-7 border-b border-b-[#2D313E] py-[12px]">
						<div className="col-span-3 flex items-center">
							<div className="border rounded-3xl border-[#2D313E] px-[16px] py-[8px] flex gap-1 items-center">
								<div className="w-[30px] h-[30px] relative">
									<Image
										src={getTokenIcon(e.address)}
										alt="token"
										fill
										sizes="any"
									/>
								</div>
								<div className="flex flex-col">
									<div className="font-bold translate-y-[2px]">{e.symbol}</div>
									<div className="text-[12px] text-[#C6C6C6] translate-y-[-2px]">
										{e.name}
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-3 flex items-center">
							{numberWithCommas(ethers.formatUnits(e.amount, e.decimals))}{" "}
							{e.decimals}
						</div>
						<div className="flex justify-end">
							<Link
								href={`/launchpad/locking/token/${e.address}`}
								className="border rounded-2xl border-[#2D313E] px-[24px] py-[8px] flex items-center justify-center font-bold cursor-pointer"
							>
								View
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
