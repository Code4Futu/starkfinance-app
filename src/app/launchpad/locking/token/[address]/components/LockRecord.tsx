import { ILockingPool } from "@/app/types";
import { numberWithCommas } from "@/app/utils";
import dayjs from "dayjs";
import { ethers } from "ethers";
import Link from "next/link";

export default function LockRecord({ lock }: { lock: ILockingPool }) {
	return (
		<div className="grid grid-cols-5 text-[14px] font-bold">
			<div className="text-[#3E73FC]">{`${lock.owner.slice(
				0,
				6
			)}...${lock.owner.slice(-4)}`}</div>
			<div>
				{numberWithCommas(ethers.formatUnits(lock.amount, lock.token.decimals))}
			</div>
			<div>{lock.isVesting ? lock.tgePercent / 1000 : "-"}</div>
			<div>{dayjs(+lock.tge * 1000).format("YY-MM-DD hh:mm")}</div>
			<div className="text-right text-[#24C3BC]">
				<Link
					href={`/launchpad/locking/token/${lock.tokenAddress}/${lock.lockId}`}
				>
					View
				</Link>
			</div>
		</div>
	);
}
