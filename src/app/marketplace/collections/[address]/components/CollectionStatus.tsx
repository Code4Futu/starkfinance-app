import {
	COLLECTION_STATUS,
	CollectionStatus,
} from "@/app/models/collections";
import clsx from "clsx";

export const CollectionStatusComponent = ({
	status,
}: {
	status: CollectionStatus;
}) => {
	return (
		<div
			style={{
				backdropFilter: "blur(20px)",
				background: "rgba(241, 241, 241, 0.10)",
			}}
			className={clsx(
				"flex items-center py-[3px] px-[6px] gap-1 rounded-2xl border-[1px]",
				{
					"border-[#6CFF7B]":
						status === COLLECTION_STATUS.LIVE,
				},
				{
					"border-[#FFE86C]":
						status === COLLECTION_STATUS.UPCOMING,
				},
				{
					"border-[#FF6C6C]":
						status === COLLECTION_STATUS.ENDED,
				}
			)}
		>
			<div
				className={clsx(
					"w-2 h-2 rounded-full",
					{
						"bg-[#6CFF7B] text-[#6CFF7B]":
							status === COLLECTION_STATUS.LIVE,
					},
					{
						"bg-[#FFE86C] text-[#FFE86C]":
							status ===
							COLLECTION_STATUS.UPCOMING,
					},
					{
						"bg-[#FF6C6C] text-[#FF6C6C]":
							status === COLLECTION_STATUS.ENDED,
					}
				)}
			/>
			<span
				className={clsx(
					"text-sm leading-[16px]",
					{
						"text-[#6CFF7B]":
							status === COLLECTION_STATUS.LIVE,
					},
					{
						"text-[#FFE86C]":
							status ===
							COLLECTION_STATUS.UPCOMING,
					},
					{
						"text-[#FF6C6C]":
							status === COLLECTION_STATUS.ENDED,
					}
				)}
			>
				{status}
			</span>
		</div>
	);
};
