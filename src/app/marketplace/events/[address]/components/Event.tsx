"use client";
import { Divider } from "@/app/components/Divider";
import { IEvent } from "@/app/models/events";
import clsx from "clsx";
import Image from "next/image";
import { Progress } from "antd";
import { round } from "lodash";
import { useState } from "react";
import { EventStatusComponent } from "./EventStatus";
import { About } from "./About";
import { Discord, Github, Medium, Twitter } from "./SocialIcon";

export const Event = ({ event }: { event: IEvent | undefined }) => {
  const [itemCount, setItemCount] = useState<number>(1);
  const [isShown, setIsShown] = useState<boolean>(false);

  if (!event) return null;

  const handleIncreaseItem = () => {
    if (
      event?.totalItem === "No limit" ||
      itemCount > Number(event.totalItem) - event.minted
    )
      setItemCount(itemCount + 1);
  };

  const handleDecreaseItem = () => {
    if (itemCount === 1) return;
    setItemCount(itemCount - 1);
  };

  return (
    <>
      {/* Desktop Header */}
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="hidden relative w-full flex-col items-start rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden md:flex md:h-[360px] lg:h-[544px]"
      >
        <div
          style={{
            background: `url(${event.banner})`,
            backgroundSize: "100% 100%",
          }}
          className={clsx(
            "relative w-full h-full bg-no-repeat",
            isShown && "scale-110 duration-500"
          )}
        ></div>
        <div className="flex w-full p-3 flex-col justify-end items-start gap-3 md:absolute md:bottom-0">
          <div className="flex items-end gap-3 self-stretch pb-3">
            <div className="relative h-[67px] w-[67px]">
              <Image src={event.logo} loading="lazy" alt="" fill />
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-start gap-2">
                <div
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(241, 241, 241, 0.10)",
                  }}
                  className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
                >
                  <div className="relative w-[18px] h-[18px]">
                    <Image src="/starknet_logo.png" alt="" fill />
                  </div>
                  <span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
                    {event.chainKey}
                  </span>
                </div>
                <EventStatusComponent status={event.status} />
              </div>
              <span className="text-xl font-bold text-[#f1f1f1] leading-[23px] line-clamp-1  max-[390px]:max-w-[138px]">
                {event.name}
              </span>
              <div className="flex items-start gap-1">
                <span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
                  By
                </span>
                <span className="text-xs font-medium leading-[14px] text-linear">
                  {event.owner}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-end gap-3 flex-1">
              <div
                style={{ backdropFilter: "blur(20px)" }}
                className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
              >
                <Twitter />
              </div>
              <div
                style={{ backdropFilter: "blur(20px)" }}
                className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
              >
                <Medium />
              </div>
              <div
                style={{ backdropFilter: "blur(20px)" }}
                className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
              >
                <Discord />
              </div>
              <div
                style={{ backdropFilter: "blur(20px)" }}
                className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
              >
                <Medium />
              </div>
              <div
                style={{ backdropFilter: "blur(20px)" }}
                className="flex items-start p-1 rounded-md border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
              >
                <Github />
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-start self-stretch py-3 px-6 rounded-xl border-[1px] border-[#5E5E5E] bg-[#f1f1f11a]"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Item</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalItem}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Total volume
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalVolume} ETH
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Floor price
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.floorPrice} ETH
              </span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Best offer
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.bestOffer} ETH
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">
                % Listed
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.listed}%
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Owners (Unique)
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                600 (70%)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="md:hidden flex w-full flex-col items-start rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden">
        <div
          style={{
            background: `url(${event.banner})`,
            backgroundSize: "100% 100%",
          }}
          className="relative w-full h-[171px] bg-no-repeat"
        ></div>
        <div
          className="flex w-full p-3 flex-col justify-end items-start gap-3"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-end gap-3 self-stretch pb-3">
            <div className="relative h-[67px] w-[67px]">
              <Image src={event.logo} loading="lazy" alt="" fill />
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-start gap-2">
                <div
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(241, 241, 241, 0.10)",
                  }}
                  className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
                >
                  <div className="relative w-[18px] h-[18px]">
                    <Image src="/starknet_logo.png" alt="" fill />
                  </div>
                  <span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
                    {event.chainKey}
                  </span>
                </div>
                <EventStatusComponent status={event.status} />
              </div>
              <span className="text-xl font-bold text-[#f1f1f1] leading-[23px] line-clamp-1  max-[390px]:max-w-[138px]">
                {event.name}
              </span>
              <div className="flex items-start gap-1">
                <span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
                  By
                </span>
                <span className="text-xs font-medium leading-[14px] text-linear">
                  {event.owner}
                </span>
              </div>
            </div>
            <div className="flex justify-end items-end gap-[10px] flex-1 cursor-pointer">
              <div className="flex items-start gap-[10px] p-1 rounded-lg border-[1px] border-[#2D313E] bg-[#232631]">
                <IconShareLink />
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-center self-stretch rounded-xl"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">Item</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalItem}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Total volume
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalVolume} ETH
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Floor price
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.floorPrice} ETH
              </span>
            </div>
          </div>
          <Divider />
          <div
            className="flex justify-between items-center self-stretch rounded-xl"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Best offer
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.bestOffer} ETH
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">
                % Listed
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.listed}%
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1 w-[90px]">
              <span className="text-xs font-normal text-[#c6c6c6]">
                Owners (Unique)
              </span>
              <span className="text-base font-bold text-[#f1f1f1]">
                600 (70%)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col items-start py-6 gap-3 w-full">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="button-linear-2 flex rounded-2xl py-3 px-6 bg-[#F1F1F1] max-w-[115px]">
            <span className="text-base font-bold text-[#0D0E12] leading-[19px]">
              Overview
            </span>
          </div>
          <div className="flex rounded-2xl py-3 px-6 border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all">
            <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
              Item
            </span>
          </div>
          <div className="flex rounded-2xl py-3 px-6 border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all">
            <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
              Activity
            </span>
          </div>
        </div>
        <Divider />
      </div>
      <div className="w-full flex flex-col gap-3 md:flex-row md:gap-6">
        <div className="flex flex-col gap-3 w-full md:max-w-[348px] lg:max-w-[532px]">
          <div
            style={{
              background: `url(${event.avatar})`,
            }}
            className="w-full min-[390px]:min-w-[342px] min-h-[342px] !bg-[length:100%_342px] rounded-3xl border-[1px] border-[#2D313E] !bg-no-repeat md:w-[348px] md:h-[348px] md:!bg-[length:348px_348px] lg:min-w-[532px] lg:min-h-[532px] lg:!bg-[length:532px_532px]"
          />
          <div className="w-full flex justify-between items-start">
            {event.related.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: `url(${item.avatar})`,
                }}
                className={clsx(
                  `w-[76px] h-[76px] !bg-[length:76px_76px] rounded-xl bg-no-repeat lg:w-[115px] lg:h-[115px] lg:!bg-[length:115px_115px]`,
                  idx === 0 && "border-2 border-[#F1F1F1]"
                )}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-6 w-full h-full">
          <div className="w-full flex flex-col items-start py-9 px-6 mt-3 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] md:mt-0 md:min-h-[436px] lg:min-h-[384px]">
            <div className="flex flex-col items-start gap-3 self-stretch">
              <span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
                Mint NFT
              </span>
              <Divider />
            </div>
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex justify-between items-center self-stretch">
                <span className="text-base text-[#c6c6c6] leading-[19px]">
                  Mint Price
                </span>
                <span className="text-base text-[#f1f1f1] leading-[19px]">
                  {event.price} ETH
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-base text-[#c6c6c6] leading-[19px]">
                  Minted
                </span>
                <span className="text-base text-[#f1f1f1] leading-[19px]">
                  {event.minted} / 3,000
                </span>
              </div>
              <Progress
                percent={round((event.minted / 3000) * 100)}
                showInfo={false}
              />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-base text-[#c6c6c6] leading-[19px]">
                  Progress
                </span>
                <span className="text-base text-[#f1f1f1] leading-[19px]">
                  {round((event.minted / 3000) * 100)}%
                </span>
              </div>
              <Divider />
              <div className="flex items-start gap-6 self-stretch">
                <div className="flex items-center py-[10px] px-3 gap-[6px] rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
                  <IconSub onClick={handleDecreaseItem} />
                  <div className="w-[1px] h-6 bg-[#2D313E]" />
                  <span className="text-base font-bold text-[#f1f1f1] text-center leading-[19px] w-[48px]">
                    {itemCount}
                  </span>
                  <div className="w-[1px] h-6 bg-[#2D313E]" />
                  <IconPlus onClick={handleIncreaseItem} />
                </div>
                <div className="button-linear-1 flex justify-center items-center h-[48px] py-3 px-6 gap-1 flex-1 rounded-2xl cursor-pointer">
                  <span className="text-base font-bold text-[#1A1C24] leading-[19px]">
                    Mint
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-1 self-stretch">
                <span className="text-base text-[#c6c6c6] leading-[19px]">
                  Total:
                </span>
                <span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
                  {itemCount * event.price} ETH
                </span>
              </div>
            </div>
          </div>
          <About className="hidden lg:flex" />
        </div>
      </div>
      <About className="lg:hidden" />
    </>
  );
};

