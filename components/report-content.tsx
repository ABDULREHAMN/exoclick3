"use client"
// Report data with manual ECPM values - no auto-calculation
import { useState } from "react"
import { Download, Filter, RefreshCw, BarChart2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const reportData = {
  "Last 7 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "3,345", clicks: "120", ctr: "3.59%", ecpm: "$81.86", revenue: "$21.56" },
        { date: "Feb 25, 2026", impressions: "12,674", clicks: "391", ctr: "3.09%", ecpm: "$79.66", revenue: "$79.56" },
        { date: "Feb 24, 2026", impressions: "12,695", clicks: "336", ctr: "2.65%", ecpm: "$77.98", revenue: "$75.00" },
        { date: "Feb 23, 2026", impressions: "12,345", clicks: "324", ctr: "2.62%", ecpm: "$77.98", revenue: "$76.00" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 20, 2026", impressions: "12,344", clicks: "285", ctr: "2.31%", ecpm: "$76.56", revenue: "$71.84" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "3,345", clicks: "120", ctr: "3.59%", ecpm: "$81.86", revenue: "$21.56" },
        { date: "Feb 25, 2026", impressions: "12,674", clicks: "391", ctr: "3.09%", ecpm: "$79.66", revenue: "$79.56" },
        { date: "Feb 24, 2026", impressions: "12,695", clicks: "336", ctr: "2.65%", ecpm: "$77.98", revenue: "$75.00" },
        { date: "Feb 23, 2026", impressions: "12,345", clicks: "324", ctr: "2.62%", ecpm: "$77.98", revenue: "$76.00" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 20, 2026", impressions: "12,344", clicks: "285", ctr: "2.31%", ecpm: "$76.56", revenue: "$71.84" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "3,345", clicks: "120", ctr: "3.59%", ecpm: "$81.86", revenue: "$21.56" },
        { date: "Feb 24, 2026", impressions: "12,695", clicks: "336", ctr: "2.65%", ecpm: "$77.98", revenue: "$75.00" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
      ],
      Desktop: [
        { date: "Feb 25, 2026", impressions: "12,674", clicks: "391", ctr: "3.09%", ecpm: "$79.66", revenue: "$79.56" },
        { date: "Feb 24, 2026", impressions: "12,695", clicks: "336", ctr: "2.65%", ecpm: "$77.98", revenue: "$75.00" },
        { date: "Feb 23, 2026", impressions: "12,345", clicks: "324", ctr: "2.62%", ecpm: "$77.98", revenue: "$76.00" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 19, 2026", impressions: "11,000", clicks: "92", ctr: "0.84%", ecpm: "$28", revenue: "$67" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Desktop: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
    },
  },
  "Last 3 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Desktop: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
    },
  },
  "Last 6 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Desktop: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
    },
  },
  "This Year": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Desktop: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
    },
  },
  "Custom Range": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Desktop: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
      Mobile: [
        { date: "Feb 23, 2026", impressions: "4,334", clicks: "143", ctr: "3.30%", ecpm: "$77.98", revenue: "$23.99" },
        { date: "Feb 22, 2026", impressions: "13,634", clicks: "342", ctr: "2.51%", ecpm: "$77.98", revenue: "$76.99" },
        { date: "Feb 21, 2026", impressions: "12,332", clicks: "326", ctr: "2.64%", ecpm: "$74", revenue: "$79.22" },
        { date: "Feb 18, 2026", impressions: "12,000", clicks: "98", ctr: "0.82%", ecpm: "$31", revenue: "$31" },
        { date: "Feb 17, 2026", impressions: "11,800", clicks: "95", ctr: "0.81%", ecpm: "$24", revenue: "$30" },
        { date: "Feb 16, 2026", impressions: "11,200", clicks: "91", ctr: "0.81%", ecpm: "$20", revenue: "$29" },
        { date: "Feb 15, 2026", impressions: "10,800", clicks: "88", ctr: "0.81%", ecpm: "$18", revenue: "$27" },
        { date: "Feb 14, 2026", impressions: "10,020", clicks: "85", ctr: "0.85%", ecpm: "$16", revenue: "$25" },
        { date: "Feb 13, 2026", impressions: "9,400", clicks: "82", ctr: "0.87%", ecpm: "$14", revenue: "$22" },
        { date: "Feb 12, 2026", impressions: "8,970", clicks: "79", ctr: "0.88%", ecpm: "$12", revenue: "$20" },
      ],
    },
  },
}

const statisticsTotals = {
  impressions: 240822,
  clicks: 3116,
  revenue: 854.05,
  ecpm: 28.59,
  ctr: 1.29,
}

