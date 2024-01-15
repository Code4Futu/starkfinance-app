import { Input } from "antd";
import { twMerge } from "tailwind-merge";
import { ArrowDown, ChartIcon, SettingIcon, SwapIcon } from "./icons";
import { Divider } from "@/app/components/Divider";
import { SwitchButton } from "./SwitchButton";
import { useCallback, useMemo, useState } from "react";
import {
	APP_CHAIN_ID,
	BIPS_BASE,
	Field,
	SN_RPC_PROVIDER,
	TOKEN_LIST,
	WETH,
	getTokenIcon,
} from "@/app/exchange/configs/networks";
import { JSBI, Percent, Token, TokenAmount, Trade } from "l0k_swap-sdk";
import useSWR from "swr";
import { useAccount } from "@starknet-react/core";
import { num } from "starknet";
import { numberWithCommas } from "@/app/utils";
import { parseUnits } from "ethers";
import { swapCallback, useDerivedSwapInfo } from "@/app/exchange/state/swap";
import { SwapButton } from "@/app/exchange/components/buttons";
import SettingChartModal from "@/app/exchange/components/modals/settings-modal/SettingModalChart";
import SelectTokenModal from "@/app/exchange/components/modals/select-token-modal/SelectTokenModal";
import OutsideClickHandler from "react-outside-click-handler";
import { getPoolInfo } from "@/app/exchange/state/liquidity";
import { PoolState, EmptyPool } from "@/app/exchange/state/liquidity";

