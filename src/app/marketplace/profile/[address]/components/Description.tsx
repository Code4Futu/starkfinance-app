import { Divider } from "@/app/components/Divider";

export const Description = () => {
	return (
		<div className="w-full flex flex-col items-start p-6 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]">
			<div className="w-full flex flex-col items-start gap-3 self-stretch">
				<span className="text-xl font-bold leading-[23px]">
					Description
				</span>
				<Divider />
			</div>
			<span className="text-sm text-[#c6c6c6]">
				THE VIETNAM CYPHER COLLECTION is a
				collection of up to 10,000 Vietnamese
				Soldiers that can only be minted in a
				public sale at the Starkfinance market.
			</span>
		</div>
	);
};
