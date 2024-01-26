"use client";
import Image from "next/image";
import { Divider } from "../../../components/Divider";
import { ViewCollectionButton } from "../../../components/buttons";
import cypherAvatar from "/public/svg/cypher_avatar.svg";
import { useState } from "react";
import clsx from "clsx";
import { DateFilter } from "@/app/models/dateFilter";
import { DateFilterItem } from "@/app/components/DateFilterItem";

const mockArray = [0, 1, 2, 3, 4];

const defaultDateFilter: DateFilter = "24h";

export const TopCollection = () => {
	const [dateFilter, setDateFilter] =
		useState<DateFilter>(defaultDateFilter);

	return (
		<>
			{/* Mobile table */}
			<div className="md:hidden w-full">
				<div className="flex w-full flex-col items-start gap-6">
					<span className="text-[32px] font-bold text-[#f1f1f1]">
						Top Collections
					</span>
					<div className="flex flex-col items-start gap-3 self-stretch">
						<div className="flex items-start gap-3 self-stretch">
							<div className="flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] cursor-pointer">
								<span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
									24h
								</span>
								<ArrowDown />
							</div>
							<div className="flex h-[43px] py-3 px-6 justify-center gap-1 items-center rounded-2xl border-[1px] border-[#2D313E] cursor-pointer">
								<span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
									Trending
								</span>
							</div>
							<div className="flex h-[43px] py-3 px-6 justify-center gap-1 items-center rounded-2xl cursor-pointer button-linear-2 cursor-pointer">
								<span className="text-base text-[#0D0E12] font-bold leading-[19px]">
									Volume
								</span>
							</div>
						</div>
						{/* Table */}
						<div className="flex w-full p-6 flex-col justify-center items-center gap-3 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
							<div className="flex py-3 justify-between items-center self-stretch">
								<span className="min-[338px]:w-[40px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
									#
								</span>
								<span className="min-[338px]:w-[160px] text-left text-sm font-bold text-[#f1f1f1] leading-[16px]">
									Collection
								</span>
								<span className="min-[338px]:w-[90px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
									Volume
								</span>
							</div>
							<Divider />
							{mockArray.map((item, idx) => (
								<div
									className="w-full"
									key={idx}
								>
									<TransactionMobile idx={idx} />
									<Divider />
								</div>
							))}
							<div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
								<ViewCollectionButton
									title="View all collections"
									isIconHidden
									className="max-w-[189px]"
									url="/"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Desktop Table */}
			<div className="hidden md:flex w-full">
				<div className="flex w-full flex-col items-start gap-6">
					<div className="flex justify-between items-end self-stretch">
						<span className="text-[32px] font-bold text-[#f1f1f1]">
							Top Collections
						</span>
						<div className="flex items-start gap-3 self-stretch">
							<div className="xl:hidden min-w-[120px] flex h-[43px] py-3 pl-6 pr-3 justify-between items-center rounded-2xl border-[1px] border-[#2D313E] cursor-pointer">
								<span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
									24h
								</span>
								<ArrowDown />
							</div>
							<div className="hidden xl:flex p-1 items-start gap-2 rounded-xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
								<DateFilterItem
									dateFilter={dateFilter}
									setDateFilter={setDateFilter}
								/>
							</div>
							<div className="flex h-[43px] py-3 px-6 justify-center gap-1 items-center rounded-2xl border-[1px] border-[#2D313E] cursor-pointer">
								<span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
									Trending
								</span>
							</div>
							<div className="flex h-[43px] py-3 px-6 justify-center gap-1 items-center rounded-2xl cursor-pointer button-linear-2">
								<span className="text-base text-[#0D0E12] font-bold leading-[19px]">
									Volume
								</span>
							</div>
						</div>
					</div>
					<div className="flex w-full p-6 flex-col justify-center items-center gap-3 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
						<div className="flex py-3 justify-between items-center self-stretch">
							<span className="w-[40px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
								Rank
							</span>
							<span className="w-[200px] text-sm font-bold text-[#f1f1f1] leading-[16px]">
								Collection
							</span>
							<span className="w-[70px] text-left text-sm font-bold text-[#f1f1f1] leading-[16px]">
								Floor Price
							</span>
							<span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
								% Change
							</span>
							<span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
								Items
							</span>
							<span className="w-[70px] text-right text-sm font-bold text-[#f1f1f1] leading-[16px]">
								Volume
							</span>
						</div>
						<Divider />
						{mockArray.map((item, idx) => (
							<div
								className="w-full"
								key={idx}
							>
								<TransactionDesktop idx={idx} />
								<Divider />
							</div>
						))}
						<div className="flex w-full pt-3 justify-center items-center gap-[10px] self-stretch">
							<ViewCollectionButton
								title="View all collections"
								isIconHidden
								className="max-w-[189px]"
								url="/"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const ArrowDown = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.1464 15.5708C12.7204 15.9764 12.0296 15.9764 11.6036 15.5708L6.69452 10.8978C6.26849 10.4922 6.26849 9.83471 6.69452 9.42916C7.12054 9.02362 7.81127 9.02362 8.2373 9.42916L12.375 13.3679L16.5127 9.42916C16.9387 9.02362 17.6295 9.02362 18.0555 9.42916C18.4815 9.83471 18.4815 10.4922 18.0555 10.8978L13.1464 15.5708Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};

