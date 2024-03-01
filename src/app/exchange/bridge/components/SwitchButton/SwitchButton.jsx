import { twMerge } from "tailwind-merge";
import { useLocationPath } from "@/app/exchange/hooks/useLocationPath";
import Link from "next/link";

export const SwitchButton = (props) => {
	const currentPath = useLocationPath();

	return (
		<div className="flex w-full items-center justify-center">
			<div className="inline-flex items-start rounded-2xl border-2 border-[#2D313E] bg-[#0D0E12]">
				<Link
					className={twMerge(
						"flex w-[120px] items-center justify-center rounded-2xl px-4 py-2 transition-all cursor-pointer max-[480px]:w-full max-[300px]:px-1",
						currentPath === "/exchange/swap" && "switch-linear"
					)}
					href={"/exchange/swap"}
				>
					<span
						className={twMerge(
							"text-base font-bold leading-[19px] text-[#C6C6C6]",
							currentPath === "/exchange/swap" && "text-[#1A1C24]"
						)}
					>
						Swap
					</span>
				</Link>
				<Link
					className={twMerge(
						"flex w-[120px] items-center justify-center rounded-2xl px-4 py-2 transition-all cursor-pointer max-[480px]:w-full max-[300px]:px-1",
						currentPath === "/exchange/add" && "switch-linear"
					)}
					href={"/exchange/add-liquidity"}
					// onClick={() => router.push(route.swapLiquidity)}
				>
					<span
						className={twMerge(
							"text-base font-bold leading-[19px] text-[#C6C6C6]",
							currentPath === "/exchange/add" && "text-[#1A1C24]"
						)}
					>
						Liquidity
					</span>
				</Link>
				<Link
					className={twMerge(
						"flex w-[120px] items-center justify-center rounded-2xl px-4 py-2 transition-all cursor-pointer max-[480px]:w-full max-[300px]:px-1",
						currentPath === "/exchange/bridge" && "switch-linear"
					)}
					href={"/exchange/bridge"}
					// onClick={() => router.push(route.swapBridge)}
				>
					<span
						className={twMerge(
							"text-base font-bold leading-[19px] text-[#C6C6C6]",
							currentPath === "/exchange/bridge" && "text-[#1A1C24]"
						)}
					>
						Bridge
					</span>
				</Link>
			</div>
		</div>
	);
};
