import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  DocumentationIcon,
  ExchangeIcon,
  HomeIcon,
  LaunchpadIcon,
  MarketIcon,
  SocialIcon,
  LockingIcon,
} from "@/app/components/icons";
import { twMerge } from "tailwind-merge";
import { SubDrawerItem } from "./SubDrawerItem";
import { Popover } from "antd";
import { useRouter } from "next/navigation";

export const DrawerItem = ({
  item,
  handleDrawerClick,
  resize,
  currentPath,
  handleSubMenuClick,
}: {
  item: any;
  handleDrawerClick?: any;
  resize?: any;
  currentPath?: any;
  handleSubMenuClick?: any;
}) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const mouseOver = () => {
    setHover(true);
  };

  const mouseOut = () => {
    setHover(false);
  };

  const checkIcon = (id: number) => {
    switch (id) {
      case 1:
        return <HomeIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />;
      case 2:
        return <ExchangeIcon color={hover || item.open ? "#ADFFFB" : ""} />;
      case 3:
        return (
          <LockingIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />
        );
      case 4:
        return (
          <LaunchpadIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />
        );
      case 5:
        return (
          <MarketIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />
        );
      case 6:
        return (
          <DocumentationIcon
            color={hover || item.open ? "#ADFFFB" : "#C6C6C6"}
          />
        );
      case 7:
        return (
          <SocialIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />
        );
      default:
        return <HomeIcon color={hover || item.open ? "#ADFFFB" : "#C6C6C6"} />;
    }
  };

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: any) => {
    setOpen(newOpen);
  };

  return (
    <div className="">
      {item.items.length > 0 ? (
        <Popover
          content={
            <>
              {item.items?.length > 0 && !resize && (
                <div
                  className={twMerge(
                    "transition-height mt-[130px] border-[1px] border-[#2D313E] rounded-3xl flex flex-col gap-2 p-3 bg-[#1a1c24]"
                  )}
                >
                  {item.items.map((item: any, indexs: number) => (
                    <SubDrawerItem
                      key={indexs}
                      item={item}
                      indexs={indexs}
                      handleOpenChange={handleOpenChange}
                      handleSubMenuClick={handleSubMenuClick}
                    />
                  ))}
                </div>
              )}
            </>
          }
          arrow={false}
          placement="right"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            className={twMerge(
              "mx-auto flex h-14 cursor-pointer items-center justify-between rounded-2xl p-3 hover:bg-slate-500/30",
              resize && "p-0"
            )}
            onClick={() => {
              if (item.id === 1) {
                router.push("/");
              }
              handleDrawerClick(item.id);
            }}
          >
            <div className="flex items-center">
              <p
                className={twMerge(
                  "up ml-3 flex items-center gap-2 text-base font-bold text-[#C6C6C6]",
                  hover && "text-linear",
                  item.open && "text-linear"
                )}
              >
                {checkIcon(item.id)}
                {!resize && (
                  <span className="text-base font-bold text-[#C6C6C6]">
                    {item.title}
                  </span>
                )}
              </p>
            </div>
            {item.items?.length > 0 && !resize && (
              <div>
                <IoIosArrowDown
                  style={{
                    fill: hover || item.open ? "#24C3BC" : "white",
                    rotate: "270deg",
                    transition: "all .5s",
                  }}
                />
              </div>
            )}
          </div>
        </Popover>
      ) : (
        <div
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          className={twMerge(
            "mx-auto flex h-14 cursor-pointer items-center justify-between rounded-2xl p-3 hover:bg-slate-500/30",
            resize && "p-0"
          )}
          onClick={() => {
            if (item.id === 1) {
              router.push("/");
            }
            handleDrawerClick(item.id);
          }}
        >
          <div className="flex items-center">
            <p
              className={twMerge(
                "up ml-3 flex items-center gap-2 text-base font-bold text-[#C6C6C6]",
                hover && "text-linear",
                item.open && "text-linear"
              )}
            >
              {checkIcon(item.id)}
              {!resize && (
                <span className="text-base font-bold text-[#C6C6C6]">
                  {item.title}
                </span>
              )}
            </p>
          </div>
          {item.items?.length > 0 && !resize ? (
            !item.open ? (
              <div>
                <IoIosArrowDown style={{ fill: hover ? "#24C3BC" : "white" }} />
              </div>
            ) : (
              <IoIosArrowUp style={{ fill: hover ? "#24C3BC" : "white" }} />
            )
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
