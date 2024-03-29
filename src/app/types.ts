export interface Token {
	chainKey: string;

	address: string;

	name: string;

	decimals: number;

	symbol: string;
}

export interface ILaunchpad {
	chainKey: string;

	address: string;

	name: string;

	owner: string;

	nft: string;

	tokenRaise: Token;

	tokenSale: Token;

	type: String;

	start: number;

	end: number;

	totalSale: string;

	totalRaise: string;

	minCommit: string;

	maxCommit: string;

	vestingTime: number[];

	vestingPercent: number[];

	logo: string;

	banner: string;

	socials_x: string;

	socials_telegram: string;

	socials_discord: string;

	socials_medium: string;

	socials_github: string;

	desc: string;
}

export interface IAirdrop {
	chainKey: string;

	address: string;

	name: string;

	tokenAirdrop: Token;

	type: String;

	start: number;

	end: number;

	totalAirdrop: string;

	totalAirdropAmount: string;

	vestingTime: number[];

	vestingPercent: number[];

	logo: string;

	banner: string;

	socials_x: string;

	socials_telegram: string;

	socials_discord: string;

	socials_medium: string;

	socials_github: string;

	desc: string;
}
