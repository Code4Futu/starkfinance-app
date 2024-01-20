import clsx from "clsx";
import Image from "next/image";
import { boardData } from ".";
import { ACTIVITY_STATUS } from "@/app/models/marketplaceActivity";
import { Divider } from "@/app/components/Divider";

export const Transaction = ({ item }: { item: boardData }) => {
  return (
    <>
      <div className="hidden lg:flex justify-between items-center self-stretch py-3">
        <div className="flex items-center gap-[10px] w-[140px]">
          <div
            className={clsx(
              "flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
              {
                "border-[#6CFF7B] bg-[#6CFF7B1a]":
                  item.action === ACTIVITY_STATUS.SALE,
              },
              {
                "border-[#277EFF] bg-[#277eff1a]":
                  item.action === ACTIVITY_STATUS.LISTING,
              },
              {
                "border-[#AD6CFF] bg-[#AD6CFF1a]":
                  item.action === ACTIVITY_STATUS.OFFER,
              },
              {
                "border-[#00C4DF] bg-[#00C4DF1a]":
                  item.action === ACTIVITY_STATUS.TRANSFER,
              },
              {
                "border-[#FFE86C] bg-[#FFE86C1a]":
                  item.action === ACTIVITY_STATUS.AUCTION,
              },
              {
                "border-[#FF6C8F] bg-[#FF6C8F1a]":
                  item.action === ACTIVITY_STATUS.BID,
              }
            )}
          >
            <div className="relative w-4 h-4">
              <Image
                src={`/svg/${item.action.toLowerCase()}.svg`}
                alt=""
                fill
              />
            </div>
            <span
              className={clsx(
                "text-sm leading-[16px]",
                {
                  "text-[#6CFF7B]": item.action === ACTIVITY_STATUS.SALE,
                },
                {
                  "text-[#277EFF]": item.action === ACTIVITY_STATUS.LISTING,
                },
                {
                  "text-[#AD6CFF]": item.action === ACTIVITY_STATUS.OFFER,
                },
                {
                  "text-[#00C4DF]": item.action === ACTIVITY_STATUS.TRANSFER,
                },
                {
                  "text-[#FFE86C]": item.action === ACTIVITY_STATUS.AUCTION,
                },
                {
                  "text-[#FF6C8F]": item.action === ACTIVITY_STATUS.BID,
                }
              )}
            >
              {item.action}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[10px] min-w-[200px] max-w-[400px] flex-1">
          <div className="relative w-[48px] h-[48px]">
            <Image src="/svg/solider.svg" alt="" fill />
          </div>
          <div className="flex flex-col justify-center items-start gap-[2px]">
            <span className="text-sm leading-[16px] text-[#f1f1f1]">
              {item.label}
            </span>
            <span className="text-xs leading-[14px] text-[#c6c6c6] line-clamp-1">
              {item.collectionName}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center min-w-[472px] flex-1">
          <div className="flex flex-col items-start gap-[5px] w-[100px]">
            <span className="text-base leading-[19px] text-right text-[#f1f1f1] self-stretch whitespace-nowrap text-right">
              0.001 ETH
            </span>
            <span className="text-xs leading-[14px] text-right text-[#c6c6c6] self-stretch text-right">
              ~ $2.01
            </span>
          </div>
          <span className="text-base text-[#f1f1f1] leading-[19px] text-right w-[100px]">
            x086...16868
          </span>
          <span className="text-base text-[#f1f1f1] leading-[19px] text-right w-[100px]">
            x048...04848
          </span>
          <span className="text-base text-[#f1f1f1] leading-[19px] text-right w-[100px]">
            1m ago
          </span>
        </div>
      </div>
      <div className="lg:hidden flex flex-col justify-center items-center gap-3 self-stretch">
        <div className="flex justify-between items-center py-3 self-stretch">
          <div className="flex items-end gap-[6px] md:w-[220px]">
            <div className="relative w-[60px] h-[60px]">
              <Image src="/svg/solider.svg" alt="" fill />
            </div>
            <div className="flex flex-col justify-center items-start gap-[2px]">
              <div
                className={clsx(
                  "flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
                  {
                    "border-[#6CFF7B] bg-[#6CFF7B1a]":
                      item.action === ACTIVITY_STATUS.SALE,
                  },
                  {
                    "border-[#277EFF] bg-[#277eff1a]":
                      item.action === ACTIVITY_STATUS.LISTING,
                  },
                  {
                    "border-[#AD6CFF] bg-[#AD6CFF1a]":
                      item.action === ACTIVITY_STATUS.OFFER,
                  },
                  {
                    "border-[#00C4DF] bg-[#00C4DF1a]":
                      item.action === ACTIVITY_STATUS.TRANSFER,
                  },
                  {
                    "border-[#FFE86C] bg-[#FFE86C1a]":
                      item.action === ACTIVITY_STATUS.AUCTION,
                  },
                  {
                    "border-[#FF6C8F] bg-[#FF6C8F1a]":
                      item.action === ACTIVITY_STATUS.BID,
                  }
                )}
              >
                <div className="relative w-4 h-4">
                  <Image
                    src={`/svg/${item.action.toLowerCase()}.svg`}
                    alt=""
                    fill
                  />
                </div>
                <span
                  className={clsx(
                    "text-sm leading-[16px]",
                    {
                      "text-[#6CFF7B]": item.action === ACTIVITY_STATUS.SALE,
                    },
                    {
                      "text-[#277EFF]": item.action === ACTIVITY_STATUS.LISTING,
                    },
                    {
                      "text-[#AD6CFF]": item.action === ACTIVITY_STATUS.OFFER,
                    },
                    {
                      "text-[#00C4DF]":
                        item.action === ACTIVITY_STATUS.TRANSFER,
                    },
                    {
                      "text-[#FFE86C]": item.action === ACTIVITY_STATUS.AUCTION,
                    },
                    {
                      "text-[#FF6C8F]": item.action === ACTIVITY_STATUS.BID,
                    }
                  )}
                >
                  {item.action}
                </span>
              </div>
              <span className="text-sm leading-[16px] text-[#f1f1f1]">
                {item.label}
              </span>
              <span className="text-xs leading-[14px] text-[#c6c6c6] line-clamp-1">
                {item.collectionName}
              </span>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center gap-3 w-[248px]">
            <span className="w-[100px] text-sm text-[#f1f1f1] leading-[16px] font-normal line-clamp-1">
              x086...16868
            </span>
            <span className="text-sm text-[#f1f1f1] leading-[16px] font-bold">
              →
            </span>
            <span className="w-[100px] text-sm text-[#f1f1f1] leading-[16px] font-normal line-clamp-1 text-right">
              x048...04848
            </span>
          </div>
          <div className="flex flex-col items-end gap-[2px]">
            <div className="flex flex-col items-start gap-[5px]">
              <span className="text-sm leading-[16px] text-right text-[#f1f1f1] self-stretch whitespace-nowrap">
                0.001 ETH
              </span>
              <span className="text-xs leading-[14px] text-right text-[#c6c6c6] self-stretch">
                ~ $2.01
              </span>
            </div>
            <span className="text-sm leading-[14px] text-right text-[#f1f1f1]">
              1m ago
            </span>
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};
