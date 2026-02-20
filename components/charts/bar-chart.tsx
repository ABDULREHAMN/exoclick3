"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { name: "Jul 1", impressions: 0, clicks: 0, revenue: 0.0 },
  { name: "Jul 2", impressions: 0, clicks: 0, revenue: 0.0 },
  { name: "Jul 3", impressions: 1321, clicks: 33, revenue: 92.44 },
  { name: "Jul 4", impressions: 10987, clicks: 2345, revenue: 240.0 },
  { name: "Jul 5", impressions: 13387, clicks: 435, revenue: 250.0 },
  { name: "Jul 6", impressions: 23904, clicks: 8746, revenue: 790.88 },
  { name: "Jul 7", impressions: 19933, clicks: 3238, revenue: 690.98 },
  { name: "Jul 8", impressions: 26323, clicks: 7843, revenue: 930.0 },
  { name: "Jul 9", impressions: 96460, clicks: 19323, revenue: 2416.11 },
  { name: "Jul 10", impressions: 7113, clicks: 25443, revenue: 8779.22 },
  { name: "Jul 11", impressions: 469, clicks: 135, revenue: 423.87 },
  { name: "Jul 12", impressions: 2065, clicks: 154, revenue: 25.44 },
  { name: "Jul 13", impressions: 500, clicks: 15, revenue: 4.0 },
  { name: "Jul 14", impressions: 600, clicks: 18, revenue: 6.0 },
  { name: "Jul 15", impressions: 700, clicks: 20, revenue: 8.0 },
  { name: "Jul 16", impressions: 210, clicks: 10, revenue: 4.0 },
  { name: "Jul 17", impressions: 0, clicks: 0, revenue: 0.0 },
  { name: "Jul 18", impressions: 3088, clicks: 98, revenue: 20.0 },
  { name: "Jul 19", impressions: 1577, clicks: 38, revenue: 30.0 },
  { name: "Jul 20", impressions: 1500, clicks: 40, revenue: 15.0 },
  { name: "Jul 21", impressions: 0, clicks: 0, revenue: 0.0 },
  { name: "Jul 22", impressions: 0, clicks: 0, revenue: 0.0 },
  { name: "Jul 23", impressions: 4532, clicks: 2232, revenue: 10.0 },
  { name: "Jul 24", impressions: 8000, clicks: 1500, revenue: 350.0 },
  { name: "Jul 25", impressions: 10000, clicks: 2300, revenue: 983.0 },
  { name: "Jul 26", impressions: 8936, clicks: 1885, revenue: 876.0 },
  { name: "Jul 27", impressions: 2023, clicks: 350, revenue: 23.0 },
  { name: "Jul 28", impressions: 987, clicks: 23, revenue: 23.0 },
  { name: "Jul 29", impressions: 583, clicks: 17, revenue: 198.0 },
  { name: "Jul 30", impressions: 670, clicks: 21, revenue: 241.0 },
  { name: "Jul 31", impressions: 695, clicks: 24, revenue: 271.0 },
  { name: "Aug 1", impressions: 9820, clicks: 2980, revenue: 4034.0 },
  { name: "Aug 2", impressions: 9920, clicks: 2990, revenue: 4087.0 },
  { name: "Aug 3", impressions: 1100, clicks: 45, revenue: 987.0 },
  { name: "Aug 4", impressions: 1060, clicks: 33, revenue: 1133.0 },
  { name: "Aug 5", impressions: 1025, clicks: 27, revenue: 1456.0 },
  { name: "Aug 6", impressions: 11000, clicks: 3240, revenue: 2387.0 },
  { name: "Aug 7", impressions: 11000, clicks: 3240, revenue: 2576.0 },
  { name: "Aug 8", impressions: 18976, clicks: 5674, revenue: 18930.0 },
  { name: "Aug 9", impressions: 19820, clicks: 5890, revenue: 24432.0 },
  { name: "Aug 10", impressions: 8650, clicks: 2560, revenue: 643.0 },
  { name: "Aug 11", impressions: 9230, clicks: 2785, revenue: 685.0 },
  { name: "Aug 12", impressions: 9560, clicks: 2845, revenue: 564.0 },
  { name: "Aug 13", impressions: 9890, clicks: 2965, revenue: 578.0 },
  { name: "Aug 14", impressions: 10120, clicks: 3012, revenue: 578.0 },
  { name: "Aug 15", impressions: 10430, clicks: 3134, revenue: 700.0 },
  { name: "Aug 16", impressions: 10560, clicks: 3198, revenue: 560.0 },
  { name: "Aug 17", impressions: 10890, clicks: 3267, revenue: 590.0 },
  { name: "Aug 18", impressions: 11120, clicks: 3345, revenue: 675.0 },
  { name: "Aug 19", impressions: 11430, clicks: 3421, revenue: 650.0 },
  { name: "Aug 20", impressions: 11780, clicks: 3532, revenue: 690.0 },
  { name: "Aug 21", impressions: 12010, clicks: 3601, revenue: 710.0 },
  { name: "Aug 22", impressions: 12450, clicks: 3745, revenue: 730.0 },
  { name: "Aug 23", impressions: 12890, clicks: 3867, revenue: 3560.0 },
  { name: "Aug 24", impressions: 13210, clicks: 3962, revenue: 4560.0 },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
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
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
