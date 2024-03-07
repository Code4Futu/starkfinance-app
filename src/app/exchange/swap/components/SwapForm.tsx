"use client";

import { Input } from "antd";
import { twMerge } from "tailwind-merge";
import {
	ArrowDown,
	ChartIcon,
	SettingIcon,
	SwapIcon,
} from "@/app/exchange/add-liquidity/components/icons";
import { Divider } from "@/app/components/Divider";
import { SwitchButton } from "@/app/exchange/add-liquidity/components/SwitchButton";
import { useCallback, useMemo, useState } from "react";
import { BIPS_BASE, Field } from "@/app/exchange/configs/networks";
import {
	APP_CHAIN_ID,
	StarknetRpcProvider,
	TOKEN_LIST,
	WETH,
	getTokenIcon,
} from "@/app/configs/networks";
import { JSBI, Percent, Token, TokenAmount, Trade } from "l0k_swap-sdk";
import useSWR from "swr";
import { num } from "starknet";
import { numberWithCommas } from "@/app/utils";
import { parseUnits } from "ethers";
import { swapCallback, useDerivedSwapInfo } from "@/app/exchange/state/swap";
import { SwapButton } from "@/app/exchange/components/buttons";
import SettingChartModal from "@/app/exchange/components/modals/settings-modal/SettingModalChart";
import SelectTokenModal from "@/app/exchange/components/modals/select-token-modal/SelectTokenModal";
import { useWeb3Store } from "@/app/store";
// import ChartModal from "@/app/exchange/components/modals/chart-modal/ModalChart";
import { useWeb3 } from "@/app/hooks";

