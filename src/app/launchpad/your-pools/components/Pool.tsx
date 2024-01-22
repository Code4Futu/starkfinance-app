import Image from "next/image";

export default function Pool({ index }: { index: number }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-7 place-items-center p-6 bg-[#1A1C24] rounded-3xl">
			<div className="w-full flex md:flex-col lg:flex-row items-center gap-2 pb-3 mb:pb-0 lg:pb-0 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:pr-2">
				<div className="w-[36px] h-[36px] relative">
					<Image src="/logo.png" alt="logo" fill />
				</div>

				<div className="flex-1 text-[20px] md:text-[14px] font-bold text-[#F1F1F1] line-clamp-3">
					StarkFinance StarkFinance StarkFinance StarkFinance
				</div>
			</div>

			<div className="w-full flex justify-between py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:px-2">
				<div className="text-[12px] md:hidden">Status</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-2.5">
						Upcoming
					</div>
					<div className="italic text-[12px]">Starts in: 00d 00h 00m 00s</div>
				</div>
			</div>

			<div className="w-full flex justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:px-2">
				<div className="text-[12px] md:hidden">NFT Stake</div>

				<div className="text-right md:text-center font-bold text-[14px] text-[#F1F1F1] mb-3 md:mb-0">
					No
				</div>
			</div>
			<div className="w-full flex justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:px-2">
				<div className="text-[12px] md:hidden">Allocation</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-3 md:mb-0">
						100,000 SFN
					</div>
					<div className="italic text-[12px]">$ 1,000</div>
				</div>
			</div>
			<div className="w-full flex justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:px-2">
				<div className="text-[12px] md:hidden">Total committed SFN</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-3 md:mb-0">
						100,000 SFN
					</div>
					<div className="italic text-[12px]">$ 1,000</div>
				</div>
			</div>

			<div className="w-full flex justify-between md:justify-center py-3 border-b border-b-[#2D313E] md:border-b-0 md:border-r border-r-[#2D313E] md:px-2">
				<div className="text-[12px] md:hidden">Claimed</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-3 md:mb-0">
						100,000 SFN
					</div>
				</div>
			</div>

			<div className="w-full flex justify-between md:justify-center py-3 md:px-2">
				<div className="text-[12px] md:hidden">Claimable</div>

				<div className="text-right md:text-center">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-3 md:mb-0">
						100,000 SFN
					</div>
				</div>
			</div>
		</div>
	);
}
