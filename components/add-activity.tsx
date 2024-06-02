'use client'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { JSX, SVGProps } from "react"
import { Input } from "@/components/ui/input"

import React, { useState } from 'react';

export default function AddActivity() {
  const [manualInput, setManualInput] = useState(false);

  const handleToggle = () => {
    setManualInput(!manualInput);
  };

  const Refine = () => {

  };

  return (
    <Card key="1" className="w-[420px] px-2 pt-7">
      <form >

        <CardContent className="space-y-4 justify-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="manualInputToggle"
              checked={manualInput}
              onChange={handleToggle}
              className="form-checkbox"
            />
            <label htmlFor="manualInputToggle" className="text-sm">Manual Input Details</label>
          </div>
          {manualInput && (
            <>
              <div>
                <Label htmlFor="name">Activity Name</Label>
                <Input className="w-auto" id="name" placeholder="Enter Activity name" />
              </div>
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input className="w-auto" id="organization" placeholder="Enter Organization name" />
              </div>
              <div className="space-y">
                <Label htmlFor="date">Date</Label>
                <div className="flex justify-between">
                  <div className="flex space-x-1">
                    <label htmlFor="startDate" className="self-center text-sm">From</label>
                    <Input id="startDate" className="w-auto" type="date" />
                  </div>
                  <div className="flex space-x-1">
                    <label htmlFor="endDate" className="self-center text-sm">To</label>
                    <Input id="endDate" className="w-fit" type="date" />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <div className="relative">
              <Textarea
                id="details"
                className="h-32"
                placeholder="Enter details About Your Activity or directly upload a related file, Click the bottom right star button to let Sgope Help you Refine the Details"
              />
              {manualInput && (<Button 
                className="absolute size-5 bottom-2 right-3 p-0 bg-transparent hover:bg-transparent"
                variant="ghost"
                onClick={Refine}
              >
                <StarIcon className="size-5 text-gray-400 hover:text-gray-600" />
              </Button>)}
            </div>
          </div>
          <div className="space-y-2">
            <Button className="flex-1" variant="outline">
              <UploadIcon className="mr-2 size-4" />
              Upload File
            </Button>
          </div>
        </CardContent>
        <CardFooter className="pt-5 justify-end">
          <Button type="submit">Add Activity</Button>
        </CardFooter>
      </form>
    </Card>
  );
}



function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
  )
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
