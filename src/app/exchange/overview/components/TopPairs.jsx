import { Pagination } from "antd";
import { Divider } from "@/app/exchange/components/Divider";
import icons from "@/app/exchange/assets/icons";
import { useState } from "react";

const ArrangeIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.68079 1.88788C5.76545 1.7996 5.88027 1.75 5.99999 1.75C6.11971 1.75 6.23452 1.7996 6.31919 1.88788L8.87324 4.5519C8.95548 4.64072 9.00099 4.75968 8.99996 4.88315C8.99893 5.00663 8.95145 5.12474 8.86774 5.21205C8.78403 5.29937 8.67079 5.34889 8.55241 5.34997C8.43404 5.35104 8.31999 5.30357 8.23484 5.21779L5.99999 2.88671L3.76514 5.21779C3.67999 5.30357 3.56594 5.35104 3.44756 5.34997C3.32918 5.34889 3.21595 5.29937 3.13224 5.21205C3.04853 5.12474 3.00105 5.00663 3.00002 4.88315C2.99899 4.75968 3.0445 4.64072 3.12674 4.5519L5.68079 1.88788Z"
				fill="#C6C6C6"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.31921 10.6121C6.23455 10.7004 6.11973 10.75 6.00001 10.75C5.88029 10.75 5.76548 10.7004 5.68081 10.6121L3.12676 7.9481C3.04452 7.85928 2.99901 7.74032 3.00004 7.61685C3.00107 7.49337 3.04855 7.37526 3.13226 7.28794C3.21597 7.20063 3.32921 7.1511 3.44759 7.15003C3.56597 7.14896 3.68001 7.19643 3.76516 7.28221L6.00001 9.61329L8.23486 7.28221C8.32001 7.19643 8.43406 7.14896 8.55244 7.15003C8.67082 7.15111 8.78405 7.20063 8.86776 7.28795C8.95147 7.37526 8.99895 7.49337 8.99998 7.61685C9.00101 7.74032 8.9555 7.85928 8.87326 7.9481L6.31921 10.6121Z"
				fill="#C6C6C6"
			/>
		</svg>
	);
};

const TransactionMobile = () => {
	// const Transaction = () => {
	// 	return (
	// 		<div
	// 			className="flex w-full flex-col gap-3"
	// 			onClick={() => navigation("/overview/pair")}
	// 		>
	// 			<div className="flex w-full flex-col items-start gap-3 self-stretch">
	// 				<div className="flex items-center gap-3">
	// 					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
	// 						<img
	// 							src={icons.v2.logo_noname}
	// 							alt="starknet logo"
	// 							className="h-6 w-6"
	// 						/>
	// 						<span className="text-sm font-bold text-[#f1f1f1]">SFN</span>
	// 					</div>
	// 					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
	// 						<img src={icons.v2.eth_logo} alt="eth logo" className="h-6 w-6" />
	// 						<span className="text-sm font-bold text-[#f1f1f1]">ETH</span>
	// 					</div>
	// 				</div>
	// 				<div className="flex w-full items-start justify-between">
	// 					<span className="text-sm font-bold text-[#f1f1f1]">
	// 						$68,680,000
	// 					</span>
	// 					<span className="text-sm font-bold text-[#f1f1f1]">
	// 						$68,680,000
	// 					</span>
	// 					<span className="text-sm font-bold text-[#f1f1f1]">$68,680</span>
	// 				</div>
	// 			</div>
	// 			<Divider />
	// 		</div>
	// 	);
	// };

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-center justify-between self-stretch">
				<div className="flex w-[90px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Liquidity</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[90px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Volume (24h)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Fee (24h)</span>
					<ArrangeIcon />
				</div>
			</div>
			{/* <Divider />
      <div className="flex w-full flex-col gap-3">
        <Transaction />
        <Transaction />
        <Transaction />
      </div> */}
			<div className="w-full flex items-center justify-center text-base pt-3 text-[#c6c6c6] font-normal">
				No Pair!
			</div>
		</div>
	);
};

const TransactionDesktop = () => {
	// const Transaction = () => {
	// 	return (
	// 		<div
	// 			className="flex flex-col gap-3"
	// 			onClick={() => navigation("/overview/pair")}
	// 		>
	// 			<div className="flex w-full items-center justify-between self-stretch">
	// 				<div className="flex w-[250px] items-center gap-3">
	// 					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
	// 						<img
	// 							src={icons.v2.logo_noname}
	// 							alt="starknet logo"
	// 							className="h-6 w-6"
	// 						/>
	// 						<span className="text-sm font-bold text-[#f1f1f1]">SFN</span>
	// 					</div>
	// 					<div className="flex items-center gap-1 rounded-3xl border-[1px] border-[#3C3D4D] px-4 py-2">
	// 						<img src={icons.v2.eth_logo} alt="eth logo" className="h-6 w-6" />
	// 						<span className="text-sm font-bold text-[#f1f1f1]">ETH</span>
	// 					</div>
	// 				</div>
	// 				<span className="w-[160px] text-sm font-bold text-[#f1f1f1]">
	// 					$68,680,000
	// 				</span>
	// 				<span className="w-[160px] text-sm font-bold text-[#f1f1f1]">
	// 					$68,680,000
	// 				</span>
	// 				<span className="w-[100px] text-sm font-bold text-[#f1f1f1]">
	// 					$68,680
	// 				</span>
	// 			</div>
	// 			<Divider />
	// 		</div>
	// 	);
	// };

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-center justify-between self-stretch">
				<span className="w-[250px] text-xs font-medium text-[#c6c6c6]">
					Name
				</span>
				<div className="flex w-[160px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Liquidity</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[160px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Volume (24h)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[100px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Fee (24h)</span>
					<ArrangeIcon />
				</div>
			</div>
			{/* <Divider />
      <Transaction />
      <Transaction />
      <Transaction />
      <Transaction /> */}
			<div className="w-full flex items-center justify-center text-base pt-3 text-[#c6c6c6] font-normal">
				No Pair!
			</div>
		</div>
	);
};

export const TopPairs = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const handleChange = (newCurrentPage, newPageSize) => {
		setCurrentPage(newCurrentPage);
		setPageSize(newPageSize);
	};
	return (
		<div className="flex w-full max-w-[1088px] flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
			<span className="self-stretch text-xl font-bold text-[#f1f1f1]">
				Pool ({totalItems})
			</span>
			<Divider />
			<div className="w-full md:hidden">
				<TransactionMobile />
			</div>
			<div className="hidden w-full md:flex">
				<TransactionDesktop />
			</div>
			{totalItems > 0 && (
				<div className="flex w-full items-center justify-center">
					<Pagination
						current={currentPage}
						pageSize={pageSize}
						total={totalItems}
						onChange={handleChange}
					/>
				</div>
			)}
		</div>
	);
};
