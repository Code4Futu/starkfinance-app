"use client";
import clsx from "clsx";
import Image from "next/image";
import {
	ACTIVITY_STATUS,
	boardDataMockup,
} from "@/app/models/marketplaceActivity";
import { ProfileFilter } from "@/app/models/user";
import { useState } from "react";
import { ModalEditListing } from "@/app/components/modals/ModalEditListing";

export const ListingSection = ({
	profileFilter,
}: {
	profileFilter: ProfileFilter;
}) => {
	const [openModalEdit, setOpenModalEdit] =
		useState<boolean>(false);

	return (
		<div
			className={clsx(
				"hidden w-full flex-col justify-center items-center p-6 gap-3 self-stretch rounded-3xl bg-[#1A1C24]",
				profileFilter === "listing" && "!flex",
				profileFilter === "offersMade" && "!flex"
			)}
		>
			<div className="hidden md:flex justify-between items-center py-3 self-stretch">
				<span className="hidden w-[140px] text-sm text-[#f1f1f1] font-bold leading-[16px] xl:block">
					Event
				</span>
				<span className="w-[260px] text-sm text-[#f1f1f1] font-bold leading-[16px] xl:w-[300px]">
					Item
				</span>
				<span className="w-[100px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px] xl:w-[120px]">
					Price
				</span>
				<span className="w-[140px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Expiration
				</span>
				<span className="w-[120px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Action
				</span>
			</div>
			{boardDataMockup().map((item, idx) => (
				<div
					key={idx}
					className="w-full flex flex-col items-start py-3 gap-3 self-stretch md:flex-row md:justify-between md:items-center"
				>
					<div className="hidden w-[140px] items-center gap-[10px] xl:flex">
						<div className="flex flex-col justify-center items-start gap-[2px]">
							<div
								className={clsx(
									"flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
									{
										"border-[#6CFF7B] bg-[#6CFF7B1a] text-[#6CFF7B]":
											item.action ===
											ACTIVITY_STATUS.SALE,
									},
									{
										"border-[#277EFF] bg-[#277eff1a] text-[#277EFF]":
											item.action ===
											ACTIVITY_STATUS.LISTING,
									},
									{
										"border-[#AD6CFF] bg-[#AD6CFF1a] text-[#AD6CFF]":
											item.action ===
											ACTIVITY_STATUS.OFFER,
									},
									{
										"border-[#00C4DF] bg-[#00C4DF1a] text-[#00C4DF]":
											item.action ===
											ACTIVITY_STATUS.TRANSFER,
									},
									{
										"border-[#FFE86C] bg-[#FFE86C1a] text-[#FFE86C]":
											item.action ===
											ACTIVITY_STATUS.AUCTION,
									},
									{
										"border-[#FF6C8F] bg-[#FF6C8F1a] text-[#FF6C8F]":
											item.action ===
											ACTIVITY_STATUS.BID,
									}
								)}
							>
								<div className="relative w-4 h-4">
									<Image
										src={`/svg/${item.action.toLowerCase()}.svg`}
										alt=""
										fill
									/>
								</div>
								<span
									className={clsx(
										"text-sm leading-[16px]"
									)}
								>
									{item.action}
								</span>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-between items-center md:w-[260px] xl:w-[300px]">
						<div className="flex items-center gap-[6px]">
							<div className="relative w-[62px] h-[62px] rounded-lg border-[1px] border-[#f1f1f1] overflow-hidden">
								<Image
									src={
										"https://s3-alpha-sig.figma.com/img/ad4c/5140/d705cce2acb399b02db77f632f20c2ab?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L5uVNwRHFyG6DJ3HM~R1gQFd1GI6yzRYdWFY4oS8xpO8440QZx7aGwWVbG2cET1Gn7imbQuskQHTZG8cVUI2n4aRX1ycK1LSZoRbZrsf7sCR5K7DJ~qT6fK325lRCoOZV8bSJv-wApx9cZPcjiXPpDorbtu6E-coUGwC0wPzvrSIkfDhHQeKokyhk1QqaofoR-Mp~rt8qWENrxTwmj9tDEcdT-jojHn7LFVyeghm-MmtwdisHrGbZpq3G1SOgd3cBXRBZziMW2bih-Veb1MVTH71JEX7fvLWHDfDCKb~ptNtB~CycGa8CgHJ3fwoKbIHvmTA4AODxuPtvSztfLBs7g__"
									}
									alt=""
									fill
								/>
							</div>
							<div className="flex flex-col justify-center items-start gap-[2px]">
								<div
									className={clsx(
										"flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px] xl:hidden",
										{
											"border-[#6CFF7B] bg-[#6CFF7B1a] text-[#6CFF7B]":
												item.action ===
												ACTIVITY_STATUS.SALE,
										},
										{
											"border-[#277EFF] bg-[#277eff1a] text-[#277EFF]":
												item.action ===
												ACTIVITY_STATUS.LISTING,
										},
										{
											"border-[#AD6CFF] bg-[#AD6CFF1a] text-[#AD6CFF]":
												item.action ===
												ACTIVITY_STATUS.OFFER,
										},
										{
											"border-[#00C4DF] bg-[#00C4DF1a] text-[#00C4DF]":
												item.action ===
												ACTIVITY_STATUS.TRANSFER,
										},
										{
											"border-[#FFE86C] bg-[#FFE86C1a] text-[#FFE86C]":
												item.action ===
												ACTIVITY_STATUS.AUCTION,
										},
										{
											"border-[#FF6C8F] bg-[#FF6C8F1a] text-[#FF6C8F]":
												item.action ===
												ACTIVITY_STATUS.BID,
										}
									)}
								>
									<div className="relative w-4 h-4">
										<Image
											src={`/svg/${item.action.toLowerCase()}.svg`}
											alt=""
											fill
										/>
									</div>
									<span
										className={clsx(
											"text-sm leading-[16px]"
										)}
									>
										{item.action}
									</span>
								</div>
								<span className="text-sm text-[#f1f1f1] leading-[16px] line-clamp-1">
									{item.collectionName}
								</span>
								<span className="text-xs text-[#c6c6c6] leading-[14px] line-clamp-1">
									{item.label}
								</span>
							</div>
						</div>
						<div className="flex flex-col items-end gap-[2px] md:hidden">
							<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
								0.01 ETH
							</span>
							<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
								~$2.01
							</span>
						</div>
					</div>
					<div className="hidden flex-col items-end justify-center gap-[2px] md:w-[100px] md:flex xl:w-[120px]">
						<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
							0.01 ETH
						</span>
						<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
							~$2.01
						</span>
					</div>
					<div className="w-full flex items-end justify-between self-stretch md:flex-col md:w-[140px] md:justify-center">
						<span className="md:hidden text-xs text-[#c6c6c6] leading-[14px]">
							Expiration
						</span>
						<span className="text-sm text-right text-[#f1f1f1] leading-[16px]">
							in 06 days
						</span>
					</div>
					<div className="w-full flex justify-end md:w-[120px]">
						<div
							className="w-full button-linear-2 flex justify-center items-center h-9 py-3 px-6 gap-1 self-stretch rounded-xl md:max-w-[76px]"
							onClick={() =>
								setOpenModalEdit(true)
							}
						>
							<span className="text-base font-bold text-[#0D0E12] leading-[19px]">
								Edit
							</span>
						</div>
					</div>
				</div>
			))}
			{openModalEdit && (
				<ModalEditListing
					isShowing={openModalEdit}
					hide={setOpenModalEdit}
				/>
			)}
		</div>
	);
};
