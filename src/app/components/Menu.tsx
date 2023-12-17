"use client";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnectors } from "@starknet-react/core";
import { connectors } from "../conf";

export default function Menu({ children }: { children: React.ReactNode }) {
	const { available, connect, refresh } = useConnectors();
	const { address } = useAccount();

	const handleConnect = async (connector: any) => {
		try {
			connect(connector);
		} catch (error) {
			alert(`Please install ${connector.id()} wallet!`);
		}
		// const isWalletConnected = available.find(
		// 	(availableConnector) => availableConnector.id === connector.id
		// );

		// isWalletConnected
		// 	? connect(connector)
		// 	: alert(`Please install ${connector.id()} wallet!`);
	};

	return (
		<div className="h-full w-full overflow-hidden flex justify-stretch">
			<div className="w-[288px] bg-[#1A1C24]  hidden lg:flex flex-col justify-between border-r border-solid	border-r-[#2D313E] text-[#C6C6C6]">
				<div>
					<Link href="/" rel="noreferrer">
						<div className="w-[212px] h-[48px] relative m-6">
							<Image src="/logo-w-text.png" alt="logo" fill />
						</div>
					</Link>

					<div className="m-4">
						<Link href="/" rel="noreferrer">
							<div className="flex items-center p-4">
								<div className="w-[30px] h-[30px] relative">
									<Image src="/svg/home.svg" alt="home" fill sizes="30px" />
								</div>
								<div className="font-bold ml-1.5">Home</div>
							</div>
						</Link>
						<div className="collapse collapse-arrow">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<div className="w-[30px] h-[30px] relative">
										<Image
											src="/svg/exchange.svg"
											alt="exchange"
											fill
											sizes="30px"
										/>
									</div>
									<div className="font-bold ml-1.5">Exchange</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<a href="https://exchange.starkfinance.co" rel="noreferrer">
											Swap
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://exchange.starkfinance.co/liquidity"
											rel="noreferrer"
										>
											Liquidity
										</a>
									</li>
									<li className="p-3">
										<a href="https://exchange.starkfinance.co" rel="noreferrer">
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
									<div className="w-[30px] h-[30px] relative">
										<Image src="/svg/launchpad.svg" alt="launchpad" fill />
									</div>

									<div className="font-bold ml-1.5">Launchpad</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<Link href="/launchpads" rel="noreferrer">
											Launchpad List
										</Link>
									</li>
									{/* <li className="p-3">
										<Link href="/airdrops" rel="noreferrer">
											Airdrop List
										</Link>
									</li>
									<li className="p-3">
										<Link href="/launchpads/your-pools" rel="noreferrer">
											Your Pools
										</Link>
									</li> */}
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
											href="https://marketplace.starkfinance.co/top_volume"
											rel="noreferrer"
										>
											Collections
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://marketplace.starkfinance.co/activity"
											rel="noreferrer"
										>
											Activity
										</a>
									</li>
									<li className="p-3">
										<a
											href="https://marketplace.starkfinance.co/events"
											rel="noreferrer"
										>
											Events
										</a>
									</li>
									<li className="p-3">
										{/* {address && (
											<a
												href={`https://marketplace.starkfinance.co/account/${address}`}
												rel="noreferrer"
											>
												Profile
											</a>
										)} */}
									</li>
								</ul>
							</div>
						</div>
						<div className="collapse collapse-arrow">
							<input type="radio" name="my-accordion-1" />
							<div className="collapse-title">
								<div className="flex items-center">
									<div className="w-[30px] h-[30px] relative">
										<Image src="/svg/market.svg" alt="market" fill />
									</div>
									<div className="font-bold ml-1.5">Locking</div>
								</div>
							</div>
							<div className="collapse-content">
								<ul className="pl-2 font-bold">
									<li className="p-3">
										<a href="/locks/create" rel="noreferrer">
											Create Lock
										</a>
									</li>
									<li className="p-3">
										<a href="/locks" rel="noreferrer">
											My Lock
										</a>
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
				<div className="flex justify-between lg:justify-end px-6 py-6 bg-[#1A1C24] border-b border-b-[#2D313E]">
					<div className="flex items-center gap-2">
						<Link href={"/"} passHref className="block lg:hidden ">
							<div className="w-[48px] h-[48px] relative">
								{/* <Image
								src="/logo-w-text.png"
								alt="logo"
								fill
								className="hidden md:block"
							/> */}
								<Image
									src="/logo.png"
									alt="logo"
									fill
									// className="sm:block md:hidden"
								/>
							</div>
						</Link>
						{/* <div className="font-bold text-2xl hidden md:block lg:hidden">
							Starkfinance
						</div> */}
					</div>
					<div className="flex gap-3">
						<div className="cursor-pointer p-3 flex items-center bg-[#232631] gap-0 lg:gap-2 rounded-2xl border-0">
							<div className="w-[24px] h-[24px] relative">
								<Image src="/wallets/starknet.png" alt="network" fill />
							</div>

							<div className="text-xl font-bold text-[#F1F1F1] hidden lg:block">
								Starknet
							</div>
						</div>

						<button className="btn flex items-center bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] gap-1 rounded-2xl border-0">
							<div className="w-[24px] h-[24px] relative hidden lg:block ">
								<Image
									src="/svg/connect-wallet.svg"
									fill
									alt="connect-wallet"
								/>
							</div>
							<div
								className="text-md font-bold text-[#1A1C24] cursor-pointer"
								onClick={() => handleConnect(connectors[1])}
							>
								{address
									? `${address.slice(0, 4)}...${address.slice(-3)}`
									: "Connect Wallet"}
							</div>
						</button>
					</div>
				</div>
				<div className="px-6 py-9 h-[calc(100vh-176px)] lg:h-[calc(100vh-100px)] overflow-y-scroll">
					{children}
				</div>
				<div className="fixed bottom-0 left-0 right-0 grid lg:hidden z-[999] grid-cols-6 place-items-center px-3 md:px-12 py-3 bg-[#1A1C24] border-t border-t-[#2D313E]">
					<Link href="/" rel="noreferrer">
						<div className="text-center w-[30px] h-[30px] relative">
							<Image fill src="/svg/home.svg" alt="home" />
						</div>
					</Link>

					<div className="drawer">
						<input
							id="exchange-drawer"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex justify-center">
							<label
								htmlFor="exchange-drawer"
								className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
							>
								<div className="text-center w-[30px] h-[30px] relative">
									<Image fill src="/svg/exchange.svg" alt="exchange" />
								</div>
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="exchange-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu absolute left-0 bottom-[80px] right-0 p-4 min-w-full bg-[#1A1C24] font-bold">
								<li>
									<a
										href="https://exchange.starkfinance.co"
										rel="noreferrer"
										className="p-3"
									>
										Swap
									</a>
								</li>
								<li>
									<a
										href="https://exchange.starkfinance.co/liquidity"
										rel="noreferrer"
										className="p-3"
									>
										Liquidity
									</a>
								</li>
								<li>
									<a
										href="https://exchange.starkfinance.co"
										rel="noreferrer"
										className="p-3"
									>
										Overview
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="drawer">
						<input
							id="launchpad-drawer"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex justify-center">
							<label
								htmlFor="launchpad-drawer"
								className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
							>
								<div className="text-center w-[30px] h-[30px] relative">
									<Image fill src="/svg/launchpad.svg" alt="launchpad" />
								</div>
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="launchpad-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu absolute bottom-[80px] left-0 right-0 p-4 min-w-full bg-[#1A1C24] font-bold">
								<li>
									<Link className="p-3" href="/launchpads" rel="noreferrer">
										Launchpad List
									</Link>
								</li>
								<li>
									<Link className="p-3" href="/airdrops" rel="noreferrer">
										Airdrop List
									</Link>
								</li>
								{/* <li>
									<Link className="p-3" href="/launchpads/your-pools" rel="noreferrer">
										Your Pool
									</Link>
								</li> */}
							</ul>
						</div>
					</div>

					<div className="drawer">
						<input
							id="market-drawer"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex justify-center">
							<label
								htmlFor="market-drawer"
								className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
							>
								<div className="text-center w-[30px] h-[30px] relative">
									<Image fill src="/svg/market.svg" alt="market" />
								</div>
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="market-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu absolute bottom-[80px] left-0 right-0 p-4 min-w-full bg-[#1A1C24] font-bold">
								<li>
									<a
										href="https://marketplace.starkfinance.co/top_volume"
										rel="noreferrer"
										className="p-3"
									>
										Collections
									</a>
								</li>
								<li>
									<a
										href="https://marketplace.starkfinance.co/activity"
										rel="noreferrer"
										className="p-3"
									>
										Activity
									</a>
								</li>
								<li>
									<a
										href="https://marketplace.starkfinance.co/events"
										rel="noreferrer"
										className="p-3"
									>
										Events
									</a>
								</li>
								{/* {address && (
            <a
              href={`https://marketplace.starkfinance.co/account/${address}`}
              rel="noreferrer"
              className="p-3"
            >
              Profile
            </a>
        </li>
          )} */}
							</ul>
						</div>
					</div>

					<Link href="/" rel="noreferrer">
						<div className="text-center w-[30px] h-[30px] relative">
							<Image fill src="/svg/documentation.svg" alt="documentation" />
						</div>
					</Link>

					<div className="drawer">
						<input
							id="socials-drawer"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex justify-center">
							<label
								htmlFor="socials-drawer"
								className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
							>
								<div className="text-center w-[30px] h-[30px] relative">
									<Image fill src="/svg/socials.svg" alt="socials" />
								</div>
							</label>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="socials-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu absolute bottom-[80px] left-0 right-0 p-4 min-w-full bg-[#1A1C24] font-bold">
								<li>
									<a href="#" rel="noreferrer" className="p-3">
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
								<li>
									<a href="#" rel="noreferrer" className="p-3">
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
								<li>
									<a href="#" rel="noreferrer" className="p-3">
										<div className="flex items-center">
											<Image width={30} height={30} src="/svg/x.svg" alt="x" />
											<div className="font-bold ml-1.5">X.com</div>
										</div>
									</a>
								</li>
								<li>
									<a href="#" rel="noreferrer" className="p-3">
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
								<li>
									<a href="#" rel="noreferrer" className="p-3">
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
			</div>
		</div>
	);
}
