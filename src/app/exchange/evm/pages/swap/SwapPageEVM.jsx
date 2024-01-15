import { useRef, useState, useEffect } from "react";
import {
  ArrowDown,
  ChartIcon,
  SettingIcon,
  SwapIcon,
} from "./components/icons";
import { Divider } from "../../../components/Divider";
import { SwitchButton } from "./components/SwitchButton/SwitchButton";
import Input from "antd/es/input/Input";
import icons from "../../../assets/icons";
import ChartModal from "../../../components/modals/chart-modal/ModalChart";
import SettingChartModal from "../../../components/modals/settings-modal/SettingModalChart";
import SelectTokenModal from "../../../components/modals/select-token-modal/SelectTokenModal";
import useModalChart from "../../../components/modals/chart-modal/useModalChart";
import useSettingModalChart from "../../../components/modals/settings-modal/useSettingModalChart";
import useSelectTokenModal from "../../../components/modals/select-token-modal/useSelectTokenModal";
import { SwapButton } from "../../../components/buttons";
import { Transaction } from "./components/Transaction";
import { Pagination } from "antd";
import { ChartDesktop } from "./components/Chart";
import { TransactionDesktop } from "./components/TransactionDesktop/TransactionDesktop";
import { AddLiquidityButton } from "../../../components/buttons/AddLiquidityButton";
import { ChartDesktopBar } from "../../../pages/liquidity-swap/components/Chart";
import useModalChartBar from "../../../components/modals/chart-bar-modal/useModalChart";
import ChartModalBar from "../../../components/modals/chart-bar-modal/ModalChartBar";
import { TransactionDesktopBar } from "../../../pages/liquidity-swap/components/TransactionDesktop";

import {
  RpcProvider,
  Provider,
  Contract,
  Account,
  ec,
  json,
  uint256,
  number,
} from "starknet";
import BigNumber from "bignumber.js";
import BigInt from "big-integer";
import useCurrentAccount from "../../../hooks/useCurrentAccount";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";

