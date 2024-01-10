import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { twMerge } from "tailwind-merge";
import { ModalSettingHeader } from "./components/SettingModalHeader";
import { Divider } from "../../Divider";
import icons from "../../../assets/icons";

const SwapTokenBridge = ({ isShowing, hide }) => {
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
      <div className={`modal-overlay-1`}>
        <div
          ref={wrapperRef}
          className={twMerge(
            "flex flex-col items-start gap-3 modal-content-bridge"
          )}
        >
          <ModalSettingHeader close={() => hide()} />
          <Divider />
          <div className="w-full flex flex-col items-start gap-3">
            <span className="text-[#c6c6c6] text-base font-normal leading-[19px]">
              Address
            </span>
            <input
              type="text"
              placeholder="Search name or paste address"
              className="flex p-3 flex-col justify-center items-start gap-2 self-stretch rounded-2xl border-[1px] !border-[#2D313E] bg-[#0D0E12] text-base font-normal leading-[19px] !text-[#C6C6C6] override-input"
            />
            <div className="w-full flex p-3 justify-center items-center rounded-xl bg-[#232631]">
              <div className="flex w-full items-center gap-[6px] rounded-xl bg-[#232631]">
                <img src={icons.v2.switch_network} alt="" className="w-6 h-6" />
                <span className="text-base font-bold text-[#f1f1f1]">
                  Starknet
                </span>
              </div>
              <div className="flex px-3 py-[6px] items-center gap-[10px] rounded-md border-[1px] border-[#2D313E] bg-[#2D313E] cursor-pointer">
                <span className="text-xs font-normal leading-[14px] text-[#f1f1f1]">
                  Select
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapTokenBridge;
