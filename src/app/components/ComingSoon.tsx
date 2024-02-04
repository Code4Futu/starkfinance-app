import Image from "next/image";

export default function ComingSoonPage() {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<div className="w-full xl:w-[986px] flex">
				<div className="w-full pt-[58%] relative">
					<Image src="/coming-soon.png" alt="coming-soon" fill sizes="any" />
				</div>
			</div>
		</div>
	);
}
