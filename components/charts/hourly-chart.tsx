"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface HourlyData {
  hour: string
  impressions: number
  clicks: number
  revenue: number
  ctr: string
  ecpm: string
}

interface HourlyChartProps {
  data: HourlyData[]
}

export function HourlyChart({ data }: HourlyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="hour"
          axisLine={false}
          tickLine={false}
          interval={2} // Show every 3rd hour to avoid crowding
          fontSize={12}
        />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "none",
          }}
          formatter={(value: number, name: string) => {
            if (name === "revenue") return [`$${value.toFixed(2)}`, "Revenue"]
            if (name === "impressions") return [value.toLocaleString(), "Impressions"]
            if (name === "clicks") return [value, "Clicks"]
            return [value, name]
          }}
          labelFormatter={(label) => `Hour: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 2 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="impressions"
          name="Impressions"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 2 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
          yAxisId="right"
        />
        <Line
          type="monotone"
          dataKey="clicks"
          name="Clicks"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 2 }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
