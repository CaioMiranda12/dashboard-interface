import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { BsArrowDownRightCircle } from "react-icons/bs";
import { convertCurrency } from "@/utils/convertCurrency";

interface InfoContainerProps {
  name: string;
  value: number;
  color: string;
}

export function InfoContainer({ name, value, color }: InfoContainerProps) {
  return (
    <div className="flex flex-col gap-0.5 bg-dark-ofc p-4 rounded-sm">
      <RiMoneyDollarCircleLine color={color} size={28} />
      <span className="text-gray-300 text-base">{name}</span>
      <strong className="text-2xl" style={{ color }}>{convertCurrency(value)}</strong>
    </div>

  )
}