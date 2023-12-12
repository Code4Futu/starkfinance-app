import Link from "next/link";
import Image from "next/image";
import AirdropItem from "./components/AirdropItem";
import LatestAirdrop from "./components/LatestAirdrop";

export default function LaunchpadList() {
	return (
		<div>
			<div className="breadcrumbs fixed bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] right-0 px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul>
					<li>
						<div className="flex items-center">
							<Image
								width={30}
								height={30}
								src="/svg/launchpad.svg"
								alt="launchpad"
							/>
							<div className="font-bold ml-1.5">Launchpad</div>
						</div>
					</li>
					<li>
						<Link
							className="font-bold hover:no-underline"
							href="/airdrop-list"
							rel="noreferrer"
						>
							Airdrop List
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex justify-center">
				<div className="flex-1 max-w-[1080px]">
					{/* title and filters */}
					<div className="flex justify-between items-center mb-6 lg:mb-9">
						<div className="text-[32px] lg:text-[42px] font-bold">
							Airdrop List
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

							{/* <div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="border rounded-2xl border-[#2D313E] py-3 pl-6 pr-2 flex items-center gap-1"
							>
								<div>Chain</div>
								<Image
									src="/svg/drop-down.svg"
									alt="drop-down"
									height={24}
									width={24}
								/>
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
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
						</div> */}

							<label
								htmlFor="filters"
								className="flex lg:hidden btn rounded-2xl border-[#2D313E]"
							>
								<Image
									src="/svg/filter.svg"
									alt="filter"
									width={24}
									height={24}
								/>
							</label>

							{/* Put this part before </body> tag */}
							<input type="checkbox" id="filters" className="modal-toggle" />
							<div className="modal" role="dialog">
								<div className="modal-box">
									<h3 className="text-lg font-bold">Hello!</h3>
									<p className="py-4">
										This modal works with a hidden checkbox!
									</p>
								</div>
								<label className="modal-backdrop" htmlFor="filters">
									Close
								</label>
							</div>

							<Link
								href="/your-pools"
								className="hidden md:block border rounded-2xl border-[#2D313E] py-3 px-6 bg-[#F1F1F1] text-[#0D0E12] font-bold"
							>
								My pools
							</Link>
						</div>
					</div>

					{/* latest launchpad */}
					<LatestAirdrop />

					{/* list launchpad */}
					<div className="grid grid-cols-3 gap-6 mt-6">
						{new Array(0).fill("").map((e, idx) => (
							<AirdropItem key={idx} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
