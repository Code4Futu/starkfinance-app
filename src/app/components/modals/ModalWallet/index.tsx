"use client";

import { useConnectors } from "@starknet-react/core";
import React, { MouseEventHandler, useRef, useState, useEffect } from "react";
import "./style.scss";
import { Divider } from "../../Divider";
import Image from "next/image";

// import { useWallet } from "../../evm/hooks/useWallet";
import { injected } from "@/app/exchange/evm/utils/web3React";
// import { useDispatch } from "react-redux";
// import { useGlobalContext } from "@/app/context/GlobalContext";
import { useWallet } from "@/app/exchange/evm/hooks/useWallet";
// import actions from "../../redux/action";
import { CHAIN_ID } from "@/app/exchange/evm/configs/networks";
import { WALLETS, WALLET_TYPES } from "@/app/context/types";
// import actions from "@/app/redux/action";
// import { WALLET_TYPES, WALLETS } from "../../context/types";
// import { useGlobalContext } from "../../context/GlobalContext";
// import { Divider } from "../Divider";

const CloseIcon = ({ onClick }: { onClick: MouseEventHandler }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="cursor-pointer"
			onClick={onClick}
		>
			<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#2D313E" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.0068 13.6232L16.048 17.6651C16.2624 17.8795 16.5533 18 16.8566 18C17.1598 18 17.4507 17.8795 17.6651 17.6651C17.8795 17.4507 18 17.1598 18 16.8566C18 16.5533 17.8795 16.2625 17.6651 16.048L13.6224 12.0068L17.6643 7.96567C17.7705 7.85949 17.8546 7.73345 17.9121 7.59474C17.9695 7.45603 17.999 7.30736 17.999 7.15724C17.9989 7.00712 17.9693 6.85847 17.9118 6.71979C17.8544 6.5811 17.7701 6.4551 17.6639 6.34897C17.5578 6.24284 17.4317 6.15867 17.293 6.10125C17.1543 6.04383 17.0056 6.0143 16.8555 6.01433C16.7054 6.01437 16.5567 6.04397 16.4181 6.10145C16.2794 6.15894 16.1534 6.24317 16.0472 6.34935L12.0068 10.3905L7.96566 6.34935C7.86026 6.24013 7.73417 6.15299 7.59474 6.09301C7.45531 6.03304 7.30533 6.00144 7.15355 6.00005C7.00177 5.99866 6.85124 6.02751 6.71073 6.08492C6.57023 6.14233 6.44256 6.22714 6.33518 6.33442C6.2278 6.4417 6.14287 6.56928 6.08533 6.70974C6.02778 6.85019 5.99879 7.00069 6.00004 7.15247C6.00129 7.30425 6.03275 7.45426 6.09259 7.59375C6.15243 7.73323 6.23945 7.85941 6.34858 7.96491L10.3913 12.0068L6.34934 16.048C6.1349 16.2625 6.01443 16.5533 6.01443 16.8566C6.01443 17.1598 6.1349 17.4507 6.34934 17.6651C6.56378 17.8795 6.85462 18 7.15788 18C7.46114 18 7.75198 17.8795 7.96642 17.6651L12.0068 13.6224V13.6232Z"
				fill="#2D313E"
			/>
		</svg>
	);
};

