export default function RawCountDown({
	d,
	h,
	m,
	s,
	split = true,
}: {
	d: number;
	h: number;
	m: number;
	s: number;
	split?: boolean;
}) {
	return (
		<>
			<div className="flex items-center">
				<span className="countdown font-medium text-[12px] text-[#F1F1F1]">
					<span
						className="pr-0.5"
						// @ts-expect-error
						style={{ "--value": d }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">days</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center">
				<span className="countdown font-medium text-[12px] text-[#F1F1F1]">
					<span
						className="pr-0.5"
						// @ts-expect-error
						style={{ "--value": h }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">hrs</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center">
				<span className="countdown font-medium text-[12px] text-[#F1F1F1]">
					<span
						className="pr-0.5"
						// @ts-expect-error
						style={{ "--value": m }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">mins</div>
			</div>
			{split ? <div>:</div> : null}
			<div className="flex items-center">
				<span className="countdown font-medium text-[12px] text-[#F1F1F1]">
					<span
						className="pr-0.5"
						// @ts-expect-error
						style={{ "--value": s }}
					></span>
				</span>
				<div className="font-[400] text-[12px] text-[#C6C6C6]">secs</div>
			</div>
		</>
	);
}
