import { Button, ButtonProps } from "antd";
import { twMerge } from "tailwind-merge";

export const DefaultButton = (props) => {
  return (
    <Button
      {...props}
      className={twMerge(
        "flex items-center justify-center rounded-2xl border-none bg-[#ffffff26] px-3 py-[6px] leading-none text-white",
        props.className
      )}
    >
      {props.children}
    </Button>
  );
};
