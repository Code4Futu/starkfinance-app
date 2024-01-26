"use client";
import { Divider } from "@/app/components/Divider";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CollectionStatusComponent } from "./CollectionStatus";
import {
	Discord,
	Github,
	Medium,
	Twitter,
} from "./SocialIcon";
import {
	CollectionChain,
	CollectionDetailTab,
	ICollectionOwner,
	collectionDetailTab,
} from "@/app/models/collections";
import { timeDiff } from "@/app/utils";
import { Overview } from "./Overview";
import { FilterProfileDetailSwiper } from "./FilterProfileDetailTab";
import { Input, Popover } from "antd";
import { SearchIcon } from "../../components";
import {
	LargeView,
	SmallView,
} from "@/app/marketplace/profile/components";
import {
	SelectFilter,
	selectFilterMockup,
} from "@/app/models/user";
import { DropdownLightIcon } from "@/app/components/icons";
import {
	ActivityEvent,
	CollectionActivity,
} from "@/app/models/marketplaceActivity";
import { CurrencyType } from "@/app/models/currency";
import { ModalActivityFilter } from "@/app/components/modals/ModalActivityFilter";
import { CloseIcon } from "@/app/marketplace/activity/page";
import { ItemSection } from "./ItemSection";
import { ActivitySection } from "./ActivitySection";

export const CollectionDetail = ({
	collection,
}: {
	collection: ICollectionOwner | undefined;
}) => {
	const [tab, setTab] =
		useState<CollectionDetailTab>("overview");
	const [view, setView] =
		useState<string>("small");
	const [openSelectFilter, setOpenSelectFilter] =
		useState<boolean>(false);
	const [selectFilter, setSelectFilter] =
		useState<SelectFilter>("newest");
	const [timeStartDiff, setTimeStartDiff] =
		useState<{
			d: number;
			h: number;
			m: number;
			s: number;
		}>({
			d: 0,
			h: 0,
			m: 0,
			s: 0,
		});
	const [isShown, setIsShown] =
		useState<boolean>(false);
	const [selectedItem, setSelectedItem] =
		useState<string[]>([]);

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

	useEffect(() => {
		const interval = setInterval(() => {
			if (!collection) return;
			const time = timeDiff(
				Date.now(),
				collection.start * 1000,
				collection.end * 1000
			);
			setTimeStartDiff(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [collection?.start, collection?.end]);

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

	if (!collection) return null;

	return (
		<>
			{/* Desktop Header */}
			<div
				onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => setIsShown(false)}
				className="hidden relative w-full flex-col items-start rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden md:flex md:h-[360px] lg:h-[544px]"
			>
				<div
					style={{
						background: `url(${collection.banner})`,
					}}
					className={clsx(
						"relative w-full h-full !bg-no-repeat !bg-[leng:100%_100%]",
						isShown && "scale-110 duration-500"
					)}
				></div>
				<div className="flex w-full p-3 flex-col justify-end items-start gap-3 md:absolute md:bottom-0">
					<div className="flex items-end gap-3 self-stretch pb-3">
						<div className="relative h-[67px] w-[67px]">
							<Image
								src={collection.logo}
								loading="lazy"
								alt=""
								fill
							/>
						</div>
						<div className="flex flex-col items-start gap-[2px]">
							<div className="flex items-start gap-2">
								<div
									style={{
										backdropFilter: "blur(20px)",
										background:
											"rgba(241, 241, 241, 0.10)",
									}}
									className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
								>
									<div className="relative w-[18px] h-[18px]">
										<Image
											src="/starknet_logo.png"
											alt=""
											fill
										/>
									</div>
									<span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
										{collection.chainKey}
									</span>
								</div>
								<CollectionStatusComponent
									status={collection.status}
								/>
							</div>
							<span className="text-xl font-bold text-[#f1f1f1] leading-[23px] line-clamp-1  max-[390px]:max-w-[138px]">
								{collection.name}
							</span>
							<div className="flex items-start gap-1">
								<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
									By
								</span>
								<span className="text-xs font-medium leading-[14px] text-linear">
									{collection.owner}
								</span>
							</div>
						</div>
						<div className="flex items-end justify-end gap-3 flex-1">
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Twitter />
							</div>
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Medium />
							</div>
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Discord />
							</div>
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Medium />
							</div>
							<div
								style={{
									backdropFilter: "blur(20px)",
								}}
								className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
							>
								<Github />
							</div>
						</div>
					</div>
					<div
						className="flex justify-between items-start self-stretch py-3 px-6 rounded-xl border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
						style={{
							backdropFilter: "blur(20px)",
						}}
					>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Item
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.totalItem}
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Total volume
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.totalVolume} ETH
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Floor price
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.floorPrice} ETH
							</span>
						</div>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Best offer
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.bestOffer} ETH
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								% Listed
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.listed}%
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Owners (Unique)
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								600 (70%)
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Mobile Header */}
			<div className="md:hidden flex w-full flex-col items-start rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden">
				<div
					style={{
						background: `url(${collection.banner})`,
						backgroundSize: "100% 100%",
					}}
					className="relative w-full h-[171px] bg-no-repeat"
				></div>
				<div
					className="flex w-full p-3 flex-col justify-end items-start gap-3"
					style={{ backdropFilter: "blur(20px)" }}
				>
					<div className="flex items-end gap-3 self-stretch pb-3">
						<div className="relative h-[67px] w-[67px]">
							<Image
								src={collection.logo}
								loading="lazy"
								alt=""
								fill
							/>
						</div>
						<div className="flex flex-col items-start gap-[2px]">
							<div className="flex items-start gap-2">
								<div
									style={{
										backdropFilter: "blur(20px)",
										background:
											"rgba(241, 241, 241, 0.10)",
									}}
									className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
								>
									<div className="relative w-[18px] h-[18px]">
										<Image
											src="/starknet_logo.png"
											alt=""
											fill
										/>
									</div>
									<span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
										{collection.chainKey}
									</span>
								</div>
								<CollectionStatusComponent
									status={collection.status}
								/>
							</div>
							<span className="text-xl font-bold text-[#f1f1f1] leading-[23px] line-clamp-1  max-[390px]:max-w-[138px]">
								{collection.name}
							</span>
							<div className="flex items-start gap-1">
								<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
									By
								</span>
								<span className="text-xs font-medium leading-[14px] text-linear">
									{collection.owner}
								</span>
							</div>
						</div>
						<div className="flex justify-end items-end gap-[10px] flex-1 cursor-pointer">
							<div className="flex items-start gap-[10px] p-1 rounded-lg border-[1px] border-[#2D313E] bg-[#232631]">
								<IconShareLink />
							</div>
						</div>
					</div>
					<div
						className="flex justify-between items-center self-stretch rounded-xl"
						style={{
							backdropFilter: "blur(20px)",
						}}
					>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Item
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.totalItem}
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Total volume
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.totalVolume} ETH
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Floor price
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.floorPrice} ETH
							</span>
						</div>
					</div>
					<Divider />
					<div
						className="flex justify-between items-center self-stretch rounded-xl"
						style={{
							backdropFilter: "blur(20px)",
						}}
					>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Best offer
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.bestOffer} ETH
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								% Listed
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								{collection.listed}%
							</span>
						</div>
						<div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
						<div className="flex flex-col items-start gap-1 w-[90px]">
							<span className="text-xs font-normal text-[#c6c6c6]">
								Owners (Unique)
							</span>
							<span className="text-base font-bold text-[#f1f1f1]">
								600 (70%)
							</span>
						</div>
					</div>
				</div>
			</div>
			<FilterProfileDetailSwiper
				detailProfileFilter={tab}
				setDetailProfileFilter={setTab}
			/>
			<div
				className={clsx(
					"w-full flex flex-col items-start py-3 gap-3",
					tab !== "item" && "!hidden"
				)}
			>
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
								"flex justify-end items-start rounded-2xl border-[1px] border-[#2D313E]"
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
			{/* Filter selected list desktop mode */}
			<div
				className={clsx(
					"hidden lg:flex items-start justify-start gap-3 flex-wrap max-w-[1088px]",
					tab !== "item" && "!hidden"
				)}
			>
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
			<ActivitySection
				collectionDetailTab={tab}
			/>
			<ItemSection
				profileFilter={tab}
				view={view}
				selectedItem={selectedItem}
				handleSelectItem={handleSelectItem}
			/>
			{tab === "overview" && (
				<Overview
					collection={collection}
					timeStartDiff={timeStartDiff}
				/>
			)}
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
		</>
	);
};

