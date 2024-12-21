"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calender"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EnhancedCalendar({
  className,
}: any) {
  const [date, setDate] = React.useState<Date>()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [calendarType, setCalendarType] = React.useState<"single" | "range">("single")

  return (
    <div className={cn("grid gap-1", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[150px] justify-start text-left font-normal",
              !date && !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {calendarType === "single" && date ? (
              format(date, "PPP")
            ) : dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-4/5 p-0 bg-red-500" align="start">
          <Select
            onValueChange={(value) => setCalendarType(value as "single" | "range")}
            defaultValue={calendarType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select calendar type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Date</SelectItem>
              <SelectItem value="range">Date Range</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            mode={calendarType}
            selected={calendarType === "single" ? date : dateRange}
            onSelect={calendarType === "single" ? setDate : setDateRange}
            initialFocus
          />
          {calendarType === "range" && (
            <div className="flex justify-between p-2 border-t">
              <Button
                variant="ghost"
                onClick={() => setDateRange({ from: new Date(), to: addDays(new Date(), 7) })}
              >
                Next 7 days
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDateRange({ from: new Date(), to: addDays(new Date(), 30) })}
              >
                Next 30 days
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

