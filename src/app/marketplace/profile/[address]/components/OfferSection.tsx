import clsx from "clsx";
import Image from "next/image";
import { boardDataMockup } from "@/app/models/marketplaceActivity";
import { ProfileDetailFilter } from "@/app/models/user";
export const OfferSection = ({
	profileDetailFilter,
}: {
	profileDetailFilter: ProfileDetailFilter;
}) => {
	return (
		<div
			className={clsx(
				"flex w-full flex-col justify-center items-center p-6 gap-3 self-stretch rounded-3xl bg-[#1A1C24]",
				profileDetailFilter !== "offers" &&
					"hidden"
			)}
		>
			<div className="hidden md:flex justify-between items-center py-3 self-stretch">
				<span className="w-[100px] text-base text-[#f1f1f1] font-bold leading-[19px]">
					Price
				</span>
				<span className="w-[120px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Floor Difference
				</span>
				<span className="w-[120px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Expiration
				</span>
				<span className="w-[120px] text-base text-[#f1f1f1] text-right font-bold leading-[19px]">
					Received
				</span>
				<span className="w-[180px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Action
				</span>
			</div>
			{boardDataMockup().map((item, idx) => (
				<div
					key={idx}
					className="w-full flex flex-col items-start py-3 gap-3 self-stretch md:flex-row md:justify-between md:items-center"
				>
					<div className="w-full flex justify-between items-center md:w-[100px]">
						<div className="flex flex-col gap-[2px]">
							<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
								0.01 ETH
							</span>
							<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
								~$2.01
							</span>
						</div>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[120px] md:flex">
						<span className="text-base text-[#f1f1f1] leading-[19px]">
							50% below
						</span>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[120px] md:flex">
						<span className="text-base text-[#f1f1f1] leading-[19px]">
							in 28 days
						</span>
					</div>
					<div className="hidden justify-center items-end self-stretch flex-col w-[100px] md:flex">
						<span className="text-base text-[#3E73FC] leading-[19px]">
							x048...04848
						</span>
					</div>
					<div className="flex flex-col items-end self-stretch gap-[6px] md:hidden">
						<div className="flex justify-between items-end self-stretch">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								Floor Difference
							</span>
							<span className="text-sm text-[#f1f1f1] leading-[16px]">
								50% below
							</span>
						</div>
						<div className="flex justify-between items-end self-stretch md:flex-col">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								Expiration
							</span>
							<span className="text-sm text-[#f1f1f1] leading-[16px]">
								in 28 days
							</span>
						</div>
						<div className="flex justify-between items-end self-stretch md:flex-col">
							<span className="text-sm text-[#c6c6c6] leading-[16px]">
								From
							</span>
							<span className="text-sm text-[#3E73FC] leading-[16px]">
								x048...04848
							</span>
						</div>
					</div>
					<div className="w-full flex items-start self-stretch md:max-w-[180px] md:items-center">
						<div className="flex justify-center items-center h-[36px] py-3 px-6 gap-1 flex-1 rounded-l-xl border-[1px] border-[#2D313E] cursor-pointer hover:bg-[#3C3D4D] transition-all md:px-3">
							<span className="text-base font-bold text-[#f1f1f1] leading-[19px]">
								Decline
							</span>
						</div>
						<div className="button-linear-1 flex justify-center items-center h-[36px] py-3 px-6 gap-1 flex-1 rounded-r-xl cursor-pointer md:px-3">
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
