// import { OpenAI } from 'langchain'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain'
import * as dotenv from 'dotenv'

dotenv.config()

const template =
	'What would be a good company name for a company that makes {product}?'

const promptTemplate = new PromptTemplate({
	template: template,
	inputVariables: ['product'],
})

// const formattedPrompt = await promptTemplate.format({
// 	product: 'colorful socks',
// })

// console.log(formattedPrompt)

const model = new OpenAI({
	temperature: 0.9,
})

const chain = new LLMChain({
	llm: model,
	prompt: promptTemplate,
})

const res = await chain.call({
	product: 'dangerous beige dye',
})

console.log(res)

// const res = await model.call(
// 	'What would be a good company name for a company that makes colorful socks?'
// )

// console.log(res)
