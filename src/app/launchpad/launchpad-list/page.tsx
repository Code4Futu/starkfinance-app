import Link from "next/link";
import Image from "next/image";
import LaunchpadItem from "./components/LaunchpadItem";
import LatestLaunchpad from "./components/LatestLaunchpad";
import { ILaunchpad } from "@/app/types";
import { BASE_API } from "@/app/constants";
import Breadcrumbs from "@/app/components/Breadcrumbs";

async function getLaunchpads(): Promise<ILaunchpad[]> {
	const res = await fetch(`${BASE_API}/launchpads`, {
		next: { revalidate: 60 },
	});
	return res.json();
}

export default async function LaunchpadList() {
	const launchpads = await getLaunchpads();

	return (
		<div>
			<Breadcrumbs
				items={[
					{ text: "Launchpad", icon: "/svg/launchpad.svg", url: "/" },
					{ text: "Launchpad List" },
				]}
			/>

			{/* title and filters */}
			<div className="flex justify-between items-center mb-6 lg:mb-9">
				<div className="text-[28px] lg:text-[42px] font-bold">
					Launchpad List
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
						className="p-3 lg:hidden btn rounded-2xl border-[#2D313E] bg-[#0D0E12] hover:bg-[#0D0E12] "
					>
						<div className="w-[24px] h-[24px] relative">
							<Image src="/svg/filter.svg" alt="filter" fill />
						</div>
					</label>

					<input type="checkbox" id="filters" className="modal-toggle" />
					<div className="modal z-[9999] " role="dialog">
						<div className="modal-box px-6 py-9 text-[#F1F1F1] font-bold max-h-[90vh] relative bg-[#0D0E12]">
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
										Public
									</div>
									<div className="border border-[#2D313E] py-3 px-6 rounded-2xl">
										Private
									</div>
								</div>
							</div>
						</div>
						<label className="modal-backdrop" htmlFor="filters" />
					</div>

					<Link
						href="/launchpad/launchpad-list/your-pools"
						className="hidden md:block border rounded-2xl border-[#2D313E] py-3 px-6 bg-[#F1F1F1] text-[#0D0E12] font-bold"
					>
						Your Pools
					</Link>
				</div>
			</div>

			{/* latest launchpad */}
			<LatestLaunchpad launchpad={launchpads[0]} />

			{/* list launchpad */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
				{launchpads.slice(1).map((launchpad: any, idx: number) => (
					<LaunchpadItem launchpad={launchpad} key={idx} />
				))}
			</div>
		</div>
	);
}
