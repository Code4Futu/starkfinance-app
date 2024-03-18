"use client";

// @ts-nocheck
import { useState } from "react";
// import { SwapPageEVM } from "../evm/pages/swap/SwapPageEVM.jsx";
// import { BigNumber as BigNumberEthers } from "ethers";
// import { useActiveWeb3React } from "../evm/hooks/useActiveWeb3React.js";
import { twMerge } from "tailwind-merge";
import DetailBridgeModal from "../components/modals/detail-bridge/DetailBridgeModal.jsx";
import { useLocationPath } from "../hooks/useLocationPath.js";
import LayerswapForm from "./components/LayerswapForm";

export default function BridgePage() {
	// Token Picker
	const [isShowBridgeModal, setIsShowBridgeModal] = useState(false);

	const currentPath = useLocationPath();

	return (
		<div
			className={twMerge(
				"flex w-full flex-col gap-6 text-white mb-[80px] max-[480px]:items-center md:items-center"
				// currentPath === "/exchange/bridge" && "lg:pt-[120px]"
			)}
		>
			<div
				className={twMerge(
					"flex flex-row justify-center items-center gap-6 lg:max-h-[514px] lg:flex-col lg:hidden",
					currentPath === "/exchange/bridge" && "flex-col"
				)}
			>
				<LayerswapForm />
			</div>
			<div
				className={twMerge(
					"hidden w-full flex-row justify-center items-center gap-6 lg:flex-row lg:flex lg:max-h-[514px]",
					currentPath !== "/exchange/bridge" && "lg:max-h-[514px]"
				)}
			>
				<LayerswapForm />
			</div>

			{isShowBridgeModal && (
				<DetailBridgeModal
					isShowing={isShowBridgeModal}
					hide={setIsShowBridgeModal}
				/>
			)}
		</div>
	);
}
