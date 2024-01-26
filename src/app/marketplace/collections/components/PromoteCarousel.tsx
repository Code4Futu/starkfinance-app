"use client";

import React from "react";
// Import Swiper React components
import {
	Swiper,
	SwiperSlide,
} from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

// import required modules
// import { FreeMode, Pagination } from "swiper/modules";
import carouselBanner from "/public/svg/carousel_banner.svg";
import Image from "next/image";
import clsx from "clsx";
import { useDrawerStore } from "@/app/store";
import { mockupCollections } from "@/app/models/collections";
import Link from "next/link";

export const PromoteCarousel = () => {
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
				spaceBetween={12}
				freeMode={true}
				pagination={{
					clickable: true,
				}}
				// modules={[FreeMode, Pagination]}
				className="mySwiper"
			>
				{mockupCollections().map((item, idx) => (
					<SwiperSlide
						className="!w-[198px] !h-[131.5px]"
						key={idx}
					>
						<Link
							href={`/marketplace/collections/${item.address}`}
							className="bg-[url('/svg/carousel_banner.svg')] !bg-[length:100%_100%] !bg-no-repeat flex !w-[198px] !h-[131.5px]"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
