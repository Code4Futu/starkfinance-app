import "./style.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SelectTokenModalHeader } from "./components/SelectTokenModalHeader";
import { Divider } from "../../Divider";
import { Input } from "antd";
import icons from "../../../assets/icons";
import { ActiveStar, Star } from "./icons";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
// import {
//   useContract,
//   useStarknetCall,
//   useStarknetExecute,
// } from "@starknet-react/core";
import {
	RpcProvider,
	Provider,
	Contract,
	// Account,
	// ec,
	// json,
	// uint256,
	number,
} from "starknet";
import { erc20abi } from "./erc20abi";
import { Field } from "@/app/exchange/configs/networks";
import { APP_CHAIN_ID, TOKEN_LIST } from "@/app/configs/networks";
import TokenIcon from "@/app/components/TokenIcon";
// import { routerabi } from "./routerAbi";
// import { factoryabi } from "./factoryAbi";

const provider = new RpcProvider({
	nodeUrl: "https://starknet-testnet.public.blastapi.io",
	// nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});

function hex2a(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = "";
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str.substring(1); // remove whitespace in front
}

const TokenInfo = ({ tokenAddress, handleSelectToken }) => {
	const { address, status } = useCurrentAccount();
	const [tokenSymbol, setTokenSymbol] = useState(null);
	const [tokenDecimals, setTokenDecimals] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const erc20Contract = new Contract(
				erc20abi,
				tokenAddress,
				StarknetRpcProvider
			);
			let fetchedTokenSymbol = await erc20Contract.call("symbol");
			setTokenSymbol(fetchedTokenSymbol);
			let fetchedTokenDecimals = await erc20Contract.call("decimals");
			setTokenDecimals(fetchedTokenDecimals);
		};
		fetchData();
	}, [tokenAddress]);

	if (tokenSymbol !== null && tokenDecimals !== null) {
		let tokenSymbolValue = hex2a(number.toHex(tokenSymbol.symbol));
		let tokenDecimalsValue = tokenDecimals.decimals.words[0];
		return (
			<div
				className="row gap-10 a-center item-wrapper "
				onClick={() => {
					handleSelectToken({
						name: tokenSymbolValue,
						icon: icons.v2.tokenicon,
						address: tokenAddress,
						decimals: tokenDecimalsValue,
						freeToken: 1,
					});
				}}
			>
				<img
					src={icons.v2.tokenicon}
					style={{ height: 30, width: 30 }}
					alt=""
				/>
				<h3>{tokenSymbolValue}</h3>
			</div>
		);
	} else {
		return (
			<h3 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
				Token not found
			</h3>
		);
	}
};

