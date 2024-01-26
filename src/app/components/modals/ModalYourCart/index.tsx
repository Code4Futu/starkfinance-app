import { useEffect, useRef } from "react";
import cypherAvatar from "/public/svg/cypher_avatar.svg";
import Image from "next/image";

interface Props {
	isShowing: boolean;
	hide: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	item?: any;
}

const CloseIconItem = () => {
	return (
		<svg
			className="cursor-pointer"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.0068 13.6232L16.048 17.6651C16.2624 17.8795 16.5533 18 16.8566 18C17.1598 18 17.4507 17.8795 17.6651 17.6651C17.8795 17.4507 18 17.1598 18 16.8566C18 16.5533 17.8795 16.2625 17.6651 16.048L13.6224 12.0068L17.6643 7.96567C17.7705 7.85949 17.8546 7.73345 17.9121 7.59474C17.9695 7.45603 17.999 7.30736 17.999 7.15724C17.9989 7.00712 17.9693 6.85847 17.9118 6.71979C17.8544 6.5811 17.7701 6.4551 17.6639 6.34897C17.5578 6.24284 17.4317 6.15867 17.293 6.10125C17.1543 6.04383 17.0056 6.0143 16.8555 6.01433C16.7054 6.01437 16.5567 6.04397 16.4181 6.10145C16.2794 6.15894 16.1534 6.24317 16.0472 6.34935L12.0068 10.3905L7.96566 6.34935C7.86026 6.24013 7.73417 6.15299 7.59474 6.09301C7.45531 6.03304 7.30533 6.00144 7.15355 6.00005C7.00177 5.99866 6.85124 6.02751 6.71073 6.08492C6.57023 6.14233 6.44256 6.22714 6.33518 6.33442C6.2278 6.4417 6.14287 6.56928 6.08533 6.70974C6.02778 6.85019 5.99879 7.00069 6.00004 7.15247C6.00129 7.30425 6.03275 7.45426 6.09259 7.59375C6.15243 7.73323 6.23945 7.85941 6.34858 7.96491L10.3913 12.0068L6.34934 16.048C6.1349 16.2625 6.01443 16.5533 6.01443 16.8566C6.01443 17.1598 6.1349 17.4507 6.34934 17.6651C6.56378 17.8795 6.85462 18 7.15788 18C7.46114 18 7.75198 17.8795 7.96642 17.6651L12.0068 13.6224V13.6232Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};

const ItemCard = () => {
	return (
		<div className="flex py-3 justify-between items-center self-stretch rounded-xl">
			<div className="flex items-center gap-2">
				<Image
					src={cypherAvatar}
					alt=""
					width={78}
					height={78}
				/>
				<div className="flex flex-col items-start gap-1">
					<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
						VN Soldier #6868
					</span>
					<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
						Vietnam Cypher Collections
					</span>
					<div className="flex flex-col items-start gap-1">
						<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
							0.01 ETH
						</span>
						<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
							22.34$
						</span>
					</div>
				</div>
			</div>
			<CloseIconItem />
		</div>
	);
};

export const ModalYourCart = (props: Props) => {
	const CloseIcon = () => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				className="cursor-pointer"
				onClick={() => props.hide(false)}
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

	return (
		<div>
			<div className="modal-overlay">
				<div
					ref={wrapperRef}
					className="cart-mobile-animation flex justify-center items-center lg:items-start border-t-[1px] border-[#2D313E] bg-[#1A1C24] cart-content-modal"
				>
					<div className="w-full flex py-9 px-6 flex-col items-start gap-6">
						<div className="flex justify-between items-start self-stretch">
							<span className="text-2xl text-[#f1f1f1] font-bold leading-[28px]">
								Your cart
							</span>
							<CloseIcon />
						</div>
						<div className="h-[1px] w-full bg-[#2D313E]"></div>

						{props.item?.length > 0 ? (
							<>
								<div className="flex justify-between items-center self-stretch">
									<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
										1 items
									</span>
									<span className="text-base font-bold text-[#24C3BC] leading-[19px] cursor-pointer">
										Clear all
									</span>
								</div>
								<ItemCard />
								<div className="h-[1px] w-full bg-[#2D313E]"></div>
								<div className="flex flex-col items-center gap-6 self-stretch">
									<div className="flex justify-between items-start self-stretch">
										<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
											Total price
										</span>
										<div className="flex flex-col gap-1 items-end">
											<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
												0.01 ETH
											</span>
											<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
												22.34$
											</span>
										</div>
									</div>
									<div className="flex py-3 px-6 justify-center items-center gap-1 self-stretch rounded-2xl button-linear-1 cursor-pointer">
										<span className="text-base font-bold text-[#1A1C24] leading-[19px]">
											Purchase
										</span>
									</div>
								</div>
							</>
						) : (
							<span className="self-stretch text-center text-base font-normal text-[#c6c6c6]">
								Add items to get started.
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
