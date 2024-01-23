import { BASE_API } from "@/app/constants";
import LocksOfToken from "./components/LocksOfToken";
import { ILockingPool } from "@/app/types";

async function getLocksOfToken(params: {
	address: string;
}): Promise<ILockingPool[]> {
	const res = await fetch(`${BASE_API}/locking/${params.address}`, {
		next: { revalidate: 60 },
	});
	return res.json();
}

export default async function AirdropPage({
	params,
}: {
	params: { address: string };
}) {
	const locks = await getLocksOfToken(params);

	return <LocksOfToken locks={locks} />;
}
