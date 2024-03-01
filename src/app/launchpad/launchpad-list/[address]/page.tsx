"use client";
import { BASE_API } from "@/app/constants";
import Launchpad from "./components/Launchpad";
import { ILaunchpad } from "@/app/types";
import useSWR from "swr";
import axios from "axios";

export default function LaunchpadPage({
	params,
}: {
	params: { address: string };
}) {
	const { data: launchpad } = useSWR<ILaunchpad>(
		["LaunchpadDetailPage", params.address],
		async () => {
			const { data } = await axios.get<ILaunchpad>(
				`${BASE_API}/launchpads/${params.address}`
			);
			return data;
		}
	);

	return <Launchpad launchpad={launchpad} />;
}
