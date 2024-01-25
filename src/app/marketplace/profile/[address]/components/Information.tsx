import { Divider } from "@/app/components/Divider";

export const Information = () => {
	return (
		<div className="w-full flex flex-col items-start p-6 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
			<div className="w-full flex flex-col items-start gap-3 self-stretch">
				<span className="text-xl font-bold leading-[23px]">
					Information
				</span>
				<Divider />
			</div>
			<div className="flex flex-col items-start gap-2 self-stretch">
				<div className="flex justify-between items-start self-stretch">
					<span className="text-xs text-[#c6c6c6] leading-[14px]">
						Contract Address
					</span>
					<span className="text-sm leading-[16px]">
						0x6868...6868
					</span>
				</div>
				<Divider />
				<div className="flex justify-between items-start self-stretch">
					<span className="text-xs text-[#c6c6c6] leading-[14px]">
						Token ID
					</span>
					<span className="text-sm leading-[16px]">
						6868
					</span>
				</div>
				<Divider />
				<div className="flex justify-between items-start self-stretch">
					<span className="text-xs text-[#c6c6c6] leading-[14px]">
						Token Standard
					</span>
					<span className="text-sm leading-[16px]">
						ERC-721
					</span>
				</div>
				<Divider />
				<div className="flex justify-between items-start self-stretch">
					<span className="text-xs text-[#c6c6c6] leading-[14px]">
						Chain
					</span>
					<span className="text-sm leading-[16px]">
						Starknet
					</span>
				</div>
				<Divider />
				<div className="flex justify-between items-start self-stretch">
					<span className="text-xs text-[#c6c6c6] leading-[14px]">
						Fee
					</span>
					<span className="text-sm leading-[16px]">
						0%
					</span>
				</div>
				<Divider />
			</div>
		</div>
	);
};
