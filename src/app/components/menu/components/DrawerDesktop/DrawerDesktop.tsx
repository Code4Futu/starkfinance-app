import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import {
  RightIcon,
  LeftIcon,
  LogoNoName,
  LogoWithText,
} from "@/app/components/icons";
import { DrawerItem } from "../DrawerItemDesktop";

export const DrawerDesktop = ({
  resizeDrawer,
  resizeToggle,
  drawerData,
  socialData,
}: {
  resizeDrawer: any;
  resizeToggle: any;
  drawerData: any;
  socialData: any;
}) => {
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
              // handleDrawerClick={handleDrawerClick}
              resize={resizeDrawer}
              // currentPath={currentPath}
              // handleSubMenuClick={handleSubMenuClick}
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
              //   handleDrawerClick={handleSocialClick}
              resize={resizeDrawer}
              //   currentPath={currentPath}
              //   handleSubMenuClick={handleSubMenuClick}
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
