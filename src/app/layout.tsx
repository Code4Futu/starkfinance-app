import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { StarknetProvider } from "./components/starknet-provider";
import Menu from "./components/menu/Menu";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
	title: "StarkFinance",
	description:
		"StarkFinance is an all-in-one Incubation Hub with a full stack DeFi platform across blockchain networks. We provide exclusive services including IDO Launchpad, NFT Auction, Marketplace, and Exchange.",
	metadataBase: new URL("https://testnet.starkfinance.co"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
		},
	},
	openGraph: {
		title: "StarkFinance",
		description:
			"StarkFinance is an all-in-one Incubation Hub with a full stack DeFi platform across blockchain networks. We provide exclusive services including IDO Launchpad, NFT Auction, Marketplace, and Exchange.",
		url: "https://testnet.starkfinance.co",
		siteName: "StarkFinance",
		images: [{ url: "https://testnet.starkfinance.co/ecosystem.png" }],
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/logo.png",
		apple: "/apple-touch-icon.png",
		other: {
			rel: "apple-touch-icon",
			url: "/apple-touch-icon.png",
		},
	},
	twitter: {
		card: "summary_large_image",
		title: "StarkFinance",
		description:
			"StarkFinance is an all-in-one Incubation Hub with a full stack DeFi platform across blockchain networks. We provide exclusive services including IDO Launchpad, NFT Auction, Marketplace, and Exchange.",
		creator: "@starkfinance",
		images: {
			url: "https://testnet.starkfinance.co/ecosystem.png",
			alt: "ecosystem",
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>StarkFinance</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
				/>
				<meta name="description" content="" />
				<meta name="theme-color" content="#1FC7D4" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body>
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
					theme="light"
				/>
				<StarknetProvider>
					<Menu>{children}</Menu>
				</StarknetProvider>
			</body>
		</html>
	);
}
