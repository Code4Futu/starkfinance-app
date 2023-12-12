import Launchpad from "./components/Launchpad";

// export const dynamicParams = true;

// export async function generateStaticParams() {
// 	return [];
// }

async function getLaunchpad(params: { address: string }) {
	const res = await fetch(
		`https://launchpad-api.starkfinance.co/launchpads/${params.address}`,
		{ next: { revalidate: 60 } }
	);
	return res.json();
}

export default async function LaunchpadPage({
	params,
}: {
	params: { address: string };
}) {
	const launchpad = await getLaunchpad(params);

	return <Launchpad launchpad={launchpad} />;
}
