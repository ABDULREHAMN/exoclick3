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

// Updated data for the last 7 months (Jan-Jul) with updated July total
const data = [
  { name: "Jan", revenue: 145 },
  { name: "Feb", revenue: 168 },
  { name: "Mar", revenue: 195 },
  { name: "Apr", revenue: 178 },
  { name: "May", revenue: 192 },
  { name: "Jun", revenue: 3910.46 },
  { name: "Jul", revenue: 14183.37 }, // Updated month total
]

export function LineChart() {
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
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "none",
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Monthly Revenue"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
