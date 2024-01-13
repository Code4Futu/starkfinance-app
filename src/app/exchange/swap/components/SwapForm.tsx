import { Input } from "antd";
import { twMerge } from "tailwind-merge";
import { ArrowDown, ChartIcon, SettingIcon, SwapIcon } from "./icons";
import { Divider } from "@/app/components/Divider";
import { SwitchButton } from "./SwitchButton";
import { useState } from "react";
import {
	APP_CHAIN_ID,
	Field,
	SN_RPC_PROVIDER,
	TOKEN_LIST,
	WETH,
} from "@/app/exchange/configs/networks";
import { Token, TokenAmount, Trade } from "l0k_swap-sdk";
import useSWR from "swr";
import { useAccount } from "@starknet-react/core";
import { num } from "starknet";
import { numberWithCommas } from "@/app/utils";

export default function SwapForm() {
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
	const [trade, setTrade] = useState<Trade | null>(null);
	const [slippage, setSlippage] = useState<string>("0.5");
	const [disabledMultihops, setDisabledMultihops] = useState<boolean>(false);
	const [loadedPool, setLoadedPool] = useState<boolean>(false);
	const [isCheckedHighPriceImpact, setIsCheckedHighPriceImpact] =
		useState<boolean>(false);

	const { data: balances } = useSWR<(TokenAmount | undefined)[]>(
		[address, tokens[Field.INPUT], tokens[Field.OUTPUT]],
		async () => {
			if (!address || !isConnected) return [];
			const provider = SN_RPC_PROVIDER();
			return Promise.all(
				[tokens[Field.INPUT], tokens[Field.OUTPUT]].map(async (t) => {
					if (!t) return undefined;
					console;
					const res = await provider.callContract({
						contractAddress: t.address,
						entrypoint: "balanceOf",
						calldata: [address],
					});
					return new TokenAmount(t, num.hexToDecimalString(res.result[0]));
				})
			);
		}
	);

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
						{/* <ChartIcon onClick={() => setIsModalChartOpen(true)} /> */}
					</div>
				</div>
				<div
					// onClick={() => setIsShowSetting(true)}
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
								// src={token0.icon.src}
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
							// onChange={handleToken0InputAmountChange}
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
					handleChangeToken={() => {}}
					// handleChangeToken={handleChangeToken}
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
									// src={token1.icon.src}
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
							{/* 1 SFN = 1 token */}--
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Minimum received
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{/* 1 token */}--
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
							{/* {priceImpact ? parseFloat(priceImpact).toFixed(2) : "0"}% */}
							0%
						</span>
					</div>
					{/* TODO */}
					<div className="flex items-start justify-between self-stretch px-1">
						<span className="text-sm font-normal text-[#C6C6C6] leading-4">
							Fee
						</span>
						<span className="text-sm font-bold text-[#F1F1F1] leading-4">
							{/* 0.5% */}--
						</span>
					</div>
				</div>
				{/* <SwapButton
      handleSwap={handleSwap}
      submitting={submitting}
      warningPriceImpact={warningPriceImpact}
    /> */}
			</div>
			{/* {isShowSetting && (
    <SettingChartModal
      isShowing={isShowSetting}
      setIsShow={setIsShowSetting}
    />
  )} */}
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
