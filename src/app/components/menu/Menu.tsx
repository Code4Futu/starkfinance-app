"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ModalWallet } from "@/app/components/modals/ModalWallet";
import { drawerData, drawerDataMobile, socialData } from "./drawData";
import { SiteNavigation } from "./components/SiteNavigation/SiteNavigation";
import { DrawerDesktop } from "./components/DrawerDesktop";
import { socialLink } from "./drawData";
import { DrawerMobile } from "./components/DrawerMobile/DrawerMobile";
// import { ModalYourCart } from "../modals/ModalYourCart";
import { useAppStore, useDrawerStore } from "@/app/store";

// import dynamic from 'next/dynamic'

// const ModalWallet = dynamic(() => import('../modals/ModalWallet'), { ssr: false })

const drawData = drawerData;
const drawDataMobile = drawerDataMobile;
const sociData = socialData;

const useOpenDrawer = () => {
	const [width, setWidth] = useState(0);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [resizeDrawer, setResizeDrawer] = useState(false);
	const [content, setContent] = useState<any>([]);
	const [key, setKey] = useState(0);

	let isMobile = width < 768;
	const handleResize = () => setWidth(window.innerWidth);

	const resizeToggle = () => {
		setResizeDrawer(!resizeDrawer);
	};

	const toggle = (id: number) => {
		if (id === 1 || id === 5) {
			setOpenDrawer(false);
			return;
		}
		if (isMobile && key === id && openDrawer) setOpenDrawer(!openDrawer);
		if (isMobile && (key === 2 || 3 || 4 || 6) && key !== id && openDrawer) {
			return;
		} else {
			setOpenDrawer(!openDrawer);
		}
	};

	const changeContent = (id: number) => {
		if (id === 1) setOpenDrawer(false);
		if (id === 5) setOpenDrawer(false);
		if (id === 2) {
			setKey(2);
			setContent([
				{
					title: "Swap",
					path: "/",
				},
				{
					title: "Liquidity",
					path: "/",
				},
				{
					title: "Overview",
					path: "/",
				},
			]);
		}
		if (id === 3) {
			setKey(3);
			setContent([
				{
					title: "Launchpad List",
					path: "/",
				},
				{
					title: "Airdrop List",
					path: "/",
				},
				{
					title: "Your Pool",
					path: "/",
				},
			]);
		}
		if (id === 4) {
			setKey(4);
			setContent([
				{
					title: "Collections",
					path: "/",
				},
				{
					title: "Activity",
					path: "/",
				},
				{
					title: "Events",
					path: "/",
				},
				{
					title: "Profile",
					path: "/",
				},
			]);
		}
		if (id === 6) {
			setKey(6);
			setContent([
				{
					title: "Telegram",
					path: socialLink.teleGlobal,
				},
				{
					title: "Discord",
					path: socialLink.discord,
				},
				{
					title: "X.com",
					path: socialLink.tw,
				},
				{
					title: "Medium",
					path: socialLink.teleChannel,
				},
				{
					title: "Github",
					path: socialLink.teleChannel,
				},
			]);
		}
		toggle(id);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isMobile,
		openDrawer,
		toggle,
		resizeDrawer,
		resizeToggle,
		content,
		changeContent,
	};
};

export default function Menu({ children }: { children: React.ReactNode }) {
	const { isMobile, openDrawer, toggle, resizeDrawer, resizeToggle, content } =
		useOpenDrawer();

	const [openConnectModal, toggleOpenConnectModal] = useAppStore((s) => [
		s.openConnectModal,
		s.toggleOpenConnectModal,
	]);

	return (
		<div className="h-full w-full overflow-hidden flex justify-stretch">
			<div className="hidden min-[1280px]:block">
				<DrawerDesktop
					resizeDrawer={resizeDrawer}
					resizeToggle={resizeToggle}
					isMobile={isMobile}
				/>
			</div>
			<div className="min-[1280px]:hidden">
				<DrawerMobile
					toggle={toggle}
					resizeDrawer={resizeDrawer}
					resizeToggle={resizeToggle}
					isMobile={isMobile}
				/>
			</div>
			<div className="flex-1 text-[#C6C6C6]">
				<SiteNavigation />
				<div className="px-6 py-9 h-[calc(100vh-176px)] lg:h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden">
					<div className="w-full flex justify-center">
						<div className="max-w-[1080px] flex-1 text-[#F1F1F1]">
							{children}
						</div>
					</div>
				</div>
			</div>
			{openConnectModal && (
				<ModalWallet hide={() => toggleOpenConnectModal()} />
			)}
		</div>
	);
}
