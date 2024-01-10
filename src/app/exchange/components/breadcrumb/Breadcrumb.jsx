import { useEffect, useState } from "react";
import { useLocationPath } from "../../hooks/useLocationPath";
import { Breadcrumb } from "antd";
import { RpcProvider, Contract, uint256, number } from "starknet";
import { pairabi, erc20abi } from "./abi";
import BigNumber from "bignumber.js";

const ExchangeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.9924 13.9842C15.3986 17.0142 14.2728 20.2243 11.9801 21.831C9.55595 23.5296 6.34278 23.3588 4.16234 21.438C1.96876 19.5058 1.38614 16.3734 2.74248 13.7801C3.24899 12.812 3.96522 12.0306 4.88131 11.4352C5.78973 10.8442 6.78522 10.512 7.86778 10.4359C8.95471 10.3593 9.99017 10.5623 10.9999 11.0182C9.39989 7.5137 11.1773 4.22209 13.372 2.92514C15.9335 1.41095 19.1045 1.78143 21.147 3.84614C23.1977 5.91906 23.5613 9.09465 22.0636 11.566C20.6558 13.8895 17.3857 15.4951 13.9924 13.9842ZM8.33048 11.8122C5.6386 11.7996 3.42914 13.9891 3.41545 16.6826C3.40176 19.3887 5.57563 21.5754 8.30255 21.5973C11.0065 21.6192 13.2121 19.4363 13.2296 16.7214C13.2466 14.028 11.0475 11.8248 8.33048 11.8122ZM16.6854 13.1803C19.3953 13.1737 21.59 10.9749 21.5845 8.27107C21.579 5.57594 19.3887 3.39795 16.681 3.39467C13.9716 3.39139 11.7813 5.58634 11.7873 8.29843C11.7933 10.999 13.988 13.1869 16.6854 13.1803Z"
        fill="#C6C6C6"
      />
      <path
        d="M3.00969 7.99528C3.00422 6.61407 3.31853 5.37513 4.33701 4.41528C5.32922 3.48061 6.52621 3.03735 7.91267 3.03954C7.91267 2.83104 7.91541 2.63732 7.91212 2.4436C7.90884 2.25754 7.97181 2.11417 8.15798 2.05124C8.33595 1.99104 8.46517 2.06984 8.57524 2.20665C9.01713 2.75717 9.46066 3.30714 9.90529 3.85546C10.0438 4.02675 10.0537 4.1942 9.9146 4.36932C9.47107 4.92804 9.02753 5.48677 8.58674 6.04768C8.47558 6.18887 8.33759 6.25289 8.16565 6.20036C7.98659 6.14564 7.92636 5.99952 7.92472 5.82605C7.92198 5.60223 7.92417 5.37841 7.92417 5.15843C6.04161 4.94501 4.87802 6.13469 5.1288 7.98598C5.35112 7.98598 5.57617 7.98817 5.80123 7.98543C5.97097 7.98324 6.10239 8.04344 6.16317 8.2087C6.22669 8.38163 6.16481 8.52008 6.02573 8.63226C5.4694 9.0788 4.91525 9.52863 4.35727 9.97298C4.15796 10.1317 4.0353 10.1268 3.82996 9.96478C3.28074 9.53246 2.73536 9.09577 2.18505 8.66455C2.03775 8.54908 1.95945 8.41009 2.02132 8.22895C2.08375 8.04453 2.23597 7.98872 2.4216 7.99419C2.60996 7.99966 2.79723 7.99528 3.00969 7.99528Z"
        fill="#C6C6C6"
      />
      <path
        d="M21.9908 16.9984C21.9946 18.3769 21.6809 19.6229 20.6547 20.5849C19.6609 21.5163 18.4633 21.958 17.0867 21.9541C17.0867 22.1703 17.0851 22.3651 17.0873 22.5605C17.0895 22.7383 17.0243 22.8757 16.8518 22.9386C16.6771 23.0021 16.5419 22.932 16.4313 22.7941C15.9845 22.2381 15.5365 21.6832 15.0881 21.1283C14.9479 20.9549 14.9545 20.788 15.0925 20.6145C15.5322 20.0623 15.9708 19.5091 16.4066 18.9531C16.5227 18.8048 16.6651 18.7353 16.8452 18.796C17.0216 18.8557 17.0752 19.0056 17.0763 19.1786C17.0774 19.3964 17.0763 19.6136 17.0763 19.8281C18.9331 20.0684 20.1066 18.8809 19.8766 17.0077C19.657 17.0077 19.4336 17.0055 19.2102 17.0082C19.0328 17.0104 18.8948 16.9524 18.834 16.7746C18.7738 16.5978 18.845 16.4648 18.9824 16.3548C19.5333 15.9132 20.0814 15.4683 20.6334 15.0278C20.8354 14.8664 20.9625 14.8653 21.1618 15.0218C21.717 15.4579 22.2679 15.8995 22.8231 16.3351C22.972 16.4517 23.0405 16.5956 22.9753 16.774C22.9129 16.9458 22.7678 17.0033 22.5904 16.9989C22.396 16.994 22.2011 16.9984 21.9908 16.9984Z"
        fill="#C6C6C6"
      />
      <path
        d="M8.32061 12.5116C10.6368 12.5132 12.5145 14.3919 12.5134 16.7056C12.5117 19.0264 10.6434 20.8969 8.32444 20.899C5.99561 20.9012 4.11031 19.0193 4.11633 16.699C4.12181 14.3886 6.00765 12.51 8.32061 12.5116ZM7.95975 14.5916C7.7807 14.6157 7.62573 14.6212 7.47953 14.6589C6.91663 14.8029 6.52292 15.3539 6.57056 15.9154C6.62313 16.5365 7.08418 17.0131 7.69582 17.0487C8.05832 17.0701 8.42355 17.0476 8.78714 17.0531C9.13868 17.058 9.36428 17.2638 9.36866 17.5708C9.37304 17.8887 9.14689 18.0956 8.78166 18.0994C8.30856 18.1049 7.83545 18.1032 7.36235 18.1098C7.08254 18.1136 6.93305 18.2439 6.93743 18.4671C6.94127 18.6817 7.08747 18.802 7.35633 18.8064C7.55729 18.8097 7.75825 18.807 7.94606 18.807C7.96468 18.8469 7.97563 18.86 7.97618 18.8726C7.98056 19.0614 7.9822 19.2508 7.98713 19.4396C7.99425 19.7044 8.1191 19.8489 8.33703 19.8473C8.55332 19.8456 8.67981 19.6979 8.68474 19.4341C8.68857 19.2322 8.68529 19.0302 8.68529 18.8097C8.77728 18.8037 8.84792 18.7993 8.91856 18.7949C9.78099 18.7451 10.3291 17.8444 9.9584 17.0684C9.72951 16.5885 9.32486 16.363 8.80028 16.3543C8.47283 16.3488 8.14483 16.3652 7.81793 16.3576C7.49048 16.3499 7.26543 16.1244 7.26981 15.8289C7.27419 15.5405 7.48884 15.3359 7.81191 15.3145C7.86995 15.3107 7.92854 15.3123 7.98659 15.3123C8.41588 15.3096 8.84518 15.308 9.27503 15.3036C9.55757 15.3008 9.70761 15.1788 9.70816 14.9566C9.70816 14.7334 9.55758 14.6091 9.27612 14.6059C9.07571 14.6037 8.87585 14.6059 8.65901 14.6059C8.65901 14.3716 8.66174 14.1692 8.65846 13.9667C8.65463 13.7254 8.52266 13.5721 8.31951 13.5656C8.10979 13.559 7.96578 13.7188 7.9614 13.9705C7.95756 14.1735 7.96085 14.3766 7.96085 14.5922L7.95975 14.5916Z"
        fill="#C6C6C6"
      />
      <path
        d="M16.6804 12.4815C14.3637 12.4799 12.486 10.6023 12.4866 8.28861C12.4877 5.96615 14.3522 4.0979 16.6733 4.09407C19.0011 4.09024 20.8896 5.97327 20.8836 8.29189C20.8781 10.6023 18.9912 12.4832 16.6804 12.4815ZM16.3163 5.84193C16.221 5.84193 16.1498 5.84193 16.0792 5.84193C15.599 5.84467 15.1188 5.84631 14.638 5.85178C14.3768 5.85452 14.2251 5.98585 14.2268 6.19873C14.2284 6.41051 14.3861 6.54677 14.6396 6.55005C14.8417 6.55279 15.0437 6.55005 15.2672 6.55005V10.0222C15.2431 10.031 15.2294 10.0398 15.2162 10.0398C15.0344 10.0419 14.8526 10.0419 14.6703 10.0452C14.3894 10.0502 14.2404 10.1744 14.2448 10.3987C14.2487 10.6204 14.4025 10.7435 14.6829 10.743C15.156 10.7424 15.6291 10.738 16.1022 10.7369C16.1783 10.7369 16.2544 10.7435 16.3415 10.7479C16.3415 10.8683 16.3382 10.9624 16.342 11.056C16.3508 11.2771 16.4904 11.4259 16.6876 11.4281C16.883 11.4303 17.0271 11.282 17.0386 11.0598C17.044 10.9547 17.0396 10.8491 17.0396 10.7172C17.3386 10.7172 17.6015 10.7347 17.8616 10.7139C18.477 10.6642 18.9803 10.2105 19.0963 9.62386C19.2201 8.99728 18.937 8.39368 18.3796 8.09708C18.3237 8.06753 18.2679 8.03798 18.2164 8.01062C18.2202 7.98271 18.2186 7.96739 18.2241 7.9548C18.6944 6.91943 18.2525 6.06684 17.1349 5.84357C17.0873 5.83427 17.0369 5.76039 17.0183 5.70622C16.998 5.64766 17.0156 5.57652 17.0117 5.5114C17.0002 5.28923 16.8809 5.15625 16.6865 5.1464C16.4806 5.136 16.3366 5.26679 16.3174 5.4917C16.3081 5.59896 16.3163 5.70731 16.3163 5.84193Z"
        fill="#C6C6C6"
      />
      <path
        d="M15.9938 10.0299V8.66672C16.0315 8.65852 16.0721 8.64265 16.1126 8.6421C16.6366 8.63772 17.1606 8.63115 17.6847 8.63389C18.1162 8.63663 18.4272 8.92885 18.4326 9.32231C18.4381 9.71358 18.1315 10.0195 17.6994 10.0271C17.1404 10.037 16.5813 10.0299 15.9938 10.0299Z"
        fill="#C6C6C6"
      />
      <path
        d="M15.9855 7.93837V6.55168C16.382 6.55168 16.7669 6.53198 17.1497 6.5577C17.4733 6.57905 17.7175 6.89261 17.7208 7.22533C17.7235 7.56899 17.4881 7.8541 17.1453 7.91813C17.0812 7.93016 17.0155 7.93673 16.9504 7.93728C16.6388 7.93947 16.3278 7.93837 15.9855 7.93837Z"
        fill="#C6C6C6"
      />
    </svg>
  );
};

