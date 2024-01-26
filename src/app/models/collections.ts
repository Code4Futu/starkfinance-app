export type CollectionOrder =
	| "volume"
	| "trending";

export type CollectionCategory =
	| "art"
	| "sport"
	| "gaming"
	| "membership"
	| "pfps"
	| "music"
	| "photography"
	| "all";

export type CollectionDetailTab =
	| "overview"
	| "item"
	| "activity";

export type CollectionChain = "starknet";

export interface CollectionChainInterface {
	label: string;
	value: CollectionChain;
}

export interface Category {
	label: string;
	value: CollectionCategory;
}

export interface ICollectionRelated {
	link: string;
	avatar: string;
}

export interface ICollectionDetailTab {
	label: string;
	value: CollectionDetailTab;
}

export interface ICollectionOwner {
	address: string;

	chainKey: CollectionChain;

	name: string;

	owner: string;

	status: CollectionStatus;

	totalItem: string | number;

	totalVolume: number;

	floorPrice: number;

	bestOffer: number;

	listed: number;

	logo: string;

	avatar: string;

	banner: string;

	minted: number;

	price: number;

	start: number;

	end: number;

	related: ICollectionRelated[];
}

export type CollectionStatus =
	| "Live"
	| "Upcoming"
	| "Ended";

export enum COLLECTION_STATUS {
	LIVE = "Live",
	UPCOMING = "Upcoming",
	ENDED = "Ended",
}

export const collectionDetailTab =
	(): ICollectionDetailTab[] => [
		{
			label: "Overview",
			value: "overview",
		},
		{
			label: "Item",
			value: "item",
		},
		{
			label: "Activity",
			value: "activity",
		},
	];

export const collectionChainList =
	(): CollectionChainInterface[] => [
		{
			label: "Starknet",
			value: "starknet",
		},
	];

export const collectionCategories =
	(): Category[] => [
		{
			label: "Art",
			value: "art",
		},
		{
			label: "Sports Collectibles",
			value: "sport",
		},
		{
			label: "Gaming",
			value: "gaming",
		},
		{
			label: "Memberships",
			value: "membership",
		},
		{
			label: "PFPs",
			value: "pfps",
		},
		{
			label: "Music",
			value: "music",
		},
		{
			label: "Photography",
			value: "photography",
		},
	];

