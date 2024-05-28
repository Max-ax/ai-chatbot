import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
  readStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'
import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { ProgramCards } from '@/components/programs/program-cards'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { streamText } from 'ai'
import { Description } from '@radix-ui/react-dialog'
import { ProgramCardsSkeleton } from '@/components/programs/program-cards-skeleton'
import GatherBasicInfo from '@/components/Information/basic-info'
import GatherEssayInfo from '@/components/Information/essay-info'
import { ApplicationEssay } from '@/components/programs/application-essay'
import { useStreamableText } from '../hooks/use-streamable-text'




// export async function toolIntro(toolName:string, toolDescription:string){
//   'use server' 
// const aiState = getAIState<typeof AI>()
// let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
// let textNode: undefined | React.ReactNode
//  const result = await streamUI({
//    model: openai('gpt-4o'),
//    system:
//      `You are a assistant that going to introduce the tool result,
//      base on the toolName and the toolDescription,
//      generate a concise short introduction of the tool result
//      The tool name is: ${toolName}.
//      The tool description is: ${toolDescription}
//      For example:
//      User: list 4 programs most suitable for me
//      toolName: listPrograms
//      toolDescription: List four imaginary master programs that suit the user's need.
//      Assistant: Here are four master program that are most suitable for you
//      `,
//        messages: [
//            ...aiState.messages.map((message: any) => ({
//                role: message.role,
//                content: message.content,
//            }))
//        ],
//        text: ({ content, done, delta }) => {
//            if (!textStream) {
//                textStream = createStreamableValue('')
//                textNode = <BotMessage content={textStream.value} />
//            }

//            if (done) {
//                textStream.done()
          
//            } else {
//                textStream.update(delta)
//            }

//            return textNode;
//        },
// }); 
// return result.value;
// }




// async function confirmPurchase(symbol: string, price: number, amount: number) {
//   'use server'

//   const aiState = getMutableAIState<typeof AI>()

//   const purchasing = createStreamableUI(
//     <div className="inline-flex items-start gap-1 md:items-center">
//       {spinner}
//       <p className="mb-2">
//         Purchasing {amount} ${symbol}...
//       </p>
//     </div>
//   )

//   const systemMessage = createStreamableUI(null)

//   runAsyncFnWithoutBlocking(async () => {
//     await sleep(1000)

//     purchasing.update(
//       <div className="inline-flex items-start gap-1 md:items-center">
//         {spinner}
//         <p className="mb-2">
//           Purchasing {amount} ${symbol}... working on it...
//         </p>
//       </div>
//     )

//     await sleep(1000)

//     purchasing.done(
//       <div>
//         <p className="mb-2">
//           You have successfully purchased {amount} ${symbol}. Total cost:{' '}
//           {formatNumber(amount * price)}
//         </p>
//       </div>
//     )

//     systemMessage.done(
//       <SystemMessage>
//         You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
//         {formatNumber(amount * price)}.
//       </SystemMessage>
//     )

//     aiState.done({
//       ...aiState.get(),
//       messages: [
//         ...aiState.get().messages,
//         {
//           id: nanoid(),
//           role: 'system',
//           content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
//             amount * price
//           }]`
//         }
//       ]
//     })
//   })

//   return {
//     purchasingUI: purchasing.value,
//     newMessage: {
//       id: nanoid(),
//       display: systemMessage.value
//     }
//   }
// }