export const IconShareLink = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M18.0019 15.75C17.5978 15.7499 17.1979 15.8316 16.8264 15.9903C16.4548 16.149 16.1192 16.3814 15.84 16.6734L8.9025 12.7702C9.03688 12.2655 9.03688 11.7345 8.9025 11.2299L15.84 7.32657C16.3452 7.85032 17.024 8.17192 17.7493 8.23111C18.4745 8.2903 19.1965 8.08302 19.7799 7.6481C20.3633 7.21319 20.7682 6.58048 20.9186 5.8685C21.069 5.15653 20.9546 4.41415 20.5969 3.78043C20.2393 3.14672 19.6628 2.66515 18.9756 2.42595C18.2883 2.18676 17.5374 2.20634 16.8636 2.48103C16.1897 2.75572 15.6392 3.26667 15.315 3.91817C14.9909 4.56966 14.9154 5.317 15.1027 6.02016L8.16515 9.92344C7.75075 9.49137 7.21656 9.19316 6.63128 9.06718C6.046 8.9412 5.43642 8.99321 4.88095 9.21653C4.32548 9.43985 3.84953 9.82425 3.51433 10.3203C3.17912 10.8163 3 11.4013 3 12C3 12.5987 3.17912 13.1837 3.51433 13.6797C3.84953 14.1758 4.32548 14.5602 4.88095 14.7835C5.43642 15.0068 6.046 15.0588 6.63128 14.9328C7.21656 14.8069 7.75075 14.5086 8.16515 14.0766L15.1027 17.9799C14.9418 18.5854 14.9746 19.2261 15.1964 19.8121C15.4182 20.3981 15.818 20.8999 16.3395 21.2472C16.8611 21.5944 17.4782 21.7696 18.1044 21.7483C18.7306 21.7269 19.3344 21.51 19.8311 21.128C20.3277 20.746 20.6923 20.2181 20.8737 19.6184C21.055 19.0186 21.0441 18.3772 20.8423 17.784C20.6406 17.1908 20.2581 16.6757 19.7487 16.3109C19.2393 15.9461 18.6284 15.75 18.0019 15.75Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};
