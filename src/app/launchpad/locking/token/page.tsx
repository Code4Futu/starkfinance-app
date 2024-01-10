import Image from "next/image";
import Link from "next/link";

export default function TokenLocking() {
	return (
		<div>
			<div className="breadcrumbs z-[999] fixed bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] right-0 lg:right-[360px] px-6 py-3  border-b lg:border-none border-b-[#2D313E]">
				<ul className="text-[14px]">
					<li>
						<div className="flex items-center">
							<div className="w-[30px] h-[30px] relative">
								<Image src="/svg/launchpad/locking.svg" alt="locking" fill />
							</div>
							<div className="ml-1.5">Locking</div>
						</div>
					</li>
					<li>
						<Link
							className="hover:no-underline text-[#F1F1F1]"
							href="/launchpad/locking/token"
							rel="noreferrer"
						>
							Token
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex justify-center">
				<div className="flex-1 max-w-[1080px] text-[#F1F1F1]">
					<div className="mb-6 text-[32px] font-bold">Create Lock</div>
				</div>
			</div>
		</div>
	);
}
