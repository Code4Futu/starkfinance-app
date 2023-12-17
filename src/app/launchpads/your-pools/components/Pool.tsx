import Image from "next/image";

export default function Pool() {
	return (
		<div className="flex flex-col justify-stretch p-6 bg-[#1A1C24] rounded-3xl">
			<div className="flex items-center gap-2 pb-3 border-b border-b-[#2D313E]">
				<div className="w-[36px] h-[36px] relative">
					<Image src="/logo.png" alt="logo" fill />
				</div>

				<div className="text-[20px] font-bold text-[#F1F1F1]">StarkFinance</div>
			</div>

			<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
				<div className="text-[12px]">Status</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						Upcoming
					</div>
					<div className="italic text-[12px]">Starts in: 00d 00h 00m 00s</div>
				</div>
			</div>
			<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
				<div className="text-[12px]">NFT Stake</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						No
					</div>
				</div>
			</div>
			<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
				<div className="text-[12px]">Allocation</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						100,000 SFN
					</div>
					<div className="italic text-[12px]">$ 1,000</div>
				</div>
			</div>
			<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
				<div className="text-[12px]">Total committed SFN</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						100,000 SFN
					</div>
					<div className="italic text-[12px]">$ 1,000</div>
				</div>
			</div>

			<div className="flex justify-between py-3 border-b border-b-[#2D313E]">
				<div className="text-[12px]">Claimed</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						100,000 SFN
					</div>
				</div>
			</div>

			<div className="flex justify-between py-3">
				<div className="text-[12px]">Claimable</div>

				<div className="text-right">
					<div className="font-bold text-[14px] text-[#F1F1F1] mb-[9px]">
						100,000 SFN
					</div>
				</div>
			</div>
		</div>
	);
}
