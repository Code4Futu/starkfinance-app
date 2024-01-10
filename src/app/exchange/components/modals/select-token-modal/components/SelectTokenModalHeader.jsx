import { MouseEventHandler } from "react";
import { CloseIcon } from "../../components";

export const SelectTokenModalHeader = ({ close }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3 self-stretch">
        <span className="text-2xl font-bold text-[#F1F1F1]">
          Select a Token
        </span>
        <div className="flex items-center justify-center">
          <div
            onClick={close}
            className="flex items-start gap-[10px] rounded border-[1px] border-[#2D313E] p-[6px] cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
