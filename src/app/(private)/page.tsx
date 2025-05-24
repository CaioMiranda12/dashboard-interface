import { ContainerLeft } from "@/components/ContainerLeft";
import { ContainerRight } from "@/components/ContainerRight";
import { Submenu } from "@/components/Submenu";


export default function Home() {

  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 md:px-0 ">
      <Submenu />

      <div className="grid grid-cols-3 gap-x-4 items-start">
        <ContainerLeft />
        <ContainerRight />
      </div>
    </div>
  )
}