"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import {
	Swiper,
	SwiperSlide,
} from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import clsx from "clsx";
import { useDrawerStore } from "@/app/store";
import { userProfileMockup } from "@/app/models/user";
import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

export const OwnerSwiper = () => {
	const { open } = useDrawerStore();

	return (
		<>
			<div
				className={clsx(
					"max-w-[calc(100vw-48px)] min-[1400px]:max-w-[1080px] flex  md:hidden",
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
					{userProfileMockup().map(
						(item, idx) => (
							<SwiperSlide
								key={idx}
								className="h-[221px] max-w-[200px]"
							>
								<div className="flex flex-col items-center gap-[10px]">
									<div className="relative w-[72px] h-[72px] rounded-full overflow-hidden">
										<Image
											src={item.avatar}
											alt=""
											fill
										/>
									</div>
									<span className="text-xl font-bold leading-[23px]">
										{item.name}
									</span>
									<span className="text-sm font-bold leading-[16px]">
										{item.job}
									</span>
									<span className="text-sm text-[#c6c6c6] text-center">
										{item.description}
									</span>
								</div>
							</SwiperSlide>
						)
					)}
				</Swiper>
			</div>
		</>
	);
};
