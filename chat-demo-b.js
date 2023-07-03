import { ChatOpenAI } from 'langchain/chat_models/openai'
import { SerpAPI } from 'langchain/tools'
import { ChatAgent, AgentExecutor } from 'langchain/agents'

import * as dotenv from 'dotenv'
dotenv.config()

const tools = [
	new SerpAPI(process.env.SERPAPI_API_KEY, {
		hl: 'en',
		gl: 'us',
	}),
]

const model = new ChatOpenAI({
	temperature: 0,
})

const agent = ChatAgent.fromLLMAndTools(model, tools)

const executor = AgentExecutor.fromAgentAndTools({
	agent: agent,
	tools: tools,
})

const res = await executor.run('How many people live in the US in 2023?')

console.log(res)
