import clsx from "clsx";
import Image from "next/image";
import { boardDataMockup } from "@/app/models/marketplaceActivity";
import { ProfileFilter } from "@/app/models/user";

export const OfferReceiveSection = ({
	profileFilter,
}: {
	profileFilter: ProfileFilter;
}) => {
	return (
		<div
			className={clsx(
				"hidden w-full flex-col justify-center items-center p-6 gap-3 self-stretch rounded-3xl bg-[#1A1C24]",
				profileFilter === "offersReceived" &&
					"!flex"
			)}
		>
			<div className="hidden xl:flex justify-between items-center py-3 self-stretch">
				<span className="w-[250px] text-base text-[#f1f1f1] font-bold leading-[19px]">
					Item
				</span>
				<span className="w-[100px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Price
				</span>
				<span className="w-[120px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Floor Difference
				</span>
				<span className="w-[100px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Expiration
				</span>
				<span className="w-[100px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Received
				</span>
				<span className="w-[201px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Action
				</span>
			</div>
			{boardDataMockup().map((item, idx) => (
				<div
					key={idx}
					className="w-full flex flex-col items-start py-3 gap-3 self-stretch xl:flex-row xl:justify-between xl:items-center"
				>
					<div className="w-full flex justify-between items-center xl:w-[250px]">
						<div className="flex items-center gap-[6px]">
							<div className="relative w-[62px] h-[62px] rounded-lg border-[1px] border-[#f1f1f1] overflow-hidden">
								<Image
									src={
										"https://s3-alpha-sig.figma.com/img/ad4c/5140/d705cce2acb399b02db77f632f20c2ab?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L5uVNwRHFyG6DJ3HM~R1gQFd1GI6yzRYdWFY4oS8xpO8440QZx7aGwWVbG2cET1Gn7imbQuskQHTZG8cVUI2n4aRX1ycK1LSZoRbZrsf7sCR5K7DJ~qT6fK325lRCoOZV8bSJv-wApx9cZPcjiXPpDorbtu6E-coUGwC0wPzvrSIkfDhHQeKokyhk1QqaofoR-Mp~rt8qWENrxTwmj9tDEcdT-jojHn7LFVyeghm-MmtwdisHrGbZpq3G1SOgd3cBXRBZziMW2bih-Veb1MVTH71JEX7fvLWHDfDCKb~ptNtB~CycGa8CgHJ3fwoKbIHvmTA4AODxuPtvSztfLBs7g__"
									}
									alt=""
									fill
								/>
							</div>
							<div className="flex flex-col justify-center items-start gap-[2px]">
								<span className="text-sm text-[#f1f1f1] leading-[16px] line-clamp-1">
									{item.label}
								</span>
								<span className="text-xs text-[#c6c6c6] leading-[14px] line-clamp-1">
									{item.collectionName}
								</span>
							</div>
						</div>
						<div className="flex flex-col items-end gap-[2px] xl:hidden">
							<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
								0.01 ETH
							</span>
							<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
								~$2.01
							</span>
						</div>
					</div>
					<div className="hidden flex-col items-end gap-[2px] w-[100px] xl:flex">
						<span className="text-base text-[#f1f1f1] text-right leading-[19px]">
							0.01 ETH
						</span>
						<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
							~$2.01
						</span>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[120px] xl:flex">
						<span className="text-base text-[#f1f1f1] leading-[19px]">
							50% below
						</span>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[100px] xl:flex">
						<span className="text-base text-[#f1f1f1] leading-[19px]">
							in 28 days
						</span>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[100px] xl:flex">
						<span className="text-base text-[#f1f1f1] leading-[19px]">
							2 hours ago
						</span>
					</div>
					<div className="flex flex-col items-end self-stretch gap-[6px] xl:hidden">
						<div className="flex justify-between items-end self-stretch">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								Floor Difference
							</span>
							<span className="text-sm text-[#f1f1f1] leading-[16px]">
								50% below
							</span>
						</div>
						<div className="flex justify-between items-end self-stretch xl:flex-col xl:w-[100px]">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								Expiration
							</span>
							<span className="text-sm text-[#f1f1f1] leading-[16px]">
								in 28 days
							</span>
						</div>
						<div className="flex justify-between items-end self-stretch xl:flex-col xl:w-[100px]">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								Received
							</span>
							<span className="text-sm text-[#f1f1f1] leading-[16px]">
								2 hours ago
							</span>
						</div>
					</div>
					<div className="w-full flex items-start self-stretch xl:max-w-[201px] xl:items-center">
						<div className="flex justify-center items-center h-[36px] py-3 px-6 gap-1 flex-1 rounded-l-xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all">
							<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
								Decline
							</span>
						</div>
						<div className="button-linear-1 flex justify-center items-center h-[36px] py-3 px-6 gap-1 flex-1 rounded-r-xl cursor-pointer">
							<span className="text-base font-bold text-[#1A1C24] leading-[19px]">
								Accept
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
