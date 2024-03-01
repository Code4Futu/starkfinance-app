import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "17:00",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "21:00",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "01:00",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "05:00",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "09:00",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "13:00",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "17:00",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const ChartBarDesktop = ({ chartHeight }) => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart width={150} height={227} data={data} barCategoryGap={0}>
        <Bar dataKey="uv" fill="#24C3BC" />
        <Bar dataKey="pv" fill="#24C3BC" />
        <Bar dataKey="amt" fill="#24C3BC" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
