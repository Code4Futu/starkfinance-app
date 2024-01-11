import { twMerge } from "tailwind-merge";
import { useState, useContext } from "react";

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

  const mouseOver = () => {
    setHover(true);
  };

  const mouseOut = () => {
    setHover(false);
  };
  return (
    <a
      key={indexs}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      className={twMerge(
        "animation-open-items flex cursor-pointer items-center justify-start rounded-2xl p-3 hover:font-semibold hover:bg-slate-500/30"
      )}
      // style={{ ["--delay"]: indexs }}
      onClick={() => {
        // item.toggle();
        // handleOpenChange(false);
        // navigation(item.path);
        // handleSubMenuClick(item.id, item.title);
      }}
      href={item.path}
    >
      <div className="ml-3 flex gap-2">
        {/* {checkSocialIcon(item.title)} */}
        <p
          className={twMerge(
            "text-base font-bold text-[#C6C6C6]",
            hover && "text-linear"
          )}
        >
          {item.title}
        </p>
      </div>
    </a>
  );
};
