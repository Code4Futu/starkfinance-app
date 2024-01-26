import {
	useEffect,
	useRef,
	useState,
} from "react";
import type { CollapseProps } from "antd";
import { Collapse, Input } from "antd";
import { Divider } from "../../Divider";
import {
	ActivityEvent,
	CollectionActivity,
	collectionFilterList,
	eventTypeList,
} from "@/app/models/marketplaceActivity";
import clsx from "clsx";
import { SearchIcon } from "@/app/marketplace/collections/components";
import { Checkbox } from "antd";
import Image from "next/image";
import {
	CollectionChain,
	collectionChainList,
} from "@/app/models/collections";
import {
	CurrencyType,
	currencyList,
} from "@/app/models/currency";

interface Props {
	isShowing: boolean;
	hide: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	item?: any;
	eventType: ActivityEvent[];
	onChangeEventTypeFilter: (
		event: ActivityEvent
	) => void;
	collectionFilter: CollectionActivity[];
	onChangeCollectionFilter: (
		col: CollectionActivity
	) => void;
	chainFilter: CollectionChain[];
	onChangeChainFilter: (
		col: CollectionChain
	) => void;
	currencyFilter: CurrencyType[];
	onChangeCurrencyFilter: (
		col: CurrencyType
	) => void;
	handleClearAllFilter: () => void;
}