const TransactionDesktop = ({
	idx,
}: {
	idx: number;
}) => {
	return (
		<div className="flex py-3 justify-between items-center self-stretch">
			<span className="text-base font-normal leading-[19px] w-[40px] text-[#f1f1f1]">
				{idx + 1}
			</span>
			<div className="flex w-[200px] items-center gap-[10px]">
				<Image
					src={cypherAvatar}
					alt=""
					width={36}
					height={36}
					className="rounded-lg"
				/>
				<span className="text-[#f1f1f1] text-sm font-normal leading-[32px] flex-1">
					Vietnam Cypher
				</span>
			</div>
			<span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
				0.01 ETH
			</span>
			<span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#6CFF7B]">
				50%
			</span>
			<span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
				10,000
			</span>
			<span className="text-sm text-right w-[70px] font-normal leading-[16px] text-[#f1f1f1]">
				6,868 ETH
			</span>
		</div>
	);
};

const TransactionMobile = ({
	idx,
}: {
	idx: number;
}) => {
	return (
		<div className="flex py-3 justify-between items-center self-stretch">
			<span className="text-base font-normal leading-[19px] min-[338px]:w-[40px] text-[#f1f1f1]">
				{idx + 1}
			</span>
			<div className="flex min-[338px]:w-[160px] items-center gap-1">
				<Image
					src={cypherAvatar}
					alt=""
					width={36}
					height={36}
					className="rounded-lg"
				/>
				<div className="flex flex-col justify-center items-start gap-1">
					<span className="self-stretch text-sm font-normal text-[#f1f1f1]">
						Vietnam Cypher...
					</span>
					<div className="flex justify-center items-end gap-1">
						<span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
							Floor
						</span>
						<span className="text-sm text-[#f1f1f1] font-normal leading-[16px] whitespace-nowrap">
							0.01 ETH
						</span>
						<span className="text-sm text-[#6CFF7B] font-normal leading-[16px] text-right">
							50%
						</span>
					</div>
					<div className="flex justify-center items-end gap-1">
						<span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
							Item
						</span>
						<span className="text-sm text-[#f1f1f1] font-normal leading-[16px]">
							10,000
						</span>
					</div>
				</div>
			</div>
			<span className="text-sm text-right min-[338px]:w-[90px] font-normal leading-[16px] text-[#f1f1f1]">
				6,868 ETH
			</span>
		</div>
	);
};
