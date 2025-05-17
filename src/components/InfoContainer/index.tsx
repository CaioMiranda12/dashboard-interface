import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { BsArrowDownRightCircle } from "react-icons/bs";
import { convertCurrency } from "@/utils/convertCurrency";
import { ElementType } from "react";

interface InfoContainerProps {
  name: string;
  value: number;
  color: string;
  icon: ElementType;
}

export function InfoContainer({ name, value, color, icon }: InfoContainerProps) {
  const Icon = icon;

  return (
    <div className="flex flex-col gap-0.5 bg-dark-ofc p-4 rounded-sm">
      <Icon color={color} size={28} />
      <span className="text-gray-300 text-base">{name}</span>
      {
        value > 0 ? (
          <strong className="text-2xl" style={{ color }}>{`+${convertCurrency(value)}`}</strong>
        ) : (
          <strong className="text-2xl" style={{ color }}>{convertCurrency(value)}</strong>
        )
      }
    </div>

  )
}