"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useAccount, useConnectors } from "@starknet-react/core";
import { usePathname } from "next/navigation";

export const CartIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M17 18C15.89 18 15 18.89 15 20C15 20.5304 15.2107 21.0391 15.5858 21.4142C15.9609 21.7893 16.4696 22 17 22C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H19V15H7.42C7.3537 15 7.29011 14.9737 7.24322 14.9268C7.19634 14.8799 7.17 14.8163 7.17 14.75C7.17 14.7 7.18 14.66 7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.5C20.95 5.34 21 5.17 21 5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5.21L4.27 2M7 18C5.89 18 5 18.89 5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22C7.53043 22 8.03914 21.7893 8.41421 21.4142C8.78929 21.0391 9 20.5304 9 20C9 19.4696 8.78929 18.9609 8.41421 18.5858C8.03914 18.2107 7.53043 18 7 18Z"
				fill="#F1F1F1"
			/>
		</svg>
	);
};

interface Props {
	openModalConnect: React.Dispatch<React.SetStateAction<boolean>>;
	openModalCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SiteNavigation = (props: Props) => {
	const { address } = useAccount();
	const currentPath = usePathname();

	return (
		<div
			className={clsx(
				"flex justify-between xl:justify-end px-6 py-6 bg-[#1A1C24] border-b border-b-[#2D313E]"
			)}
		>
			<div className="flex items-center gap-2">
				<Link href="/" passHref prefetch legacyBehavior>
					<a className="block xl:hidden w-[48px] h-[48px] relative">
						<Image src="/logo.png" alt="logo" fill sizes="48px" />
					</a>
				</Link>
			</div>
			<div className="flex gap-3">
				{currentPath.split("/")[1] === "marketplace" && (
					<div
						className="relative flex p-3 cursor-pointer justify-center items-center gap-1 rounded-2xl bg-[#232631]"
						onClick={() => props.openModalCart(true)}
					>
						<CartIcon />
						<div className="flex flex-col justify-center items-center gap-[10px] absolute top-[5px] right-[5px] rounded-[10px] bg-[#24C3BC]">
							<span className="w-4 h-4 flex justify-center text-center text-xs font-medium text-[#fff] leading-[16px]">
								1
							</span>
						</div>
					</div>
				)}
				<div className="cursor-pointer p-3 flex items-center bg-[#232631] gap-0 xl:gap-2 rounded-2xl border-0">
					<div className="w-[24px] h-[24px] relative">
						<Image
							src="/wallets/starknet.png"
							alt="network"
							fill
							sizes="24px"
						/>
					</div>

					<div className="text-[16px] font-bold text-[#F1F1F1] hidden xl:block">
						Starknet
					</div>
				</div>

				<button
					className="btn flex items-center bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] gap-1 rounded-2xl border-0"
					onClick={() => props.openModalConnect(true)}
				>
					<div className="w-[24px] h-[24px] relative hidden xl:block ">
						<Image src="/svg/connect-wallet.svg" fill alt="connect-wallet" />
					</div>
					<div className="text-[16px] font-bold text-[#1A1C24] cursor-pointer">
						{address
							? `${address.slice(0, 4)}...${address.slice(-3)}`
							: "Connect Wallet"}
					</div>
				</button>
			</div>
		</div>
	);
};
