'use client'

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function InputDate({ name }: { name: string }) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col">
      <label className="text-white text-lg">{name}:</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-[150px] justify-start text-left font-normal bg-[#001E2B] hover:bg-[#001E2B] border-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>dd/mm/aaaa</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}