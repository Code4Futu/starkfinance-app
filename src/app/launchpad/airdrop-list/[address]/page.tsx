import { BASE_API } from "@/app/constants";
import Airdrop from "./components/Airdrop";
import { IAirdrop } from "@/app/types";

export async function generateStaticParams() {
	const airdrops: IAirdrop[] = await fetch(`${BASE_API}/airdrops/`, {
		next: { revalidate: 60 },
	}).then((r) => r.json());

	return airdrops.map((a) => a.address);
}

async function getAirdrop(params: { address: string }): Promise<IAirdrop> {
	const res = await fetch(`${BASE_API}/airdrops/${params.address}`);
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
