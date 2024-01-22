import { AccountInterface, Contract } from "starknet";
import { LOCKING_ADDRESS } from "../locking/constants";
import { parseUnits } from "ethers";
import SFLockingAbi from "../abis/starknet/SFLocking.json";
import ERC20Abi from "../abis/starknet/ERC20.json";

export type LockInputs = {
	tokenLock: string;
	amount: number;
	owner: string;
	tge: Date;
	tgePercent: number;
	vestingTime?: number[];
	vestingPercent?: number[];
};

export const lock = async (
	values: LockInputs & { isVesting: boolean },
	library: AccountInterface | undefined
) => {
	if (!library) throw Error("Connect account first");
	const lockingContract = new Contract(SFLockingAbi, LOCKING_ADDRESS, library);
	const tokenContract = new Contract(ERC20Abi, values.tokenLock, library);

	const amount = parseUnits(values.amount.toString(), 18).toString();

	const approveCalldata = tokenContract.populate("approve", {
		spender: LOCKING_ADDRESS,
		amount: amount,
	});

	const lockCalldata = lockingContract.populate("lock", {
		owner: values.owner,
		token: values.tokenLock,
		amount: amount,
		tge: Math.floor(values.tge.getTime() / 1000),
		is_vesting: values.isVesting ?? false,
		tge_percent: (values.tgePercent * 1000).toString(),
		vesting_time:
			values.isVesting && values.vestingTime
				? values.vestingTime.map((e) => (e * 86400).toString())
				: [],
		vesting_percent:
			values.isVesting && values.vestingPercent
				? values.vestingPercent.map((e) => (e * 1000).toString())
				: [],
	});

	console.log(
		values.isVesting,
		values.vestingTime,
		values.tgePercent * 1000,
		values.vestingPercent?.map((e) => (e * 1000).toString())
	);

	let tx = await library.execute([approveCalldata, lockCalldata]);

	await library.waitForTransaction(tx.transaction_hash);

	return tx;
};
