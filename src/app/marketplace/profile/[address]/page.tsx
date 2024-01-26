"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Divider } from "@/app/components/Divider";
import { mockupCollections } from "@/app/models/collections";
import {
	ActivitySection,
	Description,
	FilterProfileDetailSwiper,
	Information,
	OfferSection,
	ProfileDetailHeader,
} from "./components";
import { useState } from "react";
import {
	ProfileDetailFilter,
	userTraitMockup,
} from "@/app/models/user";
import { ExampleChart } from "@/app/exchange/add-liquidity/components/Chart/ExampleChart";
import clsx from "clsx";

export default function MyCollectedDetailPage({
	params,
}: {
	params: { address: string };
}) {
	const [
		profileDetailFilter,
		setProfileDetailFilter,
	] = useState<ProfileDetailFilter>(
		"information"
	);
	const collection = mockupCollections().find(
		(item) => item.address === params.address
	);
	if (!collection) return null;

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Marketplace",
						icon: "/svg/market.svg",
						url: "/",
					},
					{
						text: "Events",
						url: "marketplace/events",
					},
					{ text: collection.name },
				]}
			/>
			<div className="flex pt-6 flex-col gap-6 items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
				<ProfileDetailHeader
					collection={collection}
				/>
				<FilterProfileDetailSwiper
					profileDetailFilter={
						profileDetailFilter
					}
					setProfileDetailFilter={
						setProfileDetailFilter
					}
				/>
				<div
					className={clsx(
						"w-full flex flex-col items-start pb-6 gap-6",
						profileDetailFilter !==
							"information" && "hidden"
					)}
				>
					<div className="w-full flex flex-col items-start p-6 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
						<div className="w-full flex flex-col items-start gap-3 self-stretch">
							<span className="text-xl font-bold leading-[23px]">
								Properties
							</span>
							<Divider />
						</div>
						<div className="w-full min-[390px]:grid min-[390px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[10px] self-stretch">
							{userTraitMockup().map(
								(item, idx) => (
									<div
										key={idx}
										className="w-[142px] flex flex-col justify-center items-center p-3 gap-1 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] md:py-6 md:w-full"
									>
										<span className="text-xs text-[#c6c6c6] leading-[14px]">
											{item.label}
										</span>
										<span className="text-base leading-[19px]">
											{item.name}
										</span>
										<span className="text-xs text-[#c6c6c6] leading-[14px]">
											Rate ({item.rate}%)
										</span>
									</div>
								)
							)}
						</div>
					</div>
					<div className="w-full flex flex-col gap-6 md:flex-row">
						<Information />
						<Description />
					</div>
				</div>
				<div
					className={clsx(
						"w-full flex items-start px-6 pt-12 pb-6 rounded-2xl border-[1px] border-[#2D313E] bg-[#1A1C24] h-[394px]",
						profileDetailFilter !==
							"priceHistory" && "hidden"
					)}
				>
					<ExampleChart />
				</div>
				<OfferSection
					profileDetailFilter={
						profileDetailFilter
					}
				/>
				<ActivitySection
					profileDetailFilter={
						profileDetailFilter
					}
				/>
			</div>
		</div>
	);
}
