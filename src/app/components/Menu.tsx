import Link from "next/link";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";

export default function Menu({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full w-full overflow-hidden flex justify-stretch">
			<div className="w-[240px] bg-[#1A1C24] flex flex-col justify-between border-r border-solid	border-r-[#2D313E] text-[#C6C6C6]">
				<div>
					<Image
						className="p-6"
						src="/logo-w-text.png"
						alt="logo"
						width={213}
						height={48}
					/>

					<div className="m-4">
						<Link href="/" rel="noreferrer">
							<div className="flex items-center p-4">
								<Image width={30} height={30} src="/svg/home.svg" alt="home" />
								<div className="font-bold ml-1.5">Home</div>
							</div>
						</Link>
						<div className="collapse collapse-arrow">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<Image
										width={30}
										height={30}
										src="/svg/exchange.svg"
										alt="exchange"
									/>
									<div className="font-bold ml-1.5">Exchange</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<a
											href="https://exchange.starksport.finance/swap"
											rel="noreferrer"
										>
											Swap
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://exchange.starksport.finance/liquidity"
											rel="noreferrer"
										>
											Liquidity
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://exchange.starksport.finance"
											rel="noreferrer"
										>
											Overview
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="collapse collapse-arrow">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<Image
										width={30}
										height={30}
										src="/svg/launchpad.svg"
										alt="launchpad"
									/>
									<div className="font-bold ml-1.5">Launchpad</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<Link href="/launchpad-list" rel="noreferrer">
											Launchpad List
										</Link>
									</li>
									<li className="p-3">
										<Link href="/airdrop-list" rel="noreferrer">
											Airdrop List
										</Link>
									</li>
									<li className="p-3">
										<Link href="/your-pool" rel="noreferrer">
											Your Pool
										</Link>
									</li>
								</ul>
								{/* <ul>
												<li>
													<a>Launchpad List</a>
												</li>
												<li>
													<a>Airdrop List</a>
												</li>
												<li>
													<a>Your Pool</a>
												</li>
											</ul> */}
							</div>
						</div>
						<div className="collapse collapse-arrow">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<Image
										width={30}
										height={30}
										src="/svg/market.svg"
										alt="market"
									/>
									<div className="font-bold ml-1.5">Market</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<a
											href="https://marketplace.starksport.finance/top_volume"
											rel="noreferrer"
										>
											Collections
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://marketplace.starksport.finance/activity"
											rel="noreferrer"
										>
											Activity
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://marketplace.starksport.finance/events"
											rel="noreferrer"
										>
											Events
										</a>
									</li>
									<li className="p-3">
										{/* {address && (
											<a
												href={`https://marketplace.starksport.finance/account/${address}`}
												rel="noreferrer"
											>
												Profile
											</a>
										)} */}
									</li>
								</ul>
							</div>
						</div>
						<div className="collapse">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<Image
										width={30}
										height={30}
										src="/svg/documentation.svg"
										alt="documentation"
									/>
									<div className="font-bold ml-1.5">Documentation</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="collapse collapse-arrow">
					<input type="radio" name="my-accordion-1" />
					<div className="collapse-title">
						<div className="flex items-center">
							<Image
								width={30}
								height={30}
								src="/svg/socials.svg"
								alt="socials"
							/>
							<div className="font-bold ml-1.5">Socials</div>
						</div>
					</div>
					<div className="collapse-content">
						<ul className="pl-2 font-bold">
							<li className="p-3">
								<a href="#" rel="noreferrer">
									<div className="flex items-center">
										<Image
											width={30}
											height={30}
											src="/svg/telegram.svg"
											alt="telegram"
										/>
										<div className="font-bold ml-1.5">Telegram</div>
									</div>
								</a>
							</li>
							<li className="p-3">
								<a href="#" rel="noreferrer">
									<div className="flex items-center">
										<Image
											width={30}
											height={30}
											src="/svg/discord.svg"
											alt="discord"
										/>
										<div className="font-bold ml-1.5">Discord</div>
									</div>
								</a>
							</li>
							<li className="p-3">
								<a href="#" rel="noreferrer">
									<div className="flex items-center">
										<Image width={30} height={30} src="/svg/x.svg" alt="x" />
										<div className="font-bold ml-1.5">X.com</div>
									</div>
								</a>
							</li>
							<li className="p-3">
								<a href="#" rel="noreferrer">
									<div className="flex items-center">
										<Image
											width={30}
											height={30}
											src="/svg/medium.svg"
											alt="medium"
										/>
										<div className="font-bold ml-1.5">Medium</div>
									</div>
								</a>
							</li>
							<li className="p-3">
								<a href="#" rel="noreferrer">
									<div className="flex items-center">
										<Image
											width={30}
											height={30}
											src="/svg/github.svg"
											alt="github"
										/>
										<div className="font-bold ml-1.5">Github</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="flex-1 text-[#C6C6C6]">
				<div className="flex justify-end ">
					<button className="btn flex items-center bg-[#232631] gap-2 rounded-2xl border-0	">
						<Image
							width={30}
							height={30}
							src="/wallets/starknet.png"
							alt="github"
						/>
						<div className="text-xl font-bold text-[#F1F1F1]">Starknet</div>
					</button>

					<button className="btn flex items-center bg-[linear-gradient(135deg, #24C3BC 0%, #ADFFFB 100%)] gap-2 rounded-2xl border-0	">
						<Image
							width={30}
							height={30}
							src="/wallets/starknet.png"
							alt="github"
						/>
						<div className="text-xl font-bold text-[#F1F1F1]">Starknet</div>
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