export default function AddLiquidityForm() {
	const { account, isConnected, address } = useAccount();

	const [tokens, setTokens] = useState<{ [key in Field]: Token | undefined }>({
		[Field.INPUT]: WETH[APP_CHAIN_ID],
		[Field.OUTPUT]: TOKEN_LIST[APP_CHAIN_ID][1],
	});

	const [typedValue, setTypedValue] = useState("");
	const [independentField, setIndependentField] = useState<Field>(Field.INPUT);
	const [reloadPool, setReloadPool] = useState<boolean>(false);
	// const [poolInfo, setPoolInfo] = useState<PoolState>(EmptyPool);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [tokensNeedApproved, setTokensNeedApproved] = useState<Token[]>([]);
	const [slippage, setSlippage] = useState<string>("0.5");
	const [disabledMultihops, setDisabledMultihops] = useState<boolean>(false);
	const [isCheckedHighPriceImpact, setIsCheckedHighPriceImpact] =
		useState<boolean>(false);

	const [isShowSetting, setIsShowSetting] = useState(false);
	const [isShowTokenModal, setIsShowTokenModal] = useState(false);

	const [feeTier, setFeeTier] = useState(0.3);
	const [feeTierCustom, setFeeTierCustom] = useState(0);
	const [feeTierError, setFeeTierError] = useState(false);

	const { data } = useSWR<{
		balances: (TokenAmount | undefined)[];
		poolInfo: PoolState | undefined;
	}>([address, tokens[Field.INPUT], tokens[Field.OUTPUT]], async () => {
		// if (!address || !isConnected)
		// 	return {
		// 		balances: [],
		// 		poolInfo: undefined,
		// 	};
		const provider = SN_RPC_PROVIDER();
		const balances = await Promise.all(
			[tokens[Field.INPUT], tokens[Field.OUTPUT]].map(async (t) => {
				if (!address || !t) return undefined;
				const res = await provider.callContract({
					contractAddress: t.address,
					entrypoint: "balanceOf",
					calldata: [address],
				});
				return new TokenAmount(t, num.hexToDecimalString(res.result[0]));
			})
		);

		const poolInfo = await getPoolInfo(address, provider, [
			tokens[Field.INPUT],
			tokens[Field.OUTPUT],
		]);

		return { balances, poolInfo };
	});

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

	// const isDisableBtn: boolean = useMemo(() => {
	// 	if (!trade || !balances?.[0] || !tokens[Field.INPUT] || !typedValue)
	// 		return true;
	// 	let input =
	// 		independentField === Field.INPUT
	// 			? parseUnits(typedValue, tokens[Field.INPUT]?.decimals).toString()
	// 			: trade.inputAmount.raw.toString();

	// 	if (BigInt(input) > BigInt(balances[0]?.raw.toString() ?? "0")) {
	// 		return true;
	// 	}
	// 	return false;
	// }, [trade, balances]);

	const onKeyDown = (e: any) => {
		if (e.key === "Enter") {
			if (e.target.value === 0.3) {
				setFeeTierError(true);
				return;
			}
			if (e.target.value === 0.04) {
				setFeeTier(0.04);
				setFeeTierError(false);
			}
			if (e.target.value < 0.01 || e.target.value > 1) {
				setFeeTierError(true);
				return;
			}
			setFeeTier(e.target.value);
		}
	};

	const handleCustomFeeChange = (e: any) => {
		if (Number(e.target.value) === 0.3) {
			setFeeTierError(true);
			return;
		}
		if (Number(e.target.value) === 0.04) {
			setFeeTierError(false);
			return;
		}
		if (Number(e.target.value) < 0.01 || Number(e.target.value) > 1) {
			setFeeTierError(true);
			return;
		}
		setFeeTierCustom(Number(e.target.value));
		setFeeTierError(false);
	};

	const handleClickOutside = () => {
		if (feeTierCustom === 0.3 || feeTierCustom === 0.04) {
			setFeeTierError(false);
			return;
		}
		if (feeTierCustom < 0.01 || feeTierCustom > 1) {
			setFeeTierError(false);
			return;
		}
		setFeeTier(feeTierCustom);
		setFeeTierError(false);
	};

	// const onSwapCallback = useCallback(async () => {
	// 	try {
	// 		setSubmitting(true);
	// 		await swapCallback(account, address, trade, +slippage);
	// 		setReloadPool((pre) => !pre);
	// 		setSubmitting(false);
	// 		setTypedValue("");
	// 	} catch (error) {
	// 		console.error(error);
	// 		setSubmitting(false);
	// 	}
	// }, [account, address, trade, slippage]);

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

	console.log(data?.poolInfo);

	return (
		<div
			className={twMerge(
				"flex max-w-[342px] min-h-[514px] flex-col items-end rounded-3xl bg-[#1A1C24] py-5 px-[11px]"
				// currentPath === "/bridge" && "max-w-[486px]"
			)}
		>
			<SwitchButton />
			<Divider className="h-[1px] w-full bg-[#2D313E] mt-6 mb-3" />

			<div className="flex w-full justify-between lg:justify-end">
				<div className="lg:hidden">
					<div className="button-linear-2 flex items-center justify-center rounded p-1 bg-[#F1F1F1] w-7 h-7">
						<ChartIcon
							onClick={() => {
								// setIsModalChartOpen(true);
							}}
						/>
					</div>
				</div>
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
								// setTypeModal(1);
								// setIsShowTokenModal(true);
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
							// value={
							// 	independentField === Field.INPUT
							// 		? typedValue
							// 		: trade?.inputAmount.toSignificant(6) ?? ""
							// }
							onChange={(e) => handleChangeAmounts(e.target.value, Field.INPUT)}
						/>
					</div>
					<div className="flex items-start justify-between self-stretch">
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							Balance: {numberWithCommas(data?.balances?.[0]?.toSignificant(3))}
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
								// setTypeModal(2);
								// setIsShowTokenModal(true);
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
							// value={
							// independentField === Field.OUTPUT
							// 	? typedValue
							// 	: trade?.outputAmount.toSignificant(6) ?? ""
							// }
							onChange={(e) =>
								handleChangeAmounts(e.target.value, Field.OUTPUT)
							}
						/>
					</div>
					<div className="flex items-start justify-between self-stretch">
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							{/* Balance: {token1BalanceAmount} */}
							Balance: {numberWithCommas(data?.balances?.[1]?.toSignificant(3))}
						</span>
						<span className="text-xs leading-[14px] font-normal text-[#C6C6C6]">
							{/* 0.00 USD */}--
						</span>
					</div>
				</div>
				{/* Price */}
				<div className="flex flex-col items-center gap-1 self-stretch">
					<div className="relative flex items-start justify-between self-stretch px-1 max-[320px]:flex-wrap">
						{feeTierError && (
							<div className="absolute inline-flex py-1 px-3 justify-end items-center rounded-xl bg-[#2D313E] top-[20px] left-[105px]">
								<span className="text-xs font-medium text-[#c6c6c6]">
									You can only fill from 0.01 to 1!
								</span>
							</div>
						)}
						<span className="text-sm font-normal text-[#C6C6C6] leading-4 whitespace-nowrap">
							Fee tier
						</span>
						<div className="flex w-full justify-end items-center gap-3 min-[380px]:w-[235px]">
							<div className="flex h-4 justify-end items-center gap-1">
								{feeTier === 0.3 || feeTier === 0.04 ? (
									<OutsideClickHandler onOutsideClick={handleClickOutside}>
										<div className="flex h-4 w-full">
											<input
												type="number"
												className="h-full border-[1px] border-[#3C3D4D] rounded-md bg-transparent max-w-[75px] input-style-1 text-xs text-right mr-[2px]"
												placeholder="0.01 - 1"
												onChange={handleCustomFeeChange}
												onKeyDown={onKeyDown}
											/>
											<span className="text-sm font-bold leading-[16px] text-[#F1F1F1]">
												%
											</span>
										</div>
									</OutsideClickHandler>
								) : (
									<span className="text-sm font-bold leading-[16px] text-linear">
										{feeTier}%
									</span>
								)}
							</div>
							<div className="w-[1px] h-4 bg-[#f1f1f1]"></div>
							<span
								className={twMerge(
									"text-sm font-bold leading-[16px] text-[#F1F1F1] cursor-pointer",
									feeTier === 0.3 && "text-linear"
								)}
								onClick={() => {
									setFeeTier(0.3);
									setFeeTierCustom(0);
								}}
							>
								0.3%
							</span>
							<div className="w-[1px] h-4 bg-[#f1f1f1]"></div>
							<span
								className={twMerge(
									"text-sm font-bold leading-[16px] text-[#F1F1F1] cursor-pointer",
									feeTier === 0.04 && "text-linear"
								)}
								onClick={() => {
									setFeeTier(0.04);
									setFeeTierCustom(0);
								}}
							>
								0.04%
							</span>
						</div>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							{tokens[Field.INPUT]?.name} per {tokens[Field.OUTPUT]?.name}
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							--
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							{tokens[Field.OUTPUT]?.name} per {tokens[Field.INPUT]?.name}
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							--
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Share of pool
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{data?.poolInfo?.shareOfPool?.toSignificant(2) ?? "--"}%
						</span>
					</div>
				</div>
				{/* <SwapButton
					loadingPool={isLoadingTrade}
					handleSwap={onSwapCallback}
					submitting={submitting}
					warningPriceImpact={
						parseFloat((trade?.priceImpact.toSignificant(6) ?? 0).toString()) >
						10
					}
				/> */}
			</div>
			{isShowSetting && (
				<SettingChartModal
					isShowing={isShowSetting}
					setIsShow={setIsShowSetting}
				/>
			)}
			{/* {isShowTokenModal && (
    <SelectTokenModal
      isShowing={isShowTokenModal}
      hide={setIsShowTokenModal}
      token0={token0}
      token1={token1}
      setToken0={setToken0}
      setToken1={setToken1}
      mockDataTokenTest={mockDataTokenTest}
      typeModal={typeModal}
    />
  )} */}
		</div>
	);
}
