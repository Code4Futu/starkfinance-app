import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { twMerge } from "tailwind-merge";
import { ModalSettingHeader } from "./components/SettingModalHeader";
import { Divider } from "../../Divider";
import icons from "../../../assets/icons";

const SelectTokenBridge = ({ isShowing, hide }) => {
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
          <input
            type="text"
            placeholder="Search name or paste address"
            className="flex p-3 flex-col justify-center items-start gap-2 self-stretch rounded-2xl border-[1px] !border-[#2D313E] bg-[#0D0E12] text-base font-normal leading-[19px] !text-[#C6C6C6] override-input"
          />
          <div className="flex flex-col justify-end items-start gap-3 w-full">
            <div className="flex flex-col items-start gap-[6px] w-full">
              <span className="text-[#c6c6c6] text-base font-normal leading-[19px]">
                Popular
              </span>
              <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
                <img src={icons.v2.switch_network} alt="" className="w-6 h-6" />
                <span className="text-base font-bold text-[#f1f1f1]">
                  Starknet
                </span>
              </div>
              <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
                <img src={icons.v2.eth_logo} alt="" className="w-6 h-6" />
                <span className="text-base font-bold text-[#f1f1f1]">
                  Ethereum
                </span>
              </div>
              <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
                <img src={icons.v2.arb} alt="" className="w-6 h-6" />
                <span className="text-base font-bold text-[#f1f1f1]">
                  Abitrum One
                </span>
              </div>
              <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
                <img src={icons.v2.op} alt="" className="w-6 h-6" />
                <span className="text-base font-bold text-[#f1f1f1]">
                  Optimism
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[6px] w-full">
            <span className="text-[#c6c6c6] text-base font-normal leading-[19px]">
              Fiat
            </span>
            <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
              <img src={icons.v2.fiat} alt="" className="w-6 h-6" />
              <span className="text-base font-bold text-[#f1f1f1]">
                US bank or Card (via Stripe)
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[6px] w-full">
            <span className="text-[#c6c6c6] text-base font-normal leading-[19px]">
              Networks
            </span>
            <div className="flex w-full p-3 items-center gap-[6px] rounded-xl bg-[#232631]">
              <img src={icons.v2.switch_network} alt="" className="w-6 h-6" />
              <span className="text-base font-bold text-[#f1f1f1]">
                Starknet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTokenBridge;
