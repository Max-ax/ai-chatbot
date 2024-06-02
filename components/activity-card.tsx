
import { Card } from "@/components/ui/card"
import { JSX, SVGProps } from "react"

export default function ActivityCard() {
  return (
    <Card key="1" className="cursor-pointer w-[300px] px-3 py-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 ">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Hiking in the Mountains</h2>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="text-sm">Outdoor Activity</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <CalendarIcon className="size-4" />
          <span className="text-xs">June 15, 2023 - June 15, 2024</span>
        </div>
      </div>
    </Card>
  )
}

function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}