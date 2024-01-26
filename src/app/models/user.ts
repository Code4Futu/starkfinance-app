export type ProfileFilter =
	| "collected"
	| "listing"
	| "offersMade"
	| "offersReceived"
	| "activity";

export type SelectFilter =
	| "newest"
	| "oldest"
	| "highToLow"
	| "lowToHigh";

export type ProfileDetailFilter =
	| "information"
	| "priceHistory"
	| "offers"
	| "activity";

export interface IUserTrait {
	label: string;
	name: string;
	rate: number;
}
export interface IProfileFilter {
	label: string;
	value: ProfileFilter;
}
export interface ISelectFilter {
	label: string;
	value: SelectFilter;
}
export interface IProfileDetailFilter {
	label: string;
	value: ProfileDetailFilter;
}

export interface IUserProfile {
	name: string;

	avatar: string;

	job: string;

	description: string;
}

export const userTraitMockup =
	(): IUserTrait[] => [
		{
			label: "Trait 01",
			name: "Trait Name",
			rate: 0,
		},
		{
			label: "Trait 02",
			name: "Trait Name",
			rate: 0,
		},
		{
			label: "Trait 03",
			name: "Trait Name",
			rate: 0,
		},
		{
			label: "Trait 04",
			name: "Trait Name",
			rate: 0,
		},
		{
			label: "Trait 05",
			name: "Trait Name",
			rate: 0,
		},
	];

export const selectFilterMockup =
	(): ISelectFilter[] => [
		{
			label: "Newest",
			value: "newest",
		},
		{
			label: "Oldest",
			value: "oldest",
		},
		{
			label: "Price high - low",
			value: "highToLow",
		},
		{
			label: "Price low - high",
			value: "lowToHigh",
		},
	];

export const profileFilterMockup =
	(): IProfileFilter[] => [
		{
			label: "Collected",
			value: "collected",
		},
		{
			label: "Listing",
			value: "listing",
		},
		{
			label: "Offers Made",
			value: "offersMade",
		},
		{
			label: "Offers Received",
			value: "offersReceived",
		},
		{
			label: "Activity",
			value: "activity",
		},
	];

export const profileDetailFilterMockup =
	(): IProfileDetailFilter[] => [
		{
			label: "Information",
			value: "information",
		},
		{
			label: "Price history",
			value: "priceHistory",
		},
		{
			label: "Offers",
			value: "offers",
		},
		{
			label: "Activity",
			value: "activity",
		},
	];

export const userProfileMockup =
	(): IUserProfile[] => [
		{
			name: "Pepe Gym",
			avatar:
				"https://s3-alpha-sig.figma.com/img/2409/f873/3a5f9dcca71f6e2857aa568256b2a4ef?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TR-NpBtzq~ftzbg3yZHmOt2QNjva~Uj-1sKxznMpmQupD~vFZCdFLLyWnBJonkypgIXm8jl2KxW4azIBoQLIeOsQjwgeTmfOGk9vyr~vEKKuAxvV7QH1tXqFfQp~na~2U0GR~MkQ0L2OybY3A~kVV1l5q~xQHFdXshaWselvOx9iKMJXw-Wjsh2siL6m~7e5MZ4fca2HxZU1Yb7ohRNX7j2Nhb0Z4FM235IXNu2Qch3gB5zuIhoP7iT486B5RZKzLmI0nEjNmzLqGdEy1J7aDX3ypTtmEHeT8waQj37S1llhU0yrb0GAvJQZNh~aFDNDYHCiybZuS3ZSBtRiiTBG7g__",
			job: "Artist",
			description:
				"Pepe Gym is a contemporary portrait artist from Viet Nam. He works can be found internationally from digital to physical works.",
		},
		{
			name: "Pepe Gym",
			avatar:
				"https://s3-alpha-sig.figma.com/img/2409/f873/3a5f9dcca71f6e2857aa568256b2a4ef?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TR-NpBtzq~ftzbg3yZHmOt2QNjva~Uj-1sKxznMpmQupD~vFZCdFLLyWnBJonkypgIXm8jl2KxW4azIBoQLIeOsQjwgeTmfOGk9vyr~vEKKuAxvV7QH1tXqFfQp~na~2U0GR~MkQ0L2OybY3A~kVV1l5q~xQHFdXshaWselvOx9iKMJXw-Wjsh2siL6m~7e5MZ4fca2HxZU1Yb7ohRNX7j2Nhb0Z4FM235IXNu2Qch3gB5zuIhoP7iT486B5RZKzLmI0nEjNmzLqGdEy1J7aDX3ypTtmEHeT8waQj37S1llhU0yrb0GAvJQZNh~aFDNDYHCiybZuS3ZSBtRiiTBG7g__",
			job: "Artist",
			description:
				"Pepe Gym is a contemporary portrait artist from Viet Nam. He works can be found internationally from digital to physical works.",
		},
	];
