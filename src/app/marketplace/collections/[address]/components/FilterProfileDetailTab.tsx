"use client";
import React from "react";
import {
	Swiper,
	SwiperSlide,
} from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import { useDrawerStore } from "@/app/store";
import clsx from "clsx";
import { Divider } from "@/app/components/Divider";
import {
	CollectionDetailTab,
	collectionDetailTab,
} from "@/app/models/collections";
import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

export const FilterProfileDetailSwiper = ({
	detailProfileFilter,
	setDetailProfileFilter,
}: {
	detailProfileFilter: CollectionDetailTab;
	setDetailProfileFilter: React.Dispatch<
		React.SetStateAction<CollectionDetailTab>
	>;
}) => {
	const { open } = useDrawerStore();

	return (
		<>
			<div
				className={clsx(
					"max-w-[calc(100vw-48px)] min-[1400px]:max-w-[1080px] gap-3 flex flex-col w-full justify-start",
					!open && "lg:max-w-[calc(100vw-335px)]",
					open && "lg:max-w-[calc(100vw-151px)]"
				)}
			>
				<Swiper
					//   slidesPerView={"auto"}
					spaceBetween={12}
					freeMode={true}
					pagination={{
						clickable: true,
					}}
					// modules={[FreeMode, Pagination]}
					className="mySwiper !ml-0"
				>
					{collectionDetailTab().map(
						(item, idx) => (
							<SwiperSlide
								key={idx}
								className={clsx(
									"flex rounded-2xl py-3 px-6 border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all",
									item.value === "overview" &&
										"max-w-[117px]",
									item.value === "activity" &&
										"max-w-[105px]",
									item.value === "item" &&
										"max-w-[83px]",
									item.value ===
										detailProfileFilter &&
										"!bg-[#F1F1F1]"
								)}
								onClick={() =>
									setDetailProfileFilter(
										item.value
									)
								}
							>
								<span
									className={clsx(
										"text-base font-bold text-[#f1f1f1] leading-[19px]",
										item.value ===
											detailProfileFilter &&
											"!text-[#0D0E12]"
									)}
								>
									{item.label}
								</span>
							</SwiperSlide>
						)
					)}
				</Swiper>
				<Divider />
			</div>
		</>
	);
};
