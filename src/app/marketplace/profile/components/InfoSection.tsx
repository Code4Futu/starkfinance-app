"use client";
import Image from "next/image";
import { useState } from "react";
import { Setting } from ".";
import { Divider } from "@/app/components/Divider";
import { ModalSetting } from "@/app/components/modals/ModalSetting";

export const InfoSection = () => {
  const [openSettingModal, setOpenSettingModal] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col justify-end items-start gap-3 md:gap-6">
      <div className="flex justify-between items-end self-stretch">
        <div className="flex items-end gap-3">
          <div className="relative w-[84px] h-[84px] rounded-xl border-[1px] border-[#F1F1F1] overflow-hidden">
            <Image
              src="https://s3-alpha-sig.figma.com/img/2409/f873/3a5f9dcca71f6e2857aa568256b2a4ef?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TR-NpBtzq~ftzbg3yZHmOt2QNjva~Uj-1sKxznMpmQupD~vFZCdFLLyWnBJonkypgIXm8jl2KxW4azIBoQLIeOsQjwgeTmfOGk9vyr~vEKKuAxvV7QH1tXqFfQp~na~2U0GR~MkQ0L2OybY3A~kVV1l5q~xQHFdXshaWselvOx9iKMJXw-Wjsh2siL6m~7e5MZ4fca2HxZU1Yb7ohRNX7j2Nhb0Z4FM235IXNu2Qch3gB5zuIhoP7iT486B5RZKzLmI0nEjNmzLqGdEy1J7aDX3ypTtmEHeT8waQj37S1llhU0yrb0GAvJQZNh~aFDNDYHCiybZuS3ZSBtRiiTBG7g__"
              alt=""
              fill
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
              0x086...16868
            </span>
            <span className="text-xs text-[#f1f1f1] leading-[14px]">
              Joined September 2021
            </span>
          </div>
        </div>
        <div
          className="flex justify-center items-center p-[6px] gap-1 rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] cursor-pointer md:px-3"
          onClick={() => setOpenSettingModal(true)}
        >
          <span className="hidden md:flex text-base font-bold text-[#f1f1f1] leading-[19px]">
            Customize Profile
          </span>
          <Setting />
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(20px)" }}
        className="flex flex-col items-start py-3 px-6 gap-[6px] self-stretch rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] md:flex-row md:justify-between md:px-[48px]"
      >
        <div className="flex justify-between items-center self-stretch md:flex-col">
          <span className="text-xs text-[#c6c6c6] leading-[14px]">
            Collections
          </span>
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
            -
          </span>
        </div>
        <Divider className="md:hidden" />
        <div className="hidden md:flex w-[1px] h-[43px] bg-[#2D313E]"></div>
        <div className="flex justify-between items-center self-stretch md:flex-col">
          <span className="text-xs text-[#c6c6c6] leading-[14px]">
            Collected
          </span>
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
            -
          </span>
        </div>
        <Divider className="md:hidden" />
        <div className="hidden md:flex w-[1px] h-[43px] bg-[#2D313E]"></div>
        <div className="flex justify-between items-center self-stretch md:flex-col">
          <span className="text-xs text-[#c6c6c6] leading-[14px]">
            Estimated Value
          </span>
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
            -
          </span>
        </div>
        <Divider className="md:hidden" />
        <div className="hidden md:flex w-[1px] h-[43px] bg-[#2D313E]"></div>
        <div className="flex justify-between items-center self-stretch md:flex-col">
          <span className="text-xs text-[#c6c6c6] leading-[14px]">
            Total volume
          </span>
          <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
            -
          </span>
        </div>
        <Divider className="md:hidden" />
      </div>
      {openSettingModal && (
        <ModalSetting isShowing={openSettingModal} hide={setOpenSettingModal} />
      )}
    </div>
  );
};
