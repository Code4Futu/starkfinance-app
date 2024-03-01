"use client";

import Image from "next/image";
// import { HomepageCarousel } from "./components/HomepageCarousel";
import LatestLaunchpad from "./launchpad/launchpad-list/components/LatestLaunchpad";
import { BASE_API } from "./constants";
import { ILaunchpad } from "./types";
import { HomepageCarousel } from "./components/HomepageCarousel";
import useSWR from "swr";
import axios from "axios";

// async function getLaunchpads(): Promise<[ILaunchpad[], number]> {
// 	const res = await fetch(`${BASE_API}/launchpads`, {
// 		next: { revalidate: 60 },
// 	});
// 	return res.json();
// }

export default function Home() {
	// const res = await getLaunchpads();
	// const launchpads = res[0];

	const { data } = useSWR<[ILaunchpad[], number]>(
		["Home"],
		async () => {
			const { data } = await axios.get<[ILaunchpad[], number]>(
				`${BASE_API}/launchpads`
			);

			return data;
		},
		{ revalidateOnMount: true }
	);

	const launchpads = data?.[0] ?? undefined;

	return (
		<div className="flex flex-col gap-6">
			{/* Overall stats */}
			<div className="flex flex-col gap-6 rounded-3xl bg-[#1A1C24] p-6">
				<div className="flex justify-start md:justify-between md:items-end">
					<div className="text-2xl font-bold leading-[23px]">Overall stats</div>
					<div className="hidden md:flex gap-3">
						<div className="text-center button-linear-1 font-bold text-[#1A1C24] py-2 px-4 rounded-2xl cursor-pointer">
							Buy SFN Token
						</div>
						<div className="text-center button-linear-2 font-bold text-[#1A1C24] py-2 px-4 rounded-2xl cursor-pointer">
							Apply for Launchpad / Airdrop
						</div>
					</div>
				</div>

				<div className="grid gird-cols-1 md:grid-cols-3 gap-3">
					<div className="w-full p-[18px] flex gap-2 bg-[#0D0E12] border-[1px] border-[#2D313E] rounded-2xl">
						<div className="w-[37px] h-[37px] md:w-[43px] md:h-[43px] xl:w-[51px] xl:h-[51] relative">
							<Image alt="image" src="/svg/launchpad-blue.svg" fill />
						</div>
						<div className="flex flex-col justify-center items-start gap-1">
							<div className="font-bold text-base leading-[19px] md:text-xl md:leading-[23px] xl:text-2xl xl:leading-[28px]">
								{data?.[1] ?? 0}
							</div>
							<div className="text-xs font-normal text-[#C6C6C6] leading-[14px] md:text-sm md:leading-[16px] xl:text-base xl:leading-[19px]">
								Projects Launched
							</div>
						</div>
					</div>

					<div className="w-full p-[18px] flex gap-2 bg-[#0D0E12] border-[1px] border-[#2D313E] rounded-2xl">
						<div className="w-[37px] h-[37px] md:w-[43px] md:h-[43px] xl:w-[51px] xl:h-[51] relative">
							<Image alt="image" src="/svg/total-raise.svg" fill />
						</div>
						<div className="flex flex-col justify-center items-start gap-1">
							<div className="font-bold text-base leading-[19px] md:text-xl md:leading-[23px] xl:text-2xl xl:leading-[28px]">
								$0
							</div>
							<div className="text-xs font-normal text-[#C6C6C6] leading-[14px] md:text-sm md:leading-[16px] xl:text-base xl:leading-[19px]">
								Total Funds Raised
							</div>
						</div>
					</div>

					<div className="w-full p-[18px] flex gap-2 bg-[#0D0E12] border-[1px] border-[#2D313E] rounded-2xl">
						<div className="w-[37px] h-[37px] md:w-[43px] md:h-[43px] xl:w-[51px] xl:h-[51] relative">
							<Image alt="image" src="/svg/user.svg" fill />
						</div>
						<div className="flex flex-col justify-center items-start gap-1">
							<div className="font-bold text-base leading-[19px] md:text-xl md:leading-[23px] xl:text-2xl xl:leading-[28px] ">
								0
							</div>
							<div className="text-xs font-normal text-[#C6C6C6] leading-[14px] md:text-sm md:leading-[16px] xl:text-base xl:leading-[19px]">
								Total Participants
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:hidden gap-6">
					<div className="text-center button-linear-1 py-2 px-4 rounded-2xl">
						<span className="font-bold text-[#1A1C24] leading-[19px]">
							Buy SFN Token
						</span>
					</div>
					<div className="text-center button-linear-2 py-2 px-4 rounded-2xl">
						<span className="font-bold text-[#1A1C24] leading-[19px]">
							Apply for Launchpad / Airdrop
						</span>
					</div>
				</div>
			</div>

			{/* latest launchpad */}
			<LatestLaunchpad launchpad={launchpads?.[0]} />

			{/* top fund raised */}
			{/* <div className="flex flex-col gap-3 md:gap-6">
				<div className="text-xl md:text-2xl xl:text-[32px] font-bold">
					Top Fundrasing
				</div>
				<HomepageCarousel launchpads={launchpads?.length ? launchpads : []} />
			</div> */}

			{/* top airdrop */}
			{/* <div className="flex flex-col gap-3 md:gap-6">
				<div className="text-xl md:text-2xl xl:text-[32px] font-bold">
					Top Airdrop
				</div>
				<HomepageCarousel launchpads={launchpads?.length ? launchpads : []} />
			</div> */}

			{/* <div className="flex flex-wrap gap-1 md:gap-4">
        <div className="py-2 px-2 md:py-3 md:px-5 bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] border-2 font-bold text-[#1A1C24]  rounded-2xl">
          Buy SFN token
        </div>
        <div className="py-2 px-2 md:py-3 md:px-5 bg-[#F1F1F1] font-bold text-[#1A1C24] border-2 rounded-2xl">
          Apply for Launchpad
        </div>
        <div className="py-2 px-2 md:py-3 md:px-5 bg-[#F1F1F1] font-bold text-[#1A1C24] border-2rounded-2xl">
          Apply for Airdrop
        </div>

        <div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1] rounded-2xl">
          Launchpad List
        </div>
        <div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1] rounded-2xl">
          Airdrop List
        </div>
        <div className="py-2 px-2 md:py-3 md:px-5 border-solid border-2 font-bold text-[#F1F1F1] rounded-2xl">
          Your Pools
        </div>
      </div> */}

			<div className="flex flex-col gap-3 md:gap-6">
				<div className="text-xl md:text-2xl xl:text-[32px] font-bold">
					How to Participate in IDO
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6">
					<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
						<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 xl:px-24 rounded-b-2xl">
							Step 01
						</div>
						<div className="w-[80px] h-[80px] relative">
							<Image alt="image" src="/svg/step1.svg" fill />
						</div>
						<div className="text-sm text-center md:text-base">
							Prepare SFN tokens in your wallet and ensure you have enough ETH
							or STRK to pay gas on Starknet Chain.
						</div>
					</div>
					<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
						<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 xl:px-24 rounded-b-2xl">
							Step 02
						</div>
						<div className="w-[80px] h-[80px] relative">
							<Image alt="image" src="/svg/step2.svg" fill />
						</div>
						<div className="text-sm text-center md:text-base">
							Commit SFN tokens on IDO pools you and stake your Starksport NFT
							to boost allocations.
						</div>
					</div>
					<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
						<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 xl:px-24 rounded-b-2xl">
							Step 03
						</div>
						<div className="w-[80px] h-[80px] relative">
							<Image alt="image" src="/svg/step3.svg" fill />
						</div>
						<div className="text-sm text-center md:text-base">
							The system will calculate your allocation, then the corresponding
							SFN amount will be deducted.
						</div>
					</div>
					<div className="rounded-3xl bg-[#1A1C24] px-6 pb-6 flex flex-col gap-6 items-center">
						<div className="bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] font-bold text-[#1A1C24] py-3 px-6 xl:px-24 rounded-b-2xl">
							Step 04
						</div>
						<div className="w-[80px] h-[80px] relative">
							<Image alt="image" src="/svg/step4.svg" fill />
						</div>
						<div className="text-sm text-center md:text-base">
							Access to launchpad platform and claim your IDO tokens also your
							remaining SFN fund.
						</div>
					</div>
				</div>
			</div>

			{/* <div className="flex flex-col rounded-3xl bg-[#1A1C24] px-3 md:px-6 py-6">
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
      </div> */}
		</div>
	);
}
