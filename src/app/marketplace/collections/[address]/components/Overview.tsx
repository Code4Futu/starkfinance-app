import { Divider } from "@/app/components/Divider";
import {
	CollectionDetailTab,
	ICollectionOwner,
} from "@/app/models/collections";
import { Progress } from "antd";
import clsx from "clsx";
import { round } from "lodash";
import { useState } from "react";
import { About } from "./About";
import { CollectionStatusComponent } from "./CollectionStatus";
import { OwnerSwiper } from "./OwnerSwiper";
import { userProfileMockup } from "@/app/models/user";
import Image from "next/image";

export const Overview = ({
	collection,
	timeStartDiff,
}: {
	collection: ICollectionOwner;
	timeStartDiff: {
		d: number;
		h: number;
		m: number;
		s: number;
	};
}) => {
	const [itemCount, setItemCount] =
		useState<number>(1);
	const handleIncreaseItem = () => {
		if (
			collection.totalItem === "No limit" ||
			itemCount >
				Number(collection.totalItem) -
					collection.minted
		)
			setItemCount(itemCount + 1);
	};

	const handleDecreaseItem = () => {
		if (itemCount === 1) return;
		setItemCount(itemCount - 1);
	};

	return (
		<>
			<div className="w-full flex flex-col gap-3 md:flex-row md:gap-6">
				<div className="flex flex-col gap-3 w-full md:max-w-[348px] lg:max-w-[532px]">
					<div
						style={{
							background: `url(${collection.avatar})`,
						}}
						className="w-full min-[390px]:min-w-[342px] min-h-[342px] !bg-[length:100%_342px] rounded-3xl border-[1px] border-[#2D313E] !bg-no-repeat md:w-[348px] md:h-[348px] md:!bg-[length:348px_348px] lg:min-w-[532px] lg:min-h-[532px] lg:!bg-[length:532px_532px]"
					/>
					<div className="w-full flex justify-between items-start">
						{collection.related.map(
							(item, idx) => (
								<div
									key={idx}
									style={{
										background: `url(${item.avatar})`,
									}}
									className={clsx(
										`w-[76px] h-[76px] !bg-[length:76px_76px] rounded-xl bg-no-repeat lg:w-[115px] lg:h-[115px] lg:!bg-[length:115px_115px]`,
										idx === 0 &&
											"border-2 border-[#F1F1F1]"
									)}
								></div>
							)
						)}
					</div>
				</div>
				<div className="flex flex-col gap-3 md:gap-6 w-full h-full">
					<div className="w-full flex flex-col items-start py-9 px-6 mt-3 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] md:mt-0 md:min-h-[436px] lg:min-h-[384px]">
						<div className="flex flex-col items-start gap-3 self-stretch">
							<span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
								Mint NFT
							</span>
							<div className="flex items-center justify-between md:justify-start gap-1.5 md:gap-6">
								<div>
									<span className="countdown font-bold text-xs md:text-base">
										<span
											style={{
												// @ts-ignore
												"--value":
													timeStartDiff?.d ?? 0,
											}}
										></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										days
									</span>
								</div>
								<span className="text-sm md:text-base font-bold leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-bold text-xs md:text-base">
										<span
											style={{
												// @ts-ignore
												"--value":
													timeStartDiff?.h ?? 0,
											}}
										></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										hrs
									</span>
								</div>
								<span className="text-sm md:text-base font-bold leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-bold text-xs md:text-base">
										<span
											style={{
												// @ts-ignore
												"--value":
													timeStartDiff?.m ?? 0,
											}}
										></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										mins
									</span>
								</div>
								<span className="text-sm md:text-base font-bold leading-[19px]">
									:
								</span>
								<div>
									<span className="countdown font-bold text-xs md:text-base">
										<span
											style={{
												// @ts-ignore
												"--value":
													timeStartDiff?.s ?? 0,
											}}
										></span>
									</span>{" "}
									<span className="text-xs md:text-sm leading-[16px] text-[#c6c6c6]">
										secs
									</span>
								</div>
							</div>
							<Divider />
						</div>
						<div className="flex flex-col items-start gap-3 self-stretch">
							<div className="flex justify-between items-center self-stretch">
								<span className="text-base text-[#c6c6c6] leading-[19px]">
									Mint Price
								</span>
								<span className="text-base text-[#f1f1f1] leading-[19px]">
									{collection.price} ETH
								</span>
							</div>
							<Divider />
							<div className="flex justify-between items-center self-stretch">
								<span className="text-base text-[#c6c6c6] leading-[19px]">
									Minted
								</span>
								<span className="text-base text-[#f1f1f1] leading-[19px]">
									{collection.minted} / 3,000
								</span>
							</div>
							<Progress
								percent={round(
									(collection.minted / 3000) * 100
								)}
								showInfo={false}
							/>
							<div className="flex justify-between items-center self-stretch">
								<span className="text-base text-[#c6c6c6] leading-[19px]">
									Progress
								</span>
								<span className="text-base text-[#f1f1f1] leading-[19px]">
									{round(
										(collection.minted / 3000) *
											100
									)}
									%
								</span>
							</div>
							<Divider />
							<div className="flex items-start gap-6 self-stretch">
								<div className="flex items-center py-[10px] px-3 gap-[6px] rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12]">
									<IconSub
										onClick={handleDecreaseItem}
									/>
									<div className="w-[1px] h-6 bg-[#2D313E]" />
									<span className="text-base font-bold text-[#f1f1f1] text-center leading-[19px] w-[48px]">
										{itemCount}
									</span>
									<div className="w-[1px] h-6 bg-[#2D313E]" />
									<IconPlus
										onClick={handleIncreaseItem}
									/>
								</div>
								<div className="button-linear-1 flex justify-center items-center h-[48px] py-3 px-6 gap-1 flex-1 rounded-2xl cursor-pointer">
									<span className="text-base font-bold text-[#1A1C24] leading-[19px]">
										Mint
									</span>
								</div>
							</div>
							<div className="flex items-start gap-1 self-stretch">
								<span className="text-base text-[#c6c6c6] leading-[19px]">
									Total:
								</span>
								<span className="text-base text-[#f1f1f1] font-bold leading-[19px]">
									{itemCount * collection.price}{" "}
									ETH
								</span>
							</div>
						</div>
					</div>
					<SeedRound
						collection={collection}
						className="hidden lg:flex min-h-[223px]"
					/>
				</div>
			</div>
			<SeedRound
				collection={collection}
				className="lg:hidden"
			/>
			<About />
			<div className="h-[171px] md:h-[360px] lg:h-[544px] w-full rounded-3xl border-[1px] border-[#2D313E] !bg-[length:100%_100%] !bg-no-repeat bg-[url('https://s3-alpha-sig.figma.com/img/b637/e294/8512eefdc9a22e4b950d79fa0f48a918?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m7B2QK8pJByUqDSHYc2spAp3xqBVmX-hGA1yaI~1KRhj~8c2Hls3P57Yk0c8Aoxc7sYKCaatJeQBoctwr1UpGgQvVahlrC02cjgW6tYOX0s6oYZu5~GK6fQCXiDL0O1jR6N2JEYrD5ALz2B8mwHj6KnrCM1vGayYas7rPF55~MptCsHBXn~NBihhQ3bH~YCRtCK0ApKvg7PSwzTwQz5eTHjrQ7FUAbYyaah42AafuSstRH1Hf5WN~X3dC2FiDrlDP-CIA3djKqosiDXGtRdb6ZaCVnmgpvVsj-2JyYVVwmHF42C9IwU0kYgroXVKuA7GAcYHmdkeWIalq03DLUKdMA__')]" />
			<div className="flex flex-col items-end self-stretch px-6 py-9 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24] md:flex-row">
				<div className="h-[294px] md:min-w-[294px] w-full rounded-3xl !bg-[length:100%_100%] !bg-no-repeat bg-[url('https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__')]" />
				<div className="flex flex-col items-end gap-[10px] self-stretch">
					<div className="flex flex-col items-start gap-3 self-stretch">
						<span className="text-2xl font-bold leading-[28px]">
							Title
						</span>
						<Divider />
					</div>
					<span className="text-sm text-[#c6c6c6] self-stretch">
						Contrary to popular belief, Lorem
						Ipsum is not simply random text. It
						has roots in a piece of classical
						Latin literature from 45 BC, making it
						over 2000 years old. Richard
						McClintock, a Latin professor at
						Hampden-Sydney College in Virginia,
						looked up one of the more obscure
						Latin words, consectetur, from a Lorem
						Ipsum passage, and going through the
						cites of the word in classical
						literature, discovered the undoubtable
						source. Lorem Ipsum comes from
						sections 1.10.32 and 1.10.33 of "de
						Finibus Bonorum et Malorum" (The
						Extremes of Good and Evil) by Cicero,
						written in 45 BC. This book is a
						treatise on the theory of ethics, very
						popular during the Renaissance. The
						first line of Lorem Ipsum, "Lorem
						ipsum dolor sit amet..", comes from a
						line in section 1.10.32.
					</span>
				</div>
			</div>
			<div className="h-[171px] md:h-[360px] lg:h-[544px] w-full rounded-3xl border-[1px] border-[#2D313E] !bg-[length:100%_100%] !bg-no-repeat bg-[url('https://s3-alpha-sig.figma.com/img/1488/e357/c36c9c0219f88126055e251cbac1dec1?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MV~fYrtIngeJtLJzLT3WEVhUPiePGJW4uKayQbtoH3M2q41C~VpupAdKffUZwGYGGtcmhycRR-k1x61XHv~F61ythbBurBTXEHzUK~UW6F6UNc3Ug0xgKLgzJ0LWxaGy7OoI60GGbCWET11vMLiWKAT1ySE779i1mh5H~IgauWzmmwubFMkwCweMElJDIFTgaO18gs0m1F2zUxbx2Zs73eTYwS6tVmlRMGLxyQ2iU95lTnpNiRZyLCVvulxnXIEDSfaEjlDZpjTXmyak4Co0CQJZkLmpgJ~MDPfkiFoJpKshJBo9ilQwcrafjstGIeiojcCFARfN7~OxgvoN7Mdykg__')]" />
			<div className="w-full flex flex-col items-end py-9 px-6 gap-6 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
				<div className="flex flex-col items-start gap-3 self-stretch">
					<span className="text-2xl font-bold leading-[28px]">
						Title
					</span>
					<Divider />
				</div>
				<OwnerSwiper />
				<div className="hidden md:flex justify-center items-start gap-12 self-stretch lg:gap-[100px]">
					{userProfileMockup().map(
						(item, idx) => (
							<div
								key={idx}
								className="flex flex-col items-center gap-[10px] flex-1 lg:max-w-[385px]"
							>
								<div className="relative w-[170px] h-[170px] rounded-full overflow-hidden">
									<Image
										src={item.avatar}
										alt=""
										fill
									/>
								</div>
								<span className="text-xl font-bold leading-[23px]">
									{item.name}
								</span>
								<span className="text-sm font-bold leading-[16px]">
									{item.job}
								</span>
								<span className="text-sm text-[#c6c6c6] text-center">
									{item.description}
								</span>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
};

export const IconSub = ({
	onClick,
}: {
	onClick: () => void;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="cursor-pointer"
			onClick={() => onClick()}
		>
			<rect
				x="3"
				y="11"
				width="18"
				height="2"
				rx="1"
				fill="#F1F1F1"
			/>
		</svg>
	);
};

const SeedRound = ({
	collection,
	className,
}: {
	collection: ICollectionOwner;
	className?: string;
}) => {
	return (
		<div
			className={clsx(
				"w-full flex flex-col items-start gap-6 py-[28px] px-6 rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]",
				className
			)}
		>
			<ul className="steps steps-vertical">
				{[collection.start, collection.end].map(
					(time: number, idx: number) => (
						<li
							key={idx}
							data-content="✓"
							className="step step-primary"
						>
							<div className="flex flex-col items-start gap-2 self-stretch">
								<div className="flex items-center gap-3">
									<span className="text-base text-[#24C3BC] leading-[19px]">
										Private Round
									</span>
									<CollectionStatusComponent
										status={
											idx === 0 ? "Ended" : "Live"
										}
									/>
								</div>
								<span className="text-sm text-left">
									03:00 PM 13 Dec 2023 - 03:00 PM
									13 Dec 2023
								</span>
								<div className="flex items-start gap-1">
									<span className="text-sm text-[#c6c6c6] leading-[16px]">
										Price:
									</span>
									<span className="text-sm leading-[16px]">
										0.001 ETH
									</span>
								</div>
							</div>
						</li>
					)
				)}
			</ul>
		</div>
	);
};

export const IconPlus = ({
	onClick,
}: {
	onClick: () => void;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="cursor-pointer"
			onClick={() => onClick()}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H13V4Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};
