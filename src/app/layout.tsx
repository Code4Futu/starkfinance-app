import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "./components/starknet-provider";
import NFT from "./components/nft";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Starksport Verify NFT Holder",
	description: "Verify Your Starksport NFTs / Get Holder Role on Discord",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<StarknetProvider>
					<div className="h-full w-full overflow-hidden flex justify-stretch">
						<div className="w-[240px] flex flex-col justify-between border-r border-solid	border-r-{#2D313E}">
							<div>
								<Image
									src="/logo-w-text.png"
									alt="logo"
									width={213}
									height={48}
								/>

								<div className="m-4">
									<div className="collapse">
										<input type="radio" name="my-accordion-1" />
										<div className="collapse-title">
											<div className="flex items-center">
												<Image
													width={30}
													height={30}
													src="/logo/home.svg"
													alt="home"
												/>
												<div className="font-bold ml-1.5">Home</div>
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
													src="/logo/exchange.svg"
													alt="exchange"
												/>
												<div className="font-bold ml-1.5">Exchange</div>
											</div>
										</div>
										<div className="collapse-content">
											<ul>
												<li>
													<a>Swap</a>
												</li>
												<li>
													<a>Liquidity</a>
												</li>
												<li>
													<a>Overview</a>
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
													src="/logo/launchpad.svg"
													alt="launchpad"
												/>
												<div className="font-bold ml-1.5">Launchpad</div>
											</div>
										</div>
										<div className="collapse-content">
											<ul>
												<li>
													<a>Launchpad List</a>
												</li>
												<li>
													<a>Airdrop List</a>
												</li>
												<li>
													<a>Your Pool</a>
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
													src="/logo/market.svg"
													alt="market"
												/>
												<div className="font-bold ml-1.5">Market</div>
											</div>
										</div>
									</div>
									<div className="collapse">
										<input type="radio" name="my-accordion-1" />
										<div className="collapse-title">
											<div className="flex items-center">
												<Image
													width={30}
													height={30}
													src="/logo/documentation.svg"
													alt="documentation"
												/>
												<div className="font-bold ml-1.5">Documentation</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>socials</div>
						</div>
						<div className="flex-1">
							<div className="collapse collapse-arrow bg-base-200">
								<input type="radio" name="my-accordion-2" />
								<div className="collapse-title text-xl font-medium">
									Click to open this one and close others
								</div>
								<div className="collapse-content">
									<p>hello</p>
								</div>
							</div>
							<div className="collapse collapse-arrow bg-base-200">
								<input type="radio" name="my-accordion-2" />
								<div className="collapse-title text-xl font-medium">
									Click to open this one and close others
								</div>
								<div className="collapse-content">
									<p>hello</p>
								</div>
							</div>
							<div className="collapse collapse-arrow bg-base-200">
								<input type="radio" name="my-accordion-2" />
								<div className="collapse-title text-xl font-medium">
									Click to open this one and close others
								</div>
								<div className="collapse-content">
									<p>hello</p>
								</div>
							</div>
						</div>
					</div>
					{/* <header className="pt-[20px] md:pt-[50px] pl-0 md:pl-[120px] flex md:block justify-center">
						<Link href={"/"}>
							<Image
								src="/logo-w-text.png"
								alt="logo"
								width={213}
								height={48}
							/>
						</Link>
					</header>
					<div className="grid grid-cols-1 h-[calc(100vh-70px)] md:h-[calc(100vh-120px)] items-center">
						<div className="text-white text-xl md:text-4xl font-bold tracking-wide text-center px-2 md:px-12">
							Verify Your Starksport NFTs / Get Holder Role on Discord
						</div>
						<NFT />
						<div>{children}</div>
					</div> */}
				</StarknetProvider>
			</body>
		</html>
	);
}
