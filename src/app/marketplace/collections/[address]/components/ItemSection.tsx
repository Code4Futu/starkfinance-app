"use client";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Checkbox } from "antd";
import {
	CollectionDetailTab,
	mockupCollections,
} from "@/app/models/collections";
import { ProfileFilter } from "@/app/models/user";
import {
	Listing,
	Transfer,
} from "@/app/marketplace/profile/components";
import { ModalTransfer } from "@/app/components/modals/ModalTransfer";
import { ModalListing } from "@/app/components/modals/ModalListing";
import Link from "next/link";

export const ItemSection = ({
	profileFilter,
	view,
	selectedItem,
	handleSelectItem,
}: {
	profileFilter: CollectionDetailTab;
	view: string;
	selectedItem: string[];
	handleSelectItem: (address: string) => void;
}) => {
	const [
		openTransferModal,
		setOpenTransferModal,
	] = useState<boolean>(false);
	const [openListingModal, setOpenListingModal] =
		useState<boolean>(false);
	return (
		<>
			<div
				className={clsx(
					"hidden w-full flex-wrap gap-3 md:gap-5 lg:gap-6 self-stretch",
					profileFilter === "item" && "!flex"
				)}
			>
				{mockupCollections().map((item, idx) => (
					<div
						key={idx}
						className={clsx(
							"w-full flex flex-col items-start rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden transition-all cursor-pointer",
							view === "small" &&
								"max-w-[165px] lg:max-w-[198px]",
							view === "large" && "max-w-[346px]",
							selectedItem.find(
								(e) => e === item.address
							) !== undefined &&
								"!border-[#24C3BC]"
						)}
					>
						<Link
							href={`/marketplace/profile/${item.address}`}
							className={clsx(
								"relative w-[165px] h-[165px]",
								view === "small" &&
									"w-[165px] h-[165px] lg:w-[198px] lg:h-[198px]",
								view === "large" &&
									"w-[346px] h-[346px]"
							)}
						>
							<Image
								src="https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__"
								alt=""
								fill
							/>
							{selectedItem.find(
								(e) => e === item.address
							) !== undefined && (
								<div
									style={{
										backdropFilter: "blur(20px)",
									}}
									className="absolute top-[4px] left-[4px] inline-flex items-start p-1 gap-[10px] rounded-lg border-[1px] border-[#5E5E5E] bg-[#f1f1f11a] transition-all"
								>
									<div className="relative w-6 h-6">
										<Image
											src="/svg/switch_network.svg"
											alt=""
											fill
										/>
									</div>
								</div>
							)}
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="absolute top-[4px] right-[4px] inline-flex items-center justify-center p-1 rounded-lg border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Checkbox
									className="w-6 h-6"
									onChange={() =>
										handleSelectItem(item.address)
									}
								></Checkbox>
							</div>
						</Link>
						<div
							style={{
								backdropFilter: "blur(20px)",
							}}
							className="flex flex-col justify-end items-start gap-3 p-3 self-stretch"
						>
							<div className="flex flex-col items-start gap-[5px] self-stretch">
								<span className="text-sm font-bold text-[#f1f1f1] leading-[16px]">
									VN Soldier #6868
								</span>
								<span className="text-xs text-[#f1f1f1] leading-[14px] line-clamp-1">
									Vietnam Cypher Collection
								</span>
							</div>
							<div className="flex flex-col items-start justify-end h-[34px] gap-[5px] self-stretch">
								{view === "large" && (
									<span className="text-sm font-bold text-[#f1f1f1] leading-[15px]">
										{item.price}
									</span>
								)}
								<span className="text-xs text-[#c6c6c6] leading-[14px]">
									Last sale: 0.005 ETH
								</span>
							</div>
						</div>
						<div className="flex items-end gap-[1px] self-stretch">
							<div
								className="flex py-2 justify-center items-center flex-1 bg-[#2D313E] cursor-pointer"
								onClick={() =>
									setOpenListingModal(true)
								}
							>
								<Listing />
							</div>
							<div
								className="flex py-2 justify-center items-center flex-1 bg-[#2D313E] cursor-pointer"
								onClick={() =>
									setOpenTransferModal(true)
								}
							>
								<Transfer />
							</div>
						</div>
					</div>
				))}
			</div>
			{openTransferModal && (
				<ModalTransfer
					isShowing={openTransferModal}
					hide={setOpenTransferModal}
				/>
			)}
			{openListingModal && (
				<ModalListing
					isShowing={openListingModal}
					hide={setOpenListingModal}
				/>
			)}
		</>
	);
};
