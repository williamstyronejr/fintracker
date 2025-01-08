import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./ui/chart";
import type { ChartConfig } from "./ui/chart";

const chartConfig = {
  income: {
    label: "Income",
    color: "#256256",
  },
  spend: {
    label: "Spend",
    color: "#ff3636",
  },
} satisfies ChartConfig;

export default function MonthlyChart() {
  const chartData = [
    { month: "January", spend: 186, income: 80 },
    { month: "February", spend: 305, income: 200 },
    { month: "March", spend: 237, income: 120 },
    { month: "April", spend: 73, income: 190 },
    { month: "May", spend: 209, income: 130 },
    { month: "June", spend: 214, income: 140 },
  ];

  return (
    <ChartContainer config={chartConfig} className="h-44  w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          padding={{ left: -10 }}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <Bar
          dataKey="income"
          stackId="a"
          fill="var(--color-income)"
          radius={4}
        />

        <Bar dataKey="spend" stackId="a" fill="var(--color-spend)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
