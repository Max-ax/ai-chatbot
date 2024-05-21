import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Sgope AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          Welcome to Sgope AI, your intelligent partner in academic success! 
          Our advanced AI chatbot is here to guide you through selecting the perfect master's program, 
          crafting compelling application essays, and answering all your general questions. 
          Empower your future with personalized support from Sgope AI—where your academic dreams take flight!
        </p>
        
      </div>
    </div>
  )
}
