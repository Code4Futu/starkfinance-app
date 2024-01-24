'use client'

import { MouseEventHandler, useState } from "react";
import {
  DocumentationIcon,
  ExchangeIcon,
  HomeIcon,
  LaunchpadIcon,
  LockingIcon,
  MarketIcon,
  SocialIcon,
} from "@/app/components/icons";
import { Divider } from "@/app/components/Divider";
import { usePathname, useRouter } from "next/navigation";

export const DrawerItemMobile = ({
  item,
  handleDrawerClick,
  resizeDrawer,
  toggle,
}: {
  item: any;
  handleDrawerClick: any;
  resizeDrawer: boolean;
  toggle: MouseEventHandler;
}) => {
  const [hover, setHover] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();

  const mouseOver = () => {
    setHover(true);
  };

  const mouseOut = () => {
    setHover(false);
  };


  const checkIcon = (id: number, currentPath?: string) => {
    switch (id) {
      case 1:
        return <HomeIcon color={hover ? "#ADFFFB" : ""} />;
      case 2:
        return <ExchangeIcon color={hover ? "#ADFFFB" : ""} />;
      case 3:
        return <LockingIcon color={hover ? "#ADFFFB" : ""} />;
      case 4:
        return <LaunchpadIcon color={hover ? "#ADFFFB" : ""} />;
      case 5:
        return <MarketIcon color={hover ? "#ADFFFB" : ""} />;
      case 6:
        return <DocumentationIcon color={hover ? "#ADFFFB" : ""} />;
      case 7:
        return <SocialIcon color={hover ? "#ADFFFB" : ""} />;
      default:
        return <HomeIcon color={hover ? "#ADFFFB" : ""} />;
    }
  };

  return (
    <div
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      className={"flex items-center rounded-xl p-3 text-white"}
      onClick={() => {
        if (item.id === 1) {
          router.push("/");
        }
        if (item.id === 5) {
          router.replace(
            "https://starkfinance.gitbook.io/starkfinance/"
          );
        }
        handleDrawerClick(item.id);
        toggle(item.id);
      }}
    >
      <div className="flex items-center gap-2">{checkIcon(item.id)}</div>
      {item.items.length > 0 && item.open && !resizeDrawer && (
        <div className="modal-overlay">
          <div className="navbar-mobile-animation flex min-w-full justify-center items-center bg-[#1A1C24] absolute left-0 bottom-[80px]">
            <ul className="flex min-w-full p-3 flex-col items-start gap-[6px]">
              {item.items.map((item: any, index: number, arr: any) => (
                <div className="w-full" key={index}>
                  <li
                    className="flex min-w-full px-3 py-3 justify-between items-center rounded-xl"
                    onClick={() => router.push(item.path)}
                  >
                    <a
                      href={item.path}
                      className="font-bold text-sm leading-[19px]"
                    >
                      {item.title}
                    </a>
                  </li>
                  {arr.length - 1 !== index && <Divider />}
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