export const SwapPageEVM = () => {
  const [tab, setTab] = useState("swap");
  // Token 0 Input Amount
  const [token0InputAmount, setToken0InputAmount] = useState(0);

  const { isModalCharBarOpen, toggleModalChartBar } = useModalChartBar();
  const { isModalOpen, toggleModalChart } = useModalChart();
  const { isSettingModalOpen, toggleSettingModalChart } =
    useSettingModalChart();
  const { isSelectTokenModalOpen, toggleSelectTokenModalChart } =
    useSelectTokenModal();

  const inputToken0Ref = useRef(null);

  const handleToken0InputAmountChange = (event) => {
    if (event.target.value === "") {
      setToken0InputAmount(0);
      // setToken1OutputAmount(0);
      // setToken1OutputDisplayAmount(0);
    } else {
      // setToken0InputAmount(getTokenAmountInWei(event.target.value, token0.decimals));
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 px-6 py-9 text-white md:items-center min-[1920px]:py-[72px]">
      <div className="flex w-full max-w-[1089px] items-end justify-between">
        <span className="text-[32px] font-bold leading-normal text-[#F1F1F1] min-[1920px]:text-[42px]">
          Swap
        </span>
        <div className="min-[1920px]:hidden">
          <div className="button-linear-2 flex items-center justify-center gap-1 rounded-2xl bg-[#F1F1F1] p-3">
            <ChartIcon
              onClick={tab === "swap" ? toggleModalChart : toggleModalChartBar}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-6">
        <div className="hidden h-[#514px] w-[722px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 min-[1920px]:flex">
          {tab === "swap" ? <ChartDesktop /> : <ChartDesktopBar />}
        </div>
        <div className="flex max-w-[342px] flex-col items-end justify-center gap-3 rounded-3xl bg-[#1A1C24] p-6">
          <SwitchButton tab={tab} setTab={setTab} />
          <Divider className="mt-3 bg-[#2D313E]" />
          <div
            onClick={toggleSettingModalChart}
            className="inline-flex items-center justify-end gap-1 rounded-xl bg-[#2D313E] py-[2px] pl-3 pr-2"
          >
            <span className="text-xs font-medium text-[#C6C6C6]">
              Transaction Settings
            </span>
            <SettingIcon />
          </div>
          {/* From */}
          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex flex-col items-start gap-2 self-stretch rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3">
              <div className="flex w-full items-center justify-between self-stretch">
                <div
                  className="flex items-center justify-center gap-1 rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] p-[6px]"
                  onClick={toggleSelectTokenModalChart}
                >
                  <div className="flex h-6 w-6 items-center justify-center">
                    <img
                      src={icons.v2.logo_noname}
                      alt="Startsport logo"
                      className="h-6 w-6"
                    />
                  </div>
                  <span className="text-base font-bold leading-normal text-[#F1F1F1]">
                    SFN
                  </span>
                  <ArrowDown />
                </div>
                <Input
                  placeholder="0.0"
                  className="border-none px-0 text-right text-xl font-bold text-[#C6C6C6]"
                  ref={inputToken0Ref}
                  onChange={handleToken0InputAmountChange}
                />
              </div>
              <div className="flex items-start justify-between self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6]">
                  Balance: 0
                </span>
                <span className="text-xs font-normal text-[#C6C6C6]">
                  0.00 USD
                </span>
              </div>
            </div>
            <SwapIcon />
            {/* To */}
            <div className="flex flex-col items-start gap-2 self-stretch rounded-2xl border-[1px] border-[#2D313E] bg-[#0D0E12] p-3">
              <div className="flex w-full items-center justify-between self-stretch">
                <div
                  className="flex items-center justify-center gap-1 rounded-xl border-[1px] border-[#2D313E] bg-[#1A1C24] p-[6px]"
                  onClick={toggleSelectTokenModalChart}
                >
                  <span className="whitespace-nowrap text-base font-bold leading-normal text-[#F1F1F1]">
                    Select token
                  </span>
                  <ArrowDown />
                </div>
                <Input
                  placeholder="0.0"
                  className="border-none px-0 text-right text-xl font-bold text-[#C6C6C6]"
                  ref={inputToken0Ref}
                  onChange={handleToken0InputAmountChange}
                />
              </div>
              <div className="flex items-start justify-between self-stretch">
                <span className="text-xs font-normal text-[#C6C6C6]">
                  Balance: 0
                </span>
                <span className="text-xs font-normal text-[#C6C6C6]">
                  0.00 USD
                </span>
              </div>
            </div>
            {/* Price */}
            {tab === "swap" ? (
              <div className="flex flex-col items-center gap-1 self-stretch">
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Price
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">
                    1 SFN = 1 token
                  </span>
                </div>
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Minimum received
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">
                    1 token
                  </span>
                </div>
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Price Impact
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">0.5%</span>
                </div>
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Fee
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">0.5%</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 self-stretch">
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    SFN per Token
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">1</span>
                </div>
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Token per SFN
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">1</span>
                </div>
                <div className="flex items-start justify-between self-stretch px-1">
                  <span className="text-sm font-normal text-[#C6C6C6]">
                    Share of pool
                  </span>
                  <span className="text-sm font-bold text-[#F1F1F1]">
                    0.00%
                  </span>
                </div>
              </div>
            )}
            {tab === "swap" ? <SwapButton /> : <AddLiquidityButton />}
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="flex w-full max-w-[1089px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="flex items-end justify-between self-stretch">
            <span className="text-xl font-bold text-[#F1F1F1]">
              Transactions
            </span>
            <div className="flex items-start gap-2 rounded-md border-[1px] border-[#2D313E] bg-[#0D0E12]">
              <div className="flex items-center justify-center gap-[10px] rounded-md bg-[#2D313E] px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">All</span>
              </div>
              <div className="flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px]">
                <span className="text-xs font-medium text-[#F1F1F1]">
                  Wallet tx
                </span>
              </div>
            </div>
          </div>
          <Divider />
          <div className="hidden w-full md:flex">
            {tab === "swap" ? (
              <TransactionDesktop />
            ) : (
              <TransactionDesktopBar />
            )}
          </div>
          <div className="flex flex-col items-start gap-3 self-stretch md:hidden">
            <Transaction />
            <Transaction />
            <Transaction />
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Pagination defaultCurrent={1} total={1000} />
        </div>
      </div>
      <ChartModalBar
        isShowing={isModalCharBarOpen}
        hide={toggleModalChartBar}
      />
      <ChartModal isShowing={isModalOpen} hide={toggleModalChart} />
      <SettingChartModal
        isShowing={isSettingModalOpen}
        hide={toggleSettingModalChart}
      />
      <SelectTokenModal
        isShowing={isSelectTokenModalOpen}
        hide={toggleSelectTokenModalChart}
      />
    </div>
  );
};
