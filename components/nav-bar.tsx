
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { JSX, SVGProps } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/auth"

export default function NavBar() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-7 bg-white shadow">
      <Link className="flex pb-1 items-center gap-2 text-2xl font-bold text-shadow" href="/">
        <span>Sgope</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full size-14 border-transparent hover:bg-gray-300" variant="ghost">
          <Avatar className="size-11">
            <AvatarImage src="https://github.com/shadcn.png" />
         </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/chat">
              <AiIcon className="size-4" />
              Sgope AI
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="#">
              <BookIcon className="size-4" />
              My Programs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="#">
              <PencilIcon className="size-4" />
              My Essays
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center gap-2" href="/activity">
              <UserIcon className="size-4" />
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-white">
          <form
            action={async () => {
              'use server'
              await signOut({redirectTo: "/"})
            }}
          >
            <button  className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 hover:bg-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200">
            <LogOutIcon className="size-4" />
              Logout
            </button>
          </form>
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
function AiIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}



function PencilIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}