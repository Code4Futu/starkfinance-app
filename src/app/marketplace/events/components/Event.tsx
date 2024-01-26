"use client";
import { IEvent } from "@/app/models/events";
import clsx from "clsx";
import Image from "next/image";
import { EVENT_STATUS } from "@/app/models/events";
import { useState } from "react";
import Link from "next/link";

export const Event = ({ event }: { event: IEvent | undefined }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  if (!event) return null;

  return (
    <>
      <Link
        href={`/marketplace/events/${event.address}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="hidden lg:flex relative w-[532px] h-[355px] shrink-0 rounded-3xl border-[1px] border-[#2D313E] overflow-hidden"
      >
        <div
          style={{
            background: `url(${event.banner})`,
            backgroundSize: "100% 100%",
          }}
          className={clsx(
            "flex w-full h-full justify-center items-center shrink-0 transition-all duration-500 no-repeat",
            isShown && "scale-110"
          )}
        />
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.82%, rgba(0, 0, 0, 0.60) 53.99%, rgba(0, 0, 0, 0.60) 100%)",
          }}
          className="absolute bottom-0 w-full flex flex-col justify-end items-start p-3 gap-3 rounded-3xl"
        >
          <div
            className={clsx(
              "flex items-end gap-3 transition-all duration-500",
              isShown && "hidden"
            )}
          >
            <div className="relative w-[48px] h-[48px] rounded-md">
              <Image src={event.logo} alt="" fill />
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-start gap-1">
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
                    Starknet
                  </span>
                </div>
                <div
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(241, 241, 241, 0.10)",
                  }}
                  className={clsx(
                    "flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
                    {
                      "border-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                    },
                    {
                      "border-[#FFE86C]":
                        event.status === EVENT_STATUS.UPCOMING,
                    },
                    {
                      "border-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                    }
                  )}
                >
                  <div
                    className={clsx(
                      "w-2 h-2 rounded-full",
                      {
                        "bg-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                      },
                      {
                        "bg-[#FFE86C]": event.status === EVENT_STATUS.UPCOMING,
                      },
                      {
                        "bg-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                      }
                    )}
                  />
                  <span
                    className={clsx(
                      "text-sm leading-[16px]",
                      {
                        "text-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                      },
                      {
                        "text-[#FFE86C]":
                          event.status === EVENT_STATUS.UPCOMING,
                      },
                      {
                        "text-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                      }
                    )}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                {event.name}
              </span>
            </div>
          </div>
          <div
            className="flex justify-between items-center self-stretch rounded-xl border-[1px] border-[#5E5E5E] rounded-xl py-3 px-6"
            style={{
              background: "rgba(241, 241, 241, 0.10)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Items</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalItem}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Minted</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.minted}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Price</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.price} ETH
              </span>
            </div>
          </div>
        </div>
      </Link>
      {/* Mobile */}
      <Link
        href={`/marketplace/events/${event.address}`}
        style={{
          background: `url(${event.banner})`,
          backgroundSize: "100% 100%",
        }}
        className="flex lg:hidden items-end w-full min-h-[228px] md:min-h-[232.218px] rounded-3xl border-[1px] border-[#2D313E] max-w-[348px] bg-no-repeat"
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.82%, rgba(0, 0, 0, 0.60) 53.99%, rgba(0, 0, 0, 0.60) 100%)",
          }}
          className="w-full flex flex-col justify-end items-start p-3 gap-3 rounded-3xl"
        >
          <div className="flex items-end gap-3">
            <div className="relative w-[48px] h-[48px] rounded-md">
              <Image src={event.logo} alt="" fill />
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-start gap-1">
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
                    Starknet
                  </span>
                </div>
                <div
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(241, 241, 241, 0.10)",
                  }}
                  className={clsx(
                    "flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
                    {
                      "border-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                    },
                    {
                      "border-[#FFE86C]":
                        event.status === EVENT_STATUS.UPCOMING,
                    },
                    {
                      "border-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                    }
                  )}
                >
                  <div
                    className={clsx(
                      "w-2 h-2 rounded-full",
                      {
                        "bg-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                      },
                      {
                        "bg-[#FFE86C]": event.status === EVENT_STATUS.UPCOMING,
                      },
                      {
                        "bg-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                      }
                    )}
                  />
                  <span
                    className={clsx(
                      "text-sm leading-[16px]",
                      {
                        "text-[#6CFF7B]": event.status === EVENT_STATUS.LIVE,
                      },
                      {
                        "text-[#FFE86C]":
                          event.status === EVENT_STATUS.UPCOMING,
                      },
                      {
                        "text-[#FF6C6C]": event.status === EVENT_STATUS.ENDED,
                      }
                    )}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
              <span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
                {event.name}
              </span>
            </div>
          </div>
          <div
            className="flex justify-between items-center self-stretch rounded-xl border-[1px] border-[#5E5E5E] rounded-xl py-3 px-6"
            style={{
              background: "rgba(241, 241, 241, 0.10)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Items</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.totalItem}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Minted</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.minted}
              </span>
            </div>
            <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-normal text-[#c6c6c6]">Price</span>
              <span className="text-base font-bold text-[#f1f1f1]">
                {event.price} ETH
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