const provider = new RpcProvider({
  nodeUrl:
    "https://starknet-mainnet.infura.io/v3/6892505f20e24c1d86f9b3313f47ea74",
});

function hex2a(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str.substring(1); // remove whitespace in front
}

export const BreadCrumb = () => {
  const currentPath = useLocationPath();
  let url = currentPath.split("/");
  let pairAddress = url[url.length - 1];

  const [token0Address, setToken0Address] = useState();
  const [token1Address, setToken1Address] = useState();

  const [token0Symbol, setToken0Symbol] = useState(" - ");
  const [token1Symbol, setToken1Symbol] = useState(" - ");

  useEffect(() => {
    const fetchData = async () => {
      const pairContract = new Contract(pairabi, pairAddress, provider);
      let token0_address = await pairContract.call("token0");
      let token1_address = await pairContract.call("token1");
      let token0AddressValue = number.toHex(token0_address.address);
      let token1AddressValue = number.toHex(token1_address.address);
      setToken0Address(token0AddressValue);
      setToken1Address(token1AddressValue);
    };
    if (pairAddress.slice(0, 2) === "0x") fetchData();
  }, [pairAddress]);

  useEffect(() => {
    const fetchData = async () => {
      if (token0Address && token1Address) {
        const token0ContractObj = new Contract(
          erc20abi,
          token0Address,
          provider
        );
        let token0_symbol = await token0ContractObj.call("symbol");
        let token0SymbolValue = hex2a(number.toHex(token0_symbol.symbol));
        setToken0Symbol(token0SymbolValue);
        const token1ContractObj = new Contract(
          erc20abi,
          token1Address,
          provider
        );
        let token1_symbol = await token1ContractObj.call("symbol");
        let token1SymbolValue = hex2a(number.toHex(token1_symbol.symbol));
        setToken1Symbol(token1SymbolValue);
      }
    };
    fetchData();
  }, [token0Address, token1Address]);

  return (
    <Breadcrumb separator=">">
      {currentPath === "/swap" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/swap" className="font-bold !text-base">
            Swap
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/add" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/swap/liquidity"
            className="font-bold !text-base"
          >
            Add Liquidity
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/bridge" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/swap/bridge" className="font-bold !text-base">
            Bridge
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/liquidity" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/liquidity" className="!text-base font-bold">
            Pools
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === `/liquidity/${pairAddress}` && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="!text-base font-normal">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/liquidity">
            <span className="!text-base font-normal text-[#c6c6c6] ">
              Pools
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="!text-base text-center pt-[1px]">
            {token0Symbol} / {token1Symbol}
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/your-liquidity" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/your-liquidity"
            className="font-bold !text-base"
          >
            Liquidity
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/your-liquidity/details" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/your-liquidity">
            <span className="!text-base font-normal text-[#c6c6c6] ">
              Liquidity
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold !text-base">
            SFN / ETH
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/overview" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/overview" className="font-bold !text-base">
            Overview
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/overview/token" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/overview">
            <span className="!text-base font-normal text-[#c6c6c6] ">
              Overview
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/overview/token"
            className="font-bold !text-base"
          >
            Token
          </Breadcrumb.Item>
        </>
      )}
      {currentPath === "/overview/pair" && (
        <>
          <Breadcrumb.Item>
            <ExchangeIcon width="24" height="24" />
            <span className="font-normal !text-base">Exchange</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/overview">
            <span className="!text-base font-normal text-[#c6c6c6] ">
              Overview
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/overview/pair"
            className="font-bold !text-base"
          >
            Pair
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};
