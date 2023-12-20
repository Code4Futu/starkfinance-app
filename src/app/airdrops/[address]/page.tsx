import { BASE_API } from "@/app/constants";
import Airdrop from "./components/Airdrop";
import { IAirdrop } from "@/app/types";

async function getAirdrop(params: { address: string }): Promise<IAirdrop> {
	const res = await fetch(`${BASE_API}/airdrops/${params.address}`, {
		next: { revalidate: 60 },
	});
	return res.json();
}

export default async function AirdropPage({
	params,
}: {
	params: { address: string };
}) {
	const airdrop = await getAirdrop(params);

	return <Airdrop airdrop={airdrop} />;
}
