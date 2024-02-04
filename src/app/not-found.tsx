import Image from "next/image";

export default function NotFoundPage() {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<div className="w-full xl:w-[788px] flex">
				<div className="w-full pt-[59%] relative">
					<Image src="/not-found.png" alt="not-found" fill sizes="any" />
				</div>
			</div>
		</div>
	);
}
