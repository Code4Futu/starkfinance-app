import { twMerge } from "tailwind-merge";
import { CopyIcon } from "../icons";
import moment from "moment";

export const TransactionRow = ({ idx, item }) => {
	// Handle short address type
	const shortAddress = (address) => {
		if (address) {
			// console.log('Current address:', address);
			const firstDigits = address.slice(0, 6);
			const lastDigits = address.slice(-4);

			const resultAddress = firstDigits + "..." + lastDigits;
			return resultAddress;
		}
	};

	const openInNewTab = (url) => {
		var win = window.open(url, "_blank");
		win.focus();
	};

	function formatPrice3(price) {
		// console.log('🚀 ~ file: index.js:1002 ~ formatPrice3 ~ price:', price);
		let formattedPrice = 0;
		if (price > 1) {
			formattedPrice = Number(price).toFixed(2);
		} else {
			formattedPrice = Number(price).toFixed(6);
		}
		return parseFloat(formattedPrice);
	}

	const convertToLocalTime = (timestamp) => {
		// Create a Date object from the given timestamp
		const date = new Date(timestamp);

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

	return (
		<div className="flex w-full items-start">
			<div
				className={twMerge(
					"grid grid-cols-5 w-full items-start justify-between px-3 py-4",
					idx % 2 === 0 && "bg-[#232631]"
				)}
			>
				<div className="flex items-start gap-[10px]">
					<span
						className="text-base font-normal text-[#3E73FC] cursor-pointer"
						onClick={() => {
							openInNewTab(`https://starkscan.co/tx/` + item.tx_hash);
						}}
					>
						{shortAddress(item.tx_hash)}
					</span>
					<CopyIcon />
				</div>
				<span className=" text-base font-normal text-[#f1f1f1]">
					{formatPrice3(item.amount_in) + " " + item.token_in_symbol}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1]">
					{formatPrice3(item.amount_out) + " " + item.token_out_symbol}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1]">
					{shortAddress(item.sender_address)}
				</span>
				<span className=" text-base font-normal text-[#f1f1f1]">
					{convertToLocalTime(item.transaction_timestamp)}
					{/* {moment(item.transaction_timestamp).subtract(6, "days").calendar()} */}
				</span>
			</div>
		</div>
	);
};
