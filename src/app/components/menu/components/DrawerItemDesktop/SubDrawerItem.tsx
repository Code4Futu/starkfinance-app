import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SubDrawerItem = ({
  item,
  indexs,
  handleOpenChange,
  handleSubMenuClick,
}: {
  item: any;
  indexs: any;
  handleOpenChange: any;
  handleSubMenuClick: any;
}) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const mouseOver = () => {
    setHover(true);
  };

  const mouseOut = () => {
    setHover(false);
  };
  return (
    <Link
      key={indexs}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      className={twMerge(
        "animation-open-items flex cursor-pointer items-center justify-start rounded-2xl p-3 hover:font-semibold hover:bg-slate-500/30"
      )}
      // style={{ ["--delay"]: indexs }}
      onClick={() => {
        handleOpenChange(false);
        router.push(item.path);
        handleSubMenuClick(item.id, item.title);
      }}
      href={item.path}
    >
      <div className="ml-3 flex gap-2">
        <p
          className={twMerge(
            "text-base font-bold text-[#C6C6C6]",
            hover && "text-linear"
          )}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
};
