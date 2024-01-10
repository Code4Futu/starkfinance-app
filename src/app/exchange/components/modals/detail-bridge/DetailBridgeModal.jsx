import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { twMerge } from "tailwind-merge";
import { ModalSettingHeader } from "./components/SettingModalHeader";
import { Divider } from "../../Divider";
import icons from "../../../assets/icons";
import { Button } from "antd";

const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4.66699 6.44402C4.66699 5.97246 4.85432 5.52022 5.18776 5.18678C5.5212 4.85334 5.97344 4.66602 6.44499 4.66602H12.2223C12.4558 4.66602 12.687 4.71201 12.9027 4.80136C13.1185 4.89071 13.3145 5.02168 13.4796 5.18678C13.6447 5.35188 13.7756 5.54789 13.865 5.7636C13.9543 5.97932 14.0003 6.21053 14.0003 6.44402V12.2213C14.0003 12.4548 13.9543 12.686 13.865 12.9018C13.7756 13.1175 13.6447 13.3135 13.4796 13.4786C13.3145 13.6437 13.1185 13.7747 12.9027 13.864C12.687 13.9534 12.4558 13.9993 12.2223 13.9993H6.44499C6.2115 13.9993 5.9803 13.9534 5.76458 13.864C5.54886 13.7747 5.35286 13.6437 5.18776 13.4786C5.02265 13.3135 4.89169 13.1175 4.80233 12.9018C4.71298 12.686 4.66699 12.4548 4.66699 12.2213V6.44402Z"
        stroke="#C6C6C6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.67467 11.158C2.47023 11.0415 2.30018 10.873 2.18172 10.6697C2.06325 10.4663 2.00057 10.2353 2 10V3.33333C2 2.6 2.6 2 3.33333 2H10C10.5 2 10.772 2.25667 11 2.66667"
        stroke="#C6C6C6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const PendingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill="#FFE86C" />
    </svg>
  );
};

const DetailBridgeModal = ({ isShowing, hide }) => {
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          hide(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div>
      {isShowing && (
        <div className={`modal-overlay-1`}>
          <div
            ref={wrapperRef}
            className={twMerge(
              "flex flex-col items-start gap-3 modal-content-setting"
            )}
          >
            <ModalSettingHeader close={() => hide()} />
            <Divider />
            <div className="flex flex-col items-start gap-[6px] self-stretch">
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  Id
                </span>
                <div className="flex items-center gap-1">
                  <CopyIcon />
                  <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                    0x6868...6868
                  </span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  Status
                </span>
                <div className="flex items-center gap-1">
                  <PendingIcon />
                  <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                    Pending
                  </span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  Date
                </span>
                <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                  16:21:37 27/12/2023
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  From
                </span>
                <div className="flex items-center gap-1">
                  <img src={icons.v2.eth} alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                    Abitrum One
                  </span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  To
                </span>
                <div className="flex items-center gap-1">
                  <img
                    src={icons.v2.starknet_logo}
                    alt=""
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                    Starknet
                  </span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6] leading-[14px]">
                  Address
                </span>
                <div className="flex items-center gap-1">
                  <CopyIcon />
                  <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                    0x6868...6868
                  </span>
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6]">
                  Requested amount
                </span>
                <span className="text-sm text-[#F1F1F1] font-normal leading-[16px]">
                  100 USDC
                </span>
              </div>
            </div>
            <Button className="button-linear-1 flex items-center justify-center gap-1 self-stretch rounded-2xl px-6 py-3 h-[43px]">
              <span className="text-base font-bold leading-[19px] text-[#1A1C24]">
                View
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBridgeModal;
