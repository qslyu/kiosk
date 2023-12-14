import { NextResponse } from 'next/server'
 
interface ICalEvent {
  SUMMARY?: string
  DTSTART?: string
  DTEND?: string
  LOCATION?: string
}

function parseICal(data: string): ICalEvent[] {
  const events: ICalEvent[] = []
  const lines = data.split(/\r\n|\n|\r/)

  let currentEvent: ICalEvent | null = null

  lines.forEach(line => {
    if (line.startsWith("BEGIN:VEVENT")) {
      currentEvent = {}
    } else if (line.startsWith("END:VEVENT")) {
      if (currentEvent) {
        events.push(currentEvent)
      }
      currentEvent = null
    } else if (currentEvent) {
      const [key, ...valueParts] = line.split(':')
      const value = valueParts.join(':')
      if (key === "SUMMARY") {
        currentEvent.SUMMARY = value
      } else if(key === "DTSTART;TZID=Asia/Tokyo") {
        currentEvent.DTSTART = value
      } else if(key === "DTEND;TZID=Asia/Tokyo") {
        currentEvent.DTEND = value
      } else if(key === "LOCATION") {
        currentEvent.LOCATION = value
      }
    }
  })

  return events
}

function dateToStr(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}${month}${day}`
}

function formatDT(dt: string) {
  const date = dt.split("T")[0]
  const time = dt.split("T")[1]
  
  return {
    y: Number(date.substring(0, 4)),
    m: Number(date.substring(4, 6)),
    d: Number(date.substring(6, 8)),
    h: Number(time.substring(0, 2)),
    min: Number(time.substring(2, 4)) 
  }
}
 
export async function GET() {
  const ical = await fetch(`${process.env.ICS_URL}`,{ mode: 'no-cors' }).then(res => res.text())
  const events = parseICal(ical)

  const filteredEvents = events.filter(event => {
    const dtStart = event.DTSTART?.slice(0, 8)
    const todayStr = dateToStr(new Date())
    const tomorrowStr = dateToStr(new Date(Date.now() + 24 * 60 * 60 * 1000))
    return dtStart === todayStr || dtStart === tomorrowStr
  })

  filteredEvents.sort((a, b) => {
    if (a.DTSTART && b.DTSTART) {
      return a.DTSTART.localeCompare(b.DTSTART)
    } else {
      return 0
    }
  })

  const formatedEvents = filteredEvents.map((event, i) => {
    const nextEvent = filteredEvents[i + 1]
    if (nextEvent && event.SUMMARY === nextEvent.SUMMARY && event.LOCATION === nextEvent.LOCATION && event.DTEND === nextEvent.DTSTART) {
      return null
    }

    const prevEvent = filteredEvents[i - 1]
    if (event.SUMMARY === prevEvent.SUMMARY && event.LOCATION === prevEvent.LOCATION && event.DTSTART === prevEvent.DTEND) {
      return {
        summary: event.SUMMARY,
        start: formatDT(prevEvent.DTSTART || ""),
        end: formatDT(event.DTEND || ""),
        location: event.LOCATION || ""
      }
    }

    return {
      summary: event.SUMMARY,
      start: formatDT(event.DTSTART || ""),
      end: formatDT(event.DTEND || ""),
      location: event.LOCATION || ""
    }
  })

  return NextResponse.json(formatedEvents.filter(event => event !== null))
}
