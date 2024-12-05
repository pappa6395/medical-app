"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
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
    date:Date | undefined;
    setDate:(value: Date | undefined) => void;
    name: string;
    className?: string;
}

export default function DatePickerInput({
    date, 
    setDate,
    name,
    className="col-span-full"
}: DatePickerInputProps) {
  

  return (
    <div className={cn("grid gap-2", className)}>
        <Popover>
            <Label>{name}</Label>
            <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {date ? format<Date>(date, "PPP") : <span>Pick a date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
            >
            <Select
                onValueChange={(value) =>
                setDate(addDays(new Date(), parseInt(value)))
                }
            >
                <SelectTrigger>
                <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
                </SelectContent>
            </Select>
            <div className="rounded-md border block">
                <Calendar mode="single" selected={date} onSelect={setDate}/>
            </div>
            </PopoverContent>
        </Popover>
    </div>
    
  )
}
