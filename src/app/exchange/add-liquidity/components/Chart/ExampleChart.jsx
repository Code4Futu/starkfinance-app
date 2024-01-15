import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import DUMMY_DATA from "@/app/exchange/dummy-data-chart";

export const ExampleChart = () => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart data={DUMMY_DATA.data}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#24C3BC" stopOpacity={0.2} />
						<stop offset="95%" stopColor="#24C3BC" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dy={10} dataKey="name" axisLine={false} tickLine={false} />
				<YAxis
					dx={5}
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
		</ResponsiveContainer>
	);
};
