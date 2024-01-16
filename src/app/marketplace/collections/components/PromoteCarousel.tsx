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

export const PromoteCarousel = () => {
  return (
    <div className="max-w-[calc(100vw-48px)] lg:max-w-[calc(100vw-335px)] xl:max-w-[1080px] flex">
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
