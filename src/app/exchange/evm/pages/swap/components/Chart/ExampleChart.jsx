import { Area, AreaChart, XAxis, YAxis } from "recharts";
import DUMMY_DATA from "../../../../../dummy-data-chart";
import { useState, useEffect } from "react";

export const ExampleChart = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AreaChart
      width={windowSize.width > 600 ? 674 : windowSize.width - 80}
      height={300}
      data={DUMMY_DATA.data}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#24C3BC" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#24C3BC" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" axisLine={false} tickLine={false} />
      <YAxis
        dataKey="uv"
        axisLine={false}
        tickLine={false}
        orientation="right"
      />
      {/* <Tooltip content={<CustomTooltip />} /> */}
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#24C3BC"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};
