import { Divider } from "@/app/components/Divider";
import { ICollectionOwner } from "@/app/models/collections";
import Image from "next/image";

export const ProfileDetailHeader = ({
	collection,
}: {
	collection: ICollectionOwner;
}) => {
	return (
		<div className="w-full flex flex-col gap-6 md:flex-row">
			<div
				style={{
					background: `url(${collection.avatar})`,
				}}
				className={`w-full h-[342px] rounded-3xl border-[1px] border-[#2D313E] bg-no-repeat bg-[length:100%_342px] md:bg-[length:354px_354px] md:w-[354px] md:h-[354px] xl:bg-[length:532px_532px] xl:min-w-[532px] xl:min-h-[532px]`}
			/>
			<div className="flex flex-col gap-6 xl:w-full">
				<div className="w-full flex flex-col items-start gap-3 md:gap-6">
					<div className="flex flex-col justify-center items-start">
						<span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
							{collection.name}
						</span>
					</div>
					<div className="flex items-start p-3 gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] bg-[#1A1C24] xl:gap-6 xl:p-6">
						<div className="flex flex-col items-start gap-[6px]">
							<span className="text-base text-[#c6c6c6] leading-[19px]">
								Owner
							</span>
							<div className="flex items-center gap-[6px]">
								<div className="relative w-8 h-8 rounded border-[1px] border-[#F1F1F1] overflow-hidden">
									<Image
										src="https://s3-alpha-sig.figma.com/img/2409/f873/3a5f9dcca71f6e2857aa568256b2a4ef?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TR-NpBtzq~ftzbg3yZHmOt2QNjva~Uj-1sKxznMpmQupD~vFZCdFLLyWnBJonkypgIXm8jl2KxW4azIBoQLIeOsQjwgeTmfOGk9vyr~vEKKuAxvV7QH1tXqFfQp~na~2U0GR~MkQ0L2OybY3A~kVV1l5q~xQHFdXshaWselvOx9iKMJXw-Wjsh2siL6m~7e5MZ4fca2HxZU1Yb7ohRNX7j2Nhb0Z4FM235IXNu2Qch3gB5zuIhoP7iT486B5RZKzLmI0nEjNmzLqGdEy1J7aDX3ypTtmEHeT8waQj37S1llhU0yrb0GAvJQZNh~aFDNDYHCiybZuS3ZSBtRiiTBG7g__"
										alt=""
										fill
									/>
								</div>
								<span className="text-sm font-bold leading-[16px]">
									x086...16868
								</span>
							</div>
						</div>
						<div className="w-[1px] h-[59px] bg-[#2D313E]" />
						<div className="flex flex-col items-start gap-[6px]">
							<span className="text-base text-[#c6c6c6] leading-[19px]">
								Collection
							</span>
							<div className="flex items-center gap-[6px]">
								<div className="relative w-8 h-8 rounded border-[1px] border-[#F1F1F1] overflow-hidden">
									<Image
										src={collection.logo}
										alt=""
										fill
									/>
								</div>
								<div className="flex flex-col justify-center items-start gap-1">
									<span className="text-sm font-bold leading-[16px]">
										{collection.name}
									</span>
									<span className="text-xs text-[#c6c6c6] leading-[14px]">
										Floor: {collection.floorPrice}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Mint */}
				<div className="w-full flex flex-col items-start p-3 gap-3 rounded-2xl border-[1px] border-[#2D313E] bg-[#1A1C24] xl:gap-6 xl:p-6">
					<span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
						Not yet listed
					</span>
					<Divider />
					<div className="flex items-start gap-3 self-stretch">
						<div className="flex justify-center items-center h-12 py-3 px-6 gap-1 flex-1 rounded-2xl button-linear-1">
							<span className="text-base font-bold text-[#1A1C24] leading-[19px]">
								List for sale
							</span>
						</div>
						<div className="flex justify-center items-center h-12 py-3 px-6 gap-1 flex-1 rounded-2xl button-linear-2">
							<span className="text-base font-bold text-[#0D0E12] leading-[19px]">
								Transfer
							</span>
						</div>
					</div>
					<Divider />
					<div className="flex flex-col items-start gap-[10px] self-stretch">
						<div className="flex items-end gap-1">
							<span className="text-xs text-[#c6c6c6] leading-[14px]">
								Best Offer
							</span>
							<span className="text-sm font-bold leading-[16px]">
								{collection.bestOffer}
							</span>
						</div>
						<span className="text-xs text-[#c6c6c6] leading-[14px]">
							Offer expires in 21h 12m 30s
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
