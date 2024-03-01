"use client";
import { useEffect, useState } from "react";
import { LAUNCHPAD_STATUS } from "../constants";
import { timeDiffEnd } from "../utils";

export default function CountDownEnd({
	start,
	split = true,
}: {
	start: number | undefined;
	split?: boolean;
}) {
	const [timeStats, setTimeStats] = useState<{
		d: number;
		h: number;
		m: number;
		s: number;
		status: undefined | LAUNCHPAD_STATUS;
	}>({
		d: 0,
		h: 0,
		m: 0,
		s: 0,
		status: undefined,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (!start) return;
			const time = timeDiffEnd(Date.now(), start * 1000);
			setTimeStats(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [start]);

	if (typeof timeStats.status === "undefined")
		return <div className="skeleton min-w-full h-6 bg-[#2D313E]"></div>;

	return (
		<>
			<div className="flex items-center gap-[2px]">
				<span className="countdown font-medium text-[14px] text-[#F1F1F1]">
					<span
						// @ts-expect-error
						style={{ "--value": timeStats?.d ?? 0 }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">days</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center gap-[2px]">
				<span className="countdown font-medium text-[14px] text-[#F1F1F1]">
					<span
						// @ts-expect-error
						style={{ "--value": timeStats?.h ?? 0 }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">hrs</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center gap-[2px]">
				<span className="countdown font-medium text-[14px] text-[#F1F1F1]">
					<span
						// @ts-expect-error
						style={{ "--value": timeStats?.m ?? 0 }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">mins</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center gap-[2px]">
				<span className="countdown font-medium text-[14px] text-[#F1F1F1]">
					<span
						// @ts-expect-error
						style={{ "--value": timeStats?.s ?? 0 }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">secs</div>
			</div>
		</>
	);
}
