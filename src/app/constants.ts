import { RpcProvider } from "starknet";

// export const BASE_API = "http://localhost:5000";
export const BASE_API = "https://launchpad-api.starkfinance.co";

export enum LAUNCHPAD_STATUS {
	UPCOMING = "upcoming",
	INPROGRESS = "inprogress",
	END = "ended",
}

export enum LAUNCHPAD_TYPE {
	PUBLIC = "public",
	PRIVATE = "private",
}
