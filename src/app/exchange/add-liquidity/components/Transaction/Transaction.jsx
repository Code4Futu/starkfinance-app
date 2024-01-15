import moment from "moment";
import { Divider } from "@/app/exchange/components/Divider";
import { CopyIcon } from "../icons";

export const Transaction = ({ item }) => {
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

		return moment(`${year}${month}${day}`, "YYYYMMDD").fromNow();
	};

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex flex-col items-start gap-3 self-stretch py-[6px]">
				<div className="flex items-center gap-[10px]">
					<span
						className="text-sm font-normal text-[#3E73FC] cursor-pointer"
						onClick={() => {
							openInNewTab(`https://starkscan.co/tx/` + item.tx_hash);
						}}
					>
						{shortAddress(item.tx_hash)}
					</span>
					<CopyIcon />
				</div>
				<div className="flex items-tart justify-between self-stretch">
					<div className="flex flex-col gap-3 w-[105px]">
						<span className="text-sm font-bold text-[#F1F1F1]">
							{formatPrice3(item.amount_in) + " " + item.token_in_symbol}
						</span>
						<span className="text-sm font-normal text-[#C6C6C6]">
							{shortAddress(item.sender_address)}
						</span>
					</div>
					<span className="text-sm font-bold text-[#F1F1F1]">→</span>
					<div className="flex flex-col gap-3 w-[105px]">
						<span className="text-sm font-bold text-[#F1F1F1] text-right">
							{formatPrice3(item.amount_out) + " " + item.token_out_symbol}
						</span>
						<span className="text-sm font-normal text-[#C6C6C6] text-right">
							{convertToLocalTime(item.transaction_timestamp)}
						</span>
					</div>
				</div>
			</div>
			<Divider />
		</div>
	);
};
