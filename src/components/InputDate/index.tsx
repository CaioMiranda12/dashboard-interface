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

interface InputDateProps {
  name: string;
  selectedDate: Date | null;
  defaultDate: Date;
  onDateChange: (date: Date | null) => void;
}

export function InputDate({ name, selectedDate, defaultDate, onDateChange }: InputDateProps) {
  return (
    <div className="flex flex-col">
      <label className="text-white text-md">{name}:</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-[150px] justify-start text-left font-normal bg-[#222855] hover:bg-[#A3A7C2] border-none",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : format(defaultDate, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => onDateChange(date ?? null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