export const ModalActivityFilter = (
	props: Props
) => {
	const useOutsideAlerter = (ref: any) => {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event: any) {
				if (
					ref.current &&
					!ref.current.contains(event.target)
				) {
					props.hide(false);
				}
			}
			// Bind the event listener
			document.addEventListener(
				"mousedown",
				handleClickOutside
			);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener(
					"mousedown",
					handleClickOutside
				);
			};
		}, []);
	};

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Event type",
			children: (
				<div className="flex items-start content-start gap-3 self-stretch flex-wrap">
					{eventTypeList().map((item, idx) => (
						<div
							key={idx}
							className={clsx(
								"flex items-center py-3 px-6 gap-3 rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#3C3D4D] transition-all",
								{
									"bg-[#3C3D4D]":
										props.eventType.find(
											(e) => e === item.value
										) !== undefined,
								}
							)}
							onClick={() =>
								props.onChangeEventTypeFilter(
									item.value
								)
							}
						>
							<span className="text-base text-[#f1f1f1] leading-[19px]">
								{item.label}
							</span>
						</div>
					))}
					<Divider />
				</div>
			),
		},
		{
			key: "2",
			label: "Collections",
			children: (
				<div className="flex flex-col items-start gap-3 self-stretch">
					<Input
						className="h-[48px] p-3 border-[#2D313E] md:max-w-[420px] rounded-2xl"
						placeholder="Find the collection name"
						prefix={
							<div className="flex">
								<SearchIcon />
								<div className="w-[1px] h-6 bg-[#2D313E] mx-3"></div>
							</div>
						}
					/>
					{collectionFilterList().map(
						(item, idx) => (
							<div
								key={idx}
								className={clsx(
									"flex w-full items-center py-3 px-3 gap-3 self-stretch rounded-2xl transition-all hover:bg-[#2D313E]",
									{
										"bg-[#2D313E]":
											props.collectionFilter.find(
												(e) => e === item.value
											) !== undefined,
									}
								)}
							>
								<Checkbox
									onChange={() =>
										props.onChangeCollectionFilter(
											item.value
										)
									}
									className="w-6 h-6"
								/>
								<div className="relative w-9 h-9">
									<Image
										src="/svg/cypher_avatar.svg"
										alt=""
										fill
									/>
								</div>
								<div className="flex items-center gap-[10px] flex-1">
									<span className="text-base text-[#f1f1f1] leading-[19px]">
										{item.label}
									</span>
									<span className="text-base text-[#c6c6c6] leading-[19px]">
										{item.total}
									</span>
								</div>
							</div>
						)
					)}
					<Divider />
				</div>
			),
		},
		{
			key: "3",
			label: "Chains",
			children: (
				<div className="flex flex-col items-start gap-3 self-stretch">
					{collectionChainList().map(
						(item, idx) => (
							<div
								key={idx}
								className={clsx(
									"flex items-center p-3 gap-3 self-stretch rounded-2xl hover:bg-[#2D313E]",
									{
										"bg-[#2D313E]":
											props.chainFilter.find(
												(e) => e === item.value
											) !== undefined,
									}
								)}
							>
								<Checkbox
									onChange={() =>
										props.onChangeChainFilter(
											item.value
										)
									}
									className="w-6 h-6"
								/>
								<div className="relative w-9 h-9">
									<Image
										src="/svg/switch_network.svg"
										alt=""
										fill
									/>
								</div>
								<div className="flex items-center gap-[10px] flex-1">
									<span className="text-base text-[#f1f1f1] leading-[19px]">
										{item.label}
									</span>
								</div>
							</div>
						)
					)}
					<Divider />
				</div>
			),
		},
		{
			key: "4",
			label: "Currency",
			children: (
				<div className="flex flex-col items-start gap-3 self-stretch">
					{currencyList().map((item, idx) => (
						<div
							key={idx}
							className={clsx(
								"flex items-center p-3 gap-3 self-stretch rounded-2xl hover:bg-[#2D313E]",
								{
									"bg-[#2D313E]":
										props.currencyFilter.find(
											(e) => e === item.value
										) !== undefined,
								}
							)}
						>
							<Checkbox
								onChange={() =>
									props.onChangeCurrencyFilter(
										item.value
									)
								}
								className="w-6 h-6"
							/>
							<div className="flex items-center gap-[10px] flex-1">
								<span className="text-base text-[#f1f1f1] leading-[19px]">
									{item.label}
								</span>
							</div>
						</div>
					))}
					<Divider />
				</div>
			),
		},
	];

	return (
		<div>
			<div className="modal-overlay">
				<div
					ref={wrapperRef}
					className="w-full flex justify-center items-center lg:items-start border-t-[1px] border-[#2D313E] bg-[#1A1C24] activity-filter-content-modal"
				>
					<div className="w-full flex py-9 px-6 flex-col items-start gap-6">
						<div className="flex justify-between items-start self-stretch">
							<div className="flex items-end gap-[10px]">
								<span className="text-2xl text-[#f1f1f1] font-bold leading-[28px]">
									All Filter
								</span>
								<span
									onClick={() =>
										props.handleClearAllFilter()
									}
									className="text-base font-bold text-[#24C3BC] leading-[19px] cursor-pointer"
								>
									Clear all
								</span>
							</div>
							<CloseIcon onClick={props.hide} />
						</div>
						<Divider />
						<div className="w-full flex flex-col justify-end items-center">
							<div className="flex flex-col items-start gap-3 self-stretch h-[512px] md:h-[692px] lg:h-screen overflow-y-auto overflow-x-hidden">
								<Collapse
									defaultActiveKey={["1"]}
									ghost
									items={items}
									expandIconPosition="end"
									className="w-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CloseIcon = ({
	onClick,
}: {
	onClick: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="cursor-pointer"
			onClick={() => onClick(false)}
		>
			<rect
				x="0.5"
				y="0.5"
				width="23"
				height="23"
				rx="3.5"
				stroke="#2D313E"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.0068 13.6232L16.048 17.6651C16.2624 17.8795 16.5533 18 16.8566 18C17.1598 18 17.4507 17.8795 17.6651 17.6651C17.8795 17.4507 18 17.1598 18 16.8566C18 16.5533 17.8795 16.2625 17.6651 16.048L13.6224 12.0068L17.6643 7.96567C17.7705 7.85949 17.8546 7.73345 17.9121 7.59474C17.9695 7.45603 17.999 7.30736 17.999 7.15724C17.9989 7.00712 17.9693 6.85847 17.9118 6.71979C17.8544 6.5811 17.7701 6.4551 17.6639 6.34897C17.5578 6.24284 17.4317 6.15867 17.293 6.10125C17.1543 6.04383 17.0056 6.0143 16.8555 6.01433C16.7054 6.01437 16.5567 6.04397 16.4181 6.10145C16.2794 6.15894 16.1534 6.24317 16.0472 6.34935L12.0068 10.3905L7.96566 6.34935C7.86026 6.24013 7.73417 6.15299 7.59474 6.09301C7.45531 6.03304 7.30533 6.00144 7.15355 6.00005C7.00177 5.99866 6.85124 6.02751 6.71073 6.08492C6.57023 6.14233 6.44256 6.22714 6.33518 6.33442C6.2278 6.4417 6.14287 6.56928 6.08533 6.70974C6.02778 6.85019 5.99879 7.00069 6.00004 7.15247C6.00129 7.30425 6.03275 7.45426 6.09259 7.59375C6.15243 7.73323 6.23945 7.85941 6.34858 7.96491L10.3913 12.0068L6.34934 16.048C6.1349 16.2625 6.01443 16.5533 6.01443 16.8566C6.01443 17.1598 6.1349 17.4507 6.34934 17.6651C6.56378 17.8795 6.85462 18 7.15788 18C7.46114 18 7.75198 17.8795 7.96642 17.6651L12.0068 13.6224V13.6232Z"
				fill="#2D313E"
			/>
		</svg>
	);
};
