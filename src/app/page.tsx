import Link from "next/link";

export default function Home() {
	return (
		<div className="text-center">
			<Link
				href={process.env.NEXT_PUBLIC_DISCORD_BOT_URL ?? ""}
				className="cursor-pointer mb-3 text-xl font-semibold rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
				passHref
				legacyBehavior
			>
				<a
					target="_blank"
					rel="noopener noreferrer"
					style={{
						background: "linear-gradient(93deg, #24C3BC 0%, #ADFFFB 100%)",
						borderRadius: "16px",
					}}
					className="px-6 py-2 text-[#1C1A2D] font-bold"
				>
					Add Bot
				</a>
			</Link>
		</div>
	);
}
