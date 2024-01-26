import clsx from "clsx";
import Image from "next/image";
import {
	ACTIVITY_STATUS,
	boardDataMockup,
} from "@/app/models/marketplaceActivity";
import { ProfileDetailFilter } from "@/app/models/user";
import { Open } from "../../components";
export const ActivitySection = ({
	profileDetailFilter,
}: {
	profileDetailFilter: ProfileDetailFilter;
}) => {
	return (
		<div
			className={clsx(
				"flex w-full flex-col justify-center items-center p-6 gap-3 self-stretch rounded-3xl bg-[#1A1C24]",
				profileDetailFilter !== "activity" &&
					"hidden"
			)}
		>
			<div className="hidden md:flex justify-between items-center py-3 self-stretch">
				<span className="w-[140px] text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Event
				</span>
				<span className="w-[120px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px] xl:w-[120px]">
					Price
				</span>
				<span className="w-[120px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					From
				</span>
				<span className="w-[120px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					To
				</span>
				<span className="w-[120px] text-right text-sm text-[#f1f1f1] font-bold leading-[16px]">
					Time
				</span>
			</div>
			{boardDataMockup().map((item, idx) => (
				<div
					key={idx}
					className="w-full flex flex-col items-start py-3 gap-3 self-stretch md:flex-row md:justify-between md:items-center"
				>
					<div className="w-full flex justify-between items-center md:max-w-[140px]">
						<div className="flex items-center gap-[6px]">
							<div className="flex flex-col justify-center items-start gap-[2px]">
								<div
									className={clsx(
										"flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
										{
											"border-[#6CFF7B] bg-[#6CFF7B1a] text-[#6CFF7B]":
												item.action ===
												ACTIVITY_STATUS.SALE,
										},
										{
											"border-[#277EFF] bg-[#277eff1a] text-[#277EFF]":
												item.action ===
												ACTIVITY_STATUS.LISTING,
										},
										{
											"border-[#AD6CFF] bg-[#AD6CFF1a] text-[#AD6CFF]":
												item.action ===
												ACTIVITY_STATUS.OFFER,
										},
										{
											"border-[#00C4DF] bg-[#00C4DF1a] text-[#00C4DF]":
												item.action ===
												ACTIVITY_STATUS.TRANSFER,
										},
										{
											"border-[#FFE86C] bg-[#FFE86C1a] text-[#FFE86C]":
												item.action ===
												ACTIVITY_STATUS.AUCTION,
										},
										{
											"border-[#FF6C8F] bg-[#FF6C8F1a] text-[#FF6C8F]":
												item.action ===
												ACTIVITY_STATUS.BID,
										}
									)}
								>
									<div className="relative w-4 h-4">
										<Image
											src={`/svg/${item.action.toLowerCase()}.svg`}
											alt=""
											fill
										/>
									</div>
									<span
										className={clsx(
											"text-sm leading-[16px]"
										)}
									>
										{item.action}
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end gap-[2px] md:hidden">
							<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
								0.01 ETH
							</span>
							<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
								~$2.01
							</span>
							<span className="flex justify-end items-center gap-1">
								<span className="text-sm text-right text-[#3E73FC] leading-[16px]">
									1m ago
								</span>
								<Open />
							</span>
						</div>
					</div>

					<div className="hidden flex-col items-end justify-center gap-[2px] md:flex md:w-[120px]">
						<span className="text-sm text-[#f1f1f1] text-right leading-[16px] whitespace-nowrap">
							0.01 ETH
						</span>
						<span className="text-xs font-medium text-[#c6c6c6] leading-[14px]">
							~$2.01
						</span>
					</div>

					<span className="hidden w-[120px] text-sm text-right text-[#f1f1f1] leading-[16px] md:block">
						x086...16868
					</span>
					<span className="hidden w-[120px] text-sm text-right text-[#f1f1f1] leading-[16px] md:block">
						x048...04848
					</span>
					<span className="hidden md:flex w-[120px] justify-end items-center gap-1">
						<span className="text-sm text-right text-[#3E73FC] leading-[16px]">
							1m ago
						</span>
						<Open />
					</span>

					<div className="flex justify-between items-start self-stretch md:hidden">
						<span className="w-[100px] text-sm text-[#f1f1f1] leading-[16px]">
							x086...16868
						</span>
						<span className="text-sm text-[#f1f1f1] leading-[16px] font-bold">
							→
						</span>
						<span className="w-[100px] text-sm text-right text-[#f1f1f1] leading-[16px]">
							x048...04848
						</span>
					</div>
				</div>
			))}
		</div>
	);
};