export const IconShareLink = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.0019 15.75C17.5978 15.7499 17.1979 15.8316 16.8264 15.9903C16.4548 16.149 16.1192 16.3814 15.84 16.6734L8.9025 12.7702C9.03688 12.2655 9.03688 11.7345 8.9025 11.2299L15.84 7.32657C16.3452 7.85032 17.024 8.17192 17.7493 8.23111C18.4745 8.2903 19.1965 8.08302 19.7799 7.6481C20.3633 7.21319 20.7682 6.58048 20.9186 5.8685C21.069 5.15653 20.9546 4.41415 20.5969 3.78043C20.2393 3.14672 19.6628 2.66515 18.9756 2.42595C18.2883 2.18676 17.5374 2.20634 16.8636 2.48103C16.1897 2.75572 15.6392 3.26667 15.315 3.91817C14.9909 4.56966 14.9154 5.317 15.1027 6.02016L8.16515 9.92344C7.75075 9.49137 7.21656 9.19316 6.63128 9.06718C6.046 8.9412 5.43642 8.99321 4.88095 9.21653C4.32548 9.43985 3.84953 9.82425 3.51433 10.3203C3.17912 10.8163 3 11.4013 3 12C3 12.5987 3.17912 13.1837 3.51433 13.6797C3.84953 14.1758 4.32548 14.5602 4.88095 14.7835C5.43642 15.0068 6.046 15.0588 6.63128 14.9328C7.21656 14.8069 7.75075 14.5086 8.16515 14.0766L15.1027 17.9799C14.9418 18.5854 14.9746 19.2261 15.1964 19.8121C15.4182 20.3981 15.818 20.8999 16.3395 21.2472C16.8611 21.5944 17.4782 21.7696 18.1044 21.7483C18.7306 21.7269 19.3344 21.51 19.8311 21.128C20.3277 20.746 20.6923 20.2181 20.8737 19.6184C21.055 19.0186 21.0441 18.3772 20.8423 17.784C20.6406 17.1908 20.2581 16.6757 19.7487 16.3109C19.2393 15.9461 18.6284 15.75 18.0019 15.75Z"
        fill="#F1F1F1"
      />
    </svg>
  );
};

export const IconSub = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="cursor-pointer"
      onClick={() => onClick()}
    >
      <rect x="3" y="11" width="18" height="2" rx="1" fill="#F1F1F1" />
    </svg>
  );
};

export const IconPlus = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="cursor-pointer"
      onClick={() => onClick()}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z"
        fill="#F1F1F1"
      />
    </svg>
  );
};