export const mockupCollections =
	(): ICollectionOwner[] => [
		{
			address: "123456",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123457",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123458",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123459",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123460",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123461",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
		{
			address: "123462",

			chainKey: "starknet",

			name: "Starksport NFT",

			owner: "STARKFINANCE",

			status: "Live",

			totalItem: 3000,

			totalVolume: 68.68,

			floorPrice: 0.02,

			bestOffer: 0.01,

			listed: 5,

			logo: "https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",

			avatar:
				"https://s3-alpha-sig.figma.com/img/5445/b03e/d359f55693b3b8fa545c5602272a5522?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dpSHZrwiLUszkqXMhlv~agZFetXrgx7sUEJM-qWsUDZjIQOobDILzfasJxtgN123fdR1eEX2UkhGyqlvHacHnIDfrdpEPlxqNyFce8YZOkot03iKaNa7bzRKXNg0KWB3Tsh2jqvZOrgPKGXgQ8kiZkC6EdEUVkIY78RwYIa0CgQ2awZzVW3B5rRcLljCWOiPWB7cIFeH2p-b7ZvdyPrRmjYsiUQv9b18eoTxd7IwUg7U2YG9C3Ma2LEvOXZtGuwEcURQSh8t8bTdULXs8TMRK2IhhwDdOKZgKp5zovLamQJf7h10sp3EMuaTZ-B~xaJjKIfPu-hXbK~4mwiJePJ5kA__",

			banner:
				"https://s3-alpha-sig.figma.com/img/1402/3915/b8d750a972fcb2e876993c70ab5d639f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ifv5YeLGRfWYtcJxvG6~Bv7pFgAlOu4xyWHvgd5PIZHpiBHs63zQDIIX8xUTD9ns08nunzUKQ8zmdUlZE2VcretcqmhCMhTfFoPjyDqNzzwoeshyuaUJBJMsdfhkZgcpPehPw9Ul~pake10UDXnwmJug3T6PwS0U8qJl~tEvCL0C4FgtU6wDrf7q~33IG4ZSk4~Hj97Ouw1N~qCnkA-YVn1-YFMZEZztn8K3PUTnn7FgCiupbVryYv75tlY4UzUUguNZG~o0gabDSfmCUeyrmLUKPK23EFWS5TAP6wJ3gmlpGWK2roNJSfvq9BLMsrAAuBZnXrpklWhRnTOSMbr9Cg__",

			minted: 810,

			price: 0.0013,

			start: 1706187600,

			end: 1707212800,

			related: [
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/a17a/06c5/23c03efe0b3322d4af005293aee76510?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vgh4sunAa5NYVdELYZMJGQMPt1LE3CtmCfH0X6sr8HlPFdEfs6p3v7kaitJRayVQm0ux0U4rEA07xvdv3OU60D1Cmk4ViPTfpG56Q-s8Rvz~fNubySQlVpgIazJc9I1q1HPKWJ6U4okAdLpx3ZNmQ5jI6p62Vsi679ZI9097etTil6h5sTCWv29VE9OLKzQGfqYE60R679qKwHS7x-BRrP-tnD0KfwZMXSBenwPoOcGsNClImHewo2HmDfri5Ury4FrMTLKh2yEDsoW5l8CHqh2ru~3KM6n8XQIeEWZXd6fDVhFNzx6O02I1FZZH9dFgcC0qX7C-4SoFbjc3-1ARHw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/59f6/a26e/0eb1fc984f98add16d074bd0aea69495?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b3-nE1oGAuuID14Yp5hlY7KjKSTFnWqYp7EtxzWih~DRN93CbZiVhOXsg1UbPFcmjYRLgeMwxxqSQR5lm3O0mM0rMWbUkFBq7ERDUVp7NpQcsovrKVTqJLF6GVl3GUNS8Se-jB0ryY-TxDA~bzMGwqdEGK6FRZrbhazSS7sOj7FjE23JmqTcjyH31kFk4ztNeLEbTx6nMN89A16p7jKWTiJsK-6pMgc4G1sJnKfJl5ni3Esu-kdwGHDA-dNdlcK4w~q99CL2Q0b-g3goI3erlRILU8UpjwgXqk0BBB1ukdI6JQY5s7Q4LifaI2wfRgJwhiXewFP8SHei21md0jDIew__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/3759/1d56/8d1ac5f838b7a52b928e7e6f216c1310?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K0m2a03ybKYHCaDImc-Tl4ifFyX4jgSWFR7ApGKzbHWuRfECiNPw-ucpvl2EHgjnw9sXwGfqe1JCdf5OE279fmf-JaeQjcxiAgRH4u-jW3M-zQ0K0~c7KH2K-r1hOpobWeJHk4UUJo1Wl1q~tTw8mikATTxrRKxxylXtiNv7GdsQ1iGvqYoMq1pZ0qQMKuVs5m-y1JIQfyN7aZVtfzPdJbzt-wzYB9wa4b1uyfaXWdB24gV7XTJziFJ3E1cfyePWnBuAOdw5T3Dgp2k-wjx6OST~oHGl3hIW2C3tXJcpRCCmpgO4HcLofv0R13vKM9ddQf~Zy6NYDLeU8UbEJvqGxw__",
				},
				{
					link: "",
					avatar:
						"https://s3-alpha-sig.figma.com/img/0a80/e9f8/9436a9cad5bf685bfa07bdfe324640b5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E4Otb~cfFTYXJoYUMIj5I~2yv65O~YEmJ3L-YrY8GeC0yLTZXWtvzvaT61t5kRZvLR7PWdIy~IkPHkDmxh6qiiTLUoUQxo4cj8vOGcrXeZwGjU81RHKW6OH5IdIVNtdEWAUmfjjhn48lJc1ommSwTH89nqHUshICDeDKq94u3Nwm9mBJvV0HtHo4m8SnCOCkHsIOMTf~qimUdLh-L025XdvQG~75NGPSzl0W4-CiJhKIir-BofeziD6mMt1zmMpMPcVI7TvK2xJBC6mm5CvXx~q7w3bhv4WqJrxVauojPONmVcFCjnZHROrxt54iz5oLDB9HrIKYJwGg3hvqJE9Uog__",
				},
			],
		},
	];
