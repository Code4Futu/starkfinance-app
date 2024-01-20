"use client";
import { twMerge } from "tailwind-merge";

const ArrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6958 11.2286C16.1014 11.6546 16.1014 12.3454 15.6958 12.7714L11.0228 17.6805C10.6172 18.1065 9.9597 18.1065 9.55416 17.6805C9.14862 17.2545 9.14862 16.5637 9.55416 16.1377L13.4929 12L9.55416 7.8623C9.14862 7.43627 9.14862 6.74555 9.55416 6.31952C9.95971 5.89349 10.6172 5.89349 11.0228 6.31952L15.6958 11.2286Z"
        fill="#0D0E12"
      />
    </svg>
  );
};

export const ViewCollectionButton = ({
  title,
  className,
  textStyle,
  isIconHidden,
  onClick,
}: {
  title: string;
  className?: string;
  textStyle?: string;
  isIconHidden?: boolean;
  onClick?: any;
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-1 self-stretch rounded-2xl px-6 py-3 cursor-pointer h-[48px] button-linear-2 transition-all",
        className
      )}
      onClick={() => onClick()}
    >
      <span
        className={twMerge(
          "text-base font-bold text-[#0D0E12] leading-[19px]",
          textStyle
        )}
      >
        {title}
      </span>
      {!isIconHidden && <ArrowRight />}
    </div>
  );
};
