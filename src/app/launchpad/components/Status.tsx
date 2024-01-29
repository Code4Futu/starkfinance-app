"use client";

import { LAUNCHPAD_STATUS } from "@/app/constants";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";

const statusToColor = (status: LAUNCHPAD_STATUS | undefined) => {
	switch (status) {
		case LAUNCHPAD_STATUS.UPCOMING:
			return {
				text: "text-[#61B3FF]",
				bg: "status-upcoming-bg",
			};

		case LAUNCHPAD_STATUS.INPROGRESS:
			return {
				text: "text-[#6CFF7B]",
				bg: "status-inprogress-bg",
			};

		case LAUNCHPAD_STATUS.END:
			return {
				text: "text-[#FF6C6C]",
				bg: "status-end-bg",
			};

		default:
			return {
				text: "",
				bg: "",
			};
	}
};

export default function Status({
	status,
}: {
	status: LAUNCHPAD_STATUS | undefined;
}) {
	const { text, bg } = useMemo(() => statusToColor(status), [status]);

	return !status ? (
		<div className="skeleton w-[80px] h-[30px] rounded-2xl bg-[#2D313E]" />
	) : (
		<div
			className={clsx("flex items-center gap-1 py-1.5 px-3 rounded-2xl", bg)}
		>
			<div className="w-2 h-2 relative">
				<Image src={`/svg/${status}.svg`} alt={`${status}`} fill sizes="any" />
			</div>
			<div className={clsx("text-[12px] capitalize font-medium", text)}>
				{status}
			</div>
		</div>
	);
}