export default function SwapForm() {
	const { account, isConnected, library } = useWeb3();
	const web3State = useWeb3Store();

	const [tokens, setTokens] = useState<{ [key in Field]: Token | undefined }>({
		[Field.INPUT]: WETH[APP_CHAIN_ID],
		[Field.OUTPUT]: TOKEN_LIST[APP_CHAIN_ID][1],
	});

	const [typedValue, setTypedValue] = useState("");
	const [independentField, setIndependentField] = useState<Field>(Field.INPUT);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [slippage, setSlippage] = useState<string>("0.5");
	const [disabledMultihops, setDisabledMultihops] = useState<boolean>(false);
	const [isCheckedHighPriceImpact, setIsCheckedHighPriceImpact] =
		useState<boolean>(false);

	const [isShowSetting, setIsShowSetting] = useState(false);
	const [isShowTokenModal, setIsShowTokenModal] = useState(false);

	const { data: balances } = useSWR<(TokenAmount | undefined)[]>(
		[account, tokens[Field.INPUT], tokens[Field.OUTPUT], web3State.txHash],
		async () => {
			if (!account || !isConnected) return [];
			return Promise.all(
				[tokens[Field.INPUT], tokens[Field.OUTPUT]].map(async (t) => {
					if (!t) return undefined;
					console;
					const res = await library.callContract({
						contractAddress: t.address,
						entrypoint: "balanceOf",
						calldata: [account],
					});
					return new TokenAmount(t, num.hexToDecimalString(res.result[0]));
				})
			);
		}
	);

	const { data: trade, isLoading: isLoadingTrade } = useSWR(
		[
			library,
			tokens[Field.INPUT],
			tokens[Field.OUTPUT],
			typedValue,
			independentField,
			disabledMultihops,
			web3State.txHash,
		],
		() =>
			!library
				? undefined
				: useDerivedSwapInfo({
						library: library!,
						independentField,
						typedValue,
						tokens,
						singlehops: disabledMultihops,
				  })
	);

	const handleSelectToken = (token: Token) => {
		let _tokens = { ...tokens };
		_tokens[independentField] = token;
		if (independentField === Field.INPUT) {
			if (tokens[Field.OUTPUT] && token.equals(tokens[Field.OUTPUT] as any)) {
				if (tokens[Field.INPUT]) _tokens[Field.OUTPUT] = tokens[Field.INPUT];
				else _tokens[Field.OUTPUT] = undefined;
			}
		} else {
			if (tokens[Field.INPUT] && token.equals(tokens[Field.INPUT] as any)) {
				if (tokens[Field.OUTPUT]) _tokens[Field.INPUT] = tokens[Field.OUTPUT];
				else _tokens[Field.INPUT] = undefined;
			}
		}
		setTokens(_tokens);
		// onClose();
	};

	const handleChangeAmounts = (value: string, independentField: Field) => {
		if (isNaN(+value)) return;
		setTypedValue(value);
		setIndependentField(independentField);
	};

	const isDisableBtn: boolean = useMemo(() => {
		if (!trade || !balances?.[0] || !tokens[Field.INPUT] || !typedValue)
			return true;
		let input =
			independentField === Field.INPUT
				? parseUnits(typedValue, tokens[Field.INPUT]?.decimals).toString()
				: trade.inputAmount.raw.toString();

		if (BigInt(input) > BigInt(balances[0]?.raw.toString() ?? "0")) {
			return true;
		}
		return false;
	}, [trade, balances]);

	const onSwapCallback = useCallback(async () => {
		try {
			setSubmitting(true);
			const tx = await swapCallback(library, account, trade, +slippage);
			useWeb3Store.setState({ ...web3State, txHash: tx?.transaction_hash });
			setSubmitting(false);
			setTypedValue("");
		} catch (error) {
			console.error(error);
			setSubmitting(false);
		}
	}, [account, library, trade, slippage]);

	// const onApproveTokens = useCallback(async () => {
	// 	try {
	// 		if (!account || !library) return;
	// 		setSubmitting(true);
	// 		const result = await approves(
	// 			library,
	// 			account,
	// 			ROUTER_ADDRESS,
	// 			tokensNeedApproved
	// 		);
	// 		if (result) setTokensNeedApproved([]);
	// 		setSubmitting(false);
	// 	} catch (error) {
	// 		console.error(error);
	// 		setSubmitting(false);
	// 	}
	// }, [account, library, tokensNeedApproved]);

	// const isHighPriceImpact = useMemo(
	// 	() => (trade ? trade.priceImpact.greaterThan(FIVE_PERCENT) : false),
	// 	[trade]
	// );

	// const onSubmit = () => {
	// 	if (isHighPriceImpact) return onOpenConfirmHighSlippage();
	// 	if (isNeedApproved) {
	// 		return onApproveTokens();
	// 	} else if (!isDisableBtn) {
	// 		return onSwapCallback();
	// 	}
	// };

	// const onSubmitHighSlippage = () => {
	// 	if (isNeedApproved) {
	// 		return onApproveTokens();
	// 	} else if (!isDisableBtn) {
	// 		return onSwapCallback().then(onCloseConfirmHighSlippage);
	// 	}
	// };

	const [typeModal, setTypeModal] = useState<Field>(Field.INPUT);

	return (
		<div
			className={twMerge(
				"flex max-w-[342px] min-h-[514px] flex-col items-end rounded-3xl bg-[#1A1C24] py-5 px-[11px]"
				// currentPath === "/bridge" && "max-w-[486px]"
			)}
		>
			<SwitchButton />
			<Divider className="h-[1px] w-full bg-[#2D313E] mt-6 mb-3" />

			<div className="flex w-full justify-end xl:justify-end">
				{/* TODO uncomment show chart */}
				{/* <div className="xl:hidden">
					<div className="button-linear-2 flex items-center justify-center rounded p-1 bg-[#F1F1F1] w-7 h-7">
						<label htmlFor="swap_chart_modal">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M17.293 2.293C17 2.586 17 3.057 17 4V17C17 17.943 17 18.414 17.293 18.707C17.586 19 18.057 19 19 19C19.943 19 20.414 19 20.707 18.707C21 18.414 21 17.943 21 17V4C21 3.057 21 2.586 20.707 2.293C20.414 2 19.943 2 19 2C18.057 2 17.586 2 17.293 2.293ZM10 7C10 6.057 10 5.586 10.293 5.293C10.586 5 11.057 5 12 5C12.943 5 13.414 5 13.707 5.293C14 5.586 14 6.057 14 7V17C14 17.943 14 18.414 13.707 18.707C13.414 19 12.943 19 12 19C11.057 19 10.586 19 10.293 18.707C10 18.414 10 17.943 10 17V7ZM3.293 9.293C3 9.586 3 10.057 3 11V17C3 17.943 3 18.414 3.293 18.707C3.586 19 4.057 19 5 19C5.943 19 6.414 19 6.707 18.707C7 18.414 7 17.943 7 17V11C7 10.057 7 9.586 6.707 9.293C6.414 9 5.943 9 5 9C4.057 9 3.586 9 3.293 9.293ZM3 21.25C2.80109 21.25 2.61032 21.329 2.46967 21.4697C2.32902 21.6103 2.25 21.8011 2.25 22C2.25 22.1989 2.32902 22.3897 2.46967 22.5303C2.61032 22.671 2.80109 22.75 3 22.75H21C21.1989 22.75 21.3897 22.671 21.5303 22.5303C21.671 22.3897 21.75 22.1989 21.75 22C21.75 21.8011 21.671 21.6103 21.5303 21.4697C21.3897 21.329 21.1989 21.25 21 21.25H3Z"
									fill="#1A1C24"
								/>
							</svg>
						</label>

						<input
							type="checkbox"
							id="swap_chart_modal"
							className="modal-toggle"
						/>
					</div>
				</div> */}
				<div
					onClick={() => setIsShowSetting(true)}
					className="inline-flex items-center justify-end gap-1 rounded-xl bg-[#2D313E] py-[2px] pl-3 pr-2 mb-3 cursor-pointer"
				>
					<span className="text-xs leading-[14px] font-medium text-[#C6C6C6]">
						Transaction Settings
					</span>
					<SettingIcon />
				</div>
			</div>

			<div className="flex w-full flex-col items-center gap-3">
				<div className="w-[320px] flex flex-col items-start gap-2 rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3 h-[82px] max-[390px]:max-w-[320px] max-[390px]:w-full">
					<div className="flex items-center justify-between self-stretch">
						<div
							className="flex p-[6px] justify-center items-center gap-1 rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] h-9 cursor-pointer"
							onClick={() => {
								setTypeModal(Field.INPUT);
								setIsShowTokenModal(true);
							}}
						>
							<img
								src={getTokenIcon(tokens[Field.INPUT]?.address)}
								alt="Startsport logo"
								className="flex w-6 h-6 justify-center items-center"
							/>
							<span className="text-base text-[#F1F1F1] font-bold leading-[19px]">
								{tokens[Field.INPUT]?.symbol}
							</span>
							<div className="flex w-6 h-6 justify-center items-center">
								<ArrowDown />
							</div>
						</div>
						<Input
							placeholder="0.0"
							className="border-none px-0 text-right text-xl font-bold text-[#C6C6C6] max-w-[120px]"
							// ref={inputToken0Ref}
							value={
								independentField === Field.INPUT
									? typedValue
									: trade?.inputAmount.toSignificant(6) ?? ""
							}
							onChange={(e) => handleChangeAmounts(e.target.value, Field.INPUT)}
						/>
					</div>
					<div className="flex items-start justify-between self-stretch">
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							Balance: {numberWithCommas(balances?.[0]?.toSignificant(3))}
						</span>
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							{/* 0.00 USD */}--
						</span>
					</div>
				</div>
				<SwapIcon
					handleChangeToken={() => {
						setTokens({
							[Field.INPUT]: tokens[Field.OUTPUT],
							[Field.OUTPUT]: tokens[Field.INPUT],
						});
					}}
				/>
				{/* To */}
				<div className="flex flex-col items-start gap-2 self-stretch rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3 h-[82px]">
					<div className="flex w-full items-center justify-between self-stretch h-9">
						<div
							className="flex items-center justify-center gap-1 rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] p-[6px] h-9 cursor-pointer"
							onClick={() => {
								setTypeModal(Field.INPUT);
								setIsShowTokenModal(true);
							}}
						>
							{/* {token1.name !== "" ? ( */}
							<>
								<img
									src={getTokenIcon(tokens[Field.OUTPUT]?.address)}
									alt="Startsport logo"
									className="flex w-6 h-6 justify-center items-center"
								/>
								<span className="text-base text-[#F1F1F1] font-bold leading-[19px]">
									{tokens[Field.OUTPUT]?.symbol}
								</span>
							</>
							{/* // ) : (
          //   <span className="whitespace-nowrap text-base font-bold leading-[19px] text-[#F1F1F1]">
          //     Select token
          //   </span>
          // )} */}
							<ArrowDown />
						</div>
						<Input
							placeholder="0.0"
							// value={token1OutputDisplayAmount}
							className="border-none px-0 text-right text-xl font-bold text-[#C6C6C6] max-w-[120px]"
							value={
								independentField === Field.OUTPUT
									? typedValue
									: trade?.outputAmount.toSignificant(6) ?? ""
							}
							onChange={(e) =>
								handleChangeAmounts(e.target.value, Field.OUTPUT)
							}
						/>
					</div>
					<div className="flex items-start justify-between self-stretch">
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							{/* Balance: {token1BalanceAmount} */}
							Balance: {numberWithCommas(balances?.[1]?.toSignificant(3))}
						</span>
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							{/* 0.00 USD */}--
						</span>
					</div>
				</div>
				{/* Price */}
				<div className="flex flex-col items-center gap-1 self-stretch max-h-[76px]">
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Price
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{!!trade
								? `1 ${tokens[Field.INPUT]?.symbol} =
							${trade.executionPrice.toSignificant(4)}
							${tokens[Field.OUTPUT]?.symbol}`
								: "--"}
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							{independentField === Field.INPUT
								? "Minimum received"
								: "Maximum sent"}
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{!!trade
								? independentField === Field.INPUT
									? trade
											.minimumAmountOut(
												new Percent(JSBI.BigInt(+slippage * 100), BIPS_BASE)
											)
											.toSignificant(4)
									: trade
											.maximumAmountIn(
												new Percent(JSBI.BigInt(+slippage * 100), BIPS_BASE)
											)
											.toSignificant(4)
								: "--"}
						</span>
					</div>
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Price Impact
						</span>
						<span
							className={twMerge(
								"text-sm font-bold text-[#F1F1F1] leading-4"
								// !!priceImpact &&
								//   priceImpact > 0 &&
								//   priceImpact <= 10 &&
								//   "text-[#6CFF7B]",
								// !!priceImpact &&
								//   priceImpact > 10 &&
								//   priceImpact <= 50 &&
								//   "text-[#FFE86C]",
								// !!priceImpact && priceImpact > 50 && "text-[#FF6C6C]"
							)}
						>
							{trade?.priceImpact.toSignificant(6) ?? "--"}%
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Fee
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{!!trade ? "0.3" : "--"}%
						</span>
					</div>
				</div>
				<SwapButton
					loadingPool={isLoadingTrade}
					handleSwap={onSwapCallback}
					submitting={submitting}
					warningPriceImpact={
						parseFloat((trade?.priceImpact.toSignificant(6) ?? 0).toString()) >
						10
					}
				/>
			</div>
			{isShowSetting && (
				<SettingChartModal
					isShowing={isShowSetting}
					setIsShow={setIsShowSetting}
				/>
			)}
			{isShowTokenModal && (
				<SelectTokenModal
					isShowing={isShowTokenModal}
					hide={setIsShowTokenModal}
					token0={tokens[Field.INPUT]}
					token1={tokens[Field.OUTPUT]}
					setToken0={(token0: Token) =>
						setTokens((pre) => ({ ...pre, [Field.INPUT]: token0 }))
					}
					setToken1={(token1: Token) =>
						setTokens((pre) => ({ ...pre, [Field.OUTPUT]: token1 }))
					}
					typeModal={typeModal}
				/>
			)}
			{/* <ChartModal
				htmlFor="swap_chart_modal"
				// isShowing={false}
				// hide={() => {}}
				token0={WETH[APP_CHAIN_ID]}
				token1={TOKEN_LIST[APP_CHAIN_ID][1]}
				// vol={"0"}
				// dateCurrent={"Jan 1, 2023 (UTC)"}
				// handleChangeToken={() => {}}
			/> */}
		</div>
	);
}
