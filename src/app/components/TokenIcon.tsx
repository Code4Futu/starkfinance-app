"use client";
import Image from "next/image";
import {
	APP_CHAIN_ID,
	TOKEN_ICON_LIST,
	getTokenIcon,
} from "../configs/networks";
import { useMemo } from "react";
import { validateAndParseAddress } from "starknet";

export default function TokenIcon({
	address,
	w = 10,
	h = 10,
}: {
	address: string | undefined;
	w?: number;
	h?: number;
}) {
	const src = useMemo(() => getTokenIcon(address), [address]);

	console.log(
		"address, src, tokenList",
		address,
		src,
		TOKEN_ICON_LIST[APP_CHAIN_ID],
		address && TOKEN_ICON_LIST[APP_CHAIN_ID][validateAndParseAddress(address)]
	);

	return (
		<div className={`w-[${w}px] h-[${h}px] relative`}>
			<Image src={src} alt="tokenRaise" fill sizes="any" />
		</div>
	);
}
