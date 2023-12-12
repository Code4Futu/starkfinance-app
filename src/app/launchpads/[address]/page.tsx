import { BASE_API } from "@/app/constants";
import Launchpad from "./components/Launchpad";
import { ILaunchpad } from "@/app/types";

// export const dynamicParams = true;

// export async function generateStaticParams() {
// 	return [];
// }

async function getLaunchpad(params: { address: string }): Promise<ILaunchpad> {
	const res = await fetch(`${BASE_API}/launchpads/${params.address}`, {
		next: { revalidate: 60 },
	});
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
