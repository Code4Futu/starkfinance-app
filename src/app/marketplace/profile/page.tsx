"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Image from "next/image";
import clsx from "clsx";
import {
	InfoSection,
	FilterProfileSwiper,
	LargeView,
	SmallView,
	ListingSection,
	CollectedSection,
	OfferReceiveSection,
	ActivitySection,
} from "./components";
import { useState } from "react";
import {
	ProfileFilter,
	SelectFilter,
	selectFilterMockup,
} from "@/app/models/user";
import { Input, Popover } from "antd";
import { SearchIcon } from "../collections/components";
import { DropdownLightIcon } from "@/app/components/icons";
import { Divider } from "@/app/components/Divider";
import { CollectionChain } from "@/app/models/collections";
import {
	ActivityEvent,
	CollectionActivity,
} from "@/app/models/marketplaceActivity";
import { CurrencyType } from "@/app/models/currency";
import { ModalActivityFilter } from "@/app/components/modals/ModalActivityFilter";
import { CloseIcon } from "../activity/page";

export default function Profile() {
	const [profileFilter, setProfileFilter] =
		useState<ProfileFilter>("collected");
	const [view, setView] =
		useState<string>("small");
	const [selectedItem, setSelectedItem] =
		useState<string[]>([]);
	const [openSelectFilter, setOpenSelectFilter] =
		useState<boolean>(false);
	const [selectFilter, setSelectFilter] =
		useState<SelectFilter>("newest");

	const handleOpenSelectFilter = (
		newOpen: boolean
	) => {
		setOpenSelectFilter(newOpen);
	};

	const handleSelectItem = (address: string) => {
		if (
			selectedItem.find(
				(item) => item === address
			)
		) {
			setSelectedItem(
				selectedItem.filter(
					(item) => item !== address
				)
			);
			return;
		}
		setSelectedItem([...selectedItem, address]);
	};

	// Filter
	const [isOpenFilter, setIsOpenFilter] =
		useState<boolean>(false);
	const [eventType, setEventType] = useState<
		ActivityEvent[]
	>([]);
	const [collectionFilter, setCollectionFilter] =
		useState<CollectionActivity[]>([]);
	const [chainFilter, setChainFilter] = useState<
		CollectionChain[]
	>([]);
	const [currencyFilter, setCurrencyFilter] =
		useState<CurrencyType[]>([]);

	// Event Filter
	const onChangeEventTypeFilter = (
		event: ActivityEvent
	) => {
		const filter = eventType.find(
			(item) => item === event
		);
		if (!filter) {
			setEventType([...eventType, event]);
			return;
		}
		setEventType(
			eventType.filter((item) => item !== event)
		);
	};

	// Collection Filter
	const onChangeCollectionFilter = (
		col: CollectionActivity
	) => {
		const filter = collectionFilter.find(
			(item) => item === col
		);
		if (!filter) {
			setCollectionFilter([
				...collectionFilter,
				col,
			]);
			return;
		}
		setCollectionFilter(
			collectionFilter.filter(
				(item) => item !== col
			)
		);
	};

	// Chain Filter
	const onChangeChainFilter = (
		col: CollectionChain
	) => {
		const filter = chainFilter.find(
			(item) => item === col
		);
		if (!filter) {
			setChainFilter([...chainFilter, col]);
			return;
		}
		setChainFilter(
			chainFilter.filter((item) => item !== col)
		);
	};

	// Currency Filter
	const onChangeCurrencyFilter = (
		col: CurrencyType
	) => {
		const filter = currencyFilter.find(
			(item) => item === col
		);
		if (!filter) {
			setCurrencyFilter([...currencyFilter, col]);
			return;
		}
		setCurrencyFilter(
			currencyFilter.filter(
				(item) => item !== col
			)
		);
	};

	// Handle Clear All Filter
	const handleClearAllFilter = () => {
		setEventType([]);
		setCollectionFilter([]);
		setChainFilter([]);
		setCurrencyFilter([]);
	};

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Marketplace",
						icon: "/svg/market.svg",
						url: "/",
					},
					{ text: "Profile" },
				]}
			/>
			<div className="relative flex pt-6 flex-col gap-3 justify-between items-start mb-6 md:gap-6 md:mb-[500px] lg:mb-9 w-full">
				{/* Header */}
				<InfoSection />
				{/* Swiper */}
				<FilterProfileSwiper
					profileFilter={profileFilter}
					setProfileFilter={setProfileFilter}
				/>
				{/* Filter */}
				<div className="w-full flex flex-col items-start py-3 gap-3">
					<div className="flex flex-col items-end gap-[10px] self-stretch md:flex-row">
						<Input
							className="h-[48px] p-3 border-[#2D313E] md:max-w-[420px] rounded-2xl"
							placeholder="Find the name item & ID"
							prefix={
								<div className="flex">
									<SearchIcon />
									<div className="w-[1px] h-6 bg-[#2D313E] mx-3"></div>
								</div>
							}
						/>
						<div className="flex justify-end items-start gap-[10px] self-stretch w-full">
							<div
								className={clsx(
									"flex justify-end items-start rounded-2xl border-[1px] border-[#2D313E]",
									profileFilter !== "collected" &&
										"hidden"
								)}
							>
								<div
									className={clsx(
										"flex items-center p-3 gap-1 rounded-2xl cursor-pointer transition-all",
										view === "large" &&
											"bg-[#2D313E]"
									)}
									onClick={() => setView("large")}
								>
									<LargeView />
								</div>
								<div
									className={clsx(
										"flex items-center p-3 gap-1 rounded-2xl cursor-pointer transition-all",
										view === "small" &&
											"bg-[#2D313E]"
									)}
									onClick={() => setView("small")}
								>
									<SmallView />
								</div>
							</div>
							<Popover
								content={
									<div className="flex p-3 flex-col items-center justify-center gap-[6px] rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
										{selectFilterMockup().map(
											(item, idx) => (
												<div
													key={idx}
													className="flex py-3 px-6 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all"
													onClick={() =>
														setSelectFilter(
															item.value
														)
													}
												>
													<span className="text-base leading-[19px] text-[#f1f1f1]">
														{item.label}
													</span>
												</div>
											)
										)}
									</div>
								}
								trigger="click"
								open={openSelectFilter}
								onOpenChange={
									handleOpenSelectFilter
								}
								arrow={false}
								placement="bottom"
							>
								<div className="flex justify-between items-center py-3 pl-6 pr-3 flex-1 rounded-2xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all">
									<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
										{
											selectFilterMockup().find(
												(item) =>
													item.value ===
													selectFilter
											)?.label
										}
									</span>
									<DropdownLightIcon />
								</div>
							</Popover>
							<div
								className="relative flex flex-col justify-center items-center p-3 rounded-2xl border-[1px] border-[#2D313E] w-[48px] h-[48px] cursor-pointer hover:bg-[#3C3D4D] transition-all lg:w-[147px] lg:px-6 lg:flex-row lg:gap-1"
								onClick={() =>
									setIsOpenFilter(true)
								}
							>
								<span className="hidden lg:flex text-base font-bold leading-[19px]">
									All Filters
								</span>
								<div className="relative flex justify-center items-center w-6 h-6 cursor-pointer">
									<Image
										src="/svg/filter.svg"
										alt=""
										fill
									/>
								</div>
								<div className="lg:hidden absolute right-[-5px] top-[-6px] flex justify-center items-center rounded-xl bg-[#24C3BC]">
									<span className="flex justify-center items-center w-6 h-6 text-sm text-center text-[#f1f1f1]">
										{eventType.length +
											collectionFilter.length +
											chainFilter.length +
											currencyFilter.length}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Divider />
				{/* Filter selected list desktop mode */}
				<div className="hidden lg:flex items-start justify-start gap-3 flex-wrap max-w-[1088px]">
					{eventType.map((item, idx) => (
						<div
							key={idx}
							className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
							onClick={() =>
								onChangeEventTypeFilter(item)
							}
						>
							<span className="text-base font-bold leading-[19px]">
								{item}
							</span>
							<CloseIcon />
						</div>
					))}
					{collectionFilter.map((item, idx) => (
						<div
							key={idx}
							className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
							onClick={() =>
								onChangeCollectionFilter(item)
							}
						>
							<span className="text-base font-bold leading-[19px]">
								{item}
							</span>
							<CloseIcon />
						</div>
					))}
					{chainFilter.map((item, idx) => (
						<div
							key={idx}
							className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
							onClick={() =>
								onChangeChainFilter(item)
							}
						>
							<span className="text-base font-bold leading-[19px]">
								{item}
							</span>
							<CloseIcon />
						</div>
					))}
					{currencyFilter.map((item, idx) => (
						<div
							key={idx}
							className="flex justify-center items-center gap-1 py-3 pl-6 pr-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer"
							onClick={() =>
								onChangeCurrencyFilter(item)
							}
						>
							<span className="text-base font-bold leading-[19px]">
								{item}
							</span>
							<CloseIcon />
						</div>
					))}
					<div
						onClick={() => handleClearAllFilter()}
						className={clsx(
							"flex justify-center items-center gap-1 py-3 px-6 rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer",
							Number(
								eventType.length +
									collectionFilter.length +
									chainFilter.length +
									currencyFilter.length
							) === 0 && "hidden"
						)}
					>
						<span className="text-base font-bold">
							Clear All
						</span>
					</div>
				</div>
				{/* Profile filter view */}
				<div className="w-full flex flex-col items-start pb-6 gap-6">
					<CollectedSection
						profileFilter={profileFilter}
						view={view}
						selectedItem={selectedItem}
						handleSelectItem={handleSelectItem}
					/>
					<OfferReceiveSection
						profileFilter={profileFilter}
					/>
					<ListingSection
						profileFilter={profileFilter}
					/>
					<ActivitySection
						profileFilter={profileFilter}
					/>
				</div>
			</div>
			{isOpenFilter && (
				<ModalActivityFilter
					isShowing={isOpenFilter}
					hide={() => setIsOpenFilter(false)}
					eventType={eventType}
					onChangeEventTypeFilter={
						onChangeEventTypeFilter
					}
					collectionFilter={collectionFilter}
					onChangeCollectionFilter={
						onChangeCollectionFilter
					}
					chainFilter={chainFilter}
					onChangeChainFilter={
						onChangeChainFilter
					}
					currencyFilter={currencyFilter}
					onChangeCurrencyFilter={
						onChangeCurrencyFilter
					}
					handleClearAllFilter={
						handleClearAllFilter
					}
				/>
			)}
		</div>
	);
}
