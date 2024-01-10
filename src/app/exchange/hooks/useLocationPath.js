"use client";

import { usePathname } from "next/navigation";

export function useLocationPath() {
	return usePathname();
}