const IconBack = ({ onClick }: { onClick: MouseEventHandler }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="cursor-pointer"
			onClick={onClick}
		>
			<path
				d="M11.4009 6.27303C11.4904 6.35927 11.5614 6.46175 11.6098 6.57459C11.6583 6.68742 11.6832 6.8084 11.6832 6.93057C11.6832 7.05275 11.6583 7.17372 11.6098 7.28656C11.5614 7.3994 11.4904 7.50187 11.4009 7.58812L7.28251 11.5713L19.0402 11.5713C19.2947 11.5713 19.5389 11.6691 19.7189 11.8432C19.8989 12.0172 20 12.2534 20 12.4996C20 12.7458 19.8989 12.9819 19.7189 13.156C19.5389 13.3301 19.2947 13.4279 19.0402 13.4279L7.28251 13.4279L11.4009 17.4126C11.5812 17.5869 11.6825 17.8235 11.6825 18.0701C11.6825 18.3167 11.5812 18.5532 11.4009 18.7276C11.2206 18.902 10.976 19 10.721 19C10.466 19 10.2215 18.902 10.0412 18.7276L4.2823 13.1579C4.19282 13.0716 4.12182 12.9692 4.07338 12.8563C4.02494 12.7435 4 12.6225 4 12.5003C4 12.3782 4.02494 12.2572 4.07338 12.1443C4.12182 12.0315 4.19282 11.929 4.2823 11.8428L10.0412 6.27303C10.1303 6.18649 10.2363 6.11783 10.353 6.07097C10.4696 6.02412 10.5947 6 10.721 6C10.8474 6 10.9724 6.02412 11.0891 6.07097C11.2058 6.11783 11.3117 6.18649 11.4009 6.27303Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};

const ModalWallet = ({
	isShowing,
	hide,
}: {
	isShowing: boolean;
	hide: any;
}) => {
	// const dispatch = useDispatch();

	// const { setWalletConnected } = useGlobalContext();

	const { connect: connectEvm } = useWallet();

	//   const handleArgent = () => {};

	//   const handleBraavos = () => {};

	const handleClose = () => {
		hide();
		setShowWallet(false);
	};

	const { available, connectors, connect, refresh } = useConnectors();

	const [showWallet, setShowWallet] = useState(false);

	// Refresh to check for available connectors every 5 seconds.
	useEffect(() => {
		const interval = setInterval(refresh, 5000);
		return () => clearInterval(interval);
	}, [refresh]);

	//Handle connect wallet, alert if user haven't installed that wallet
	const handleConnect = async ({
		connector,
		okx = false,
		isEvm = false,
		_chainId = CHAIN_ID.ZETA_TESTNET,
	}: {
		connector: any;
		okx?: boolean;
		isEvm?: boolean;
		_chainId?: number;
	}) => {
		if (okx) {
			if (typeof window === "undefined") {
				return;
			}
			// @ts-ignore
			if (window?.okxwallet.starknet.isConnected) {
				// setWalletConnected(
				// 	WALLETS.OKX,
				// 	// @ts-ignore
				// 	window?.okxwallet.starknet.selectedAddress,
				// 	WALLET_TYPES.STARKNET
				// );
			}
			// @ts-ignore
			const [address] = await window?.okxwallet.starknet.enable();
			// setWalletConnected(WALLETS.OKX, address, WALLET_TYPES.STARKNET);
		} else if (isEvm) {
			connectEvm(connector, _chainId);
			// setWalletConnected(WALLETS.METAMASK, "", WALLET_TYPES.EVM);
		} else {
			const isWalletConnected = available.find(
				// @ts-ignore
				(availableConnector) => availableConnector.id === connector.id
			);
			if (isWalletConnected) {
				await connect(connector);
				// setWalletConnected(WALLETS.ARGENT_X, "", WALLET_TYPES.STARKNET);
			} else alert(`Please install ${connector.id()} wallet!`);
		}
		// @ts-ignore
		localStorage.setItem("isEvm", isEvm);
		// @ts-ignore
		localStorage.setItem("isOkx", okx);
		// dispatch(actions.setIsEvm(isEvm));

		handleClose();
	};

	const useOutsideAlerter = (ref: any) => {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					hide(false);
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, []);
	};

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	return (
		<>
			<div className="modal-overlay-v1"></div>
			<div
				className="modal-wrapper-wallet"
				aria-modal
				aria-hidden
				tabIndex={-1}
				role="dialog"
			>
				<div
					ref={wrapperRef}
					className="relative z-[100] m-auto rounded-3xl max-w-[480px] border-[1px] border-[#2d313e] bg-[#1A1C24] pt-9"
				>
					<div className="flex px-6 flex-col items-start gap-3 self-stretch">
						<div className="flex justify-between items-start self-stretch">
							{showWallet ? (
								<div className="flex items-center gap-[6px]">
									<IconBack onClick={() => setShowWallet(false)} />
									<span className="text-[#F1F1F1] text-2xl font-bold ">
										Connect Wallet
									</span>
								</div>
							) : (
								<span className="text-[#F1F1F1] text-2xl font-bold ">
									Connect Wallet
								</span>
							)}
							<CloseIcon onClick={handleClose} />
						</div>
						<Divider />
					</div>
					{!showWallet ? (
						<div className="flex px-6 pt-6 pb-9 flex-col items-start gap-[10px]">
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() => setShowWallet(true)}
							>
								<Image
									src="/svg/switch_network.svg"
									alt=""
									width={24}
									height={24}
								/>
								<span className="text-base font-bold  text-[#F1F1F1]">
									Starknet
								</span>
							</div>
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() =>
									handleConnect({
										connector: injected,
										okx: false,
										isEvm: true,
										_chainId: CHAIN_ID.ZETA_TESTNET,
									})
								}
							>
								<Image src="/zeta.png" alt="" width={24} height={24} />
								<span className="text-base font-bold  text-[#F1F1F1]">
									Zetachain
								</span>
							</div>
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() =>
									handleConnect({
										connector: injected,
										okx: false,
										isEvm: true,
										_chainId: CHAIN_ID.STARKSPRT_OPSIDE_ROLLUP,
									})
								}
							>
								<Image src="/opside.png" alt="" width={24} height={24} />
								<span className="text-base font-bold  text-[#F1F1F1]">
									Opside
								</span>
							</div>
						</div>
					) : (
						<div className="flex px-6 pt-6 pb-9 flex-col items-start gap-[10px]">
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() => handleConnect({ connector: connectors[1] })}
							>
								<Image src="/argent.png" alt="" width={24} height={24} />
								<span className="text-base font-bold  text-[#F1F1F1]">
									ArgentX
								</span>
							</div>
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() => handleConnect({ connector: connectors[0] })}
							>
								<Image src="/braavos.jpg" alt="" width={24} height={24} />
								<span className="text-base font-bold  text-[#F1F1F1]">
									Braavos
								</span>
							</div>
							<div
								className="flex h-12 py-3 pl-3 pr-6 items-center gap-3 self-stretch rounded-2xl border-[1px] border-[#2D313E] hover:bg-[#2D313E] cursor-pointer"
								onClick={() =>
									handleConnect({
										connector: undefined,
										okx: true,
										isEvm: false,
									})
								}
							>
								<Image src="/okx.png" alt="" width={24} height={24} />
								<span className="text-base font-bold  text-[#F1F1F1]">OKX</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ModalWallet;
