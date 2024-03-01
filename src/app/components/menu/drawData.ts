export const drawerDataMobile = [
	{
		id: 1,
		title: "Home",
		href: "/",
		open: false,
		items: [],
	},
	{
		id: 2,
		title: "Exchange",
		open: false,
		// action: () => {},
		items: [
			{
				title: "Swap",
				path: "/exchange/swap",
			},
			{
				title: "Pools",
				path: "/exchange/liquidity",
			},
			{
				title: "Overview",
				path: "/exchange/overview",
			},
		],
	},
	{
		id: 3,
		title: "Locking",
		open: false,
		items: [
			{
				title: "Create Lock",
				path: "/launchpad/locking",
			},
			{
				title: "Token",
				path: "/launchpad/locking/token",
			},
			{
				title: "Liquidity",
				path: "/launchpad/locking/liquidity",
			},
		],
	},
	{
		id: 4,
		title: "Launchpad",
		open: false,
		items: [
			{
				title: "Launchpad List",
				path: "/launchpad/launchpad-list",
			},
			{
				title: "Airdrop List",
				path: "/launchpad/airdrop-list",
			},
			{
				title: "Your Pools",
				path: "/launchpad/your-pools",
			},
		],
	},
	{
		id: 5,
		title: "Market",
		open: false,
		items: [],
	},
	{
		id: 6,
		title: "Documentation",
		open: false,
		items: [],
	},
];

export const drawerData = [
	{
		id: 1,
		title: "Home",
		href: "/",
		open: false,
		items: [],
	},
	{
		id: 2,
		title: "Exchange",
		open: false,
		// action: () => {},
		items: [
			{
				title: "Swap",
				path: "/exchange/swap",
			},
			{
				title: "Pools",
				path: "/exchange/liquidity",
			},
			{
				title: "Overview",
				path: "/exchange/overview",
			},
			{
				title: "Staking",
				path: "/exchange/staking",
			},
			{
				title: "Bridge",
				path: "/exchange/bridge",
			},
		],
	},
	{
		id: 3,
		title: "Locking",
		open: false,
		// action: () => {},
		items: [
			{
				title: "Create Lock",
				path: "/launchpad/locking",
			},
			{
				title: "Token",
				path: "/launchpad/locking/token",
			},
			{
				title: "Liquidity",
				path: "/launchpad/locking/liquidity",
			},
		],
	},
	{
		id: 4,
		title: "Launchpad",
		open: false,
		// action: () => {},
		items: [
			{
				title: "Launchpad List",
				path: "/launchpad/launchpad-list",
			},
			{
				title: "Airdrop List",
				path: "/launchpad/airdrop-list",
			},
			{
				title: "Your Pools",
				path: "/launchpad/your-pools",
			},
		],
	},
	{
		id: 5,
		title: "Market",
		open: false,
		// action: () => {},
		items: [
			{
				title: "Collections",
				path: "/marketplace",
			},
			{
				title: "Activity",
				path: "/marketplace/activities",
			},
			{
				title: "Events",
				path: "/marketplace/events",
			},
			{
				title: "Profile",
				path: "/marketplace/profile",
			},
		],
	},
	{
		id: 6,
		title: "Documentation",
		open: false,
		items: [],
	},
];

export const socialLink = {
	discord: "https://discord.gg/starkfinance",
	tw: "https://twitter.com/starkfinance",
	teleChannel: "https://t.me/starksportchanel",
	teleGlobal: "https://t.me/starksportglobal",
	medium: "https://starkfinance.medium.com",
};

export const socialData = [
	{
		id: 7,
		title: "Socials",
		open: false,
		items: [
			{
				title: "Telegram",
				path: socialLink.teleGlobal,
			},
			{
				title: "Discord",
				path: socialLink.discord,
			},
			{
				title: "X.com",
				path: socialLink.tw,
			},
			{
				title: "Medium",
				path: socialLink.medium,
			},
			{
				title: "Github",
				path: socialLink.teleChannel,
			},
		],
	},
];
