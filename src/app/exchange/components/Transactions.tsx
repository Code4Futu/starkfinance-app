"use client";
import { Divider } from "@/app/exchange/components/Divider";
import { Skeleton } from "antd";
import { Token } from "l0k_swap-sdk";
import moment from "moment";
import { numberWithCommas } from "@/app/utils";
import clsx from "clsx";
import { request } from "graphql-request";
import { EXCHANGE_GRAPHQL_URL } from "../configs/networks";
import useSWR from "swr";
import { useMemo } from "react";
import { TxType } from "../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type ITransaction = {
	txHash: string;
	from: string;
	to: string;
	amount0In: number;
	amount1In: number;
	amount0Out: number;
	amount1Out: number;
	amountUSD: number;
	timestamp: number;
};

type IToken = {
	id: string;
	name: string;
	decimals: number;
	symbol: string;
};

const fetcher = (token0: string, token1: string, user: string) => {
	return request<{
		pair: {
			token0: IToken;
			token1: IToken;
			transactions: ITransaction[];
		};
	}>(
		EXCHANGE_GRAPHQL_URL,
		`query getPair($token0: String!, $token1: String!, $user: String) {
      pair(token0:$token0, token1: $token1) {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
        transactions(user:$user) {
          txHash
          from
          to
          amount0In
          amount1In
          amount0Out
          amount1Out
          amountUSD
          timestamp
        }
      }
    }`,
		{ token0, token1, user }
	);
};

const CopyIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			className="cursor-pointer"
		>
			<path
				d="M8.3335 3.33301H5.00016C4.55814 3.33301 4.13421 3.5086 3.82165 3.82116C3.50909 4.13372 3.3335 4.55765 3.3335 4.99967V14.9997C3.3335 15.4417 3.50909 15.8656 3.82165 16.1782C4.13421 16.4907 4.55814 16.6663 5.00016 16.6663H15.0002C15.4422 16.6663 15.8661 16.4907 16.1787 16.1782C16.4912 15.8656 16.6668 15.4417 16.6668 14.9997V11.6663M10.0002 9.99967L16.6668 3.33301M16.6668 3.33301V7.49967M16.6668 3.33301H12.5002"
				stroke="#3E73FC"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const TransactionRow = ({
	idx,
	tx,
	token0,
	token1,
}: {
	idx: number;
	tx: ITransaction;
	token0: IToken;
	token1: IToken;
}) => {
	// Handle short address type
	const shortAddress = (address: string) => {
		if (address) {
			// console.log('Current address:', address);
			const firstDigits = address.slice(0, 6);
			const lastDigits = address.slice(-4);

			const resultAddress = firstDigits + "..." + lastDigits;
			return resultAddress;
		}
	};

	const openInNewTab = (url: string) => {
		let win = window.open(url, "_blank");
		// win.focus();
	};

	const convertToLocalTime = (timestamp: number | string) => {
		// Create a Date object from the given timestamp
		const date = new Date(+timestamp * 1000);

		// Format the date and time
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		// const hours = String(date.getHours()).padStart(2, "0");
		// const minutes = String(date.getMinutes()).padStart(2, "0");
		// const seconds = String(date.getSeconds()).padStart(2, "0");

		// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		return moment(`${year}${month}${day}`, "YYYYMMDD").fromNow();
	};

	// console.log(moment(`${date}`, "YYYYMMDD").fromNow());

	const parsedTx = useMemo(() => {
		let type = TxType.SWAP;
		let amounts: number[] = [];
		let tokens: IToken[] = [token0, token1];
		let text: string = "";
		if (tx.amount0Out == 0 && tx.amount1Out == 0) {
			type = TxType.ADD;
			amounts = [tx.amount0In, tx.amount1In];
			text = `Add ${token0.symbol} and ${token1.symbol}`;
		} else if (tx.amount0Out != 0 && tx.amount1Out != 0) {
			type = TxType.REMOVE;
			amounts = [tx.amount0Out, tx.amount1Out];
			text = `Remove ${token0.symbol} and ${token1.symbol}`;
		} else {
			if (tx.amount0In == 0) {
				amounts = [tx.amount1In, tx.amount0Out];
				tokens = [token1, token0];
				text = `Swap ${token1.symbol} and ${token0.symbol}`;
			} else {
				amounts = [tx.amount0In, tx.amount1Out];
				tokens = [token0, token1];
				text = `Swap ${token0.symbol} and ${token1.symbol}`;
			}
		}

		return {
			type,
			amounts,
			tokens,
			text,
		};
	}, [
		tx.amount0In,
		tx.amount1In,
		tx.amount0Out,
		tx.amount1Out,
		token0,
		token1,
	]);

	return (
		<div className="flex w-full items-start">
			<div
				className={clsx(
					"grid grid-cols-5 w-full items-start justify-between px-3 py-4",
					idx % 2 === 0 && "bg-[#232631]"
				)}
			>
				<a
					href={`https://starkscan.co/tx/${tx.txHash}`}
					className="flex items-start gap-[10px]"
				>
					<span className="text-base font-normal text-[#3E73FC] cursor-pointer">
						{parsedTx.text}
					</span>
					<CopyIcon />
				</a>
				<span className=" text-base font-normal text-[#f1f1f1] text-right">
					{numberWithCommas(parsedTx.amounts[0])} {parsedTx.tokens[0].symbol}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1] text-right">
					{numberWithCommas(parsedTx.amounts[1])} {parsedTx.tokens[1].symbol}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1] text-right">
					{shortAddress(tx.to)}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1] text-right">
					{dayjs(tx.timestamp * 1000).fromNow()}
					{/* {convertToLocalTime(item.transaction_timestamp)} */}
					{/* {moment(item.transaction_timestamp).subtract(6, "days").calendar()} */}
				</span>
			</div>
		</div>
	);
};

