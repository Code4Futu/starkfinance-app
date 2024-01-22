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
			// {
			// 	title: "Swap",
			// 	path: "/exchange/swap",
			// },
			// {
			// 	title: "Pools",
			// 	path: "/exchange/liquidity",
			// },
			// {
			// 	title: "Overview",
			// 	path: "/exchange/overview",
			// },
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
			// {
			// 	title: "Swap",
			// 	path: "/exchange/swap",
			// },
			// {
			// 	title: "Pools",
			// 	path: "/exchange/liquidity",
			// },
			// {
			// 	title: "Overview",
			// 	path: "/exchange/overview",
			// },
			// {
			//   title: "Staking",
			//   path: route.comingSoon,
			// },
			// {
			//   title: "Bridge",
			//   path: route.swapBridge,
			// },
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
				path: "/launchpad/launchpad-list/your-pools",
			},
		],
	},
	{
		id: 5,
		title: "Market",
		open: false,
		// action: () => {},
		items: [
			// {
			//   title: "Collections",
			//   path: route.home,
			// },
			// {
			//   title: "Activity",
			//   path: route.home,
			// },
			// {
			//   title: "Events",
			//   path: route.home,
			// },
			// {
			//   title: "Profile",
			//   path: route.home,
			// },
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
	discord: "https://discord.com/invite/starksport",
	tw: "https://twitter.com/starkfinance",
	teleChannel: "https://t.me/starksportchanel",
	teleGlobal: "https://t.me/starksportglobal",
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
				path: socialLink.teleChannel,
			},
			{
				title: "Github",
				path: socialLink.teleChannel,
			},
		],
	},
];
