import { Divider } from "../../../../../components/Divider";
import { TransactionRow } from "./TransactionRow";

const transactionMockup = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TransactionDesktop = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-start justify-between px-3 text-xs font-medium text-[#C6C6C6]">
        <span className="w-[200px]">Txid</span>
        <span className="w-[160px]">Token In</span>
        <span className="w-[160px]">Token Out</span>
        <span className="w-[160px]">Address</span>
        <span className="w-[160px]">Time</span>
      </div>
      <Divider className="my-3" />
      {transactionMockup.map((item, idx) => (
        <TransactionRow key={idx} idx={idx} />
      ))}
    </div>
  );
};
