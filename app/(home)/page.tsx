
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { auth } from "@/auth"
import { Session } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
    const session = (await auth()) as Session
    if (session) {
      redirect('/chat')
      
    }
  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 md:px-7 bg-white shadow">
        <div className="flex items-center ">
          <Link className="pb-1 text-2xl font-bold" href="#">
            Sgope
          </Link>
          <div className="ml-4 mr-8 h-8 w-px bg-gray-300 " />
          <nav>
            <ul className="text-sm text-gray-500 flex items-center space-x-5">
              <li>
                <Link className="hover:text-gray-900" href="#">
                  SgopAI
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-900" href="#">
                  Program Selection
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-900" href="#">
                  AI-Essay-Helper
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Button variant="outline">
            <Link href="/login">
                  Try For Free
            </Link>
        </Button>
      </header>
      <section className="container mx-auto grid gap-y-6 gap-x-10 py-20 md:grid-cols-2 md:py-24 lg:py-32  max-w-screen-xl">
        <div className="md:order-last space-y-4">
          <Image
            alt="Hero"
            className="mx-auto rounded-lg bg-gray-200"
            height="500"
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            style={{
              aspectRatio: "800/500",
              objectFit: "cover",
            }}
            width="800"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
          Let AI help with your <br />Application
          </h1>
          <p className="max-w-[650px] text-gray-500 md:text-lg pt-6">
            Unleash the full potential of your data with Sgope's cutting-edge AI-powered analytics platform. Gain
            valuable insights, optimize processes, and make informed decisions like never before.
          </p>
          <Button className="w-max" variant="default">
            <Link href="/chat">
                  Get Started
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}