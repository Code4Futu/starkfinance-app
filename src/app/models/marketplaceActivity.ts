export enum ACTIVITY_STATUS {
	SALE = "Sale",
	LISTING = "Listing",
	OFFER = "Offer",
	TRANSFER = "Transfers",
	AUCTION = "Auction",
	BID = "Bid",
}

export type ActivityEvent =
	| "All"
	| "Sale"
	| "Listing"
	| "Offer"
	| "Transfers"
	| "Auction"
	| "Bid";

interface Event {
	label: string;
	value: ActivityEvent;
}

export const eventTypeList = (): Event[] => [
	{
		label: "All",
		value: "All",
	},
	{
		label: "Sale",
		value: "Sale",
	},
	{
		label: "Listing",
		value: "Listing",
	},
	{
		label: "Offer",
		value: "Offer",
	},
	{
		label: "Transfers",
		value: "Transfers",
	},
	{
		label: "Auction",
		value: "Auction",
	},
	{
		label: "Bid",
		value: "Bid",
	},
];

export type CollectionActivity =
	| "VN1"
	| "VN2"
	| "VN3";

export interface CollectionFilter {
	label: string;
	total: number;
	value: CollectionActivity;
}

export interface boardData {
	action: string;
	label: string;
	collectionName: string;
}

export const collectionFilterList =
	(): CollectionFilter[] => [
		{
			label: "Vietnam1 Cypher Collections",
			total: 10000,
			value: "VN1",
		},
		{
			label: "Vietnam2 Cypher Collections",
			total: 10000,
			value: "VN2",
		},
		{
			label: "Vietnam3 Cypher Collections",
			total: 10000,
			value: "VN3",
		},
	];

export const boardDataMockup =
	(): boardData[] => [
		{
			action: "Sale",
			label: "VN Soldier #6868",
			collectionName:
				"Vietnam Cypher Collections",
		},
		{
			action: "Listing",
			label: "Starksport #6868",
			collectionName: "Starksport NFT",
		},
		{
			action: "Offer",
			label: "StarkRock NFT #6868",
			collectionName: "StarkRock NFT",
		},
		{
			action: "Transfers",
			label: "Starkpunks #6868",
			collectionName: "Starkpunks NFT",
		},
		{
			action: "Auction",
			label: "VN Soldier #6868",
			collectionName:
				"Vietnam Cypher Collections",
		},
		{
			action: "Bid",
			label: "VN Soldier #6868",
			collectionName:
				"Vietnam Cypher Collections",
		},
	];
