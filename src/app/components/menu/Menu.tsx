"use client";
import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnectors } from "@starknet-react/core";
import { connectors } from "../../conf";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LeftIcon, RightIcon, LogoNoName, LogoWithText } from "../icons";
import ModalWallet from "../modals/ModalWallet";
import { drawerData, drawerDataMobile, socialData } from "./drawData";
import { DrawerItem } from "./components/DrawerItemDesktop";

const drawData = drawerData;
const drawDataMobile = drawerDataMobile;
const sociData = socialData;

const useOpenDrawer = () => {
  const [width, setWidth] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [resizeDrawer, setResizeDrawer] = useState(false);
  const [content, setContent] = useState([]);
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

  //   const changeContent = (id) => {
  //     if (id === 1) setOpenDrawer(false);
  //     if (id === 5) setOpenDrawer(false);
  //     if (id === 2) {
  //       setKey(2);
  //       setContent([
  //         {
  //           title: "Swap",
  //           path: route.home,
  //         },
  //         {
  //           title: "Liquidity",
  //           path: route.home,
  //         },
  //         {
  //           title: "Overview",
  //           path: route.home,
  //         },
  //       ]);
  //     }
  //     if (id === 3) {
  //       setKey(3);
  //       setContent([
  //         {
  //           title: "Launchpad List",
  //           path: route.home,
  //         },
  //         {
  //           title: "Airdrop List",
  //           path: route.home,
  //         },
  //         {
  //           title: "Your Pool",
  //           path: route.home,
  //         },
  //       ]);
  //     }
  //     if (id === 4) {
  //       setKey(4);
  //       setContent([
  //         {
  //           title: "Collections",
  //           path: route.home,
  //         },
  //         {
  //           title: "Activity",
  //           path: route.home,
  //         },
  //         {
  //           title: "Events",
  //           path: route.home,
  //         },
  //         {
  //           title: "Profile",
  //           path: route.home,
  //         },
  //       ]);
  //     }
  //     if (id === 6) {
  //       setKey(6);
  //       setContent([
  //         {
  //           title: "Telegram",
  //           path: SocialLink.teleGlobal,
  //         },
  //         {
  //           title: "Discord",
  //           path: SocialLink.discord,
  //         },
  //         {
  //           title: "X.com",
  //           path: SocialLink.tw,
  //         },
  //         {
  //           title: "Medium",
  //           path: SocialLink.teleChannel,
  //         },
  //         {
  //           title: "Github",
  //           path: SocialLink.teleChannel,
  //         },
  //       ]);
  //     }
  //     toggle(id);
  //   };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isMobile, openDrawer, toggle, resizeDrawer, resizeToggle, content };
};

