"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
// import { FreeMode, Pagination } from "swiper/modules";
import { numberWithCommas } from "../utils";
import { ILaunchpad } from "../types";
import { useDrawerStore } from "../store";

import { ethers } from "ethers";
import dayjs from "dayjs";
import clsx from "clsx";

export const DividerVertical = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2"
			height="36"
			viewBox="0 0 2 36"
			fill="none"
			className={className}
		>
			<path
				d="M1 1.00195L0.999998 35.002"
				stroke="#2D313E"
				strokeLinecap="round"
			/>
		</svg>
	);
};

const SlideCard = ({ item }: { item: ILaunchpad }) => {
	return (
		<>
			<div className="relative w-[342px] h-[171px]">
				<Image src="/homepage_carousel.png" alt="" fill />
			</div>
			<div className="flex self-stretch gap-2 items-start px-6 py-3">
				<div className="w-[55px] h-[55px] md:w-[66px] md:h-[66px] relative">
					<Image alt="image" src="/tokens/sfn.png" fill />
				</div>
				<div className="flex-1 flex flex-col justify-between gap-2">
					<div className="text-base md:text-2xl leading-[19px] font-bold line-clamp-1 ">
						{item.name}
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
							<div className="w-[18px] h-[18px] relative">
								<Image
									src={`/wallets/${item.chainKey}.png`}
									alt="starknet"
									fill
								/>
							</div>
							<div className="text-[12px] text-[#F1F1F1] capitalize">
								{item.chainKey}
							</div>
						</div>
						<div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] uppercase">
							{item.type}
						</div>
					</div>
				</div>
			</div>
			<div className="flex px-6 items-start gap-3 self-stretch">
				<div className="flex flex-col p-[18px] items-start gap-3 flex-1 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
					<div className="flex items-start self-stretch">
						<div className="flex flex-col items-start gap-1 flex-1">
							<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
								Raised
							</span>
							<span className="text-sm md:text-base md:leading-[19px] font-bold text-[#f1f1f1] leading-[16px]">
								{numberWithCommas(
									ethers
										.formatUnits(item.totalRaise, item.tokenRaise.decimals)
										.toString()
								)}{" "}
							</span>
						</div>
						<DividerVertical />
						<div className="flex flex-col items-end gap-1 flex-1">
							<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
								Participants
							</span>
							<span className="text-sm md:text-base md:leading-[19px] font-bold text-[#f1f1f1] leading-[16px]">
								--
							</span>
						</div>
					</div>
					<div className="h-[1px] w-full bg-[#2D313E]" />
					<div className="flex flex-col items-center gap-1 self-stretch">
						<span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
							Date
						</span>
						<span className="text-sm md:text-base md:leading-[19px] font-bold leading-[16px]">
							{dayjs(item.start * 1000).format("MMMM DD, YYYY HH:mm")} UTC
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export const HomepageCarousel = ({
	launchpads,
}: {
	launchpads: ILaunchpad[] | undefined;
}) => {
	const { open } = useDrawerStore();

	return (
		<div
			className={clsx(
				"max-w-[calc(100vw-48px)] min-[1400px]:max-w-[1080px] flex",
				!open && "lg:max-w-[calc(100vw-335px)]",
				open && "lg:max-w-[calc(100vw-151px)]"
			)}
		>
			<Swiper
				slidesPerView={"auto"}
				spaceBetween={24}
				freeMode={true}
				pagination={{
					clickable: true,
				}}
				// modules={[FreeMode, Pagination]}
				className="mySwiper"
			>
				{launchpads?.map((item: ILaunchpad, idx: number) => (
					<SwiperSlide
						key={idx}
						className="flex flex-col pb-6 items-start gap-3 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] max-w-[342px]"
					>
						<SlideCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
