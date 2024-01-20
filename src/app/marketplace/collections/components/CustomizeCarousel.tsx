"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import clsx from "clsx";

import { useDrawerStore } from "@/app/store";

import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

const SlideCard = () => {
  return (
    <div className="h-[184px] md:h-[300px] flex flex-col p-3 justify-end items-start gap-[6px] rounded-3xl border-[1px] border-[#2D313E]">
      <div className="flex flex-col gap-[6px] w-full">
        <div className="flex justify-between items-end self-stretch">
          <div className="flex flex-col justify-end items-start gap-[6px]">
            <div className="relative w-9 h-9">
              <Image src="/svg/cypher_avatar.svg" loading="lazy" alt="" fill />
            </div>
            <span className="text-xl leading-[23px] font-bold text-[#f1f1f1]">
              Vietnam Cypher
            </span>
          </div>
          <div
            style={{
              background: "rgba(241, 241, 241, 0.10)",
              backdropFilter: "blur(20px)",
            }}
            className="flex py-1 pl-1 pr-2 gap-1 border-[1px] border-[#5E5E5E] rounded-2xl items-center"
          >
            <div className="relative w-[18px] h-[18px]">
              <Image src="/starknet_logo.png" loading="lazy" alt="" fill />
            </div>
            <span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
              Starknet
            </span>
          </div>
        </div>
        <div
          style={{
            background: "rgba(241, 241, 241, 0.10)",
            backdropFilter: "blur(20px)",
          }}
          className="flex p-[6px] md:p-3 items-start gap-3 self-stretch rounded-xl border-[1px] border-[#5e5e5e]"
        >
          <div className="flex justify-center md:justify-normal items-center gap-1 flex-1 flex-wrap">
            <span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
              Floor
            </span>
            <span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
              0.02 ETH
            </span>
          </div>
          <div className="w-[1px] h-full bg-[#5e5e5e]"></div>
          <div className="flex justify-center md:justify-normal items-center gap-1 flex-1 flex-wrap">
            <span className="text-sm text-[#c6c6c6] font-normal leading-[16px]">
              Volume
            </span>
            <span className="text-base text-[#f1f1f1] font-bold leading-[19px] whitespace-nowrap">
              68.68 ETH
            </span>
          </div>
        </div>
      </div>
    </div>
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
          <SwiperSlide className="carousel-popular max-w-[276px] rounded-3xl border-[1px] border-[#2D313E] md:max-w-[450px] bg-no-repeat">
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide className="carousel-popular max-w-[276px] rounded-3xl border-[1px] border-[#2D313E] md:max-w-[450px] bg-no-repeat">
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide className="carousel-popular max-w-[276px] rounded-3xl border-[1px] border-[#2D313E] md:max-w-[450px] bg-no-repeat">
            <SlideCard />
          </SwiperSlide>
          <SwiperSlide className="carousel-popular max-w-[276px] rounded-3xl border-[1px] border-[#2D313E] md:max-w-[450px] bg-no-repeat">
            <SlideCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
