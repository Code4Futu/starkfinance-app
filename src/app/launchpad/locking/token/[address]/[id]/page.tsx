import { BASE_API } from "@/app/constants";
import { ILockingPool } from "@/app/types";
import LockRecordDetail from "../components/LockRecordDetail";

async function getLockingRecord(params: {
	address: string;
	id: string;
}): Promise<ILockingPool> {
	const res = await fetch(
		`${BASE_API}/locking/${params.address}/${params.id}`,
		{
			next: { revalidate: 60 },
		}
	);
	return res.json();
}

export default async function LockingRecordPage({
	params,
}: {
	params: { address: string; id: string };
}) {
	const lock = await getLockingRecord(params);

	return <LockRecordDetail lock={lock} />;
}
