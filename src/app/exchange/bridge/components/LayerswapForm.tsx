import { Divider } from "@/app/components/Divider";
import { useLocationPath } from "@/app/exchange/hooks/useLocationPath";
import { twMerge } from "tailwind-merge";
import { SwitchButton } from "./SwitchButton";

export default function LayerswapForm() {
	const currentPath = useLocationPath();

	return (
		<div
			className={twMerge(
				"flex max-w-[342px] min-h-[514px] flex-col items-end rounded-3xl bg-[#1A1C24] py-5 px-[11px]",
				currentPath === "/bridge" && "max-w-[486px]"
			)}
		>
			<SwitchButton />
			<Divider className="h-[1px] w-full bg-[#2D313E] mt-6 mb-3" />
			<iframe
				title="layerswap"
				name="layerswap"
				src={`https://www.layerswap.io/?sourceExchangeName=STARKNET_MAINNET`}
				width="464"
				className="min-h-[658px]"
			/>
		</div>
	);
}
