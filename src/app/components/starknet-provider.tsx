"use client";
import React from "react";

import { StarknetConfig } from "@starknet-react/core";
import { connectors } from "../conf";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
	return <StarknetConfig connectors={connectors}>{children}</StarknetConfig>;
}
