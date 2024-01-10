import { CloseIcon } from "../../components";

export const ModalSettingHeader = ({ close }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3 self-stretch">
        <span className="text-xl font-bold text-[#F1F1F1] leading-[28px]">
          Transaction Settings
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
