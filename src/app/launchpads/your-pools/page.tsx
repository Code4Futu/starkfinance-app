import Image from "next/image";
import Link from "next/link";
import Pool from "./components/Pool";

export default function LaunchpadList() {
	return (
		<div>
			<div className="breadcrumbs z-[999] fixed bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] right-0 lg:right-[360px] px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul className="text-[14px]">
					<li>
						<div className="flex items-center">
							<div className="w-[30px] h-[30px] relative">
								<Image src="/svg/launchpad.svg" alt="launchpad" fill />
							</div>
							<div className="hidden ml-1.5">Launchpad</div>
						</div>
					</li>
					<li>
						<Link
							className="hover:no-underline"
							href="/launchpads"
							rel="noreferrer"
						>
							Launchpad
						</Link>
					</li>
					<li className="font-bold">Your Pools</li>
				</ul>
			</div>
			<div className="flex justify-center">
				<div className="flex-1 max-w-[1080px]">
					{/* title and filters */}
					<div className="flex justify-between items-center mb-6 lg:mb-9">
						<div className="text-[28px] lg:text-[42px] font-bold">
							You Pools
						</div>

						<div className="flex gap-3">
							<div className="hidden lg:block dropdown dropdown-end">
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

							<div className="hidden lg:block dropdown dropdown-end">
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
								className="p-3 lg:hidden btn rounded-2xl border-[#2D313E] bg-[#0D0E12] hover:bg-[#0D0E12] "
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
											<Image
												src="/svg/close.svg"
												alt="close"
												fill
												sizes="24px"
											/>
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

					<div className="hidden md:block flex-col gap-3 justify-stretch"></div>

					<div className="flex flex-col gap-6 md:hidden">
						{new Array(3).fill("").map((_, idx) => (
							<Pool />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
