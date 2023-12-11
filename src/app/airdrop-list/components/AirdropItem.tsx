import Image from "next/image";

const AirdropItem = () => {
	return (
		<div className="flex flex-col gap-6 p-3 border rounded-3xl border-[#24C3BC] cursor-pointer">
			<div className="w-full h-[200px] relative">
				<Image alt="image" src="/mocks/banner.png" fill />

				<div className="absolute top-3 left-3 p-3 rounded-2xl bg-[#0D0E12] text-[#F1F1F1]">
					<div className="text-[36px]">22</div>
					<div>Nov</div>
				</div>

				<div className="absolute top-3 right-3 flex items-center gap-1 bg-[#61b3ff26] py-1.5 px-3 rounded-2xl">
					<Image src="/svg/upcoming.svg" alt="upcoming" width={8} height={8} />
					<div className="font-bold text-[14px] text-[#f1f1f1]">Upcoming</div>
				</div>
			</div>

			<div className="flex justify-stretch gap-2">
				<div className="w-[66px] h-[66px] relative">
					<Image alt="image" src="/logo80x80.png" fill />
				</div>
				<div className="flex-1 flex flex-col justify-between">
					<div className="text-xl font-bold line-clamp-1">
						Promote Launchpad
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="flex items-center  gap-1 bg-[#ffffff26] py-1.5 px-2 rounded-2xl">
							<Image
								src="/wallets/starknet.png"
								alt="starknet"
								width={18}
								height={18}
							/>
							<div className="font-bold text-[12px] text-[#F1F1F1]">
								Starknet
							</div>
						</div>
						<div className="flex items-center gap-1 bg-[#ffffff26] py-1.5 px-2 rounded-2xl">
							<Image src="/logo.png" alt="token" width={8} height={8} />
							<div className="font-bold text-[12px] text-[#F1F1F1]">SFN</div>
						</div>
						<div className="bg-[#3E73FC] py-1.5 px-2 rounded-2xl font-bold text-[12px] text-[#F1F1F1]">
							PUBLIC
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-between border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
				<div className="flex flex-col">
					<div className="flex justify-between items-center py-3 border-b border-b-[#2D313E]">
						<div className="text-[12px]">Total raise</div>
						<div className="text-[14px] font-bold">100,000 USDT</div>
					</div>
					<div className="flex justify-between items-center py-3 border-b border-b-[#2D313E]">
						<div className="text-[12px]">Total sales</div>
						<div className="text-[14px] font-bold">100,000,000 SFN</div>
					</div>

					<div className="flex justify-between items-center py-3 border-b border-b-[#2D313E]">
						<div className="text-[12px]">Rate</div>
						<div className="text-[14px] font-bold">1 SFN = 0.001 USDT</div>
					</div>
				</div>
				{/* <div className="divider"></div> */}
				<div>
					<div className="mt-3 mb-2.5">Launchpad open in</div>
					<div className="flex gap-2">
						<div className="flex">
							<span className="countdown font-mono text-xl">
								{/* @ts-expect-error */}
								<span style={{ "--value": 2 }}></span>
							</span>
							days
						</div>
						<div className="flex">
							<span className="countdown font-mono text-xl">
								{/* @ts-expect-error */}
								<span style={{ "--value": 10 }}></span>
							</span>
							hrs
						</div>
						<div className="flex">
							<span className="countdown font-mono text-xl">
								{/* @ts-expect-error */}
								<span style={{ "--value": 24 }}></span>
							</span>
							mins
						</div>
						<div className="flex">
							<span className="countdown font-mono text-xl">
								{/* @ts-expect-error */}
								<span style={{ "--value": 47 }}></span>
							</span>
							secs
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AirdropItem;
