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

import "swiper/css";
import {
	ICollectionOwner,
	mockupCollections,
} from "@/app/models/collections";
import Link from "next/link";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

const SlideCard = ({
	item,
}: {
	item: ICollectionOwner;
}) => {
	return (
		<Link
			href={`/marketplace/collections/${item.address}`}
			className="h-[184px] md:h-[300px] flex flex-col p-3 justify-end items-start gap-[6px] rounded-3xl border-[1px] border-[#2D313E]"
		>
			<div className="flex flex-col gap-[6px] w-full">
				<div className="flex justify-between items-end self-stretch">
					<div className="flex flex-col justify-end items-start gap-[6px]">
						<div className="relative w-9 h-9">
							<Image
								src={item.logo}
								loading="lazy"
								alt=""
								fill
							/>
						</div>
						<span className="text-xl leading-[23px] font-bold text-[#f1f1f1]">
							{item.name}
						</span>
					</div>
					<div
						style={{
							background:
								"rgba(241, 241, 241, 0.10)",
							backdropFilter: "blur(20px)",
						}}
						className="flex py-1 pl-1 pr-2 gap-1 border-[1px] border-[#5E5E5E] rounded-2xl items-center"
					>
						<div className="relative w-[18px] h-[18px]">
							<Image
								src="/starknet_logo.png"
								loading="lazy"
								alt=""
								fill
							/>
						</div>
						<span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
							Starknet
						</span>
					</div>
				</div>
				<div
					style={{
						background:
							"rgba(241, 241, 241, 0.10)",
						backdropFilter: "blur(20px)",
					}}
					className="flex p-[6px] md:p-3 items-start gap-3 self-stretch rounded-xl border-[1px] border-[#5e5e5e]"
				>
					<div className="flex justify-center md:justify-normal items-center gap-1 flex-1 flex-wrap">
						<span className="text-xs text-[#c6c6c6] leading-[14px] md:leading-[16px] md:text-sm">
							Floor
						</span>
						<span className="text-xs leading-[12px] text-[#f1f1f1] font-medium md:text-base md:leading-[19px]">
							{item.floorPrice} ETH
						</span>
					</div>
					<div className="w-[1px] h-full bg-[#5e5e5e]"></div>
					<div className="flex justify-center md:justify-normal items-center gap-1 flex-1 flex-wrap">
						<span className="text-xs text-[#c6c6c6] leading-[14px] md:leading-[16px] md:text-sm">
							Volume
						</span>
						<span className="text-xs leading-[12px] text-[#f1f1f1] font-medium md:text-base md:leading-[19px]">
							{item.totalVolume} ETH
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export const CustomizeCarousel = () => {
	const { open } = useDrawerStore();

	return (
		<>
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
					{mockupCollections().map(
						(item, idx) => (
							<SwiperSlide
								key={idx}
								className={`bg-[url('https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__')] bg-[length:100%_100%] max-w-[276px] rounded-3xl border-[1px] border-[#2D313E] md:max-w-[450px] bg-no-repeat`}
							>
								<SlideCard item={item} />
							</SwiperSlide>
						)
					)}
				</Swiper>
			</div>
		</>
	);
};
