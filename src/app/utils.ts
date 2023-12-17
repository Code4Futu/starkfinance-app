import { LAUNCHPAD_STATUS } from "./constants";
import { RpcProvider } from "starknet";

export function numberWithCommas(x: number | string) {
	return x
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		.replace(/\.0$/, "");
}

// time in milliseconds
export function timeDiff(current: number, start: number, end: number) {
	let status = LAUNCHPAD_STATUS.END;
	if (current < start) status = LAUNCHPAD_STATUS.UPCOMING;
	if (current < end) status = LAUNCHPAD_STATUS.INPROGRESS;

	const diff =
		status === LAUNCHPAD_STATUS.UPCOMING ? start - current : end - current;
	let msec = diff;
	const d = Math.floor(msec / 1000 / 24 / 60 / 60);
	msec -= d * 1000 * 24 * 60 * 60;
	const h = Math.floor(msec / 1000 / 60 / 60);
	msec -= h * 1000 * 60 * 60;
	const m = Math.floor(msec / 1000 / 60);
	msec -= m * 1000 * 60;
	const s = Math.floor(msec / 1000);

	return { d, h, m, s, status };
}

export const statusToText = (status: LAUNCHPAD_STATUS | undefined) => {
	switch (status) {
		case LAUNCHPAD_STATUS.UPCOMING:
			return "open in:";

		case LAUNCHPAD_STATUS.INPROGRESS:
			return "end after:";

		default:
			return "";
	}
};
