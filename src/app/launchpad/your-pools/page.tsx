"use client";
import Image from "next/image";
import Link from "next/link";
import Pool from "./components/Pool";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import useSWR from "swr";
import { useWeb3 } from "@/app/hooks";
import axios from "axios";
import { BASE_API } from "@/app/constants";
import { CommittedLaunchpad } from "./types";

export default function YourPoolsPage() {
	const { account } = useWeb3();

	const { data: launchpads } = useSWR<CommittedLaunchpad[]>(
		["YourPoolsPage", account],
		async () => {
			if (!account) return [];
			const { data } = await axios.get<CommittedLaunchpad[]>(
				`${BASE_API}/launchpads/committed/${account}`
			);
			return data;
		}
	);

	return (
		<div>
			<Breadcrumbs
				items={[
					{ text: "Launchpad", icon: "/svg/launchpad.svg" },
					{ text: "Your Pools" },
				]}
			/>

			{/* title and filters */}
			<div className="flex justify-end items-center mb-6 xl:mb-9">
				<div className="flex gap-3">
					<div className="hidden xl:block dropdown dropdown-end">
						<label
							tabIndex={0}
							className="border rounded-2xl border-[#2D313E] py-3 pl-6 pr-2 flex items-center gap-1 font-bold"
						>
							<div>Status</div>
							<Image
								src="/svg/drop-down.svg"
								alt="drop-down"
								height={24}
								width={24}
							/>
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 font-bold"
						>
							<li>
								<a>Inprogress</a>
							</li>
							<li>
								<a>Upcoming</a>
							</li>
							<li>
								<a>Ended</a>
							</li>
						</ul>
					</div>

					<div className="hidden xl:block dropdown dropdown-end">
						<label
							tabIndex={0}
							className="border rounded-2xl border-[#2D313E] py-3 pl-6 pr-2 flex items-center gap-1 font-bold"
						>
							<div>Pool Type</div>
							<Image
								src="/svg/drop-down.svg"
								alt="drop-down"
								height={24}
								width={24}
							/>
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 font-bold"
						>
							<li>
								<a>Public sale</a>
							</li>
							<li>
								<a>Private sale</a>
							</li>
						</ul>
					</div>

					<label
						htmlFor="filters"
						className="p-3 xl:hidden btn rounded-2xl border-[#2D313E] bg-[#0D0E12] hover:bg-[#0D0E12] "
					>
						<div className="w-[24px] h-[24px] relative">
							<Image src="/svg/filter.svg" alt="filter" fill />
						</div>
					</label>

					{/* Put this part before </body> tag */}
					<input type="checkbox" id="filters" className="modal-toggle" />
					<div className="modal z-[9999] " role="dialog">
						<div className="modal-box px-6 py-9 text-[#F1F1F1] font-bold max-h-[90vh] relative">
							<label
								className="absolute top-[12px] right-[12px] cursor-pointer"
								htmlFor="filters"
							>
								<div className="w-[24px] h-[24px] relative">
									<Image src="/svg/close.svg" alt="close" fill sizes="24px" />
								</div>
							</label>

							<div className="border-b border-b-[#2D313E] pb-6 ">
								<div className="pb-6 text-[20px]">Status</div>

								<div className="flex flex-wrap gap-3">
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										All
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Inprogress
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Upcoming
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Ended
									</div>
								</div>
							</div>

							<div>
								<div className="py-6 text-[20px]">Pool type</div>
								<div className="flex flex-wrap gap-3">
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										All
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Committed SFN
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										NFT Stake
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Allocation
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Claimed
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Claimable
									</div>
								</div>
							</div>
						</div>
						<label className="modal-backdrop" htmlFor="filters" />
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-6 md:gap-3 md:bg-[#1A1C24] md:p-6 md:rounded-3xl">
				<div className="hidden md:grid grid-cols-7 bg-[#0D0E12] rounded-2xl p-6">
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2">
						Pool name
					</div>
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2 text-center">
						Status
					</div>
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2 text-center">
						NFT Stake
					</div>
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2 text-center">
						Allocation
					</div>
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2 text-center">
						Total committed
					</div>
					<div className="w-full h-full flex flex-col justify-center md:border-r border-r-[#2D313E] md:px-2 text-center">
						Claimed
					</div>
					<div className="w-full h-full flex flex-col justify-center text-center">
						Claimable
					</div>
				</div>
				{launchpads?.length ? (
					launchpads.map((launchpad, idx) => (
						<Pool key={idx} index={idx} launchpad={launchpad} />
					))
				) : (
					<div className="text-center">Connect wallet</div>
				)}
			</div>
		</div>
	);
}