export default function Menu({ children }: { children: React.ReactNode }) {
  const { available, connect, refresh } = useConnectors();
  const { address } = useAccount();
  const { isMobile, openDrawer, toggle, resizeDrawer, resizeToggle, content } =
    useOpenDrawer();

  const [isShowModalConnect, setIsShowModalConnect] = useState(false);
  const [drawerData, setDrawerData] = useState<any>(drawData);
  const [socialData, setSocicalData] = useState<any>(sociData);

  const handleConnect = async (connector: any) => {
    try {
      connect(connector);
    } catch (error) {
      alert(`Please install ${connector.id()} wallet!`);
    }
    // const isWalletConnected = available.find(
    // 	(availableConnector) => availableConnector.id === connector.id
    // );

    // isWalletConnected
    // 	? connect(connector)
    // 	: alert(`Please install ${connector.id()} wallet!`);
  };

  return (
    <div className="h-full w-full overflow-hidden flex justify-stretch">
      <div
        className={clsx(
          `drawer-container anim-drawer-show fixed bottom-0 left-0 z-50 flex min-h-screen flex-col justify-between border-r-[1px] border-[#2D313E] bg-[#1A1C24] p-6 xl:translate-x-0`,
          resizeDrawer ? "!w-[104px]" : "!w-[288px]"
        )}
      >
        <div className="flex flex-col gap-12">
          {resizeDrawer ? <LogoNoName /> : <LogoWithText />}
          <div className="flex flex-col gap-3 overflow-scroll">
            {drawerData.map((item: any, idx: number) => (
              <DrawerItem
                key={item.id}
                item={item}
                // handleDrawerClick={handleDrawerClick}
                resize={resizeDrawer}
                // currentPath={currentPath}
                // handleSubMenuClick={handleSubMenuClick}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12 max-h-[150px] overflow-scroll 2xl:hidden">
          <div className="flex flex-col gap-3">
            {/* {socicalData.map((item) => (
            <DrawerItem
              key={item.id}
              item={item}
              handleDrawerClick={handleSocialClick}
              resize={resizeDrawer}
              currentPath={currentPath}
              handleSubMenuClick={handleSubMenuClick}
            />
          ))} */}
          </div>
        </div>
        <div className="hidden flex-col gap-12 2xl:flex">
          <div className="flex flex-col gap-3">
            {/* {socicalData.map((item) => (
            <DrawerItem
              key={item.id}
              item={item}
              handleDrawerClick={handleSocialClick}
              resize={resizeDrawer}
              currentPath={currentPath}
              handleSubMenuClick={handleSubMenuClick}
            />
          ))} */}
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
      <div className="flex-1 text-[#C6C6C6]">
        <div
          className={clsx(
            "flex justify-between lg:justify-end px-6 py-6 bg-[#1A1C24] border-b border-b-[#2D313E]",
            resizeDrawer ? "min-[1024px]:pl-[104px]" : "min-[1024px]:pl-[288px]"
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
              onClick={() => setIsShowModalConnect(true)}
            >
              <div className="w-[24px] h-[24px] relative hidden lg:block ">
                <Image
                  src="/svg/connect-wallet.svg"
                  fill
                  alt="connect-wallet"
                />
              </div>
              <div
                className="text-md font-bold text-[#1A1C24] cursor-pointer"
                // onClick={() => handleConnect(connectors[1])}
              >
                {address
                  ? `${address.slice(0, 4)}...${address.slice(-3)}`
                  : "Connect Wallet"}
              </div>
            </button>
          </div>
        </div>
        <div className="px-6 py-9 h-[calc(100vh-176px)] lg:h-[calc(100vh-100px)] overflow-y-scroll">
          <div className="w-full flex justify-center">
            <div className="max-w-[1080px] flex-1 text-[#F1F1F1]">
              {children}
            </div>
          </div>
        </div>
        {/* <div className="nav-mobile fixed bottom-0 left-0 right-0 grid lg:hidden z-[999] grid-cols-6 place-items-center px-3 md:px-12 py-3 bg-[#1A1C24] border-t border-t-[#2D313E]">
          <Link href="/" rel="noreferrer">
            <div className="text-center w-[30px] h-[30px] relative">
              <Image fill src="/svg/home.svg" alt="home" />
            </div>
          </Link>

          <div className="drawer">
            <input
              id="exchange-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content flex justify-center">
              <label
                htmlFor="exchange-drawer"
                className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
              >
                <div className="text-center w-[30px] h-[30px] relative">
                  <Image fill src="/svg/exchange.svg" alt="exchange" />
                </div>
              </label>
            </div>
            <div className="drawer-side z-[999]">
              <label
                htmlFor="exchange-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu absolute left-0 bottom-[79px] right-0 px-4 min-w-full bg-[#1A1C24] font-bold">
                <li className="border-b border-b-[#363b4d]">
                  <Link
                    href="/exchange/swap"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Swap
                  </Link>
                </li>
                <li className="border-b border-b-[#363b4d]">
                  <Link
                    href="/exchange/liquidity"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Liquidity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/exchange/overview"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Overview
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="drawer">
            <input
              id="launchpad-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content flex justify-center">
              <label
                htmlFor="launchpad-drawer"
                className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
              >
                <div className="text-center w-[30px] h-[30px] relative">
                  <Image fill src="/svg/launchpad.svg" alt="launchpad" />
                </div>
              </label>
            </div>
            <div className="drawer-side z-[999]">
              <label
                htmlFor="launchpad-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu absolute bottom-[79px] left-0 right-0 px-4 min-w-full bg-[#1A1C24] font-bold">
                <li>
                  <Link
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                    href="/launchpad/launchpad-list"
                    rel="noreferrer"
                  >
                    Launchpad List
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="drawer">
            <input
              id="market-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content flex justify-center">
              <label
                htmlFor="market-drawer"
                className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
              >
                <div className="text-center w-[30px] h-[30px] relative">
                  <Image fill src="/svg/market.svg" alt="market" />
                </div>
              </label>
            </div>
            <div className="drawer-side z-[999]">
              <label
                htmlFor="market-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu absolute bottom-[79px] left-0 right-0 px-4 min-w-full bg-[#1A1C24] font-bold">
                <li>
                  <a
                    href="https://marketplace.starkfinance.co/top_volume"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.starkfinance.co/activity"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Activity
                  </a>
                </li>
                <li>
                  <a
                    href="https://marketplace.starkfinance.co/events"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Link href="/" rel="noreferrer">
            <div className="text-center w-[30px] h-[30px] relative">
              <Image fill src="/svg/documentation.svg" alt="documentation" />
            </div>
          </Link>

          <div className="drawer">
            <input
              id="socials-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content flex justify-center">
              <label
                htmlFor="socials-drawer"
                className="p-3 hover:bg-[#232631] cursor-pointer rounded-2xl"
              >
                <div className="text-center w-[30px] h-[30px] relative">
                  <Image fill src="/svg/socials.svg" alt="socials" />
                </div>
              </label>
            </div>
            <div className="drawer-side z-[999]">
              <label
                htmlFor="socials-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu absolute bottom-[79px] left-0 right-0 px-4 min-w-full bg-[#1A1C24] font-bold">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] relative">
                        <Image
                          src="/svg/telegram.svg"
                          alt="telegram"
                          fill
                          sizes="30px"
                        />
                      </div>
                      <div className="font-bold ml-1.5">Telegram</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] relative">
                        <Image
                          src="/svg/discord.svg"
                          alt="discord"
                          fill
                          sizes="30px"
                        />
                      </div>
                      <div className="font-bold ml-1.5">Discord</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] relative">
                        <Image src="/svg/x.svg" alt="x" fill sizes="30px" />
                      </div>
                      <div className="font-bold ml-1.5">X.com</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] relative">
                        <Image
                          src="/svg/medium.svg"
                          alt="medium"
                          fill
                          sizes="30px"
                        />
                      </div>
                      <div className="font-bold ml-1.5">Medium</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    className="p-3 hover:text-[#24c3bc] hover:bg-[#232631] my-2"
                  >
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] relative">
                        <Image
                          src="/svg/github.svg"
                          alt="github"
                          fill
                          sizes="30px"
                        />
                      </div>
                      <div className="font-bold ml-1.5">Github</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      {isShowModalConnect && (
        <ModalWallet
          isShowing={isShowModalConnect}
          hide={() => setIsShowModalConnect(false)}
        />
      )}
    </div>
  );
}
