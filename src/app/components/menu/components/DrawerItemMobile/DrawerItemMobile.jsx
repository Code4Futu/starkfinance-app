import { useNavigate } from "react-router-dom";
import { useState } from "react";
import route from "../../../../routes/route";
import {
  DocumentationIcon,
  ExchangeIcon,
  HomeIcon,
  LaunchpadIcon,
  LockingIcon,
  MarketIcon,
  SocialIcon,
} from "../../icons";
import { Divider } from "../../../../components/Divider";

export const DrawerItemMobile = ({
  item,
  handleDrawerClick,
  resize,
  currentPath,
  toggle,
}) => {
  const [hover, setHover] = useState(false);

  const navigation = useNavigate();

  const mouseOver = () => {
    setHover(true);
  };

  const mouseOut = () => {
    setHover(false);
  };

  const checkIcon = (id, currentPath) => {
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
          navigation(route.home);
        }
        if (item.id === 5) {
          window.location.replace(
            "https://starkfinance.gitbook.io/starkfinance/"
          );
        }
        handleDrawerClick(item.id);
        toggle(item.id);
      }}
    >
      <div className="flex items-center gap-2">{checkIcon(item.id)}</div>
      {item.items.length > 0 && item.open && !resize && (
        <div className="modal-overlay">
          <div className="navbar-mobile-animation flex min-w-full justify-center items-center bg-[#1A1C24] absolute left-0 bottom-[80px]">
            <ul className="flex min-w-full p-3 flex-col items-start gap-[6px]">
              {item.items.map((item, index, arr) => (
                <>
                  <li
                    key={index}
                    className="flex min-w-full px-3 py-3 justify-between items-center rounded-xl"
                    onClick={() => navigation(item.path)}
                  >
                    <a
                      href={item.path}
                      className="font-bold text-sm leading-[19px]"
                    >
                      {item.title}
                    </a>
                  </li>
                  {arr.length - 1 !== index && <Divider />}
                </>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
