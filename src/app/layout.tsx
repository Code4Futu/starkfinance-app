import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "./components/starknet-provider";
import Link from "next/link";
import Menu from "./components/Menu";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "StarkFinance Launchpad",
	icons: [
		{ rel: "icon", url: "/logo.png" },
		{ rel: "apple-touch-icon", url: "/apple-icon.png" },
	],
	// description: "StarkFinance Launchpad description",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
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
			<body className={inter.className}>
				<StarknetProvider>
					<Menu>{children}</Menu>
				</StarknetProvider>
			</body>
		</html>
	);
}
