import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { twMerge } from "tailwind-merge";
import { ModalSettingHeader } from "./components/SettingModalHeader";
import { Divider } from "../../Divider";
import { Input, Modal, Button } from "antd";

const SettingChartModal = ({ isShowing, setIsShow }) => {
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("20");

  const handleSlippageChange = (event) => {
    setSlippage(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShow(false);
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
      <div className={`modal-overlay-2`}>
        <div
          ref={wrapperRef}
          className={twMerge(
            "flex flex-col mx-6 items-start gap-3 !h-[277px] modal-content-setting-2",
            !isShowing && "modal-closing"
          )}
        >
          <ModalSettingHeader close={() => setIsShow(false)} />
          <Divider />
          <div className="flex items-start justify-between self-stretch">
            <span className="text-sm font-normal text-[#C6C6C6] leading-[19px]">
              Slippage
            </span>
            <span className="text-sm font-bold text-[#24C3BC] leading-[19px]">
              {slippage}
              {slippage !== "Auto" && "%"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-6 self-stretch">
            <div className="flex items-start gap-1 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-1">
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  slippage === "Auto" && "bg-[#24C3BC]"
                )}
                onClick={() => setSlippage("Auto")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    slippage === "Auto" && "text-[#1A1C24]"
                  )}
                >
                  Auto
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  slippage === "0.1" && "bg-[#24C3BC]"
                )}
                onClick={() => setSlippage("0.1")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    slippage === "0.1" && "text-[#1A1C24]"
                  )}
                >
                  0.1%
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  slippage === "0.5" && "bg-[#24C3BC]"
                )}
                onClick={() => setSlippage("0.5")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    slippage === "0.5" && "text-[#1A1C24]"
                  )}
                >
                  0.5%
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  slippage === "1" && "bg-[#24C3BC]"
                )}
                onClick={() => setSlippage("1")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    slippage === "1" && "text-[#1A1C24]"
                  )}
                >
                  1%
                </span>
              </div>
            </div>
            <Input
              // placeholder="Search name or paste address"
              suffix={
                <span className="text-sm font-normal text-[#C6C6C6] leading-[19px]">
                  %
                </span>
              }
              value={slippage}
              onChange={handleSlippageChange}
              className="input-pl rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] h-[45px] p-3 text-sm font-normal text-[#3C3D4D]"
            />
          </div>
          <Divider />
          <div className="flex items-start justify-between self-stretch">
            <span className="text-sm font-normal text-[#C6C6C6] leading-[19px]">
              Transaction deadline
            </span>
            <span className="text-sm font-bold text-[#24C3BC] leading-[19px]">
              {deadline}m
            </span>
          </div>
          <div className="flex items-start justify-between gap-6 self-stretch">
            <div className="flex items-start gap-1 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-1">
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  deadline === "5" && "bg-[#24C3BC]"
                )}
                onClick={() => setDeadline("5")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    deadline === "5" && "text-[#1A1C24]"
                  )}
                >
                  5m
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  deadline === "10" && "bg-[#24C3BC]"
                )}
                onClick={() => setDeadline("10")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    deadline === "10" && "text-[#1A1C24]"
                  )}
                >
                  10m
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-xl px-3 py-2",
                  deadline === "20" && "bg-[#24C3BC]"
                )}
                onClick={() => setDeadline("20")}
              >
                <span
                  className={twMerge(
                    "text-sm font-bold text-[#C6C6C6] leading-[19px]",
                    deadline === "20" && "text-[#1A1C24]"
                  )}
                >
                  20m
                </span>
              </div>
            </div>
            <Input
              // placeholder="Search name or paste address"
              suffix={
                <span className="text-sm font-normal text-[#C6C6C6] leading-[19px]">
                  minutes
                </span>
              }
              value={deadline}
              onChange={handleDeadlineChange}
              className="input-pl rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] h-[45px] p-3 text-sm font-normal text-[#3C3D4D]"
            />
            {/* <div className="flex items-start justify-end gap-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3">
                <span className="text-sm font-bold text-[#F1F1F1] leading-[19px]">
                  20
                </span>
                <span className="text-base font-normal text-[#F1F1F1] leading-[19px]">
                  minutes
                </span>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingChartModal;
