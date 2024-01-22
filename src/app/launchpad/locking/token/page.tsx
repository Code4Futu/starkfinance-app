import Breadcrumbs from "@/app/components/Breadcrumbs";
import Image from "next/image";

export default function TokenLocking() {
	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Locking",
						icon: "/svg/locking.svg",
						url: "/launchpad/locking",
					},
					{ text: "Token" },
				]}
			/>

			{/* filters */}
			<div className="flex justify-end items-center mb-6 lg:mb-9">
				<div className="flex gap-3">
					<div className="border rounded-2xl border-[#2D313E] px-[24px] flex items-center font-bold">
						All
					</div>

					<div
						// href="/launchpad/launchpad-list/your-pools"
						className="hidden md:block border rounded-2xl py-3 px-6 bg-[#F1F1F1] text-[#0D0E12] font-bold"
					>
						My Lock
					</div>
				</div>
			</div>

			<div className="rounded-3xl bg-[#1A1C24] p-6 ">
				<div className="grid grid-cols-7 border-b border-b-[#2D313E] pb-[12px]">
					<div className="col-span-3">Name</div>
					<div className="col-span-3">Amount</div>
					<div className="text-end px-[24px]">Details</div>
				</div>

				<div className="grid grid-cols-7 border-b border-b-[#2D313E] py-[12px]">
					<div className="col-span-3 flex items-center">
						<div className="border rounded-3xl border-[#2D313E] px-[16px] py-[8px] flex gap-1 items-center">
							<div className="w-[30px] h-[30px] relative">
								<Image src="/logo.png" alt="token" fill sizes="any" />
							</div>
							<div className="flex flex-col">
								<div className="font-bold translate-y-[2px]">SFN</div>
								<div className="text-[12px] text-[#C6C6C6] translate-y-[-2px]">
									StarkFinance
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-3 flex items-center">100,000 SFN</div>
					<div className="text-end flex justify-stretch">
						<div className="border rounded-2xl border-[#2D313E] px-[24px] py-[8px] flex items-center justify-center font-bold">
							View
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
