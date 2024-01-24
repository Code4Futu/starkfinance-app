import { ViewCollectionButton } from "@/app/components/buttons";
import Image from "next/image";
import cypherAvatar from "/public/svg/cypher_avatar.svg";
import promoteAvatar from "/public/svg/promote_avatar.svg";
import starknetLogo from "/public/starknet_logo.png";

export const CollectionPromote = () => {
  return (
    <>
      <div className="md:hidden">
        <div className="flex w-full flex-col items-start rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] overflow-hidden">
          <div className="flex w-full flex-col justify-end items-start">
            <Image src={promoteAvatar} alt="" height={171} className="w-full" />
          </div>
          <div
            className="flex w-full p-3 flex-col justify-end items-start gap-6"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-end gap-3 self-stretch">
              <Image src={cypherAvatar} alt="" width={67} height={67} />
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex items-start gap-1">
                  <div
                    style={{
                      backdropFilter: "blur(20px)",
                      background: "rgba(241, 241, 241, 0.10)",
                    }}
                    className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
                  >
                    <Image src={starknetLogo} alt="" height={18} width={18} />
                    <span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
                      Starknet
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
                  Vietnam Cypher
                </span>
                <div className="flex items-start gap-1">
                  <span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
                    By
                  </span>
                  <span className="text-xs font-medium leading-[14px] text-linear">
                    STARKFINANCE
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex justify-between items-center self-stretch rounded-xl"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-normal text-[#c6c6c6]">
                  Items
                </span>
                <span className="text-base font-bold text-[#f1f1f1]">
                  10,000
                </span>
              </div>
              <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-normal text-[#c6c6c6]">
                  Floor
                </span>
                <span className="text-base font-bold text-[#f1f1f1]">
                  0.0001 ETH
                </span>
              </div>
              <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-normal text-[#c6c6c6]">
                  Volume
                </span>
                <span className="text-base font-bold text-[#f1f1f1]">
                  40.55 ETH
                </span>
              </div>
            </div>
            <ViewCollectionButton url="/" title={"View Collection"} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full">
        <div className="promote_banner_md w-full h-[360px] rounded-3xl">
          <div className="p-6 flex w-full h-full flex-col justify-end items-start gap-3 rounded-3xl border-[1px] border-[#2D313E]">
            <div className="flex items-end gap-3 self-stretch">
              <Image src={cypherAvatar} alt="" width={67} height={67} />
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex items-start gap-1">
                  <div
                    style={{
                      backdropFilter: "blur(20px)",
                      background: "rgba(241, 241, 241, 0.10)",
                    }}
                    className="flex py-1 pl-1 pr-2 items-center gap-1 self-stretch rounded-2xl border-[1px] border-[#5E5E5E] h-[26px]"
                  >
                    <Image src={starknetLogo} alt="" height={18} width={18} />
                    <span className="text-xs font-medium text-[#f1f1f1] leading-[14px]">
                      Starknet
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
                  Vietnam Cypher
                </span>
                <div className="flex items-start gap-1">
                  <span className="text-xs font-normal text-[#c6c6c6] leading-[14px]">
                    By
                  </span>
                  <span className="text-xs font-medium leading-[14px] text-linear">
                    STARKFINANCE
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end self-stretch">
              <div
                className="flex py-3 px-6 justify-center items-start gap-6 self-stretch rounded-xl border-[1px] border-[#5E5E5E]"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), rgba(241, 241, 241, 0.10)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-normal text-[#c6c6c6]">
                    Items
                  </span>
                  <span className="text-base font-bold text-[#f1f1f1]">
                    10,000
                  </span>
                </div>
                <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-normal text-[#c6c6c6]">
                    Floor
                  </span>
                  <span className="text-base font-bold text-[#f1f1f1]">
                    0.0001 ETH
                  </span>
                </div>
                <div className="w-[1px] h-[37px] bg-[#5E5E5E]"></div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-normal text-[#c6c6c6]">
                    Volume
                  </span>
                  <span className="text-base font-bold text-[#f1f1f1]">
                    40.55 ETH
                  </span>
                </div>
              </div>
              <ViewCollectionButton url="/" title={"View Collection"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
