"use client";
import Image from "next/image";
import Link from "next/link";
import { numberWithCommas, statusToText, timeDiff } from "@/app/utils";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "@/app/constants";
import { ethers } from "ethers";
import { ILaunchpad } from "@/app/types";
import dayjs from "dayjs";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { DividerVertical } from "@/app/components/HomepageCarousel";

const LatestLaunchpad = ({
  launchpad,
}: {
  launchpad: ILaunchpad | undefined;
}) => {
  const [timeStartDiff, setTimeStartDiff] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
    status: undefined | LAUNCHPAD_STATUS;
  }>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    status: undefined,
  });

  const currentPath = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!launchpad) return;
      const time = timeDiff(
        Date.now(),
        launchpad.start * 1000,
        launchpad.end * 1000
      );
      setTimeStartDiff(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [launchpad?.start, launchpad?.end]);

  if (!launchpad) return null;

  return (
    <div className="flex flex-col rounded-3xl bg-[#1A1C24]">
      <div
        className={clsx(
          "relative md:hidden w-full rounded-t-3xl flex flex-col h-[114px]",
          currentPath !== "/" && "hidden"
        )}
      >
        <Image alt="image" src="/mocks/banner_mobile.png" fill />
      </div>
      <div
        className={clsx(
          "flex flex-col gap-3 md:gap-6 p-6 rounded-3xl bg-[#1A1C24] border-2 border-[#24C3BC]",
          currentPath === "/" &&
            "border-t-0 rounded-t-none md:border-t md:rounded-3xl"
        )}
      >
        <div
          className={clsx(
            "lg:hidden w-full pt-[50%] relative rounded-2xl overflow-hidden",
            currentPath === "/" ? "hidden md:block h-[224px] pt-0" : ""
          )}
        >
          <Image alt="image" src="/mocks/banner.png" fill />
          <div
            className={clsx(
              "absolute top-3 left-3 p-3 rounded-xl bg-[#0D0E12]",
              currentPath === "/" ? "hidden" : ""
            )}
          >
            <div className="text-2xl text-[#F1F1F1] font-bold">
              {dayjs(launchpad.start * 1000).format("DD")}
            </div>
            <div className="text-sm text-[#C6C6C6]">
              {dayjs(launchpad.start).format("MMM")}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end self-stretch">
          <div className="flex justify-stretch gap-3">
            <div className="w-[55px] h-[55px] md:w-[66px] md:h-[66px] relative">
              <Image alt="image" src="/logo80x80.png" fill />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-2">
              <div className="text-base md:text-2xl leading-[19px] font-bold line-clamp-1 ">
                {launchpad.name}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {timeStartDiff.status && (
                  <div
                    className={clsx(
                      "flex items-center gap-1 py-1.5 px-3 rounded-2xl h-[30px]",
                      {
                        "bg-[#61b3ff26]": LAUNCHPAD_STATUS.UPCOMING,
                        "bg-[#6cff7b26]": LAUNCHPAD_STATUS.INPROGRESS,
                        "bg-[#FFE86C26] border-[#FFE86C] border-[1px]":
                          LAUNCHPAD_STATUS.END,
                      }
                    )}
                  >
                    <Image
                      src={`/svg/${timeStartDiff.status}.svg`}
                      alt={`${timeStartDiff.status}`}
                      width={8}
                      height={8}
                    />
                    <div
                      className={clsx(
                        "text-[12px] font-medium leading-[14px] capitalize",
                        {
                          "text-[#61B3FF]":
                            timeStartDiff.status == LAUNCHPAD_STATUS.UPCOMING,
                          "text-[#6CFF7B]":
                            timeStartDiff.status == LAUNCHPAD_STATUS.INPROGRESS,
                          "text-[#FFE86C]":
                            timeStartDiff.status == LAUNCHPAD_STATUS.END,
                        }
                      )}
                    >
                      {timeStartDiff.status}
                    </div>
                  </div>
                )}
                <div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
                  <div className="w-[18px] h-[18px] relative">
                    <Image
                      src={`/wallets/${launchpad.chainKey}.png`}
                      alt="starknet"
                      fill
                    />
                  </div>
                  <div className="text-[12px] text-[#F1F1F1] capitalize">
                    {launchpad.chainKey}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-3 rounded-2xl">
                  <div className="w-[18px] h-[18px] relative">
                    <Image src="/logo.png" alt="token" fill />
                  </div>
                  <div className=" text-[12px] text-[#F1F1F1]">
                    {launchpad.tokenRaise.symbol}
                  </div>
                </div>
                <div className="bg-[#3E73FC] py-1.5 px-3 rounded-2xl text-[12px] text-[#F1F1F1] uppercase">
                  {launchpad.type}
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/launchpad/launchpad-list/${launchpad.address}`}
            className={clsx(
              "hidden w-full md:flex md:max-w-[206px] text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl",
              currentPath !== "/" && "hidden"
            )}
          >
            Go to Launchpad Now
          </Link>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="hidden lg:block w-[360px] h-[180px] 2xl:w-[400px] 2xl:h-[200px] relative">
            <Image alt="image" src="/mocks/banner.png" fill />
            <div className="absolute top-3 left-3 p-3 rounded-2xl bg-[#0D0E12] text-[#F1F1F1]">
              <div className="text-[36px]">
                {dayjs(launchpad.start * 1000).format("DD")}
              </div>
              <div>{dayjs(launchpad.start * 1000).format("MMM")}</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-[18px] md:p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col gap-1 md:border-none border-b border-b-[#2D313E] pb-3">
                <div className="text-xs font-normal leading-[14px] text-[#C6C6C6] md:text-sm md:leading-[16px]">
                  Total raise
                </div>
                <div className="text-sm leading-[16px] md:text-base md:leading-[19px] font-bold">
                  {numberWithCommas(
                    ethers
                      .formatUnits(
                        launchpad.totalRaise,
                        launchpad.tokenRaise.decimals
                      )
                      .toString()
                  )}{" "}
                  {launchpad.tokenRaise.symbol}
                </div>
              </div>
              <DividerVertical className="hidden md:block" />
              <div className="flex flex-col gap-1 md:border-none border-b border-b-[#2D313E] pb-3">
                <div className="text-xs font-normal leading-[14px] text-[#C6C6C6] md:text-sm md:leading-[16px]">
                  Total sale
                </div>
                <div className="text-sm leading-[16px] md:text-base md:leading-[19px] font-bold">
                  {numberWithCommas(
                    ethers
                      .formatUnits(
                        launchpad.totalSale,
                        launchpad.tokenSale.decimals
                      )
                      .toString()
                  )}{" "}
                  {launchpad.tokenSale.symbol}
                </div>
              </div>
              <DividerVertical className="hidden md:block" />
              <div className="flex flex-col gap-1 pb-3">
                <div className="text-xs font-normal leading-[14px] text-[#C6C6C6] md:text-sm md:leading-[16px]">
                  Rate
                </div>
                <div className="text-sm leading-[16px] md:text-base md:leading-[19px] font-bold">
                  1 {launchpad.tokenRaise.symbol} ={" "}
                  {numberWithCommas(
                    +ethers.formatUnits(
                      launchpad.totalSale,
                      launchpad.tokenSale.decimals
                    ) /
                      +ethers.formatUnits(
                        launchpad.totalRaise,
                        launchpad.tokenRaise.decimals
                      )
                  )}{" "}
                  {launchpad.tokenSale.symbol}
                </div>
              </div>
            </div>
            <div className="border-t border-t-[#2D313E] pt-3">
              <div className="mb-2.5">
                <span className="text-xs font-normal leading-[14px] text-[#c6c6c6] md:text-sm md:leading-[16px]">
                  Launchpad {statusToText(timeStartDiff.status)}
                </span>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-1.5 md:gap-6">
                <div>
                  <span className="countdown font-bold text-xs md:text-base">
                    {/* @ts-expect-error */}
                    <span style={{ "--value": timeStartDiff?.d ?? 0 }}></span>
                  </span>{" "}
                  <span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
                    days
                  </span>
                </div>
                <span className="text-sm md:text-base font-bold leading-[19px]">
                  :
                </span>
                <div>
                  <span className="countdown font-bold text-xs md:text-base">
                    {/* @ts-expect-error */}
                    <span style={{ "--value": timeStartDiff?.h ?? 0 }}></span>
                  </span>{" "}
                  <span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
                    hrs
                  </span>
                </div>
                <span className="text-sm md:text-base font-bold leading-[19px]">
                  :
                </span>
                <div>
                  <span className="countdown font-bold text-xs md:text-base">
                    {/* @ts-expect-error */}
                    <span style={{ "--value": timeStartDiff?.m ?? 0 }}></span>
                  </span>{" "}
                  <span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
                    mins
                  </span>
                </div>
                <span className="text-sm md:text-base font-bold leading-[19px]">
                  :
                </span>
                <div>
                  <span className="countdown font-bold text-xs md:text-base">
                    {/* @ts-expect-error */}
                    <span style={{ "--value": timeStartDiff?.s ?? 0 }}></span>
                  </span>{" "}
                  <span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
                    secs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={`/launchpad/launchpad-list/${launchpad.address}`}
          className={clsx(
            "w-full md:max-w-[280px] text-center px-6 py-3 font-xl font-bold text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl",
            currentPath === "/" && "md:hidden"
          )}
        >
          Go to Launchpad Now
        </Link>
      </div>
    </div>
  );
};

export default LatestLaunchpad;
