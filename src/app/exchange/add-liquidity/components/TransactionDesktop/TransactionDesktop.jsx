import { Divider } from "@/app/exchange/components/Divider";
import { TransactionRow } from "./TransactionRow";
import { Skeleton } from "antd";

export const TransactionDesktop = (props) => {
	return (
		<div className="flex w-full flex-col">
			<div className="grid grid-cols-5 w-full items-start justify-between px-3 text-sm xl:text-base font-bold text-[#F1F1F1]">
				<span className="">Txid</span>
				<span className="">Token In</span>
				<span className="">Token Out</span>
				<span className="">Address</span>
				<span className="">Time</span>
			</div>
			<Divider className="my-3" />
			{props.loading ? (
				<div className="flex flex-col gap-2 w-full">
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
					<Skeleton active avatar paragraph={{ rows: 1 }} />
				</div>
			) : (
				<>
					{props.filterTx === "All" && (
						<>
							{props.currentPage === 1
								? props.rowsData
										.slice(0, props.currentPage * props.pageSize)
										.map((item, idx) => (
											<TransactionRow key={idx} idx={idx} item={item} />
										))
								: props.rowsData
										.slice(
											(props.currentPage - 1) * props.pageSize,
											props.currentPage * props.pageSize
										)
										.map((item, idx) => (
											<TransactionRow key={idx} idx={idx} item={item} />
										))}
						</>
					)}
					{props.filterTx === "Wallet" && (
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
					)}
				</>
			)}
		</div>
	);
};
