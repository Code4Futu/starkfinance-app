"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
	RightIcon,
	LeftIcon,
	LogoNoName,
	LogoWithText,
} from "@/app/components/icons";
import { DrawerItem } from "../DrawerItemDesktop";
import { socialData, drawerData } from "../../drawData";
import { usePathname } from "next/navigation";

const drawData = drawerData;
const sociData = socialData;

export const DrawerDesktop = ({
	resizeDrawer,
	resizeToggle,
	isMobile,
}: {
	resizeDrawer: any;
	resizeToggle: any;
	isMobile: boolean;
}) => {
	const [drawerData, setDrawerData] = useState<any>(drawData);
	const [socialData, setSocicalData] = useState<any>(sociData);
	const currentPath = usePathname();

	useEffect(() => {
		if (
			currentPath === "/swap" ||
			currentPath === "/liquidity" ||
			currentPath === "/add" ||
			currentPath === "/bridge"
		) {
			const tempDrawerData = drawerData.map((item: any) => {
				if (item.title === "Exchange" && isMobile) {
					item.open = true;
				}
				return item;
			});
			setDrawerData(tempDrawerData);
		}
	}, [currentPath]);

	const handleSubMenuClick = (id: number, itemTitle: string) => {
		if (resizeDrawer) return;
		const tempDrawerData = drawerData.map((item: any) => {
			if (item.id === id && item.items.includes(itemTitle)) {
				if (item.id !== id && item.open === true) {
					item.open = false;
				}
				if (item.id === id) {
					item.open = true;
				} else {
					item.open = false;
				}
			}
			return item;
		});
		setDrawerData(tempDrawerData);
	};

	const handleDrawerClick = (id: number) => {
		if (resizeDrawer) return;
		let tempDrawerData = [];
		if (drawerData.find((item: any) => item.id === id).items.length > 0) {
			tempDrawerData = drawerData.map((item: any) => {
				if (item.id === id && item.items.length > 0) {
					item.open = true;
				}
				return item;
			});
		} else {
			tempDrawerData = drawerData.map((item: any) => {
				if (item.id !== id && item.open === true) {
					item.open = false;
				}
				if (item.id === id) {
					item.open = true;
				}
				return item;
			});
		}
		setDrawerData(tempDrawerData);
	};

	const handleSocialClick = (id: number) => {
		if (resizeDrawer) return;
		let tempSocialData = [];
		tempSocialData = socialData.map((item: any) => {
			if (item.id === id && item.items.length > 0) {
				item.open = true;
			}
			return item;
		});
		setSocicalData(tempSocialData);
	};

	return (
		<div
			className={clsx(
				`drawer-container anim-drawer-show bottom-0 left-0 z-50 flex min-h-screen flex-col justify-between border-r-[1px] border-[#2D313E] bg-[#1A1C24] p-6 xl:translate-x-0`,
				resizeDrawer ? "!w-[104px]" : "!w-[288px]"
			)}
		>
			<div className="flex flex-col gap-12">
				{resizeDrawer ? <LogoNoName /> : <LogoWithText />}
				<div className="flex flex-col gap-3">
					{drawerData.map((item: any, idx: number) => (
						<DrawerItem
							key={item.id}
							item={item}
							handleDrawerClick={handleDrawerClick}
							resize={resizeDrawer}
							currentPath={currentPath}
							handleSubMenuClick={handleSubMenuClick}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-12 max-h-[150px]">
				<div className="flex flex-col gap-3">
					{socialData.map((item: any) => (
						<DrawerItem
							key={item.id}
							item={item}
							handleDrawerClick={handleSocialClick}
							resize={resizeDrawer}
							currentPath={currentPath}
							handleSubMenuClick={handleSubMenuClick}
						/>
					))}
				</div>
			</div>
			<div
				className={clsx(
					"absolute anim-drawer-show left-[254px] top-1/2 z-50 -translate-y-1/2 translate-x-1/2 transform cursor-pointer",
					resizeDrawer && "left-[75px]"
				)}
				onClick={resizeToggle}
			>
				{resizeDrawer ? <RightIcon /> : <LeftIcon />}
			</div>
		</div>
	);
};
