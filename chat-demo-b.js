import { ChatOpenAI } from 'langchain/chat_models/openai'
import {
	ChatPromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate,
	MessagesPlaceholder,
} from 'langchain/prompts'
import { ConversationChain } from 'langchain/chains'
import { BufferMemory } from 'langchain/memory'

// import { SerpAPI } from 'langchain/tools'
// import { ChatAgent, AgentExecutor } from 'langchain/agents'

import * as dotenv from 'dotenv'
dotenv.config()

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
	SystemMessagePromptTemplate.fromTemplate(
		'The following is a friendly conversation between a human and and AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question it truthfully says it does not know.'
	),
	new MessagesPlaceholder('history'),
	HumanMessagePromptTemplate.fromTemplate('{input}'),
])

const model = new ChatOpenAI({})

const chain = new ConversationChain({
	memory: new BufferMemory({
		returnMessages: true,
		memoryKey: 'history',
	}),
	prompt: chatPrompt,
	llm: model,
})

const res = await chain.call({
	input: 'Hello from South Africa',
})

console.log(res)

const res2 = await chain.call({
	input: 'do you know where I am?',
})

console.log(res2)

// const tools = [
// 	new SerpAPI(process.env.SERPAPI_API_KEY, {
// 		hl: 'en',
// 		gl: 'us',
// 	}),
// ]

// const model = new ChatOpenAI({
// 	temperature: 0,
// })

// const agent = ChatAgent.fromLLMAndTools(model, tools)

// const executor = AgentExecutor.fromAgentAndTools({
// 	agent: agent,
// 	tools: tools,
// })

// const res = await executor.run('How many people live in the US in 2023?')

// console.log(res)
