'use client'

import { useState, useMemo } from 'react';
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Program {
  id:number;
}

export function ProgramCard ({ props: program }: { props: Program }) {
  
const [addStatus, setAddStatus] = useState(false);

const addIcon = useMemo(() => {
    if(addStatus){
        return (
            <svg
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )
        }
  return (
    <svg
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )

},[addStatus]);
 


  return (
       
    <div className="flex cursor-pointer flex-row gap-1 rounded-md p-2 text-left hover:bg-gray-200 transition-colors duration-300 w-[270px] border border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 items-center">
        <Avatar className="flex-shrink-0">
        <AvatarImage alt="School Logo" src="https://media.designrush.com/inspiration_images/131656/conversions/_1523460223_965_Harvard-Wreath-Logo_ab2ece9fbd52-mobile.jpg" />
        </Avatar>
        <div className="flex flex-col text-xs flex-grow">
        <span className="font-bold">Harvard University</span>
        <span className="whitespace-nowrap">MS in Computational Science {program.id}</span>
        </div>
        <Button
        className="ml-auto bg-gray-300 hover:bg-gray-400 p-1 rounded-full transition-colors duration-300 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground flex items-center justify-center w-8 h-8"
        data-active="false"
        variant="ghost"
        onClick={() => setAddStatus(addStatus ? false : true)}
        >
        <div className="text-sm">
            {addIcon}
        </div>
        </Button>
    </div>
  )
}








