"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper/modules";
import { useDrawerStore } from "@/app/store";
import clsx from "clsx";

import "swiper/css";
import { ProfileFilter, profileFilterMockup } from "@/app/models/user";
import { Divider } from "@/app/components/Divider";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

export const FilterProfileSwiper = ({
  profileFilter,
  setProfileFilter,
}: {
  profileFilter: ProfileFilter;
  setProfileFilter: React.Dispatch<React.SetStateAction<ProfileFilter>>;
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
          {profileFilterMockup().map((item, idx) => (
            <SwiperSlide
              key={idx}
              className={clsx(
                "flex rounded-2xl py-3 px-6 border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all",
                item.value === "collected" && "max-w-[119px]",
                item.value === "listing" && "max-w-[99px]",
                item.value === "offersMade" && "max-w-[140px]",
                item.value === "offersReceived" && "max-w-[165px]",
                item.value === "activity" && "max-w-[105px]",
                item.value === profileFilter && "!bg-[#F1F1F1]"
              )}
              onClick={() => setProfileFilter(item.value)}
            >
              <span
                className={clsx(
                  "text-base font-bold text-[#f1f1f1] leading-[19px]",
                  item.value === profileFilter && "!text-[#0D0E12]"
                )}
              >
                {item.label}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
        <Divider />
      </div>
    </>
  );
};
