// Automatic date system for dashboard
// Generates missing dates with zero values and synchronizes across all sections

export interface DailyRecord {
  date: string
  impressions: number
  clicks: number
  revenue: number
  ctr: string
  ecpm: string
}

// Format date as "Mon DD, YYYY"
function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

// Parse date string "Mon DD, YYYY" to Date object
function parseDate(dateString: string): Date {
  const months: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  }
  const parts = dateString.trim().split(/[\s,]+/)
  const month = months[parts[0]]
  const day = parseInt(parts[1])
  const year = parseInt(parts[2])
  return new Date(year, month, day)
}

// Get today's date in formatted string
export function getTodayDateString(): string {
  const today = new Date()
  return formatDate(today)
}

// Get tomorrow's date in formatted string (for daily auto-creation scheduling)
export function getTomorrowDateString(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(tomorrow)
}

// Create zero-value record for a date
export function createEmptyRecord(date: string): DailyRecord {
  return {
    date,
    impressions: 0,
    clicks: 0,
    revenue: 0.00,
    ctr: "0.00%",
    ecpm: "0.00"
  }
}

// Ensure record exists for today, if not create with zeros
export function ensureTodayRecord(data: DailyRecord[]): DailyRecord[] {
  const todayString = getTodayDateString()
  
  // Check if today's record exists (prevent duplicates)
  const todayExists = data.some(record => record.date === todayString)
  
  if (!todayExists) {
    // Add today's record at the beginning (newest first)
    return [createEmptyRecord(todayString), ...data]
  }
  
  // If today exists, ensure it's at the top by sorting
  const sorted = [...data].sort((a, b) => {
    const aDate = parseDate(a.date).getTime()
    const bDate = parseDate(b.date).getTime()
    return bDate - aDate // Newest first
  })
  
  return sorted
}

// Fill gaps in data with zero-value records for continuous daily coverage
export function fillDataGaps(data: DailyRecord[]): DailyRecord[] {
  if (data.length === 0) {
    // If no data, create today's record with zeros
    return [createEmptyRecord(getTodayDateString())]
  }
  
  // Sort data by date (newest first)
  const sortedData = [...data].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime()
  })
  
  const result: DailyRecord[] = []
  const today = new Date()
  let currentDate = new Date(today)
  
  // Find the earliest date in the data
  const earliestDate = parseDate(sortedData[sortedData.length - 1].date)
  
  // Fill from today down to the earliest date
  while (currentDate.getTime() >= earliestDate.getTime()) {
    const dateStr = formatDate(currentDate)
    
    // Check if we already have a record for this date
    const existingRecord = sortedData.find(r => r.date === dateStr)
    
    if (existingRecord) {
      result.push(existingRecord)
    } else {
      // Create empty record for missing date
      result.push(createEmptyRecord(dateStr))
    }
    
    currentDate.setDate(currentDate.getDate() - 1)
  }
  
  return result
}

// Get latest record for today (for the "Today" card)
export function getTodayRecord(data: DailyRecord[]): DailyRecord {
  const todayString = getTodayDateString()
  return data.find(record => record.date === todayString) || createEmptyRecord(todayString)
}

// Format numbers for display (add commas)
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format data to report format (with $ and commas)
export function formatForReport(record: DailyRecord): {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
} {
  return {
    date: record.date,
    impressions: formatNumber(record.impressions),
    clicks: formatNumber(record.clicks),
    ctr: record.ctr,
    ecpm: "$" + record.ecpm,
    revenue: "$" + record.revenue.toFixed(2)
  }
}

// Synchronize data across all sections
export function synchronizeData(baseData: DailyRecord[]): {
  allData: DailyRecord[]
  todayRecord: DailyRecord
  recentActivityData: DailyRecord[]
  reportData: DailyRecord[]
  formattedReportData: Array<{
    date: string
    impressions: string
    clicks: string
    ctr: string
    ecpm: string
    revenue: string
  }>
} {
  // Ensure today's record exists
  let data = ensureTodayRecord(baseData)
  
  // Fill any gaps in historical data
  data = fillDataGaps(data)
  
  // Get today's record
  const todayRecord = getTodayRecord(data)
  
  // Get recent activity (last 5 records)
  const recentActivityData = data.slice(0, 5)
  
  // All data is the report data
  const reportData = data
  
  // Format report data
  const formattedReportData = reportData.map(formatForReport)
  
  return {
    allData: data,
    todayRecord,
    recentActivityData,
    reportData,
    formattedReportData
  }
}
