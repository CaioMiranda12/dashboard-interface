'use client'

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface FinanceChartProps {
  financeEvolutionData: {
    month: string;
    income: number;
    expense: number;
    balance: number;
  }[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function FinanceChart({ financeEvolutionData }: FinanceChartProps) {
  console.log(financeEvolutionData)

  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]

  const currentYear = new Date().getFullYear()
  const fullData = Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, '0')
    const key = `${currentYear}-${month}`

    const existing = financeEvolutionData.find((d) => d.month === key)
    return existing ?? {
      month: key,
      income: 0,
      expense: 0,
      balance: 0,
      spacer: 0,
    }
  })

  return (
    <div>
      <ChartContainer config={chartConfig} >
        <BarChart
          width={1000}
          height={300}
          accessibilityLayer
          data={fullData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={20}
          barGap={2}
          barCategoryGap="50%"
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => {
              const [, month] = value.split("-")
              const monthIndex = parseInt(month, 10) - 1
              return monthNames[monthIndex] ?? value
            }}
          />

          <YAxis
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `R$ ${value}`}

          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />

          <ReferenceLine y={0} stroke="#ccc" strokeDasharray="4 4" />
          <Bar dataKey="income" fill="#00ED64" radius={4} name="Receita" />
          <Bar dataKey="expense" fill="#DB3030" radius={4} name="Despesa" />
          <Bar dataKey="balance" fill="#016BF8" radius={4} name="Saldo" />
          <Bar dataKey="spacer" fill="transparent" />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
