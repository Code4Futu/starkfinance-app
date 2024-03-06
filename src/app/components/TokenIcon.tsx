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

	return (
		<div
			className={`relative`}
			style={{
				width: `${w}px`,
				height: `${h}px`,
			}}
		>
			<Image src={src} alt="token-icon" fill sizes="any" />
		</div>
	);
}
