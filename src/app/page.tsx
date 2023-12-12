import Image from "next/image";
import LatestLaunchpad from "./launchpads/components/LatestLaunchpad";
import Link from "next/link";
import { ILaunchpad } from "./types";
import { BASE_API } from "./constants";

async function getLaunchpads(): Promise<ILaunchpad[]> {
	const res = await fetch(`${BASE_API}/launchpads/`, {
		next: { revalidate: 60 },
	});
	return res.json();
}

export default async function Home() {
	const launchpads = await getLaunchpads();

	return (
		<div>
			<div className="flex justify-center">
				<div className="flex flex-col gap-6 flex-1 max-w-[1080px]">
					{/* title and filters */}
					<div className="text-[26px] md:text-[32px] lg:text-[42px] font-bold">
						Welcome to Starkfinance Launchpad
					</div>

					{/* latest launchpad */}
					<LatestLaunchpad launchpad={launchpads[0]} />

					<div className="flex flex-wrap gap-1 md:gap-4">
						<div className="py-2 px-2 md:py-3 md:px-5 bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24]  rounded-2xl">
							Buy SFN token
						</div>
						<div className="py-2 px-2 md:py-3 md:px-5 bg-[#F1F1F1] font-bold text-[#1A1C24]  rounded-2xl">
							Apply for Launchpad
						</div>
						<div className="py-2 px-2 md:py-3 md:px-5 bg-[#F1F1F1] font-bold text-[#1A1C24]  rounded-2xl">
							Apply for Airdrop
						</div>

						<div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1]  rounded-2xl">
							Launchpad List
						</div>
						<div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1]  rounded-2xl">
							Airdrop List
						</div>
						<div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1]  rounded-2xl">
							Your Pools
						</div>
					</div>

					<div>
						<div className="text-[26px] lg:text-[42px] font-bold">
							How to Participate in IDO
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
							<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
								<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 lg:px-24 rounded-b-2xl">
									Step 01
								</div>
								<div className="w-[80px] h-[80px] relative">
									<Image alt="image" src="/svg/step1.svg" fill />
								</div>
								<div className="text-[14px] text-center">
									Swap SFN tokens here or buy them at CEX and withdraw to your
									wallet. Ensure you have enough ETH to pay gas on Starknet
									Chain.
								</div>
							</div>
							<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
								<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 lg:px-24 rounded-b-2xl">
									Step 02
								</div>
								<div className="w-[80px] h-[80px] relative">
									<Image alt="image" src="/svg/step2.svg" fill />
								</div>
								<div className="text-[14px] text-center">
									IDO pool will be opened on 3 days (72 hours) and you can
									commit SFN tokens on it, you can also stake your StarkFinance
									NFT to boost your allocation.
								</div>
							</div>
							<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
								<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 lg:px-24 rounded-b-2xl">
									Step 03
								</div>
								<div className="w-[80px] h-[80px] relative">
									<Image alt="image" src="/svg/step3.svg" fill />
								</div>
								<div className="text-[14px] text-center">
									The system will calculate your allocation, the total number of
									participants committing funds in the pool and show how many
									IDO tokens you can buy depends on your committing amount. Then
									the corresponding SFN amount will be deducted from your
									deposited fund.
								</div>
							</div>
							<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
								<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 lg:px-24 rounded-b-2xl">
									Step 04
								</div>
								<div className="w-[80px] h-[80px] relative">
									<Image alt="image" src="/svg/step4.svg" fill />
								</div>
								<div className="text-[14px] text-center">
									You can enter launchpad platform and claim your IDO tokens
									also your remaining SFN fund.
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-6 rounded-3xl bg-[#1A1C24] p-6">
						<div className="flex justify-start md:justify-between">
							<div className="text-[24px] font-bold">Overall stats</div>
							<div className="hidden md:flex gap-6">
								<div className="text-center bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-2 px-4 rounded-2xl">
									Apply for Airdrop
								</div>
								<div className="text-center bg-[#F1F1F1] font-bold text-[#1A1C24] py-2 px-4 rounded-2xl">
									Apply for Launchpad
								</div>
							</div>
						</div>

						<div className="grid gird-cols-1 md:grid-cols-3 gap-3">
							<div className="w-full p-3 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="w-[60px] h-[60px] relative">
									<Image alt="image" src="/svg/launchpad-blue.svg" fill />
								</div>
								<div className="flex-1">
									<div className="font-bold text-[24px]">1</div>
									<div className="text-[14px] text-[#C6C6C6]">
										Projects Launched
									</div>
								</div>
							</div>

							<div className="w-full p-3 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="w-[60px] h-[60px] relative">
									<Image alt="image" src="/svg/total-raise.svg" fill />
								</div>
								<div className="flex-1">
									<div className="font-bold text-[24px]">$ 0</div>
									<div className="text-[14px] text-[#C6C6C6]">Funds Raised</div>
								</div>
							</div>

							<div className="w-full p-3 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="w-[60px] h-[60px] relative">
									<Image alt="image" src="/svg/user.svg" fill />
								</div>
								<div className="flex-1">
									<div className="font-bold text-[24px]">0</div>
									<div className="text-[14px] text-[#C6C6C6]">Participants</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col md:hidden gap-6">
							<div className="text-center bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-2 px-4 rounded-2xl">
								Apply for Launchpad
							</div>
							<div className="text-center bg-[#F1F1F1] font-bold text-[#1A1C24] py-2 px-4 rounded-2xl">
								Apply for Airdrop
							</div>
						</div>
					</div>

					<div className="flex flex-col rounded-3xl bg-[#1A1C24] px-3 md:px-6 py-6">
						<div className="text-[24px] font-bold mb-6">Features</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<div className="w-full p-6 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="flex-1">
									<div className="text-[20px] font-bold text-[#FFFFFF] mb-2.5">
										Public / Private Sale
									</div>
									<div className="text-[14px] text-[#C6C6C6] font-[400]">
										Commit your funds to get IDO tokens from projects
									</div>
								</div>
								<div className="w-[120px] h-[102px] relative">
									<Image alt="image" src="/features/public-private.png" fill />
								</div>
							</div>

							<div className="w-full p-6 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="flex-1">
									<div className="text-[20px] font-bold text-[#FFFFFF] mb-2.5">
										Airdrop
									</div>
									<div className="text-[14px] text-[#C6C6C6]">
										Claim your airdrop allocations from projects
									</div>
								</div>
								<div className="w-[120px] h-[102px] relative">
									<Image alt="image" src="/features/airdrop.png" fill />
								</div>
							</div>

							<div className="w-full p-6 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="flex-1">
									<div className="text-[20px] font-bold text-[#FFFFFF] mb-2.5">
										Locking
									</div>
									<div className="text-[14px] text-[#C6C6C6]">
										Support token vesting schedule in token sales
									</div>
								</div>
								<div className="w-[120px] h-[102px] relative">
									<Image alt="image" src="/features/locking.png" fill />
								</div>
							</div>

							<div className="w-full p-6 flex gap-2 bg-[#0D0E12] border-[#2D313E] rounded-2xl">
								<div className="flex-1">
									<div className="text-[20px] font-bold text-[#FFFFFF] mb-2.5">
										KYC Project
									</div>
									<div className="text-[14px] text-[#C6C6C6]">
										Take the safety of our investors very seriously
									</div>
								</div>
								<div className="w-[120px] h-[102px] relative">
									<Image alt="image" src="/features/kyc.png" fill />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
