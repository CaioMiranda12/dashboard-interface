"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { convertCurrency } from "@/utils/convertCurrency";

interface ExpenseChartProps {
  expensesByCategory: Record<string, {
    total: number;
    color: string;
  }>
}

export function ExpenseChart({ expensesByCategory }: ExpenseChartProps) {
  const chartConfig: ChartConfig = {
    visitors: {
      label: "Total",
    },
  }

  const chartData = Object.entries(expensesByCategory).map(([category, { total, color }], index) => {
    const key = `cat${index}`;

    chartConfig[key] = {
      label: category,
      color,
    }

    return {
      category: key,
      visitors: total,
      fill: color,
    }
  });

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] ml-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;

                const { name, payload: data } = payload[0];

                if (!name) return;

                return (
                  <div className="bg-white text-black p-2 rounded shadow">
                    <p className="font-bold">{chartConfig[name].label}</p>
                    <p>{convertCurrency(data.visitors)}</p>
                  </div>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="category"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col justify-center gap-2">
        {
          Object.entries(expensesByCategory).map(item => (
            <div key={item[0]} className="flex items-center gap-2">
              <div
                style={{ backgroundColor: item[1].color }}
                className="w-8 h-3"
              ></div>
              <p className="text-gray-200">{item[0]}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
