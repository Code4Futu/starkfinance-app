"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import { useDrawerStore } from "@/app/store";
import clsx from "clsx";

import "swiper/css";
import { eventStatusList, EventStatus } from "@/app/models/events";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

export const FilterEventSwiper = ({
  eventFilter,
  handleOnchangeEventFilter,
  handleFilterAll,
}: {
  eventFilter: string;
  handleOnchangeEventFilter: (event: EventStatus) => void;
  handleFilterAll: () => void;
}) => {
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
          //   slidesPerView={"auto"}
          spaceBetween={12}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          // modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide
            onClick={() => handleFilterAll()}
            className="button-linear-2 flex rounded-2xl py-3 px-6 bg-[#F1F1F1] max-w-[68px]"
          >
            <span className="text-base font-bold text-[#0D0E12] leading-[19px]">
              All
            </span>
          </SwiperSlide>
          {eventStatusList().map((item, idx) => (
            <SwiperSlide
              key={idx}
              className={clsx(
                "flex rounded-2xl py-3 px-6 border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all",
                item.value === "Upcoming" && "max-w-[122px]",
                item.value === "Live" && "max-w-[78px]",
                item.value === "Ended" && "max-w-[93px]",
                item.value === eventFilter && "bg-[#3C3D4D]"
              )}
              onClick={() => handleOnchangeEventFilter(item.value)}
            >
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                {item.label}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
