import type { Metadata } from "next";

// export const metadata: Metadata = {
// 	title: "StarkSport Launchpad",
// 	icons: [
// 		{ rel: "icon", url: "/logo.png" },
// 		{ rel: "apple-touch-icon", url: "/apple-icon.png" },
// 	],
// 	// description: "StarkSport Launchpad description",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="pt-[68px] lg:pt-6">{children}</div>;
}
