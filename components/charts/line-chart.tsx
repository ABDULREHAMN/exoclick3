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

// Updated data for the last 7 months (Jan-Jul) with February 2026 update
const data = [
  { name: "Jan", revenue: 145 },
  { name: "Feb", revenue: 356.76 }, // Updated February 2026 total with Feb 21
  { name: "Mar", revenue: 0 },
  { name: "Apr", revenue: 0 },
  { name: "May", revenue: 0 },
  { name: "Jun", revenue: 3910.46 },
  { name: "Jul", revenue: 14183.37 },
]

// Totals for February 12-21 period
const PERIOD_TOTALS = {
  revenue: 356.76,
  impressions: 95690,
  clicks: 800,
}

export function LineChart() {
  return (
    <div className="w-full">
      {/* Totals Display Section */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Revenue</p>
            <p className="text-lg font-semibold text-gray-900">${PERIOD_TOTALS.revenue.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Impressions</p>
            <p className="text-lg font-semibold text-gray-900">{PERIOD_TOTALS.impressions.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Clicks</p>
            <p className="text-lg font-semibold text-gray-900">{PERIOD_TOTALS.clicks.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
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
    </div>
  )
}
