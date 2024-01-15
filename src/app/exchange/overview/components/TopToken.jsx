import { Pagination } from "antd";
import icons from "@/app/exchange/assets/icons";
import { Divider } from "@/app/exchange/components/Divider";
import { ArrangeIcon } from "@/app/exchange/liquidity/icons";
import { useState } from "react";

const TopTokenMobile = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const handleChange = (newCurrentPage, newPageSize) => {
		setCurrentPage(newCurrentPage);
		setPageSize(newPageSize);
	};

	// const Transaction = () => {
	//   return (
	//     <div
	//       className="flex flex-col items-start gap-3 self-stretch"
	//       onClick={() => navigation("/overview/token")}
	//     >
	//       <div className="flex items-center gap-3 rounded-[36px] border-[1px] border-[#2D313E] px-4 py-2">
	//         <img
	//           src={icons.v2.logo_noname}
	//           alt="starknet logo"
	//           className="h-6 w-6"
	//         />
	//         <div className="flex items-center gap-2">
	//           <span className="text-sm font-bold text-[#f1f1f1]">SFN</span>
	//           <span className="text-xs font-medium text-[#c6c6c6]">
	//             StarkFinance
	//           </span>
	//         </div>
	//       </div>
	//       <div className="flex items-start justify-between self-stretch">
	//         <span className="w-[70px] text-sm font-bold text-[#f1f1f1]">
	//           $1.00
	//         </span>
	//         <span className="w-[70px] text-sm font-bold text-[#6CFF7B]">
	//           ↑68%
	//         </span>
	//         <span className="w-[70px] text-sm font-bold text-[#f1f1f1]">
	//           $68,680
	//         </span>
	//         <span className="w-[70px] text-sm font-bold text-[#f1f1f1]">
	//           $68.68m
	//         </span>
	//       </div>
	//     </div>
	//   );
	// };
	return (
		<div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
			<div className="flex items-center justify-between self-stretch">
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Price</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Price change (24h)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Volume (24hr)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[70px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Market cap</span>
					<ArrangeIcon />
				</div>
			</div>
			{/* <Divider />
      <Transaction />
      <Divider />
      <Transaction />
      <Divider />
      <Transaction /> */}
			{totalItems > 0 ? (
				<>
					<Divider />
					<Transaction />
					<Divider />
					<Transaction />
					<Divider />
					<Transaction />
				</>
			) : (
				<div className="w-full flex items-center justify-center text-base pt-3 text-[#c6c6c6] font-normal">
					No Transaction!
				</div>
			)}
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

const TopTokenDesktop = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);

	const handleChange = (newCurrentPage, newPageSize) => {
		setCurrentPage(newCurrentPage);
		setPageSize(newPageSize);
	};

	// const Transaction = () => {
	//   return (
	//     <div
	//       className="flex items-center justify-between self-stretch py-3"
	//       onClick={() => navigation("/overview/token")}
	//     >
	//       <div className="flex w-[220px]">
	//         <div className="flex items-center gap-3 rounded-[36px] border-[1px] border-[#2D313E] px-4 py-2">
	//           <img
	//             src={icons.v2.logo_noname}
	//             alt="starknet logo"
	//             className="h-6 w-6"
	//           />
	//           <div className="flex flex-col items-start justify-center">
	//             <span className="text-sm font-bold text-[#f1f1f1]">SFN</span>
	//             <span className="text-xs font-medium text-[#c6c6c6]">
	//               StarkFinance
	//             </span>
	//           </div>
	//         </div>
	//       </div>
	//       <span className="w-[100px] text-sm font-bold text-[#f1f1f1]">
	//         $1.00
	//       </span>
	//       <span className="w-[120px] text-sm font-bold text-[#6CFF7B]">↑68%</span>
	//       <span className="w-[100px] text-sm font-bold text-[#f1f1f1]">
	//         $68,680
	//       </span>
	//       <span className="w-[100px] text-sm font-bold text-[#f1f1f1]">
	//         $68,680,000
	//       </span>
	//     </div>
	//   );
	// };

	return (
		<div className="flex w-full flex-col items-start gap-3 rounded-3xl bg-[#1A1C24] p-6">
			<div className="flex items-center justify-between self-stretch">
				<span className="w-[220px] text-xs font-medium text-[#c6c6c6]">
					Name
				</span>
				<div className="flex w-[100px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Price</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[120px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Price change (24h)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[100px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">
						Volume (24hr)
					</span>
					<ArrangeIcon />
				</div>
				<div className="flex w-[100px] items-center gap-1">
					<span className="text-xs font-medium text-[#c6c6c6]">Market cap</span>
					<ArrangeIcon />
				</div>
			</div>
			{/* <Divider />
      <Transaction />
      <Divider />
      <Transaction />
      <Divider />
      <Transaction /> */}
			{totalItems > 0 ? (
				<>
					<Divider />
					<Transaction />
					<Divider />
					<Transaction />
					<Divider />
					<Transaction />
				</>
			) : (
				<div className="w-full flex items-center justify-center text-base pt-3 text-[#c6c6c6] font-normal">
					No Transaction!
				</div>
			)}
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

export const TopToken = () => {
	return (
		<div className="flex w-full max-w-[1088px]">
			<div className="w-full md:hidden">
				<TopTokenMobile />
			</div>
			<div className="hidden w-full md:flex">
				<TopTokenDesktop />
			</div>
		</div>
	);
};
