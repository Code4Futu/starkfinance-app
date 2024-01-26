import Breadcrumbs from "@/app/components/Breadcrumbs";
import { mockupCollections } from "@/app/models/collections";
import { CollectionDetail } from "./components";

export default function EventPage({
	params,
}: {
	params: { address: string };
}) {
	const collection = mockupCollections().find(
		(item) => item.address === params.address
	);
	if (!collection) return null;

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Marketplace",
						icon: "/svg/market.svg",
						url: "/",
					},
					{
						text: "Collections",
						url: "marketplace/collections",
					},
					{ text: collection.name },
				]}
			/>
			<div className="flex pt-6 flex-col gap-3 md:gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
				<CollectionDetail
					collection={collection}
				/>
			</div>
		</div>
	);
}