const SelectTokenModal = (props) => {
	const { isShowing, hide, token0, token1, setToken0, setToken1, typeModal } =
		props;

	const tokenList = useMemo(() => {
		return TOKEN_LIST[APP_CHAIN_ID];
	}, []);

	const [searchValue, setSearchValue] = useState("");

	const handleInputChange = (event) => {
		let tokenAddress = event.target.value;
		setSearchValue(tokenAddress);
	};

	const handleSelectToken = (item) => {
		if (typeModal === Field.INPUT) {
			if (item.name === token1.name) {
				setToken1(token0);
			}
			setToken0(item);
		} else if (typeModal === Field.OUTPUT) {
			if (item.name === token0.name) {
				setToken0(token1);
			}
			setToken1(item);
		}
		hide(false);
	};

	const useOutsideAlerter = (ref) => {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
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

	const checkSubName = (name) => {
		switch (name) {
			case "ETH":
				return "Ethereum";
			case "SFN":
				return "Starkfinance";
			case "WBTC":
				return "Wrapped Bitcoin";
			case "USDC":
				return "USD Coin";
			case "USDT":
				return "Tether";
			case "DAI":
				return "Dai";
			default:
				return "";
		}
	};

	const searchToken = (token) => {
		const strFirstTwo = token.slice(0, 2);
		// let tempArr = [];
		if (strFirstTwo === "0x") {
			return tokenList.filter((item) => {
				const searchTerm = token.toLowerCase();
				const itemValue = item.address.toLowerCase();
				return itemValue.includes(searchTerm);
			});
		} else {
			return tokenList.filter((item) => {
				const searchTerm = token.toLowerCase();
				const itemValue = item.name.toLowerCase();
				return itemValue.includes(searchTerm);
			});
		}
		// return tempArr;
	};

	return (
		<div>
			{isShowing && (
				<div className={`modal-overlay`}>
					<div
						ref={wrapperRef}
						className={twMerge(
							"flex flex-col items-start gap-3 modal-content-token"
						)}
					>
						<SelectTokenModalHeader close={() => hide(false)} />
						<Divider />
						<Input
							placeholder="Search name or paste address"
							value={searchValue}
							onChange={handleInputChange}
							className="input-pl rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3 text-base font-normal text-[#3C3D4D]"
						/>
						<span className="text-base font-normal text-[#C6C6C6]">
							Recommend tokens
						</span>
						{/* <div className="flex flex-wrap content-start items-start gap-[7px] self-stretch">
							<div className="flex items-center gap-1 rounded-xl bg-[#232631] py-[6px] pl-[6px] pr-3">
								<img
									src={icons.v2.logo_noname.src}
									alt="startnet logo"
									className="h-6 w-6"
								/>
								<span className="text-base font-bold text-[#F1F1F1]">SFN</span>
							</div>
							<div className="flex items-center gap-1 rounded-xl bg-[#232631] py-[6px] pl-[6px] pr-3">
								<img
									src={icons.v2.eth_logo.src}
									alt="startnet logo"
									className="h-6 w-6"
								/>
								<span className="text-base font-bold text-[#F1F1F1]">ETH</span>
							</div>
							<div className="flex items-center gap-1 rounded-xl bg-[#232631] py-[6px] pl-[6px] pr-3">
								<img
									src={icons.v2.tether_logo.src}
									alt="startnet logo"
									className="h-6 w-6"
								/>
								<span className="text-base font-bold text-[#F1F1F1]">USDT</span>
							</div>
						</div> */}
						<div className="flex flex-col items-start gap-1 self-stretch">
							{searchValue === "" && (
								<>
									{tokenList.map((token, index) => {
										return (
											<div
												key={index}
												className="flex items-center justify-between self-stretch rounded-xl bg-[#232631] px-3 py-[6px]"
												onClick={() => {
													handleSelectToken(token);
												}}
											>
												<div className="flex items-center gap-2">
													<TokenIcon address={token.address} w={24} h={24} />
													<div className="flex flex-col items-start justify-center">
														<span className="text-base font-bold text-[#F1F1F1]">
															{token.symbol}
														</span>
														<span className="text-xs font-medium text-[#C6C6C6]">
															{token.name}
														</span>
													</div>
												</div>
												{token.name === "SFN" ? <ActiveStar /> : <Star />}
											</div>
										);
									})}
								</>
							)}
							{searchValue.length > 0 ? (
								searchToken(searchValue).length > 0 ? (
									<>
										{searchToken(searchValue).map((item, index) => {
											return (
												<div
													key={index}
													className="flex items-center justify-between self-stretch rounded-xl bg-[#232631] px-3 py-[6px]"
													onClick={() => {
														handleSelectToken(item);
													}}
												>
													<div className="flex items-center gap-2">
														<TokenIcon address={token.address} w={24} h={24} />
														<div className="flex flex-col items-start justify-center">
															<span className="text-base font-bold text-[#F1F1F1]">
																{item.symbol}
															</span>
															<span className="text-xs font-medium text-[#C6C6C6]">
																{token.name}
															</span>
														</div>
													</div>
													{item.name === "SFN" ? <ActiveStar /> : <Star />}
												</div>
											);
										})}
									</>
								) : (
									<>Token not found!</>
								)
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectTokenModal;
