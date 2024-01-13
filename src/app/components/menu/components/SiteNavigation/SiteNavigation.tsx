import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useAccount, useConnectors } from "@starknet-react/core";

export const SiteNavigation = () => {
  const { address } = useAccount();
  const {connect, connectors} = useConnectors()
  return (
    <div
      className={clsx(
        "flex justify-between lg:justify-end px-6 py-6 bg-[#1A1C24] border-b border-b-[#2D313E]"
        // !drawer.open ? "min-[1024px]:pl-[104px]" : "min-[1024px]:pl-[288px]"
      )}
    >
      <div className="flex items-center gap-2">
        <Link href={"/"} passHref className="block lg:hidden ">
          <div className="w-[48px] h-[48px] relative">
            <Image src="/logo.png" alt="logo" fill sizes="48px" />
          </div>
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="cursor-pointer p-3 flex items-center bg-[#232631] gap-0 lg:gap-2 rounded-2xl border-0">
          <div className="w-[24px] h-[24px] relative">
            <Image
              src="/wallets/starknet.png"
              alt="network"
              fill
              sizes="24px"
            />
          </div>

          <div className="text-xl font-bold text-[#F1F1F1] hidden lg:block">
            Starknet
          </div>
        </div>

        <button
          className="btn flex items-center bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] gap-1 rounded-2xl border-0"
          // onClick={() => setIsShowModalConnect(true)}
        >
          <div className="w-[24px] h-[24px] relative hidden lg:block ">
            <Image src="/svg/connect-wallet.svg" fill alt="connect-wallet" />
          </div>
          <div
            className="text-md font-bold text-[#1A1C24] cursor-pointer"
            onClick={() => connect(connectors[1])}
          >
            {address
              ? `${address.slice(0, 4)}...${address.slice(-3)}`
              : "Connect Wallet"}
          </div>
        </button>
      </div>
    </div>
  );
};