export const Transactions = ({
	token0,
	token1,
}: {
	token0: Token | undefined;
	token1: Token | undefined;
}) => {
	const { data, error, isLoading } = useSWR(
		[token0?.address ?? "", token1?.address ?? "", ""],
		([token0, token1, user]) => fetcher(token0, token1, user)
	);

	return (
		<div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
			<div className="flex flex-col items-start gap-3 self-stretch">
				<div className="flex items-end justify-between self-stretch max-[480px]:flex-wrap">
					<span className="text-xl xl:text-2xl font-bold text-[#F1F1F1] leading-[28px]">
						Transactions
					</span>
					<div className="flex items-start rounded-lg border-[1px] border-[#2D313E] bg-[#0D0E12]">
						<div
							className={clsx(
								"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer w-[69.58px]"
								// filterTx === "All" && "bg-[#2D313E]"
							)}
							// onClick={() => setFilterTx("All")}
						>
							<span className="text-xs font-medium text-[#F1F1F1] leading-[14px]">
								All
							</span>
						</div>
						<div
							className={clsx(
								"flex items-center justify-center gap-[10px] rounded-md px-3 py-[6px] cursor-pointer"
								// filterTx === "Wallet" && "bg-[#2D313E]"
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

				<div className="flex w-full flex-col">
					<div className="grid grid-cols-5 w-full items-start justify-between px-3 text-sm xl:text-base font-bold text-[#F1F1F1]">
						<span className="">TxHash</span>
						<span className="text-right">Token Amount</span>
						<span className="text-right">Token Out</span>
						<span className="text-right">Account</span>
						<span className="text-right">Time</span>
					</div>
					<Divider className="my-3" />
					{isLoading ? (
						<div className="flex flex-col gap-2 w-full">
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
							<Skeleton active avatar paragraph={{ rows: 1 }} />
						</div>
					) : (
						<>
							{data?.pair.transactions.map((t, idx) => (
								<TransactionRow
									key={idx}
									idx={idx}
									tx={t}
									token0={data?.pair.token0}
									token1={data?.pair.token1}
								/>
							))}
							{/* {props.filterTx === "Wallet" && (
						<>
							{props.walletData.length > 0 ? (
								props.currentPage === 1 ? (
									props.walletData
										.slice(0, props.currentPage * props.pageSize)
										.map((item, idx) => {
											return <TransactionRow key={idx} idx={idx} item={item} />;
										})
								) : (
									props.walletData
										.slice(
											(props.currentPage - 1) * props.pageSize,
											props.currentPage * props.pageSize
										)
										.map((item, idx) => {
											return <TransactionRow key={idx} idx={idx} item={item} />;
										})
								)
							) : (
								<div
									className="w-full flex items-center text-base font-normal text-[#FF6C6C] p-3"
									style={{
										background:
											"linear-gradient(0deg, rgba(255, 108, 108, 0.15) 0%, rgba(255, 108, 108, 0.15) 100%), #0D0E12",
									}}
								>
									Opps! No TX found for this wallet address.
								</div>
							)}
						</>
					)} */}
						</>
					)}
				</div>
			</div>
			<div className="flex w-full items-center justify-center">
				{/* <Pagination
							current={currentPage}
							pageSize={pageSize}
							total={walletData.length}
							onChange={handleChange}
						/> */}
			</div>
		</div>
	);
};
