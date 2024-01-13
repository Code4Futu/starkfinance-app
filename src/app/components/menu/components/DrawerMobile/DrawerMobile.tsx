import { MouseEventHandler, useEffect, useState } from "react";
import { socialData, drawerData, drawerDataMobile } from "../../drawData";
import { usePathname } from "next/navigation";
import { DrawerItemMobile } from "../DrawerItemMobile";

const drawData = drawerData;
const sociData = socialData;
const drawDataMobile = drawerDataMobile;

export const DrawerMobile = ({
  resizeDrawer,
  resizeToggle,
  isMobile,
  toggle,
}: {
  resizeDrawer: any;
  resizeToggle: any;
  isMobile: boolean;
  toggle: any;
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
      // const tempDrawerData = drawerData.map((item) => {
      //   if (item.title === "Exchange") {
      //     item.open = false;
      //   }
      //   return item;
      // });
      setDrawerData(drawDataMobile);
    }
  }, []);

  const handleDrawerClick = (id: number) => {
    if (resizeDrawer) return;
    const tempDrawerData = drawerData.map((item: any) => {
      if (item.id === id) {
        item.open = !item.open;
      } else {
        item.open = false;
      }
      return item;
    });

    setDrawerData(tempDrawerData);
  };

  const handleSocialClick = (id: number) => {
    if (resizeDrawer) return;
    const tempSocialData = socialData.map((item: any) => {
      if (item.id === id) {
        item.open = !item.open;
      }
      return item;
    });

    setSocicalData(tempSocialData);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-20 w-full items-center justify-between border-t-[1px] border-[#2D313E] bg-[#1A1C24] px-3 py-3 xl:px-12">
      {drawerData.map((item: any) => (
        <DrawerItemMobile
          key={item.id}
          item={item}
          toggle={toggle}
          handleDrawerClick={handleDrawerClick}
          resizeDrawer={resizeDrawer}
        />
      ))}
      {socialData.map((item: any) => (
        <DrawerItemMobile
          key={item.id}
          item={item}
          toggle={toggle}
          handleDrawerClick={handleSocialClick}
          resizeDrawer={resizeDrawer}
        />
      ))}
    </div>
  );
};
