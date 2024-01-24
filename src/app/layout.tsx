import type { Metadata } from "next";
import { StarknetProvider } from "./components/starknet-provider";
import Menu from "./components/menu/Menu";

import "./globals.css";

export const metadata: Metadata = {
	title: "StarkFinance App",
	icons: [
		{ rel: "icon", url: "/logo.png" },
		{ rel: "apple-touch-icon", url: "/apple-icon.png" },
	],
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
			<body>
				<StarknetProvider>
					<Menu>{children}</Menu>
				</StarknetProvider>
			</body>
		</html>
	);
}
