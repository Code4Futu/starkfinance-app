"use client";

import clsx from "clsx";
import { useLocationPath } from "../hooks/useLocationPath";
import SwapForm from "./components/SwapForm";
import { ChartDesktop } from "./components/Chart";
import ChartModal from "../components/modals/chart-modal/ModalChart";
import { Token } from "l0k_swap-sdk";
import { APP_CHAIN_ID, TOKEN_LIST, WETH } from "@/app/configs/networks";

export default function SwapPage() {
	return (
		<div
			className={clsx(
				"flex w-full flex-col gap-6 text-white max-[480px]:items-center md:items-center "
			)}
		>
			{/* <div
				className={clsx(
					"flex flex-col justify-center items-center gap-6 lg:max-h-[514px] lg:flex-row"
				)}
			>
				<SwapForm />
				<div className="h-[514px] w-[722px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6 lg:flex">
					<ChartDesktop
					/>
				</div>
			</div> */}
			<div
				className={clsx(
					"flex w-full flex-col justify-center items-center gap-6 lg:flex-row-reverse lg:max-h-[514px]"
				)}
			>
				<SwapForm />
				{/* TODO style chart */}
				{/* <div className="hidden md:flex w-full min-h-[514px] flex-1 rounded-3xl bg-[#1A1C24] p-6">
					<ChartDesktop />
				</div> */}
			</div>

			{/* Table */}
			{/* <div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
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
								onClick={() => setFilterTx("All")}
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
								onClick={() => setFilterTx("Wallet")}
							>
								<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
									Wallet tx
								</span>
							</div>
						</div>
					</div>
					<Divider />
					<div className="hidden w-full md:flex">
						<TransactionDesktop
							loading={loading}
							currentPage={currentPage}
							pageSize={pageSize}
							rowsData={rowsData}
							filterTx={filterTx}
							address={address}
							walletData={walletData}
							filterTypeTx={filterTypeTx}
							setFilterTypeTx={setFilterTypeTx}
						/>
					</div>
					<div className="flex flex-col items-start gap-3 self-stretch md:hidden">
						{filterTx === "All" && (
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
						)}
					</div>
				</div>
				<div className="flex w-full items-center justify-center">
					{filterTx === "All" && totalItems > 0 && (
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
					)}
				</div>
			</div> */}
			{/* {isShowBridgeModal && (
				<DetailBridgeModal
					isShowing={isShowBridgeModal}
					hide={setIsShowBridgeModal}
				/>
			)} */}
		</div>
	);
}
