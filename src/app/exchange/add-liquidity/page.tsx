"use client";

// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import icons from "../assets/icons";
import { Divider } from "../components/Divider";
// import ChartModal from "../components/modals/chart-modal/ModalChart";
// import SettingChartModal from "../components/modals/settings-modal/SettingModalChart";
import { Pagination, Skeleton } from "antd";
import { ChartDesktop } from "./components/Chart";
import { Transaction } from "./components/Transaction";
import { TransactionDesktop } from "./components/TransactionDesktop";
// import { SwapPageEVM } from "../evm/pages/swap/SwapPageEVM.jsx";
// import { BigNumber as BigNumberEthers } from "ethers";
import useCurrentAccount from "../hooks/useCurrentAccount";
// import { useActiveWeb3React } from "../evm/hooks/useActiveWeb3React.js";
import { APP_CHAIN_ID, TOKEN_LIST, WETH } from "@/app/configs/networks";
import { twMerge } from "tailwind-merge";
import { useLocationPath } from "../hooks/useLocationPath.js";
import AddLiquidityForm from "./components/AddLiquidityForm";
import { useWeb3 } from "@/app/hooks";

const AddLiquidityPage = () => {
	const { account } = useWeb3();
	// const [loading, setLoading] = useState(true);
	const [filterTx, setFilterTx] = useState("All");
	const [filterTypeTx, setFilterTypeTx] = useState("All");

	// Token Picker
	const [token0, setToken0] = useState(WETH[APP_CHAIN_ID]);
	const [token1, setToken1] = useState(TOKEN_LIST[APP_CHAIN_ID][1]);

	// const { isModalOpen, toggleModalChart } = useModalChart();
	const [isModalChartOpen, setIsModalChartOpen] = useState(false);

	// useEffect(() => {
	// 	async function getSwapTx() {
	// 		try {
	// 			let res = await axios.get(
	// 				`https://api.starksport.finance/api/swap-transactions/latest`
	// 			);
	// 			setRowsData(res.data);
	// 			setLoading(false);
	// 			setTotalItems(res.data.length);
	// 		} catch (error) {}
	// 	}
	// 	getSwapTx();
	// }, []);

	// useEffect(() => {
	// 	if (filterTx === "All") return;
	// 	if (filterTx === "Wallet") {
	// 		let tempArr: any[] = [];
	// 		rowsData.map((item: any, idx) => {
	// 			if (item.sender_address === address) {
	// 				tempArr.push(item);
	// 			}
	// 		});
	// 		setWalletData(tempArr as any);
	// 	}
	// }, [filterTx]);

	// const [currentPage, setCurrentPage] = useState(1);
	// const [pageSize, setPageSize] = useState(10);
	// const [totalItems, setTotalItems] = useState(0);

	// const handleChange = (newCurrentPage: number, newPageSize: number) => {
	// 	setCurrentPage(newCurrentPage);
	// 	setPageSize(newPageSize);
	// };

	// const [token0InputAmount, setToken0InputAmount] = useState(0);
	// const [token1OutputAmount, setToken1OutputAmount] = useState(0);
	// const [token1OutputDisplayAmount, setToken1OutputDisplayAmount] = useState(0);

	// const handleChangeToken = async () => {
	// 	// const tempToken = token0;
	// 	// setToken0(token1);
	// 	// setToken1(tempToken);
	// 	// setToken0InputAmount(0);
	// 	// setToken1OutputAmount(0);
	// 	// setToken1OutputDisplayAmount(0);
	// };

	return (
		<div
			className={twMerge(
				"flex w-full flex-col gap-6 text-white mb-[80px] max-[480px]:items-center md:items-center"
				// currentPath === "/bridge" && "lg:pt-[222px]"
			)}
		>
			<div
				className={twMerge(
					"flex flex-row justify-center items-center gap-6 xl:max-h-[514px] xl:flex-col xl:hidden"
					// currentPath === "/bridge" && "flex-col"
				)}
			>
				<AddLiquidityForm />
				{/* {currentPath === "/exchange/swap" && ( */}
				<div className="hidden h-[514px] w-[722px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={token0}
						token1={token1}
						vol={"0"}
						// dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={() => true}
					/>
				</div>
				{/* )} */}
			</div>
			<div
				className={twMerge(
					"hidden w-full flex-row justify-center items-center gap-6 xl:flex-row xl:flex xl:max-h-[514px]"
					// currentPath !== "/bridge" && "xl:max-h-[514px]"
				)}
			>
				<div className="hidden h-[514px] flex-1 flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 xl:flex">
					<ChartDesktop
						token0={token0}
						token1={token1}
						vol={"0"}
						// dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
						handleChangeToken={() => true}
					/>
				</div>

				<AddLiquidityForm />
			</div>
			{/* Table */}
			<div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
				<div className="flex flex-col items-start gap-3 self-stretch">
					<div className="flex items-end justify-between self-stretch max-[480px]:flex-wrap">
						<span className="text-xl xl:text-2xl font-bold text-[#F1F1F1] leading-[28px]">
							Transactions
						</span>
						<div className="flex items-start rounded-lg border-[1px] border-[#2D313E] bg-[#0D0E12]">
							<div
								className={twMerge(
									"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer w-[69.58px]",
									filterTx === "All" && "bg-[#2D313E]"
								)}
								// onClick={() => setFilterTx("All")}
							>
								<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
									All
								</span>
							</div>
							<div
								className={twMerge(
									"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer",
									filterTx === "Wallet" && "bg-[#2D313E]"
								)}
								// onClick={() => setFilterTx("Wallet")}
							>
								<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
									Wallet tx
								</span>
							</div>
						</div>
					</div>
					<Divider />
					<div className="hidden w-full md:flex">
						{/* <TransactionDesktop
							loading={loading}
							currentPage={currentPage}
							pageSize={pageSize}
							rowsData={rowsData}
							filterTx={filterTx}
							address={address}
							walletData={walletData}
							filterTypeTx={filterTypeTx}
							setFilterTypeTx={setFilterTypeTx}
						/> */}
					</div>
					<div className="flex flex-col items-start gap-3 self-stretch md:hidden">
						{/* {filterTx === "All" && (
							<>
								{loading ? (
									<div className="flex flex-col gap-2 w-full">
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
									</div>
								) : rowsData.length > 0 ? (
									currentPage === 1 ? (
										rowsData
											.slice(0, currentPage * pageSize)
											.map((item, idx) => <Transaction key={idx} item={item} />)
									) : (
										rowsData
											.slice(
												(currentPage - 1) * pageSize,
												currentPage * pageSize
											)
											.map((item, idx) => <Transaction key={idx} item={item} />)
									)
								) : (
									<div className="w-full flex items-center justify-center text-base text-[#c6c6c6] font-normal">
										No Liquidity Transaction!
									</div>
								)}
							</>
						)}
						{filterTx === "Wallet" && (
							<>
								{loading ? (
									<div className="flex flex-col gap-2 w-full">
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
										<Skeleton active avatar paragraph={{ rows: 1 }} />
									</div>
								) : walletData.length > 0 ? (
									currentPage === 1 ? (
										walletData
											.slice(0, currentPage * pageSize)
											.map((item, idx) => {
												return <Transaction key={idx} item={item} />;
											})
									) : (
										walletData
											.slice(
												(currentPage - 1) * pageSize,
												currentPage * pageSize
											)
											.map((item, idx) => {
												return <Transaction key={idx} item={item} />;
											})
									)
								) : (
									<div className="w-full flex items-center justify-center text-base text-[#c6c6c6] font-normal">
										No Liquidity Transaction!
									</div>
								)}
							</>
						)} */}
					</div>
				</div>
				<div className="flex w-full items-center justify-center">
					{/* {filterTx === "All" && totalItems > 0 && (
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={totalItems}
							onChange={handleChange}
						/>
					)}
					{filterTx === "Wallet" && walletData.length > 0 && (
						<Pagination
							current={currentPage}
							pageSize={pageSize}
							total={walletData.length}
							onChange={handleChange}
						/>
					)} */}
				</div>
			</div>
			{/* {isShowBridgeModal && (
				<DetailBridgeModal
					isShowing={isShowBridgeModal}
					hide={setIsShowBridgeModal}
				/>
			)} */}
			{/* {isModalChartOpen && (
				<ChartModal
					isShowing={isModalChartOpen}
					hide={() => setIsModalChartOpen(false)}
					token0={WETH[APP_CHAIN_ID]}
					token1={WETH[APP_CHAIN_ID]}
					token1={"B"}
					vol={isNaN(vol) ? "0" : vol}
					dateCurrent={dateCurrent ? dateCurrent : "Jan 1, 2023 (UTC)"}
					handleChangeToken={handleChangeToken}
				/>
			)} */}
		</div>
	);
};

export default function WrapSwapPage() {
	// const { isConnected: isConnectedEvm } = useActiveWeb3React();

	// return isConnectedEvm ? <SwapPageEVM /> : <AddLiquidityPage />;

	return <AddLiquidityPage />;
}
