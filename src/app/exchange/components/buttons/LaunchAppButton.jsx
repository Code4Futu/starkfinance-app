import { Button } from "antd";
import { twMerge } from "tailwind-merge";

export default function LaunchAppButton({
  styleButton,
  styleTitle,
  title,
  onClick,
}) {
  return (
    <Button
      style={{
        background: "linear-gradient(135deg, #24C3BC 0%, #ADFFFB 100%)",
      }}
      className={twMerge(
        "button-hover-1 flex h-[43px] items-center justify-center gap-1 self-stretch rounded-xl border-0 px-6 py-3",
        styleButton
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          "text-base font-bold leading-normal text-[#1A1C24]",
          styleTitle
        )}
      >
        {title}
      </span>
    </Button>
  );
}
