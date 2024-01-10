import {
  ComingSoonPage,
  WrapLiquidityPage,
  WrapSwapPage,
  LiquidityDetail,
  YourLiquidity,
  YourLiquidityDetail,
  YourLiquidityRemove,
  Overview,
  OverviewPair,
  OverviewToken,
  LayerSwap,
  WrapAddliquidityPage,
} from "../pages";
import route from "./route";

const publicRoutesMobile = [
  { path: route.home, element: ComingSoonPage },
  { path: route.swap, element: WrapSwapPage },
  { path: route.swapBridge, element: WrapSwapPage },
  { path: route.bridge, element: LayerSwap },
  { path: route.swapLiquidity, element: WrapAddliquidityPage },
  { path: route.liquidity, element: WrapLiquidityPage },
  { path: route.details, element: LiquidityDetail },
  { path: route.yourLiquidity, element: YourLiquidity },
  { path: route.yourLiquidityDetails, element: YourLiquidityDetail },
  { path: route.yourLiquidityRemove, element: YourLiquidityRemove },
  { path: route.swapOverview, element: ComingSoonPage },
  { path: route.overview, element: Overview },
  { path: route.overviewToken, element: OverviewToken },
  { path: route.overviewPair, element: OverviewPair },
  { path: "*", element: ComingSoonPage },
];

export { publicRoutesMobile };
