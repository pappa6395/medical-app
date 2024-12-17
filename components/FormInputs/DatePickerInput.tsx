"use client"

import * as React from "react"
import { addDays, format, getMonth, getYear, setMonth } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"


type DatePickerInputProps = {
    date: Date | undefined;
    setDate:(value: Date | undefined) => void;
    name: string;
    className?: string;
    startYear?: number;
    endYear?: number;
    currentYear?: number;
}

export default function DatePickerInput({
    date, 
    setDate,
    currentYear = new Date().getFullYear(),
    startYear = currentYear - 100,
    endYear = currentYear + 10,
    name,
    className="col-span-full"
}: DatePickerInputProps) {
  
    const months = [
        "January",
        "February",
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September",
        "Octorber", 
        "November", 
        "December",
    ];

    const [selectedYear, setSelectedYear] = React.useState<string | undefined>(undefined)
    const [selectedMonth, setSelectedMonth] = React.useState<string | undefined>(undefined)
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);
    //const months = Array.from({length: 12 }, (_, i) => new Date().getMonth() - i)
    //const years = Array.from({ length: 100 }, (_,i) => new Date().getFullYear() - i);

    const handleMonthChange = (month: string) => {
        const newDate = setMonth(date as Date , months.indexOf(month));
        setSelectedMonth(month);
        setDate(newDate);
    }
    const handleYearChange = (year: string) => {
        const newDate = new Date(date as Date);
        newDate.setFullYear(Number(year));
        setSelectedYear(year);
        setDate(newDate);
    }
    const handleSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate)
        }
    }

  return (
    <div className={cn("grid gap-2", className)}>
        <Popover>
            <Label>{name}</Label>
            <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                "w-[268px] justify-start text-left font-normal dark:bg-slate-700 dark:text-slate-200",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {date ? date.toLocaleDateString("en-us",{
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }) : <span>Pick a date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="flex w-auto flex-col 
                space-y-2 p-2 dark:bg-slate-700"
            >
                <div className="flex justify-between p-2 gap-1">
                    {selectedYear && (
                        <Select 
                        onValueChange={handleMonthChange}
                        value={months[getMonth(date as Date)]}
                    >
                        <SelectTrigger className="dark:border-gray-400">
                            <SelectValue 
                                placeholder="Month"
                            />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {months.map((month,i) => {
                                return (
                                    <SelectItem key={i} value={month}>{month}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                    )}
                    <Select
                        onValueChange={handleYearChange}
                        value={selectedYear || undefined}
                        //value={getYear(date as Date).toString()}
                    >
                        <SelectTrigger className="dark:border-gray-400">
                            <SelectValue 
                                placeholder="Year"
                            />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {years.map((year,i) => {
                                return (
                                    <SelectItem key={i} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="rounded-md border dark:border-slate-400 block">
                    <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={handleSelect}
                        className="dark:bg-slate-700"
                        initialFocus
                        month={date}    
                        onMonthChange={setDate}
                    />
                </div>
            </PopoverContent>
        </Popover>
    </div>
    
  )
}
