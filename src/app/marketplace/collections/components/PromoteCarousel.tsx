"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
        <SwiperSlide className="!w-[198px] !h-[131.5px]">
          <Image src={carouselBanner} alt="" fill />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