async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode
  let toolStream:  undefined | ReturnType<typeof createStreamableValue<string>>




  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `\
    You are a education assistant conversation bot called Sgope AI aim to help users especailly Chinese students select the best master program and help students to apply them.
    Always call the tool if needed to
    Before calling the tool always tell the user what are you doing
    You and the user can discuss about graduate education and the user can select the intended master program they want, in the UI

    
    Messages inside [] means that it's a UI element or a user event. For example:
    - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
    - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

    If the user requests to see some programs, call \`listPrograms\` to show the program card UI.
    If the user requests to generate an application essay, call \`essayWriting\` to show essay writing UI.
    If the user requests to work on an application essay, call \`essayInfo\` to show gather essay info UI.
    If the user wants to ask for personal recommendation of suitable master program, call \`gatherBasicInfo\` function to show gather basic info UI
  `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream || !toolStream) {
        textStream = createStreamableValue('')
        toolStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        toolStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
        toolStream.update(content)
      }

      return textNode;
    },
    tools: {
      essayWriting:{
        description: 'Generate an application Essay base on user\'s request',
        parameters: z.object({
          essay: z.object({
            id: z.number().describe('The essay id')
          })
        }),
          generate: async function* ({essay}){
                   
            await sleep(1000)
            
            const toolCallId = nanoid()
  
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: [
                    {
                      type: 'tool-call',
                      toolName: 'essayWriting',
                      toolCallId,
                      args: { essay }
                    }
                  ]
                },
                {
                  id: nanoid(),
                  role: 'tool',
                  content: [
                    {
                      type: 'tool-result',
                      toolName: 'essayWriting',
                      toolCallId,
                      result: essay
                    }
                  ]
                }
              ]
            })
            
          toolStream?.done();
            return (
              <BotCard  content={toolStream?.value}>
                  <ApplicationEssay props={essay}/>
                </BotCard>
              
            )
          }
            
          },
      essayInfo:{
        description: 'Gather the needed information for the application essay before work on an essay',
        parameters: z.object({
          essayRequest: z.object({
            id: z.number().describe('The essayRequest id')
          })
        }),
        generate: async function* ({essayRequest}){
          toolStream?.done();
          console.log(toolStream);
          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'essayInfo',
                    toolCallId,
                    args: { essayRequest }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'essayInfo',
                    toolCallId,
                    result: essayRequest
                  }
                ]
              }
            ]
          })
          
          return (
            <BotCard  content="{toolMessage}">
              <GatherEssayInfo/>
            </BotCard>
          )
        }
          
        },

      gatherBasicInfo:{
        description: 'Gather the user\'s basic information to give customized services',
        parameters: z.object({
          user: z.object({
            id: z.number().describe('The userid')
          })
        }),
        generate: async function* ({user}){
          console.log("gatherBasic")
          await sleep(1000)

          const toolCallId = nanoid()
          
          toolStream?.done();
          console.log(toolStream);

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'gatherBasicInfo',
                    toolCallId,
                    args: { user }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'gatherBasicInfo',
                    toolCallId,
                    result: user
                  }
                ]
              }
            ]
          })
          return (
            <BotCard  content={toolStream?.value}>
              <GatherBasicInfo/>
            </BotCard>
          )
        }
          
        },

      listPrograms:{
        description:'List four imaginary master program when user is asking to show programs.',
        parameters: z.object({
          programs: z.array(
            z.object({
              id: z.number().describe('The unique program id 1-10')
            })
          )
        }),
        generate: async function* ({programs}){
          console.log("list program")
          yield(
            <ProgramCardsSkeleton count = {programs.length} />
          )

          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'listPrograms',
                    toolCallId,
                    args: { programs }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'listPrograms',
                    toolCallId,
                    result: programs
                  }
                ]
              }
            ]
          })
          
          return (
            <BotCard  content={toolStream?.value}>
              <ProgramCards props={programs}  />
            </BotCard>
          )
        }
      },

      listStocks: {
        description: 'List three imaginary stock that are trending.',
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe('The symbol of the stock'),
              price: z.number().describe('The price of the stock'),
              delta: z.number().describe('The change in price of the stock')
            })
          )
        }),
        generate: async function* ({ stocks }) {
          console.log(...stocks);
          yield (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'listStocks',
                    toolCallId,
                    args: { stocks }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'listStocks',
                    toolCallId,
                    result: stocks
                  }
                ]
              }
            ]
          })

          return (
            <BotCard>
              <Stocks props={stocks} />
            </BotCard>
          )
        }
      },
      showStockPrice: {
        description:
          'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          delta: z.number().describe('The change in price of the stock')
        }),
        generate: async function* ({ symbol, price, delta }) {
          yield (
            <BotCard>
              <StockSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'showStockPrice',
                    toolCallId,
                    args: { symbol, price, delta }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'showStockPrice',
                    toolCallId,
                    result: { symbol, price, delta }
                  }
                ]
              }
            ]
          })

          return (
            <BotCard>
              <Stock props={{ symbol, price, delta }} />
            </BotCard>
          )
        }
      },
      showStockPurchase: {
        description:
          'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          numberOfShares: z
            .number()
            .describe(
              'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
            )
        }),
        generate: async function* ({ symbol, price, numberOfShares = 100 }) {
          const toolCallId = nanoid()

          if (numberOfShares <= 0 || numberOfShares > 1000) {
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: [
                    {
                      type: 'tool-call',
                      toolName: 'showStockPurchase',
                      toolCallId,
                      args: { symbol, price, numberOfShares }
                    }
                  ]
                },
                {
                  id: nanoid(),
                  role: 'tool',
                  content: [
                    {
                      type: 'tool-result',
                      toolName: 'showStockPurchase',
                      toolCallId,
                      result: {
                        symbol,
                        price,
                        numberOfShares,
                        status: 'expired'
                      }
                    }
                  ]
                },
                {
                  id: nanoid(),
                  role: 'system',
                  content: `[User has selected an invalid amount]`
                }
              ]
            })

            return <BotMessage content={'Invalid amount'} />
          } else {
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: [
                    {
                      type: 'tool-call',
                      toolName: 'showStockPurchase',
                      toolCallId,
                      args: { symbol, price, numberOfShares }
                    }
                  ]
                },
                {
                  id: nanoid(),
                  role: 'tool',
                  content: [
                    {
                      type: 'tool-result',
                      toolName: 'showStockPurchase',
                      toolCallId,
                      result: {
                        symbol,
                        price,
                        numberOfShares
                      }
                    }
                  ]
                }
              ]
            })

            return (
              <BotCard>
                <Purchase
                  props={{
                    numberOfShares,
                    symbol,
                    price: +price,
                    status: 'requires_action'
                  }}
                />
              </BotCard>
            )
          }
        }
      },
      getEvents: {
        description:
          'List funny imaginary events between user highlighted dates that describe stock activity.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z
                .string()
                .describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event')
            })
          )
        }),
        generate: async function* ({ events }) {
          yield (
            <BotCard>
              <EventsSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'getEvents',
                    toolCallId,
                    args: { events }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'getEvents',
                    toolCallId,
                    result: events
                  }
                ]
              }
            ]
          })

          return (
            <BotCard>
              <Events props={events} />
            </BotCard>
          )
        }
      }
    }
  })
  console.log(aiState.get());
  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    // confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'gatherBasicInfo' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) :tool.toolName === 'essayInfo' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) :tool.toolName === 'listPrograms' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) :tool.toolName === 'listStocks' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPrice' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Stock props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPurchase' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Purchase props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'getEvents' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Events props={tool.result} />
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