export function ReportContent() {
  const [showReport] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days")
  const [selectedGroupBy, setSelectedGroupBy] = useState("Day")
  const [selectedMetrics, setSelectedMetrics] = useState("All Metrics")
  const [selectedSite, setSelectedSite] = useState("All Sites")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedDevice, setSelectedDevice] = useState("All Devices")
  const [currentReportData, setCurrentReportData] = useState(reportData["Last 7 Days"]["All Countries"]["All Devices"])
  const [isFiltered, setIsFiltered] = useState(false)

  const handleGenerateReport = () => {
    // Data already rendered, no action needed
  }

  const handleRefresh = () => {
    // Data already current, no action needed
  }

  const handleApplyFilters = () => {
    const dateData = reportData[selectedDateRange as keyof typeof reportData]
    const countryData = dateData?.[selectedCountry as keyof typeof dateData]
    const deviceData = countryData?.[selectedDevice as keyof typeof countryData]

    if (deviceData) {
      setCurrentReportData(deviceData)
      setIsFiltered(true)
    } else {
      setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
      setIsFiltered(false)
    }
  }

  const handleReset = () => {
    setSelectedDateRange("Last 7 Days")
    setSelectedGroupBy("Day")
    setSelectedMetrics("All Metrics")
    setSelectedSite("All Sites")
    setSelectedCountry("All Countries")
    setSelectedDevice("All Devices")

    setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
    setIsFiltered(false)
  }

  const calculateTotals = () => {
    if (currentReportData.length === 0) {
      return {
        totalRevenue: statisticsTotals.revenue.toFixed(3),
        totalImpressions: statisticsTotals.impressions.toLocaleString(),
        totalClicks: statisticsTotals.clicks.toLocaleString(),
        avgCTR: `${statisticsTotals.ctr.toFixed(2)}%`,
        avgECPM: `$${statisticsTotals.ecpm.toFixed(2)}`,
      }
    }

    const totalRevenue = currentReportData.reduce((sum, row) => {
      const revenue = Number.parseFloat(row.revenue.replace("$", "").replace(",", ""))
      return sum + revenue
    }, 0)

    const totalImpressions = currentReportData.reduce((sum, row) => {
      const impressions = Number.parseInt(row.impressions.replace(",", ""))
      return sum + impressions
    }, 0)

    const totalClicks = currentReportData.reduce((sum, row) => {
      const clicks = Number.parseInt(row.clicks.replace(",", ""))
      return sum + clicks
    }, 0)

    // Use manual ECPM values from data - find average of manual ECPMs instead of calculating
    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"
    const ecpmValues = currentReportData.map(row => {
      const ecpmStr = row.ecpm.replace("$", "")
      return Number.parseFloat(ecpmStr)
    })
    const avgECPM = ecpmValues.length > 0 ? (ecpmValues.reduce((a, b) => a + b, 0) / ecpmValues.length).toFixed(2) : "0.00"

    return {
      totalRevenue: totalRevenue.toFixed(3),
      totalImpressions: totalImpressions.toLocaleString(),
      totalClicks: totalClicks.toLocaleString(),
      avgCTR: `${avgCTR}%`,
      avgECPM: `$${avgECPM}`,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent" onClick={handleRefresh}>
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh report data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Report Filters</h3>
          {isFiltered && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Filters Applied</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Group By</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedGroupBy}
              onChange={(e) => setSelectedGroupBy(e.target.value)}
            >
              <option>Hour</option>
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Metrics</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(e.target.value)}
            >
              <option>All Metrics</option>
              <option>Revenue Only</option>
              <option>Traffic Only</option>
              <option>Performance Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Sites</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option>https://eduinfomi.com</option>
              <option>All Sites</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Countries</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>All Countries</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Device</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-green-500 hover:bg-green-600 flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset} className="bg-transparent">
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Current Filters:</strong> {selectedDateRange} • {selectedGroupBy} • {selectedSite} •{" "}
            {selectedCountry} • {selectedDevice} • {selectedMetrics}
          </div>
        </div>
      </Card>

      {/* Statistics Summary - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalRevenue}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalImpressions}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalClicks}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average CTR</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgCTR}</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average eCPM</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgECPM}</div>
        </div>
      </div>

      {/* Report Table */}
      {showReport && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Report Results</h3>
            <div className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentReportData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="text-gray-400">
                        <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">No records available</p>
                        <p className="text-xs mt-1">Reports will be visible after data is added</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentReportData.map((row, index) => (
                    <ReportRow
                      key={index}
                      date={row.date}
                      impressions={row.impressions}
                      clicks={row.clicks}
                      ctr={row.ctr}
                      ecpm={row.ecpm}
                      revenue={row.revenue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ReportRowProps {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

function ReportRow({ date, impressions, clicks, ctr, ecpm, revenue }: ReportRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{impressions}</td>
      <td className="py-3 px-4 text-sm">{clicks}</td>
      <td className="py-3 px-4 text-sm">{ctr}</td>
      <td className="py-3 px-4 text-sm">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium">{revenue}</td>
    </tr>
  )
}
