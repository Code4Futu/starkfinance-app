import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ModalHeader } from "./components/ModalHeader";
import { Divider } from "../../Divider";
import { ChartBar } from "./components/Chart";
import "./style.scss";

const ChartModalBar = ({
  isShowing,
  hide,
  token0,
  token1,
  handleChangeToken,
  dateCurrent,
}) => {
  const [modalClass, setModalClass] = useState("modal-content-chart-bar");

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
      <div className={`modal-overlay`}>
        <div
          className={twMerge("flex flex-col items-start gap-3", modalClass)}
          ref={wrapperRef}
        >
          <ModalHeader
            handleChangeToken={handleChangeToken}
            token0={token0}
            token1={token1}
            close={() => hide()}
          />
          <Divider />
          <div className="flex flex-col items-start gap-3 self-stretch md:flex-row md:justify-between">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#F1F1F1]">--</span>
                <span className="text-base font-bold text-[#F1F1F1]">
                  {token0.name} / {token1.name}
                </span>
                <span className="text-base font-bold text-[#6CFF7B]">--</span>
              </div>
              <span className="text-sm font-normal text-[#C6C6C6]">
                {dateCurrent} (UTC)
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-md	border-[1px] border-[#2D313E] bg-[#0D0E12]">
              <div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">24h</span>
              </div>
              <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">1W</span>
              </div>
              <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">1M</span>
              </div>
              <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">1Y</span>
              </div>
              <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">ALL</span>
              </div>
            </div>
          </div>
          <ChartBar />
        </div>
      </div>
    </div>
  );
};

export default ChartModalBar;
