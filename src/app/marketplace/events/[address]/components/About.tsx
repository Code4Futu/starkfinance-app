import { Divider } from "@/app/components/Divider";
import clsx from "clsx";

export const About = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-start py-9 px-6 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]",
        className
      )}
    >
      <div className="flex flex-col items-start gap-3 self-stretch">
        <span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
          About Starksport NFT
        </span>
        <Divider />
      </div>
      <ul className="pl-3 list-disc">
        <li className="text-sm text-[#c6c6c6] lg:text-base">
          Early access & Freemint for the upcoming PolySport project.
        </li>
        <li className="text-sm text-[#c6c6c6] lg:text-base">
          Boosting your revenue sharings.
        </li>
        <li className="text-sm text-[#c6c6c6] lg:text-base">
          Boosting your allocations on Starkfinance Launchpad.
        </li>
        <li className="text-sm text-[#c6c6c6] lg:text-base">
          Access NFT Lending on Starkfinance Marketplace.
        </li>
        <li className="text-sm text-[#c6c6c6] lg:text-base">
          Airdrop 300 SFN tokens for NFT holders.
        </li>
      </ul>
    </div>
  );
};
