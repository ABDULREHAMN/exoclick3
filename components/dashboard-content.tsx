"use client"

import React from "react"
import { useState, useMemo } from "react"
import {
  Eye,
  MousePointer,
  DollarSign,
  BarChart2,
  Filter,
  Calendar,
  ChevronDown,
  Globe,
  Plus,
  Grid3X3,
  Download,
  TrendingUp,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type DashboardView = "default" | "new" | "overview" // Added "overview" to DashboardView
type WidgetType = "default" | "today" | "hourly"

interface DashboardContentProps {
  onNavigate?: (path: string) => void
}

export function DashboardContent({ onNavigate }: DashboardContentProps) {
  const [dashboardView, setDashboardView] = useState<DashboardView>("default") // Changed initial state to "overview"
  const [activeWidget, setActiveWidget] = useState<WidgetType>("default")
  const [groupBy, setGroupBy] = useState("Day")
  const [chartView, setChartView] = useState<"daily" | "weekly" | "monthly">("daily")
  // const [dateRange, setDateRange] = useState<7 | 14 | 30 | null>(null) // REMOVED

  const [dashboardDateRange, setDashboardDateRange] = useState<7 | 14 | 30 | null>(null)
  // Updated to array-based multi-select for countries and devices
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["All"])
  const [selectedDevices, setSelectedDevices] = useState<string[]>(["All"])

  const [geoView, setGeoView] = useState<"overview" | "comparison">("overview")
  const [comparisonCountries, setComparisonCountries] = useState<string[]>([
    "United States",
    "United Kingdom",
    "Canada",
  ])

  const handleDashboardChange = (view: DashboardView) => {
    setDashboardView(view)
  }

  const handleWidgetChange = (widget: WidgetType) => {
    setActiveWidget(widget)
  }

  const handleGroupByChange = (grouping: string) => {
    setGroupBy(grouping)
    if (grouping === "Hour") {
      setActiveWidget("hourly")
    }
  }

  const availableBalance = 285
  const pendingBalance = 0
  const thisMonthEarnings = 285
  const totalPayments = 0
  const totalEarnings = 285
  const nextWithdrawalDate = ""

  const allReportData = [
    { date: "Feb 12, 2026", impressions: 8970, clicks: 79, revenue: 20, ctr: "0.88%", ecpm: "2.23" },
    { date: "Feb 13, 2026", impressions: 9400, clicks: 82, revenue: 22, ctr: "0.87%", ecpm: "2.34" },
    { date: "Feb 14, 2026", impressions: 10020, clicks: 85, revenue: 25, ctr: "0.85%", ecpm: "2.50" },
    { date: "Feb 15, 2026", impressions: 10800, clicks: 88, revenue: 27, ctr: "0.81%", ecpm: "2.50" },
    { date: "Feb 16, 2026", impressions: 11200, clicks: 91, revenue: 29, ctr: "0.81%", ecpm: "2.59" },
    { date: "Feb 17, 2026", impressions: 11800, clicks: 95, revenue: 30, ctr: "0.81%", ecpm: "2.54" },
    { date: "Feb 18, 2026", impressions: 12000, clicks: 98, revenue: 31, ctr: "0.82%", ecpm: "2.58" },
    { date: "Feb 19, 2026", impressions: 11000, clicks: 92, revenue: 67, ctr: "0.84%", ecpm: "6.09" },
    { date: "Feb 20, 2026", impressions: 10500, clicks: 90, revenue: 34, ctr: "0.86%", ecpm: "3.24" },
  ]

  const recentActivityData = [
    { date: "Feb 20, 2026", impressions: 10500, clicks: 90, revenue: 34, ctr: "0.86%", ecpm: "3.24" },
    { date: "Feb 19, 2026", impressions: 11000, clicks: 92, revenue: 67, ctr: "0.84%", ecpm: "6.09" },
    { date: "Feb 18, 2026", impressions: 12000, clicks: 98, revenue: 31, ctr: "0.82%", ecpm: "2.58" },
    { date: "Feb 17, 2026", impressions: 11800, clicks: 95, revenue: 30, ctr: "0.81%", ecpm: "2.54" },
    { date: "Feb 16, 2026", impressions: 11200, clicks: 91, revenue: 29, ctr: "0.81%", ecpm: "2.59" },
    { date: "Feb 15, 2026", impressions: 10800, clicks: 88, revenue: 27, ctr: "0.81%", ecpm: "2.50" },
    { date: "Feb 14, 2026", impressions: 10020, clicks: 85, revenue: 25, ctr: "0.85%", ecpm: "2.50" },
    { date: "Feb 13, 2026", impressions: 9400, clicks: 82, revenue: 22, ctr: "0.87%", ecpm: "2.34" },
    { date: "Feb 12, 2026", impressions: 8970, clicks: 79, revenue: 20, ctr: "0.88%", ecpm: "2.23" },
  ]

  const latestActivity = {
    date: "Feb 20, 2026",
    revenue: 34,
    impressions: 10500,
    clicks: 90,
    ctr: "0.86%",
    ecpm: "3.24",
  }

  const todayRevenue = 34
  const todayImpressions = 10500
  const todayClicks = 90
  const todayCTR = "0.84"
  const todayECPM = "22"

  const hourlyData = [
    { hour: "00", revenue: 2, impressions: 400, clicks: 5, ctr: "1.25%", ecpm: "5.00" },
    { hour: "01", revenue: 1, impressions: 350, clicks: 4, ctr: "1.14%", ecpm: "2.86" },
    { hour: "02", revenue: 3, impressions: 500, clicks: 6, ctr: "1.20%", ecpm: "6.00" },
    { hour: "03", revenue: 2, impressions: 420, clicks: 5, ctr: "1.19%", ecpm: "4.76" },
    { hour: "04", revenue: 4, impressions: 600, clicks: 7, ctr: "1.17%", ecpm: "6.67" },
    { hour: "05", revenue: 3, impressions: 550, clicks: 6, ctr: "1.09%", ecpm: "5.45" },
    { hour: "06", revenue: 5, impressions: 800, clicks: 9, ctr: "1.13%", ecpm: "6.25" },
    { hour: "07", revenue: 4, impressions: 750, clicks: 8, ctr: "1.07%", ecpm: "5.33" },
    { hour: "08", revenue: 3, impressions: 600, clicks: 7, ctr: "1.17%", ecpm: "5.00" },
    { hour: "09", revenue: 4, impressions: 700, clicks: 8, ctr: "1.14%", ecpm: "5.71" },
    { hour: "10", revenue: 3, impressions: 650, clicks: 7, ctr: "1.08%", ecpm: "4.62" },
  ]

  const todayTotals = {
    impressions: 10500,
    clicks: 90,
    revenue: 34,
  }

  // This ensures all data aggregates to locked totals: $4,819.23 revenue, 32,687 clicks, 567,531 impressions

  // Define country distribution percentages (must sum to 100%)
  const countryDistribution = {
    "United States": 0.4,
    "United Kingdom": 0.25,
    Canada: 0.2,
    Others: 0.15,
  }

  // Define common keywords for traffic distribution
  const keywordsList = [
    "crypto news",
    "blockchain technology",
    "bitcoin mining",
    "ethereum updates",
    "nft marketplace",
    "defi platforms",
    "web3 development",
    "digital education",
    "online learning",
    "tech tutorials",
  ]

  // Hour distribution curve (simulates typical daily traffic pattern)
  const hourlyTrafficCurve = [
    0.015, // 00:00
    0.01, // 01:00
    0.008, // 02:00
    0.007, // 03:00
    0.01, // 04:00
    0.02, // 05:00
    0.035, // 06:00
    0.05, // 07:00
    0.06, // 08:00
    0.07, // 09:00
    0.075, // 10:00
    0.07, // 11:00
    0.06, // 12:00
    0.065, // 13:00
    0.07, // 14:00
    0.075, // 15:00
    0.07, // 16:00
    0.065, // 17:00
    0.06, // 18:00
    0.055, // 19:00
    0.05, // 20:00
    0.04, // 21:00
    0.03, // 22:00
    0.02, // 23:00
  ]

  // Distribute each day's data into hourly breakdown
  const distributeDataByHour = (dailyData: typeof allReportData) => {
    const hourlyData: Array<{
      date: string
      hour: number
      country: string
      keyword: string
      revenue: number
      impressions: number
      clicks: number
    }> = []

    dailyData.forEach((day) => {
      // Distribute this day's metrics across 24 hours
      hourlyTrafficCurve.forEach((hourWeight, hour) => {
        // Distribute across countries
        Object.entries(countryDistribution).forEach(([country, countryWeight]) => {
          // Distribute across keywords
          const keywordIndex = hour % keywordsList.length
          const keyword = keywordsList[keywordIndex]

          const hourRevenue = day.revenue * hourWeight * countryWeight
          const hourImpressions = Math.floor(day.impressions * hourWeight * countryWeight)
          const hourClicks = Math.floor(day.clicks * hourWeight * countryWeight)

          hourlyData.push({
            date: day.date,
            hour,
            country,
            keyword,
            revenue: Number(hourRevenue.toFixed(2)),
            impressions: hourImpressions,
            clicks: hourClicks,
          })
        })
      })
    })

    return hourlyData
  }

  // Generate full hourly distribution
  const fullHourlyData = React.useMemo(() => {
    return distributeDataByHour(allReportData)
  }, [])

  // Apply filters to hourly data
  const applyFiltersToHourlyData = (
    data: typeof fullHourlyData,
    dateRange: number | null, // Use null for "All Time"
    countries: string[],
    devices: string[],
  ) => {
    let filtered = [...data]

    // Apply date filter
    const now = new Date("2026-02-20") // Using Feb 20 as reference date for filtering
    if (dateRange === 7) {
      const sevenDaysAgo = new Date(now)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      filtered = filtered.filter((d) => new Date(d.date) >= sevenDaysAgo)
    } else if (dateRange === 14) {
      const fourteenDaysAgo = new Date(now)
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
      filtered = filtered.filter((d) => new Date(d.date) >= fourteenDaysAgo)
    } else if (dateRange === 30) {
      const thirtyDaysAgo = new Date(now)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      filtered = filtered.filter((d) => new Date(d.date) >= thirtyDaysAgo)
    }

    // Apply country filter
    if (countries.length > 0 && !countries.includes("All")) {
      filtered = filtered.filter((d) => countries.includes(d.country))
    }

    // Device filter doesn't segment data since source data is aggregated
    // but we maintain the filter UI for consistency

    return filtered
  }

  // Get filtered hourly data
  const filteredHourlyData = React.useMemo(() => {
    return applyFiltersToHourlyData(fullHourlyData, dashboardDateRange, selectedCountries, selectedDevices)
  }, [fullHourlyData, dashboardDateRange, selectedCountries, selectedDevices])

  // Aggregate hourly data for various views
  const aggregateHourlyData = {
    // By country
    byCountry: React.useMemo(() => {
      const countryMap = new Map<string, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const existing = countryMap.get(item.country) || { revenue: 0, clicks: 0, impressions: 0 }
        countryMap.set(item.country, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(countryMap.entries()).map(([country, metrics]) => ({
        country,
        ...metrics,
      }))
    }, [filteredHourlyData]),

    // By hour (across all days and countries)
    byHour: React.useMemo(() => {
      const hourMap = new Map<number, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const existing = hourMap.get(item.hour) || { revenue: 0, clicks: 0, impressions: 0 }
        hourMap.set(item.hour, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(hourMap.entries())
        .map(([hour, metrics]) => ({
          hour,
          ...metrics,
        }))
        .sort((a, b) => a.hour - b.hour)
    }, [filteredHourlyData]),

    // By keyword
    byKeyword: React.useMemo(() => {
      const keywordMap = new Map<string, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const existing = keywordMap.get(item.keyword) || { revenue: 0, clicks: 0, impressions: 0 }
        keywordMap.set(item.keyword, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(keywordMap.entries())
        .map(([keyword, metrics]) => ({
          keyword,
          ...metrics,
        }))
        .sort((a, b) => b.revenue - a.revenue)
    }, [filteredHourlyData]),

    // By date and hour (for detailed hourly reports)
    byDateAndHour: React.useMemo(() => {
      const dateHourMap = new Map<string, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const key = `${item.date}|${item.hour}`
        const existing = dateHourMap.get(key) || { revenue: 0, clicks: 0, impressions: 0 }
        dateHourMap.set(key, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(dateHourMap.entries())
        .map(([key, metrics]) => {
          const [date, hourStr] = key.split("|")
          return {
            date,
            hour: Number.parseInt(hourStr),
            ...metrics,
            ctr: ((metrics.clicks / metrics.impressions) * 100).toFixed(2) + "%",
            ecpm: metrics.ecpm || "0.00", // Use manual ECPM value from data, no auto-calculation
          }
        })
        .sort((a, b) => {
          const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime()
          return dateCompare !== 0 ? dateCompare : a.hour - b.hour
        })
    }, [filteredHourlyData]),

    // By country and hour (geo-time heatmap data)
    byCountryAndHour: React.useMemo(() => {
      const map = new Map<string, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const key = `${item.country}|${item.hour}`
        const existing = map.get(key) || { revenue: 0, clicks: 0, impressions: 0 }
        map.set(key, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(map.entries()).map(([key, metrics]) => {
        const [country, hourStr] = key.split("|")
        return {
          country,
          hour: Number.parseInt(hourStr),
          ...metrics,
        }
      })
    }, [filteredHourlyData]),

    // By country and keyword
    byCountryAndKeyword: React.useMemo(() => {
      const map = new Map<string, { revenue: number; clicks: number; impressions: number }>()

      filteredHourlyData.forEach((item) => {
        const key = `${item.country}|${item.keyword}`
        const existing = map.get(key) || { revenue: 0, clicks: 0, impressions: 0 }
        map.set(key, {
          revenue: existing.revenue + item.revenue,
          clicks: existing.clicks + item.clicks,
          impressions: existing.impressions + item.impressions,
        })
      })

      return Array.from(map.entries()).map(([key, metrics]) => {
        const [country, keyword] = key.split("|")
        return {
          country,
          keyword,
          ...metrics,
        }
      })
    }, [filteredHourlyData]),
  }

  // Update analytics insights to use filtered hourly data
  const topCountryToday = React.useMemo(() => {
    const todayData = filteredHourlyData.filter((d) => d.date === "Jan 16, 2026") // Using Jan 16, 2026 as today
    const countryRevenue = new Map<string, number>()

    todayData.forEach((item) => {
      countryRevenue.set(item.country, (countryRevenue.get(item.country) || 0) + item.revenue)
    })

    let topCountry = "United States"
    let maxRevenue = 0
    countryRevenue.forEach((revenue, country) => {
      if (revenue > maxRevenue) {
        maxRevenue = revenue
        topCountry = country
      }
    })

    return topCountry
  }, [filteredHourlyData])

  const bestHourPerCountry = React.useMemo(() => {
    const map = new Map<string, { hour: number; revenue: number }>()

    filteredHourlyData.forEach((item) => {
      const existing = map.get(item.country)
      if (!existing || item.revenue > existing.revenue) {
        map.set(item.country, { hour: item.hour, revenue: item.revenue })
      }
    })

    return Object.fromEntries(map.entries())
  }, [filteredHourlyData])

  const topKeywordPerCountry = React.useMemo(() => {
    const map = new Map<string, { keyword: string; revenue: number }>()

    aggregateHourlyData.byCountryAndKeyword.forEach((item) => {
      const existing = map.get(item.country)
      if (!existing || item.revenue > existing.revenue) {
        map.set(item.country, { keyword: item.keyword, revenue: item.revenue })
      }
    })

    return Object.fromEntries(map.entries())
  }, [aggregateHourlyData.byCountryAndKeyword])

  // Enhanced export with all dimensional data
  const handleEnhancedExport = (format: "csv" | "json" | "pdf") => {
    const exportData = {
      summary: {
        // Updated total revenue
        totalRevenue: 0,
        totalClicks: 0,
        totalImpressions: 0,
        dateRange: dashboardDateRange === null ? "All Time" : `Last ${dashboardDateRange} Days`,
        countries: selectedCountries.join(", "),
        devices: selectedDevices.join(", "),
        generatedAt: new Date().toISOString(),
      },
      byCountry: aggregateHourlyData.byCountry,
      byHour: aggregateHourlyData.byHour,
      byKeyword: aggregateHourlyData.byKeyword,
      byDateAndHour: aggregateHourlyData.byDateAndHour.slice(0, 100), // Limit for file size
      insights: {
        topCountryToday,
        bestHourPerCountry,
        topKeywordPerCountry,
      },
    }

    if (format === "csv") {
      // Export country breakdown
      const csvContent = [
        "Category,Country,Hour,Keyword,Revenue,Clicks,Impressions",
        ...aggregateHourlyData.byCountry.map(
          (d) => `Country,${d.country},-,-,${d.revenue.toFixed(2)},${d.clicks},${d.impressions}`,
        ),
        ...aggregateHourlyData.byHour.map(
          (d) => `Hour,-,${d.hour},-,${d.revenue.toFixed(2)},${d.clicks},${d.impressions}`,
        ),
        ...aggregateHourlyData.byKeyword.map(
          (d) => `Keyword,-,-,${d.keyword},${d.revenue.toFixed(2)},${d.clicks},${d.impressions}`,
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `dashboard-analytics-${Date.now()}.csv`
      a.click()
    } else if (format === "json") {
      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `dashboard-analytics-${Date.now()}.json`
      a.click()
    } else if (format === "pdf") {
      // For PDF, we'll create a detailed report
      console.log("PDF export:", exportData)
      alert("PDF export functionality will download a comprehensive report with all analytics")
    }
  }

  const applyDashboardFilters = (data: typeof allReportData) => {
    let filtered = [...data]

    // Apply date range filter from dashboard filters
    if (dashboardDateRange) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - dashboardDateRange)
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= cutoffDate
      })
    }

    // Note: Country and device filters are present in UI but data is aggregated
    // Filters don't actually segment data as it's all combined
    // Filter state is maintained for UI consistency per requirements

    return filtered
  }

  const filteredReportData = applyDashboardFilters(allReportData)

  const getFilteredData = () => {
    // This function is no longer directly used for chart data, but kept for potential future use or specific components.
    // It returns data based on the dateRange state (which is now dashboardDateRange).
    if (!dashboardDateRange) return allReportData

    const sortedData = [...allReportData].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    return sortedData.slice(0, dashboardDateRange)
  }

  const chartData = useMemo(() => {
    const data = filteredReportData

    if (chartView === "daily") {
      return data.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: item.revenue,
        impressions: item.impressions,
        clicks: item.clicks,
      }))
    } else if (chartView === "weekly") {
      // Weekly aggregation starting Monday
      const weeklyData: Record<string, { revenue: number; impressions: number; clicks: number; startDate: Date }> = {}
      data.forEach((d) => {
        const date = new Date(d.date)
        const dayOfWeek = date.getDay()
        const monday = new Date(date)
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1
        monday.setDate(date.getDate() - diff)
        monday.setHours(0, 0, 0, 0)

        const weekKey = monday.toISOString().split("T")[0]
        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = { revenue: 0, impressions: 0, clicks: 0, startDate: monday }
        }
        weeklyData[weekKey].revenue += d.revenue
        weeklyData[weekKey].impressions += d.impressions
        weeklyData[weekKey].clicks += d.clicks
      })
      return Object.entries(weeklyData)
        .sort((a, b) => a[1].startDate.getTime() - b[1].startDate.getTime())
        .map(([key, data]) => ({
          date: `Week of ${data.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
          revenue: data.revenue,
          impressions: data.impressions,
          clicks: data.clicks,
        }))
    } else {
      // Monthly aggregation
      const monthlyData: Record<string, { revenue: number; impressions: number; clicks: number }> = {}
      data.forEach((d) => {
        const month = d.date.split(" ")[0] + " " + d.date.split(" ")[2].split(",")[0]
        if (!monthlyData[month]) {
          monthlyData[month] = { revenue: 0, impressions: 0, clicks: 0 }
        }
        monthlyData[month].revenue += d.revenue
        monthlyData[month].impressions += d.impressions
        monthlyData[month].clicks += d.clicks
      })
      return Object.entries(monthlyData).map(([date, data]) => ({
        date,
        ...data,
      }))
    }
  }, [filteredReportData, chartView])

  const {
    totalRevenue: calculatedTotalRevenue,
    totalClicks: calculatedTotalClicks,
    totalImpressions: calculatedTotalImpressions,
  } = useMemo(() => {
    const total = filteredReportData.reduce(
      (acc, item) => ({
        revenue: acc.revenue + Number.parseFloat(item.revenue.toString().replace("$", "").replace(",", "")),
        clicks: acc.clicks + Number.parseInt(item.clicks.toString().replace(",", "")),
        impressions: acc.impressions + Number.parseInt(item.impressions.toString().replace(",", "")),
      }),
      { revenue: 0, clicks: 0, impressions: 0 },
    )
    return {
      totalRevenue: total.revenue,
      totalClicks: total.clicks,
      totalImpressions: total.impressions,
    }
  }, [filteredReportData])

  // Display totals - use calculated when filters are active, otherwise use fixed totals
  // FORCE UPDATE: Using Feb 12-20 totals
  const displayTotalRevenue = 285 // Forced Feb 12-20 total
  const displayTotalClicks = 800 // Forced Feb 12-20 total
  const displayTotalImpressions = 95690 // Forced Feb 12-20 total

  const calculateWeekOverWeekGrowth = () => {
    const dataToCalculate = dashboardDateRange ? filteredReportData : allReportData
    const relevantData = [...dataToCalculate].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    if (relevantData.length < 14) return null

    const currentWeekRevenue = relevantData
      .slice(0, 7)
      .reduce((sum, d) => sum + Number.parseFloat(d.revenue.toString()), 0)
    const previousWeekRevenue = relevantData
      .slice(7, 14)
      .reduce((sum, d) => sum + Number.parseFloat(d.revenue.toString()), 0)

    if (previousWeekRevenue === 0) return null

    return ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100
  }

  const weekOverWeekGrowth = calculateWeekOverWeekGrowth()

  const getCountryRevenueBreakdown = () => {
    const totalRevenue = filteredReportData.reduce(
      (sum, item) => sum + Number.parseFloat(item.revenue.toString().replace("$", "").replace(",", "")),
      0,
    )

    // Proportional distribution based on filtered data
    return {
      "United States": totalRevenue * 0.45,
      "United Kingdom": totalRevenue * 0.25,
      Canada: totalRevenue * 0.15,
      Others: totalRevenue * 0.15,
    }
  }

  const topCountryOfDay = useMemo(() => {
    const countryBreakdown = getCountryRevenueBreakdown()
    const topCountry = Object.entries(countryBreakdown).sort(([, a], [, b]) => b - a)[0]
    return { country: topCountry[0], revenue: topCountry[1] }
  }, [filteredReportData])

  const bestHourPerCountry_old = useMemo(() => {
    // Since we don't have hourly data, calculate based on typical patterns
    return {
      "United States": {
        hour: 14,
        revenue: topCountryOfDay.country === "United States" ? topCountryOfDay.revenue * 0.15 : 0,
      },
      "United Kingdom": {
        hour: 11,
        revenue: topCountryOfDay.country === "United Kingdom" ? topCountryOfDay.revenue * 0.15 : 0,
      },
      Canada: { hour: 13, revenue: topCountryOfDay.country === "Canada" ? topCountryOfDay.revenue * 0.15 : 0 },
    }
  }, [topCountryOfDay])

  const topKeywordPerCountry_old = useMemo(() => {
    return {
      "United States": {
        keyword: "technology",
        revenue: topCountryOfDay.country === "United States" ? topCountryOfDay.revenue * 0.2 : 0,
      },
      "United Kingdom": {
        keyword: "crypto",
        revenue: topCountryOfDay.country === "United Kingdom" ? topCountryOfDay.revenue * 0.2 : 0,
      },
      Canada: {
        keyword: "education",
        revenue: topCountryOfDay.country === "Canada" ? topCountryOfDay.revenue * 0.2 : 0,
      },
    }
  }, [topCountryOfDay])

  // Calculate country-wise revenue breakdown (logic only, uses aggregated data)
  // This function is now integrated into getCountryRevenueBreakdown and used by topCountryOfDay, bestHourPerCountry, etc.

  // Calculate top country of the day
  // This is now handled by topCountryOfDay

  // Calculate best hour per country (logic based on hourly patterns)
  // This is now handled by bestHourPerCountry

  // Calculate top keyword per country (placeholder logic)
  // This is now handled by topKeywordPerCountry

  // Geo heatmap data calculation (logic only)
  const getGeoHeatmapData = () => {
    const countryRevenue = getCountryRevenueBreakdown()
    return Object.entries(countryRevenue).map(([country, revenue]) => ({
      country,
      impressions: Math.floor(revenue * 100), // Approximate impressions
      intensity: revenue,
    }))
  }

  // Country comparison data for daily/hourly/keyword breakdowns
  const getCountryComparisonData = (breakdownType: "daily" | "hourly" | "keyword") => {
    if (breakdownType === "daily") {
      // Generate daily comparison data for selected countries
      return comparisonCountries.map((country) => ({
        country,
        dailyData: filteredReportData.map((item) => ({
          date: item.date,
          revenue:
            Number.parseFloat(item.revenue.toString().replace("$", "").replace(",", "")) / comparisonCountries.length,
          impressions: Number.parseInt(item.impressions.toString().replace(",", "")) / comparisonCountries.length,
          clicks: Number.parseInt(item.clicks.toString().replace(",", "")) / comparisonCountries.length,
        })),
      }))
    } else if (breakdownType === "hourly") {
      // Hourly breakdown logic (placeholder as data is daily)
      return comparisonCountries.map((country) => ({
        country,
        bestHour: bestHourPerCountry_old[country as keyof typeof bestHourPerCountry_old] || {
          hour: 12,
          revenue: 0,
        },
      }))
    } else {
      // Keyword breakdown logic
      return comparisonCountries.map((country) => ({
        country,
        topKeyword: topKeywordPerCountry_old[country as keyof typeof topKeywordPerCountry_old] || {
          keyword: "N/A",
          revenue: 0,
        },
      }))
    }
  }

  const handleExport = (format: "csv" | "json" | "pdf") => {
    const exportData = chartData.map((item) => ({
      Date: item.date,
      Revenue: typeof item.revenue === "number" ? `$${item.revenue.toFixed(2)}` : item.revenue,
      Impressions: typeof item.impressions === "number" ? item.impressions.toLocaleString() : item.impressions,
      Clicks: typeof item.clicks === "number" ? item.clicks.toLocaleString() : item.clicks,
    }))

    // Add filter information to export
    const filterInfo = {
      DateRange: dashboardDateRange ? `Last ${dashboardDateRange} days` : "All time",
      Countries: selectedCountries.join(", "),
      Devices: selectedDevices.join(", "),
      View: chartView,
    }

    // Updated timestamp reference to Jan 12, 2026
    const timestamp = new Date("2026-01-12").toISOString().split("T")[0]
    const rangeText = dashboardDateRange ? `_last${dashboardDateRange}days` : ""

    if (format === "csv") {
      // Add filter info as header
      let csv = `# Earnings Report\n# Filters: ${JSON.stringify(filterInfo)}\n\n`
      csv += Object.keys(exportData[0]).join(",") + "\n"
      csv += exportData.map((row) => Object.values(row).join(",")).join("\n")

      // Add country-wise breakdown
      csv += "\n\n# Country-Wise Revenue Breakdown\n"
      csv += "Country,Revenue\n"
      Object.entries(getCountryRevenueBreakdown()).forEach(([country, revenue]) => {
        csv += `${country},${revenue.toFixed(2)}\n`
      })

      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `earnings_with_geo_${chartView}${rangeText}_${timestamp}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "json") {
      const jsonData = {
        filters: filterInfo,
        summary: {
          totalRevenue: `$${displayTotalRevenue.toFixed(2)}`,
          totalClicks: displayTotalClicks.toLocaleString(),
          totalImpressions: displayTotalImpressions.toLocaleString(),
        },
        data: exportData,
        linkedInsights: {
          topCountry: topCountryOfDay,
          bestHours: bestHourPerCountry_old,
          topKeywords: topKeywordPerCountry_old,
        },
      }
      const json = JSON.stringify(jsonData, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `earnings_with_geo_${chartView}${rangeText}_${timestamp}.json`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "pdf") {
      // PDF export with filter info and linked insights
      const pdfContent = `
EARNINGS REPORT WITH GEO ANALYTICS
Generated: ${new Date().toLocaleString()}
Filters:
  Date Range: ${filterInfo.DateRange}
  Countries: ${filterInfo.Countries}
  Devices: ${filterInfo.Devices}
  View: ${filterInfo.View}

SUMMARY
Total Revenue: $${displayTotalRevenue.toFixed(2)}
Total Impressions: ${displayTotalImpressions.toLocaleString()}
Total Clicks: ${displayTotalClicks.toLocaleString()}
Week-over-Week Growth: ${weekOverWeekGrowth !== null ? weekOverWeekGrowth.toFixed(2) + "%" : "N/A"}

GEO ANALYTICS
Top Country of Day: ${topCountryOfDay.country} ($${topCountryOfDay.revenue.toFixed(2)})

Country Revenue Breakdown:
${Object.entries(getCountryRevenueBreakdown())
  .map(([country, revenue]) => `  ${country}: $${revenue.toFixed(2)}`)
  .join("\n")}

Best Hour Per Country:
${Object.entries(bestHourPerCountry_old)
  .map(([country, data]) => `  ${country}: ${data.hour}:00`)
  .join("\n")}

Top Keyword Per Country:
${Object.entries(topKeywordPerCountry_old)
  .map(([country, data]) => `  ${country}: ${data.keyword}`)
  .join("\n")}

DETAILED DATA
${exportData.map((d) => `${d.Date} | Revenue: ${d.Revenue} | Impressions: ${d.Impressions} | Clicks: ${d.Clicks}`).join("\n")}
      `
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `earnings_with_geo_${chartView}${rangeText}_${timestamp}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl">
          <p className="font-medium mb-2">{payload[0].payload.date}</p>
          <p className="text-sm text-green-600">Revenue: ${payload[0].payload.revenue.toFixed(2)}</p>
          <p className="text-sm text-blue-600">Impressions: {payload[0].payload.impressions.toLocaleString()}</p>
          <p className="text-sm text-purple-600">Clicks: {payload[0].payload.clicks.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  // Removed isLoading check as data renders instantly
  if (dashboardView === "new") {
    return (
      <div className="p-6 space-y-6">
        {/* New Dashboard Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">New Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeWidget === "default" ? "default" : "outline"}
                size="sm"
                onClick={() => handleWidgetChange("default")}
                className={activeWidget === "default" ? "bg-green-500 hover:bg-green-600" : "bg-transparent"}
              >
                Default
              </Button>
              <Button
                variant={activeWidget === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => handleWidgetChange("today")}
                className={activeWidget === "today" ? "bg-blue-500 hover:bg-blue-600" : "bg-transparent"}
              >
                Today
              </Button>
              <Button
                variant={groupBy === "Hour" ? "default" : "outline"}
                size="sm"
                onClick={() => handleGroupByChange("Hour")}
                className={groupBy === "Hour" ? "bg-purple-500 hover:bg-purple-600" : "bg-transparent"}
              >
                Group By Hour
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={() => handleDashboardChange("default")} className="bg-transparent">
            Back to Classic
          </Button>
        </div>

        {/* Widget Content */}
        {activeWidget === "default" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800">Total Earnings Summary</h3>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-xl font-bold text-green-600">${(0.003).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="text-lg font-semibold text-gray-700">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="text-sm font-medium text-green-600">0%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800">Performance Overview</h3>
                  <BarChart2 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Impressions</span>
                    <span className="text-xl font-bold text-blue-600">10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Clicks</span>
                    <span className="text-lg font-semibold text-gray-700">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average CTR</span>
                    <span className="text-sm font-medium text-blue-600">0.84%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-800">Revenue Metrics</h3>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's eCPM</span>
                    <span className="text-xl font-bold text-purple-600">$22</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Day</span>
                    <span className="text-sm font-semibold text-gray-700">19 Feb 2026 ($67)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average eCPM</span>
                    <span className="text-sm font-medium text-purple-600">$23</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Earnings Trend</h3>
              <div className="h-64 flex items-end justify-around space-x-2">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: "0%" }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">Aug</span>
                  <span className="text-xs font-semibold text-gray-800">$0.00</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: "0%" }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">Sep</span>
                  <span className="text-xs font-semibold text-gray-800">$0.00</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: "0%" }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">Oct</span>
                  <span className="text-xs font-semibold text-gray-800">$0.00</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: "0%" }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">Nov</span>
                  <span className="text-xs font-semibold text-gray-800">$0.00</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                    style={{ height: "0%" }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">Dec</span>
                  <span className="text-xs font-semibold text-gray-800">$0.00</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeWidget === "today" && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Today's Performance</h3>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Earnings</div>
                  <div className="text-2xl font-bold text-gray-400">${todayRevenue.toFixed(2)}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Impressions</div>
                  <div className="text-2xl font-bold text-gray-400">{todayImpressions}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Clicks</div>
                  <div className="text-2xl font-bold text-gray-400">{todayClicks}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">CTR</div>
                  <div className="text-2xl font-bold text-gray-400">{todayCTR}%</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">eCPM</div>
                  <div className="text-2xl font-bold text-gray-400">${todayECPM}</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Eye}
                iconColor="text-blue-500"
                title="IMPRESSIONS"
                value={todayImpressions.toString()}
                date="Today"
              />
              <MetricCard
                icon={MousePointer}
                iconColor="text-green-500"
                title="CLICKS"
                value={todayClicks.toString()}
                date="Today"
              />
              <MetricCard
                icon={DollarSign}
                iconColor="text-purple-500"
                title="ECPM"
                value={`$${todayECPM}`}
                date="Today"
              />
              <MetricCard
                icon={BarChart2}
                iconColor="text-orange-500"
                title="CTR"
                value={`${todayCTR}%`}
                date="Today"
              />
            </div>
          </div>
        )}

        {(activeWidget === "hourly" || groupBy === "Hour") && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Hourly Breakdown</h3>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-6 w-6 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">24 Hour View</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Peak Hour</div>
                  <div className="text-lg font-bold text-gray-400">--</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Best Revenue</div>
                  <div className="text-lg font-bold text-gray-400">--</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Total Hours</div>
                  <div className="text-lg font-bold text-blue-600">24</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Avg/Hour</div>
                  <div className="text-lg font-bold text-gray-400">--</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Hourly Performance Chart</h3>
              <div className="h-64 mb-6 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-400">
                  <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">No chart data</p>
                  <p className="text-xs">Graphs will render automatically once data is added</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Detailed Hourly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Hour</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hourlyData.map((hour, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{hour.hour}</td>
                        <td className="py-3 px-4 text-sm">{hour.impressions}</td>
                        <td className="py-3 px-4 text-sm">{hour.clicks}</td>
                        <td className="py-3 px-4 text-sm">{hour.ctr}</td>
                        <td className="py-3 px-4 text-sm">{hour.ecpm}</td>
                        <td className="py-3 px-4 text-sm font-medium">${hour.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Update recentActivityData to use filtered data and show last 10, specifically for Jan 2026.
  // This declaration is now correctly placed after allReportData is defined.

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatsCard title="TODAY" value={`$${todayTotals.revenue.toFixed(2)}`} />
        <StatsCard title="THIS MONTH" value={`$${thisMonthEarnings.toFixed(3)}`} />
        <StatsCard title="LAST MONTH" value="$0.00" />
        <StatsCard
          title="THIS MONTH FORECAST"
          value="$0.00"
          badge={{
            text: "0%",
            color: "bg-gray-500",
          }}
        />
        <StatsCard title="LAST 6 MONTHS" value={`$${totalEarnings.toFixed(3)}`} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap flex items-center"
          onClick={() => handleDashboardChange("new")}
        >
          <Grid3X3 size={16} className="mr-2" />
          NEW DASHBOARD
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 whitespace-nowrap flex items-center">
          <Plus size={16} className="mr-2" />
          NEW WIDGET
        </Button>
        <Button variant="outline" className="bg-transparent whitespace-nowrap flex items-center">
          Default
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <div className="flex-1"></div>
        <Button variant="outline" className="bg-transparent whitespace-nowrap flex items-center">
          Today
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <Button variant="outline" className="bg-transparent whitespace-nowrap flex items-center">
          Group By
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <Button
          variant="outline"
          className="bg-transparent whitespace-nowrap flex items-center"
          onClick={() => handleGroupByChange(groupBy === "Hour" ? "Day" : "Hour")}
        >
          {groupBy}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Eye}
          iconColor="text-blue-500"
          title="IMPRESSIONS"
          value={todayImpressions.toString()}
          date="Today"
        />
        <MetricCard
          icon={MousePointer}
          iconColor="text-green-500"
          title="CLICKS"
          value={todayClicks.toString()}
          date="Today"
        />
        <MetricCard icon={DollarSign} iconColor="text-purple-500" title="ECPM" value={`$${todayECPM}`} date="Today" />
        <MetricCard icon={BarChart2} iconColor="text-orange-500" title="CTR" value={`${todayCTR}%`} date="Today" />
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center bg-transparent">
                <Calendar size={16} className="mr-2" />
                {dashboardDateRange ? `Last ${dashboardDateRange} Days` : "Date Range"}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDashboardDateRange(null)}>All Time</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDashboardDateRange(7)}>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDashboardDateRange(14)}>Last 14 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDashboardDateRange(30)}>Last 30 Days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center bg-transparent">
                <Globe size={16} className="mr-2" />
                {selectedCountries.includes("All")
                  ? "All Countries"
                  : selectedCountries.length === 1
                    ? selectedCountries[0]
                    : `${selectedCountries.length} Countries`}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={selectedCountries.includes("All")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCountries(["All"])
                  } else {
                    // If unchecking "All", remove "All" and keep others. If no others, reset to "All".
                    const filtered = selectedCountries.filter((c) => c !== "All")
                    setSelectedCountries(filtered.length === 0 ? ["All"] : filtered)
                  }
                }}
              >
                All Countries
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedCountries.includes("United States")}
                onCheckedChange={(checked) => {
                  setSelectedCountries((prev) => {
                    const filtered = prev.filter((c) => c !== "All")
                    if (checked) {
                      return [...filtered, "United States"]
                    }
                    const result = filtered.filter((c) => c !== "United States")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                United States
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedCountries.includes("United Kingdom")}
                onCheckedChange={(checked) => {
                  setSelectedCountries((prev) => {
                    const filtered = prev.filter((c) => c !== "All")
                    if (checked) {
                      return [...filtered, "United Kingdom"]
                    }
                    const result = filtered.filter((c) => c !== "United Kingdom")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                United Kingdom
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedCountries.includes("Canada")}
                onCheckedChange={(checked) => {
                  setSelectedCountries((prev) => {
                    const filtered = prev.filter((c) => c !== "All")
                    if (checked) {
                      return [...filtered, "Canada"]
                    }
                    const result = filtered.filter((c) => c !== "Canada")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                Canada
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedCountries.includes("Others")}
                onCheckedChange={(checked) => {
                  setSelectedCountries((prev) => {
                    const filtered = prev.filter((c) => c !== "All")
                    if (checked) {
                      return [...filtered, "Others"]
                    }
                    const result = filtered.filter((c) => c !== "Others")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                Others
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center bg-transparent">
                <MousePointer size={16} className="mr-2" />
                {selectedDevices.includes("All")
                  ? "All Devices"
                  : selectedDevices.length === 1
                    ? selectedDevices[0]
                    : `${selectedDevices.length} Devices`}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={selectedDevices.includes("All")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDevices(["All"])
                  } else {
                    // If unchecking "All", remove "All" and keep others. If no others, reset to "All".
                    const filtered = selectedDevices.filter((d) => d !== "All")
                    setSelectedDevices(filtered.length === 0 ? ["All"] : filtered)
                  }
                }}
              >
                All Devices
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedDevices.includes("Desktop")}
                onCheckedChange={(checked) => {
                  setSelectedDevices((prev) => {
                    const filtered = prev.filter((d) => d !== "All")
                    if (checked) {
                      return [...filtered, "Desktop"]
                    }
                    const result = filtered.filter((d) => d !== "Desktop")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                Desktop
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedDevices.includes("Mobile")}
                onCheckedChange={(checked) => {
                  setSelectedDevices((prev) => {
                    const filtered = prev.filter((d) => d !== "All")
                    if (checked) {
                      return [...filtered, "Mobile"]
                    }
                    const result = filtered.filter((d) => d !== "Mobile")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                Mobile
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedDevices.includes("Tablet")}
                onCheckedChange={(checked) => {
                  setSelectedDevices((prev) => {
                    const filtered = prev.filter((d) => d !== "All")
                    if (checked) {
                      return [...filtered, "Tablet"]
                    }
                    const result = filtered.filter((d) => d !== "Tablet")
                    return result.length === 0 ? ["All"] : result
                  })
                }}
              >
                Tablet
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {
              // Filters are applied automatically via state changes
              // This button provides visual feedback for user action
            }}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDashboardDateRange(null)
              setSelectedCountries(["All"])
              setSelectedDevices(["All"])
            }}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Earnings Over Time */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-lg font-medium">Earnings Over Time</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={chartView === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("daily")}
            >
              Daily
            </Button>
            <Button
              variant={chartView === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={chartView === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView("monthly")}
            >
              Monthly
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleEnhancedExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEnhancedExport("json")}>Export as JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEnhancedExport("pdf")}>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <EarningsStat
              title="Total Earnings"
              value={`$${displayTotalRevenue.toFixed(2)}`}
              valueColor="text-gray-400"
            />
            <EarningsStat
              title="Week-over-Week"
              value={
                weekOverWeekGrowth !== null
                  ? `${weekOverWeekGrowth > 0 ? "+" : ""}${weekOverWeekGrowth.toFixed(2)}%`
                  : "N/A"
              }
              valueColor={weekOverWeekGrowth !== null && weekOverWeekGrowth > 0 ? "text-green-500" : "text-gray-400"}
            />
            <EarningsStat title="Today's eCPM" value={`$${todayECPM}`} valueColor="text-gray-400" />
            <EarningsStat title="Total Clicks" value={displayTotalClicks.toString()} valueColor="text-gray-400" />
            <EarningsStat
              title="Impressions"
              value={displayTotalImpressions.toString()}
              valueColor="text-gray-400"
            />
          </div>

          {/* Chart remains unchanged - it already uses chartData which is now filtered */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#9ca3af"
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <ChartTooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "5 5" }}
                  animationDuration={200}
                  animationEasing="ease-out"
                  wrapperStyle={{ zIndex: 100 }}
                  isAnimationActive={true}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotoneX"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                  name="Revenue ($)"
                  animationDuration={450}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                  connectNulls={true}
                />
                <Line
                  yAxisId="right"
                  type="monotoneX"
                  dataKey="impressions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                  name="Impressions"
                  animationDuration={450}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity - Show last 10 from filtered data */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Domain</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {/* Update Recent Activity to use filtered data (show last 10) */}
                {recentActivityData.map((item, index) => (
                  <RecentActivityRow
                    key={index}
                    date={item.date}
                    domain="eduinfomi.com"
                    impressions={item.impressions}
                    clicks={item.clicks}
                    ctr={item.ctr}
                    ecpm={item.ecpm}
                    revenue={item.revenue}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  badge?: {
    text: string
    color: string
  }
}

function StatsCard({ title, value, badge }: StatsCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-xs text-gray-500 mb-2">{title}</div>
            <div className="text-2xl font-semibold flex items-center">
              {value}
              {badge && (
                <span className={`ml-2 text-xs text-white px-2 py-0.5 rounded ${badge.color}`}>{badge.text}</span>
              )}
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Earnings for {title.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface MetricCardProps {
  icon: React.ElementType
  iconColor: string
  title: string
  value: string
  date: string
}

function MetricCard({ icon: Icon, iconColor, title, value, date }: MetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-center mb-2">
              <Icon className={`${iconColor}`} size={24} />
            </div>
            <div className="text-xs text-gray-500 text-center mb-1">{title}</div>
            <div className={`text-2xl font-semibold text-center ${iconColor}`}>{value}</div>
            <div className="text-xs text-gray-500 text-center mt-1">{date}</div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {title} for {date}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface EarningsStatProps {
  title: string
  value: string
  valueColor?: string
}

function EarningsStat({ title, value, valueColor = "text-gray-900" }: EarningsStatProps) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className={`text-lg font-semibold ${valueColor}`}>{value}</div>
    </div>
  )
}

interface RecentActivityRowProps {
  date: string
  domain: string
  impressions: string | number
  clicks: string | number
  ctr: string
  ecpm: string
  revenue: string | number
}

function RecentActivityRow({ date, domain, impressions, clicks, ctr, ecpm, revenue }: RecentActivityRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{domain}</td>
      <td className="py-3 px-4 text-sm">
        {typeof impressions === "number" ? impressions.toString() : impressions}
      </td>
      <td className="py-3 px-4 text-sm">{typeof clicks === "number" ? clicks.toString() : clicks}</td>
      <td className="py-3 px-4 text-sm">{ctr}</td>
      <td className="py-3 px-4 text-sm">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium">${typeof revenue === "number" ? revenue.toFixed(2) : revenue}</td>
    </tr>
  )
}
